# Cyrus Network - Smart Contract Specifications

## Overview

This document provides detailed specifications for Cyrus Protocol smart contracts, including contract interfaces, state machines, security considerations, and gas optimization strategies.

---

## Contract Architecture

### Inheritance Hierarchy

```
Ownable (OpenZeppelin)
├── Pausable (OpenZeppelin)
│   └── CyrusCore (Base Contract)
│       ├── CyrusEscrow
│       ├── BrokerRegistry
│       ├── ReputationEngine
│       └── DisputeResolution
```

### Contract Addresses (Polygon Mainnet - TBD)

```
CyrusEscrow:         0x... (to be deployed)
BrokerRegistry:      0x... (to be deployed)
ReputationEngine:    0x... (to be deployed)
DisputeResolution:   0x... (to be deployed)
```

---

## CyrusEscrow.sol

### Contract Interface

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface ICyrusEscrow {
    // Events
    event EscrowCreated(
        bytes32 indexed escrowId,
        address indexed sender,
        address indexed recipient,
        address broker,
        uint256 amount,
        uint256 timeoutAt
    );

    event DeliveryConfirmed(
        bytes32 indexed escrowId,
        address indexed broker,
        bytes32 proofHash
    );

    event ReceiptConfirmed(
        bytes32 indexed escrowId,
        address indexed recipient
    );

    event EscrowReleased(
        bytes32 indexed escrowId,
        address indexed broker,
        uint256 amount,
        uint256 fee
    );

    event EscrowRefunded(
        bytes32 indexed escrowId,
        address indexed sender,
        uint256 amount
    );

    event DisputeRaised(
        bytes32 indexed escrowId,
        address indexed initiator,
        string reason
    );

    // State enum
    enum EscrowState {
        CREATED,
        BROKER_ASSIGNED,
        DELIVERY_CONFIRMED,
        RECIPIENT_CONFIRMED,
        RELEASED,
        DISPUTED,
        REFUNDED,
        EXPIRED
    }

    // Main struct
    struct Escrow {
        address sender;
        address recipient;
        address broker;
        uint256 amount;
        uint256 brokerFee;
        uint256 protocolFee;
        EscrowState state;
        bytes32 deliveryHash;
        bytes32 proofHash;
        uint256 createdAt;
        uint256 timeoutAt;
    }

    // Functions
    function createEscrow(
        address recipient,
        address broker,
        uint256 amount,
        bytes32 deliveryHash,
        uint256 timeoutPeriod
    ) external returns (bytes32 escrowId);

    function confirmDelivery(
        bytes32 escrowId,
        bytes32 proofHash
    ) external;

    function confirmReceipt(bytes32 escrowId) external;

    function disputeEscrow(
        bytes32 escrowId,
        string calldata reason
    ) external;

    function claimTimeout(bytes32 escrowId) external;

    function getEscrow(bytes32 escrowId)
        external view returns (Escrow memory);
}
```

### Full Implementation

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/IBrokerRegistry.sol";
import "./interfaces/IReputationEngine.sol";

contract CyrusEscrow is
    OwnableUpgradeable,
    PausableUpgradeable,
    ReentrancyGuardUpgradeable
{
    // State variables
    IERC20 public usdcToken;
    IBrokerRegistry public brokerRegistry;
    IReputationEngine public reputationEngine;

    mapping(bytes32 => Escrow) public escrows;

    uint256 public constant PROTOCOL_FEE_BPS = 20; // 0.2%
    uint256 public constant BROKER_FEE_BPS = 80;   // 0.8%
    uint256 public constant MAX_TIMEOUT = 7 days;
    uint256 public constant MIN_TIMEOUT = 1 hours;

    address public treasuryAddress;

    // Initialize function (for upgradeable pattern)
    function initialize(
        address _usdcToken,
        address _brokerRegistry,
        address _reputationEngine,
        address _treasuryAddress
    ) external initializer {
        __Ownable_init();
        __Pausable_init();
        __ReentrancyGuard_init();

        usdcToken = IERC20(_usdcToken);
        brokerRegistry = IBrokerRegistry(_brokerRegistry);
        reputationEngine = IReputationEngine(_reputationEngine);
        treasuryAddress = _treasuryAddress;
    }

    // Create new escrow
    function createEscrow(
        address recipient,
        address broker,
        uint256 amount,
        bytes32 deliveryHash,
        uint256 timeoutPeriod
    ) external whenNotPaused nonReentrant returns (bytes32 escrowId) {
        require(recipient != address(0), "Invalid recipient");
        require(broker != address(0), "Invalid broker");
        require(amount > 0, "Amount must be > 0");
        require(
            timeoutPeriod >= MIN_TIMEOUT && timeoutPeriod <= MAX_TIMEOUT,
            "Invalid timeout"
        );

        // Verify broker is registered and active
        require(
            brokerRegistry.isActiveBroker(broker),
            "Broker not active"
        );

        // Calculate fees
        uint256 totalFee = (amount * (PROTOCOL_FEE_BPS + BROKER_FEE_BPS)) / 10000;
        uint256 brokerFee = (amount * BROKER_FEE_BPS) / 10000;
        uint256 protocolFee = (amount * PROTOCOL_FEE_BPS) / 10000;
        uint256 totalAmount = amount + totalFee;

        // Transfer USDC from sender
        require(
            usdcToken.transferFrom(msg.sender, address(this), totalAmount),
            "Transfer failed"
        );

        // Generate unique escrow ID
        escrowId = keccak256(
            abi.encodePacked(
                msg.sender,
                recipient,
                broker,
                amount,
                block.timestamp,
                block.number
            )
        );

        // Create escrow
        escrows[escrowId] = Escrow({
            sender: msg.sender,
            recipient: recipient,
            broker: broker,
            amount: amount,
            brokerFee: brokerFee,
            protocolFee: protocolFee,
            state: EscrowState.BROKER_ASSIGNED,
            deliveryHash: deliveryHash,
            proofHash: bytes32(0),
            createdAt: block.timestamp,
            timeoutAt: block.timestamp + timeoutPeriod
        });

        emit EscrowCreated(
            escrowId,
            msg.sender,
            recipient,
            broker,
            amount,
            block.timestamp + timeoutPeriod
        );

        return escrowId;
    }

    // Broker confirms delivery with proof
    function confirmDelivery(
        bytes32 escrowId,
        bytes32 proofHash
    ) external whenNotPaused nonReentrant {
        Escrow storage escrow = escrows[escrowId];

        require(
            escrow.state == EscrowState.BROKER_ASSIGNED,
            "Invalid state"
        );
        require(msg.sender == escrow.broker, "Not authorized");
        require(block.timestamp < escrow.timeoutAt, "Escrow expired");
        require(proofHash != bytes32(0), "Invalid proof");

        escrow.state = EscrowState.DELIVERY_CONFIRMED;
        escrow.proofHash = proofHash;

        emit DeliveryConfirmed(escrowId, msg.sender, proofHash);

        // Update broker reputation (delivery confirmed)
        reputationEngine.recordDelivery(escrow.broker, escrow.amount);
    }

    // Recipient confirms receipt
    function confirmReceipt(bytes32 escrowId)
        external
        whenNotPaused
        nonReentrant
    {
        Escrow storage escrow = escrows[escrowId];

        require(
            escrow.state == EscrowState.DELIVERY_CONFIRMED,
            "Invalid state"
        );
        require(msg.sender == escrow.recipient, "Not authorized");

        escrow.state = EscrowState.RECIPIENT_CONFIRMED;

        emit ReceiptConfirmed(escrowId, msg.sender);

        // Release funds
        _releaseEscrow(escrowId);
    }

    // Internal function to release escrow funds
    function _releaseEscrow(bytes32 escrowId) internal {
        Escrow storage escrow = escrows[escrowId];

        require(
            escrow.state == EscrowState.RECIPIENT_CONFIRMED,
            "Invalid state"
        );

        escrow.state = EscrowState.RELEASED;

        // Transfer to broker
        require(
            usdcToken.transfer(
                escrow.broker,
                escrow.amount + escrow.brokerFee
            ),
            "Broker transfer failed"
        );

        // Transfer protocol fee to treasury
        require(
            usdcToken.transfer(treasuryAddress, escrow.protocolFee),
            "Protocol fee transfer failed"
        );

        emit EscrowReleased(
            escrowId,
            escrow.broker,
            escrow.amount,
            escrow.brokerFee
        );

        // Update reputation (successful transaction)
        reputationEngine.recordSuccess(
            escrow.broker,
            escrow.amount,
            block.timestamp - escrow.createdAt
        );
    }

    // Raise dispute
    function disputeEscrow(
        bytes32 escrowId,
        string calldata reason
    ) external whenNotPaused {
        Escrow storage escrow = escrows[escrowId];

        require(
            escrow.state == EscrowState.DELIVERY_CONFIRMED ||
            escrow.state == EscrowState.RECIPIENT_CONFIRMED,
            "Invalid state"
        );
        require(
            msg.sender == escrow.sender || msg.sender == escrow.recipient,
            "Not authorized"
        );

        escrow.state = EscrowState.DISPUTED;

        emit DisputeRaised(escrowId, msg.sender, reason);

        // Record dispute in reputation
        reputationEngine.recordDispute(escrow.broker, escrow.amount);
    }

    // Claim refund after timeout
    function claimTimeout(bytes32 escrowId)
        external
        whenNotPaused
        nonReentrant
    {
        Escrow storage escrow = escrows[escrowId];

        require(
            escrow.state == EscrowState.BROKER_ASSIGNED ||
            escrow.state == EscrowState.DELIVERY_CONFIRMED,
            "Invalid state"
        );
        require(msg.sender == escrow.sender, "Not authorized");
        require(block.timestamp >= escrow.timeoutAt, "Not expired");

        escrow.state = EscrowState.EXPIRED;

        // Refund sender (including fees)
        uint256 refundAmount = escrow.amount +
                               escrow.brokerFee +
                               escrow.protocolFee;

        require(
            usdcToken.transfer(escrow.sender, refundAmount),
            "Refund failed"
        );

        emit EscrowRefunded(escrowId, escrow.sender, refundAmount);

        // Penalize broker reputation for timeout
        reputationEngine.recordTimeout(escrow.broker, escrow.amount);
    }

    // View function
    function getEscrow(bytes32 escrowId)
        external
        view
        returns (Escrow memory)
    {
        return escrows[escrowId];
    }

    // Admin functions
    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function updateTreasury(address newTreasury) external onlyOwner {
        require(newTreasury != address(0), "Invalid address");
        treasuryAddress = newTreasury;
    }

    // Emergency withdrawal (only for stuck funds)
    function emergencyWithdraw(
        address token,
        address to,
        uint256 amount
    ) external onlyOwner {
        require(to != address(0), "Invalid address");
        IERC20(token).transfer(to, amount);
    }
}
```

---

## BrokerRegistry.sol

### Interface

```solidity
interface IBrokerRegistry {
    struct Broker {
        address brokerAddress;
        string name;
        string region;
        uint256 stakeAmount;
        uint256 joinedAt;
        bool isActive;
        bytes32[] specializations;
    }

    function registerBroker(
        string calldata name,
        string calldata region,
        bytes32[] calldata specializations
    ) external payable;

    function stakeFunds() external payable;
    function withdrawStake(uint256 amount) external;
    function deactivateBroker() external;
    function isActiveBroker(address broker) external view returns (bool);
    function getBroker(address broker) external view returns (Broker memory);
}
```

### Key Implementation Details

```solidity
contract BrokerRegistry is OwnableUpgradeable, PausableUpgradeable {
    uint256 public constant MIN_STAKE = 500 * 10**6; // 500 USDC
    uint256 public constant STAKE_LOCK_PERIOD = 30 days;

    mapping(address => Broker) public brokers;
    mapping(address => uint256) public stakeLockedUntil;

    function registerBroker(
        string calldata name,
        string calldata region,
        bytes32[] calldata specializations
    ) external payable whenNotPaused {
        require(brokers[msg.sender].brokerAddress == address(0), "Already registered");
        require(msg.value >= MIN_STAKE, "Insufficient stake");

        brokers[msg.sender] = Broker({
            brokerAddress: msg.sender,
            name: name,
            region: region,
            stakeAmount: msg.value,
            joinedAt: block.timestamp,
            isActive: true,
            specializations: specializations
        });

        stakeLockedUntil[msg.sender] = block.timestamp + STAKE_LOCK_PERIOD;

        emit BrokerRegistered(msg.sender, name, region);
    }

    // Additional functions for stake management...
}
```

---

## ReputationEngine.sol

### Reputation Calculation Algorithm

```solidity
contract ReputationEngine {
    struct ReputationScore {
        uint256 totalTransactions;
        uint256 successfulTransactions;
        uint256 totalVolume;
        uint256 disputesRaised;
        uint256 disputesWon;
        uint256 timeoutsCount;
        uint256 totalResponseTime; // cumulative
        uint256 lastUpdated;
    }

    mapping(address => ReputationScore) public scores;

    function calculateScore(address broker)
        public
        view
        returns (uint256)
    {
        ReputationScore memory score = scores[broker];

        if (score.totalTransactions == 0) return 0;

        // Success rate component (40%)
        uint256 successRate = (score.successfulTransactions * 10000) /
                             score.totalTransactions;
        uint256 successComponent = (successRate * 40) / 100;

        // Volume component (30%)
        uint256 volumeWeight = _calculateVolumeWeight(score.totalVolume);
        uint256 volumeComponent = (volumeWeight * 30) / 100;

        // Response time component (20%)
        uint256 avgResponseTime = score.totalResponseTime /
                                 score.totalTransactions;
        uint256 responseWeight = _calculateResponseWeight(avgResponseTime);
        uint256 responseComponent = (responseWeight * 20) / 100;

        // Longevity component (10%)
        uint256 daysSinceJoined = (block.timestamp - score.lastUpdated) / 1 days;
        uint256 longevityWeight = daysSinceJoined > 365 ? 10000 :
                                 (daysSinceJoined * 10000) / 365;
        uint256 longevityComponent = (longevityWeight * 10) / 100;

        // Dispute penalty
        uint256 disputePenalty = _calculateDisputePenalty(
            score.disputesRaised,
            score.disputesWon,
            score.totalTransactions
        );

        uint256 finalScore = (successComponent +
                             volumeComponent +
                             responseComponent +
                             longevityComponent) * disputePenalty / 10000;

        return finalScore;
    }

    // Helper functions for weight calculations...
}
```

---

## Gas Optimization Strategies

### 1. Storage Packing

```solidity
// Bad (uses 3 storage slots)
struct Escrow {
    address sender;      // slot 0
    uint256 amount;      // slot 1
    bool isActive;       // slot 2
}

// Good (uses 2 storage slots)
struct Escrow {
    address sender;      // slot 0 (20 bytes)
    uint96 amount;       // slot 0 (12 bytes) - packed with sender
    bool isActive;       // slot 0 (1 byte) - packed
    uint256 timestamp;   // slot 1
}
```

### 2. Batch Operations

```solidity
function batchConfirmDelivery(
    bytes32[] calldata escrowIds,
    bytes32[] calldata proofHashes
) external {
    require(escrowIds.length == proofHashes.length, "Length mismatch");

    for (uint256 i = 0; i < escrowIds.length; i++) {
        _confirmDelivery(escrowIds[i], proofHashes[i]);
    }
}
```

### 3. Use Calldata Instead of Memory

```solidity
// Expensive
function processData(string memory data) external {
    // ...
}

// Cheaper
function processData(string calldata data) external {
    // ...
}
```

---

## Security Considerations

### 1. Reentrancy Protection

All external calls use OpenZeppelin's `nonReentrant` modifier and follow checks-effects-interactions pattern.

### 2. Access Control

```solidity
modifier onlyBroker(bytes32 escrowId) {
    require(escrows[escrowId].broker == msg.sender, "Not authorized");
    _;
}

modifier onlyRecipient(bytes32 escrowId) {
    require(escrows[escrowId].recipient == msg.sender, "Not authorized");
    _;
}
```

### 3. Integer Overflow Protection

Solidity 0.8+ has built-in overflow protection. For gas savings in trusted contexts, use `unchecked`:

```solidity
unchecked {
    counter++; // Safe if we know it won't overflow
}
```

### 4. Emergency Pause

All critical functions use `whenNotPaused` modifier for emergency stops.

---

## Testing Strategy

### Unit Tests (Foundry)

```solidity
// test/CyrusEscrow.t.sol
contract CyrusEscrowTest is Test {
    CyrusEscrow escrow;
    MockUSDC usdc;

    function setUp() public {
        usdc = new MockUSDC();
        escrow = new CyrusEscrow();
        escrow.initialize(address(usdc), ...);
    }

    function testCreateEscrow() public {
        uint256 amount = 500 * 10**6;
        bytes32 escrowId = escrow.createEscrow(
            recipient,
            broker,
            amount,
            deliveryHash,
            1 days
        );

        assertEq(uint(escrow.getEscrow(escrowId).state), uint(EscrowState.BROKER_ASSIGNED));
    }

    function testCannotConfirmDeliveryUnauthorized() public {
        vm.expectRevert("Not authorized");
        vm.prank(attacker);
        escrow.confirmDelivery(escrowId, proofHash);
    }
}
```

### Integration Tests

Test full transaction lifecycle across multiple contracts.

### Gas Benchmarks

Target gas costs:
- Create escrow: ~150,000 gas
- Confirm delivery: ~80,000 gas
- Release funds: ~100,000 gas

---

## Audit Checklist

- [ ] Reentrancy vulnerabilities
- [ ] Access control on all functions
- [ ] Integer overflow/underflow
- [ ] Front-running attacks
- [ ] DoS vectors
- [ ] Upgrade mechanism security
- [ ] Emergency procedures
- [ ] Gas optimization review
- [ ] Event emission completeness

---

## Deployment Checklist

- [ ] All tests passing (unit + integration)
- [ ] Gas benchmarks within targets
- [ ] Security audit completed
- [ ] Multisig setup for admin functions
- [ ] Timelock configured for upgrades
- [ ] Testnet deployment verified
- [ ] Bug bounty program launched
- [ ] Documentation complete
- [ ] Deployment scripts tested
- [ ] Mainnet deployment

---

*For architecture overview, see [architecture.md](./architecture.md)*

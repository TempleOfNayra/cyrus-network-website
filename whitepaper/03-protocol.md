# Chapter 3: Protocol Architecture

## Executive Summary

This chapter provides a technical deep-dive into the Cyrus Protocol architecture, covering smart contract design, broker network mechanics, reputation systems, security models, and cross-chain infrastructure.

---

## 3.1 System Architecture Overview

### High-Level Components

```
┌─────────────────────────────────────────────────────┐
│           APPLICATION LAYER                         │
│  (Cyrus App, Third-party Apps, Enterprise Tools)   │
└─────────────────────────────────────────────────────┘
                        ↕
┌─────────────────────────────────────────────────────┐
│              API & SDK LAYER                        │
│    (REST API, GraphQL, JavaScript SDK, Python)     │
└─────────────────────────────────────────────────────┘
                        ↕
┌─────────────────────────────────────────────────────┐
│           PROTOCOL CORE LAYER                       │
│  • Escrow Engine      • Reputation System          │
│  • Broker Registry    • Dispute Resolution         │
│  • Matching Engine    • Verification Logic         │
└─────────────────────────────────────────────────────┘
                        ↕
┌─────────────────────────────────────────────────────┐
│          BLOCKCHAIN LAYER                           │
│  • Smart Contracts (Polygon/Arbitrum/Base)         │
│  • USDC Settlement                                  │
│  • On-chain Reputation                              │
└─────────────────────────────────────────────────────┘
                        ↕
┌─────────────────────────────────────────────────────┐
│            BROKER NETWORK                           │
│  (Independent Agents Providing Real-World Bridge)  │
└─────────────────────────────────────────────────────┘
```

---

## 3.2 Smart Contract Architecture

### Core Contracts

#### CyrusEscrow.sol
Manages escrow lifecycle for all transactions.

**Key functions:**
```solidity
function createEscrow(
    address recipient,
    address broker,
    uint256 amount,
    bytes32 deliveryHash,
    uint256 timeoutPeriod
) external returns (bytes32 escrowId);

function confirmDelivery(
    bytes32 escrowId,
    bytes calldata proof
) external onlyBroker;

function confirmReceipt(
    bytes32 escrowId
) external onlyRecipient;

function disputeEscrow(
    bytes32 escrowId,
    string calldata reason
) external;

function releaseEscrow(
    bytes32 escrowId
) internal;
```

**State machine:**
```
CREATED → BROKER_CONFIRMED → RECIPIENT_CONFIRMED → RELEASED
    ↓            ↓                   ↓
  EXPIRED    DISPUTED            DISPUTED
    ↓            ↓                   ↓
REFUNDED    ARBITRATION         ARBITRATION
```

#### BrokerRegistry.sol
Manages broker registration, staking, and permissions.

```solidity
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
```

#### ReputationEngine.sol
Tracks and calculates broker reputation scores.

```solidity
struct ReputationScore {
    uint256 totalTransactions;
    uint256 totalVolume;
    uint256 successfulTransactions;
    uint256 disputesAgainst;
    uint256 disputesWon;
    uint256 averageResponseTime;
    uint256 lastUpdated;
}

function updateReputation(
    address broker,
    bool successful,
    uint256 responseTime,
    uint256 volume
) internal;

function getReputationScore(
    address broker
) external view returns (uint256);
```

**Reputation calculation:**
```
Score = (
    SuccessRate × 40% +
    VolumeWeight × 30% +
    ResponseWeight × 20% +
    LongevityWeight × 10%
) × DisputePenalty

Where:
- SuccessRate = successful / total (max penalty if <95%)
- VolumeWeight = log(totalVolume) / log(maxVolume)
- ResponseWeight = 1 - (avgResponseTime / maxAcceptableTime)
- LongevityWeight = min(1, daysSinceJoined / 365)
- DisputePenalty = max(0.5, 1 - (disputesLost / total × 10))
```

---

## 3.3 Broker Network Mechanics

### Broker Types

**1. Liquidity Brokers (Remittances)**
- Hold local currency reserves
- Provide instant cash delivery
- Earn fees on forex spread + service fee

**2. Verification Brokers (Supply Chain)**
- Inspect goods/quality at source
- No liquidity needed
- Earn flat fee per verification

**3. Hybrid Brokers (Marketplaces)**
- Verify shipping + provide insurance
- May hold goods temporarily
- Earn percentage of transaction value

**4. Specialized Brokers (Energy/Carbon)**
- Licensed auditors/inspectors
- Technical expertise required
- Higher fees for specialized work

### Broker Onboarding

**Registration flow:**
```
1. Submit application (name, location, specialization)
2. KYC verification (via third-party, jurisdiction-dependent)
3. Stake minimum collateral (e.g., $500 USDC)
4. Training certification (online modules)
5. Shadow period (observe 10 transactions)
6. Activation (can accept orders)
```

**Reputation building:**
- Start with limited transaction size (<$500)
- Graduation thresholds unlock higher limits:
  - 10 successful → $2,000 limit
  - 50 successful → $10,000 limit
  - 100 successful → $50,000 limit
  - 500 successful → Unlimited

### Broker Matching Algorithm

**Factors considered:**
```javascript
function matchBroker(order) {
  const candidates = getBrokersInRegion(order.deliveryLocation);

  return candidates
    .filter(b => b.isActive && b.stakeAmount >= order.amount * 0.1)
    .filter(b => b.specializations.includes(order.type))
    .filter(b => b.maxTransactionSize >= order.amount)
    .sort((a, b) => {
      const scoreA = calculateMatchScore(a, order);
      const scoreB = calculateMatchScore(b, order);
      return scoreB - scoreA;
    })[0];
}

function calculateMatchScore(broker, order) {
  return (
    broker.reputationScore * 0.4 +
    (1 / broker.averageResponseTime) * 0.3 +
    (broker.proximityToDelivery / maxDistance) * 0.2 +
    (broker.availableLiquidity / order.amount) * 0.1
  );
}
```

---

## 3.4 Transaction Flow Deep-Dive

### Standard Remittance Flow

**Step 1: Escrow Creation**
```
User (Maria):
- Opens Cyrus app
- Inputs: recipient address, amount ($500)
- Approves USDC transfer
- Transaction sent to CyrusEscrow contract

On-chain:
- Contract locks 500 USDC
- Emits EscrowCreated event
- Assigns best-matched broker
- Starts timeout clock (24 hours)

Off-chain:
- Notification sent to broker
- Notification sent to recipient
- Order indexed in database
```

**Step 2: Broker Acceptance**
```
Broker:
- Receives push notification
- Reviews order details
- Checks liquidity availability
- Clicks "Accept"

On-chain:
- Broker address recorded
- State changes to BROKER_ASSIGNED

Off-chain:
- User notified: "Broker en route"
- Estimated delivery time shown
```

**Step 3: Delivery & Verification**
```
Broker:
- Travels to recipient location
- Verifies recipient identity (phone + code)
- Hands over cash (27,000 PHP)
- Takes photo proof + signature

Submits to smart contract:
- deliveryProof: IPFS hash of photos
- recipientSignature: signed receipt
- GPS coordinates: verified location
- timestamp: delivery completion time

On-chain:
- Proof stored as hash
- State changes to DELIVERY_CONFIRMED
- Reputation system notified
```

**Step 4: Recipient Confirmation**
```
Recipient (Maria's family):
- Receives SMS: "Confirm delivery?"
- Clicks link or enters code
- Confirms receipt

On-chain:
- State changes to RECIPIENT_CONFIRMED
- Escrow release triggered
- 500 USDC sent to broker
- 4 USDC fee to broker
- 1 USDC to protocol
- Reputation scores updated

Off-chain:
- Success notifications sent
- Transaction record finalized
- Analytics updated
```

**Step 5: Settlement**
```
Broker:
- Receives 504 USDC in wallet
- Options:
  a) Sell to local exchange for PHP
  b) Hold for next delivery order
  c) Use for personal expenses

Protocol:
- 1 USDC accumulated in treasury
- Monthly: distribute to token holders (future)
- Or: reinvest in network growth
```

---

## 3.5 Security Architecture

### Threat Model

**1. User Fraud Attempts**
- *Attack:* User creates escrow, claims non-delivery falsely
- *Defense:* Broker proof (photos, GPS, signature), reputation system flags serial disputers

**2. Broker Fraud Attempts**
- *Attack:* Broker confirms delivery without actually delivering
- *Defense:* Recipient must confirm, staked collateral at risk, reputation destruction

**3. Collusion Attacks**
- *Attack:* User + broker collude to fake transactions, boost reputation
- *Defense:* ML fraud detection, geographic verification, volume limits for new brokers

**4. Smart Contract Exploits**
- *Attack:* Reentrancy, overflow, access control bugs
- *Defense:* OpenZeppelin libraries, multiple audits, bug bounties, upgrade mechanism

**5. Sybil Attacks**
- *Attack:* One entity creates many broker accounts
- *Defense:* KYC requirement, stake requirement, behavior analysis

### Multi-Layer Defense

**Layer 1: Smart Contract**
- Audited by Trail of Bits, Quantstamp
- OpenZeppelin security libraries
- Upgrade proxy for critical fixes
- Time-locks on admin functions

**Layer 2: Economic**
- Broker staking (lose stake on fraud)
- Reputation destruction (future earnings loss)
- Insurance pool for guaranteed refunds

**Layer 3: Operational**
- KYC/AML for brokers (jurisdiction-dependent)
- Fraud detection ML models
- Manual review for high-value transactions

**Layer 4: Social**
- Public on-chain reputation
- Community reporting mechanisms
- Broker associations/guilds

---

## 3.6 Dispute Resolution

### Protocol-Level Approach

**Core principle:** Cyrus Network protocol facilitates resolution but doesn't arbitrate disputes between parties.

**Automated Timeouts:**
```
If timeout occurs without confirmation:
- >24 hours: Funds can be returned to sender
- Broker's reputation penalized for non-delivery
- No manual arbitration required
```

**Conflicting Claims:**
```
If both parties dispute:
- Transaction data (proofs, timestamps, GPS) visible on-chain
- Parties negotiate resolution off-platform
- Broker reputation impacted by dispute rate
- High-dispute brokers naturally filtered out by users
```

**Why this model:**
- No centralized arbitration = regulatory simplicity
- Market-based quality control via reputation
- Parties free to pursue legal recourse if needed
- Lower operational costs

***Note:** Complex arbitration mechanisms (multi-tier, DAO governance) may be added by applications built on the protocol, but are not part of core infrastructure.*

### Dispute Prevention (Target)

| Metric | Target | Current Industry |
|--------|--------|------------------|
| Dispute rate | <2% | 5-8% |
| Resolution time | <72 hours | 2-4 weeks |
| Fair resolution | >90% satisfaction | ~60% |
| Cost per dispute | <$5 | $50-200 |

---

## 3.7 Cross-Chain Architecture

### Multi-Chain Strategy

**Why multi-chain?**
- Different regions prefer different chains
- Risk mitigation (no single point of failure)
- Liquidity fragmentation avoidance
- Future-proofing

**Deployment targets:**
```
Primary:   Polygon (low fees, global adoption)
Secondary: Arbitrum (Ethereum security, growing ecosystem)
Tertiary:  Base (Coinbase integration, US market)
Future:    Optimism, Avalanche, zkSync Era
```

### Bridge Architecture

**Option A: Native Multi-Chain (Preferred)**
Deploy same contracts on each chain independently.

**Pros:**
- No bridge risk
- Fast (no cross-chain messages)
- Simpler architecture

**Cons:**
- Reputation fragmented across chains
- Brokers need liquidity on each chain

**Option B: Cross-Chain Messaging (LayerZero)**
Single source of truth on one chain, messages to others.

**Pros:**
- Unified reputation
- Single liquidity pool

**Cons:**
- Bridge risk
- Message delays (2-10 minutes)
- Extra costs

**Chosen approach:** Hybrid
- Core protocol native on each chain
- Reputation synced via LayerZero (hourly)
- Brokers can operate on any chain

---

## 3.8 Data Architecture

### On-Chain Data

**What goes on-chain:**
```solidity
- Escrow state (amount, parties, status)
- Reputation scores (aggregated)
- Broker registry (address, stake, active status)
- Proof hashes (IPFS CIDs)
- Dispute outcomes
- Fee distributions
```

**Gas optimization:**
- Bitmap flags instead of booleans
- Packed structs (uint96 instead of uint256)
- Batch operations where possible
- Off-chain signatures for confirmations

### Off-Chain Data (IPFS + Database)

**IPFS storage:**
```
- Delivery photos
- Signed receipts
- Verification documents
- Dispute evidence
- Broker certifications
```

**PostgreSQL database:**
```
Users:        profiles, contact info, preferences
Brokers:      detailed profiles, availability, regions
Transactions: full history, off-chain metadata
Analytics:    volume, trends, cohorts
```

**The Graph indexing:**
```
- Fast queries on on-chain data
- Real-time event processing
- GraphQL API for apps
- Historical data aggregation
```

---

## 3.9 API & SDK Design

### REST API

**Core endpoints:**
```
POST   /escrow/create
GET    /escrow/{id}
POST   /escrow/{id}/confirm-delivery
POST   /escrow/{id}/confirm-receipt
POST   /escrow/{id}/dispute

GET    /brokers
GET    /brokers/{id}
POST   /brokers/register

GET    /reputation/{address}
```

### JavaScript SDK

**Example usage:**
```javascript
import { CyrusClient } from '@cyrus/sdk';

const cyrus = new CyrusClient({
  network: 'polygon',
  apiKey: process.env.CYRUS_API_KEY
});

// Create escrow
const escrow = await cyrus.createEscrow({
  recipient: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  amount: 500,
  deliveryDetails: {
    address: '123 Main St, Manila',
    phoneHash: hash('+639171234567')
  }
});

// Listen for events
escrow.on('brokerAssigned', (broker) => {
  console.log(`Broker ${broker.name} assigned`);
});

escrow.on('delivered', (proof) => {
  console.log('Delivery confirmed:', proof.ipfsHash);
});

escrow.on('completed', (tx) => {
  console.log('Transaction complete:', tx.hash);
});
```

### Python SDK (for Enterprise)

```python
from cyrus import CyrusClient

client = CyrusClient(
    network='polygon',
    private_key=os.getenv('PRIVATE_KEY')
)

# Batch escrow creation (supply chain)
escrows = client.batch_create_escrow([
    {'recipient': farmer1, 'amount': 5000},
    {'recipient': farmer2, 'amount': 3000},
    {'recipient': farmer3, 'amount': 4500},
])

# Monitor status
for escrow in escrows:
    print(f"Escrow {escrow.id}: {escrow.status}")
```

---

## 3.10 Performance & Scalability

### Current Capacity

**Polygon stats:**
- TPS: ~7,000 theoretical
- Block time: ~2 seconds
- Gas cost: $0.01-0.10 per transaction

**Cyrus capacity (conservative):**
- 100 transactions per block
- 30 blocks per minute
- **180,000 transactions per hour**
- **4.3M transactions per day**

**Realistic early-stage load:**
- Year 1: 100K transactions/month (0.08% capacity)
- Year 3: 10M transactions/month (7.7% capacity)
- Year 5: 100M transactions/month (77% capacity)

### Scaling Strategy

**Layer 1: Application optimization**
- Batch confirmations (10 at once)
- Off-chain signatures where possible
- Caching and CDN for static data

**Layer 2: Database sharding**
- Geographic sharding (Asia, Europe, Americas)
- Read replicas for analytics
- Time-series optimization

**Layer 3: Multi-chain expansion**
- Split traffic across 3-5 chains
- Each chain handles 1-2M tx/day
- Combined capacity: 5-10M tx/day

**Layer 4: Emerging tech**
- zkRollups for even lower costs
- Account abstraction for better UX
- Modular blockchain stacks

---

## 3.11 Compliance & Privacy

### Regulatory Approach

**Protocol level:**
- Non-custodial (Cyrus Network never holds user funds; smart contracts manage escrow)
- No fiat transactions (USDC only)
- Public blockchain (full transparency)
- No jurisdiction (deployed permissionlessly)

**Broker level:**
- KYC/AML as required in their jurisdiction
- Licensed where necessary (e.g., money transmitter in some US states)
- Local tax compliance
- Reporting to local authorities

**Application level:**
- Cyrus App implements KYC for users (where needed)
- Geofencing (block sanctioned countries)
- Transaction monitoring (via Chainalysis)
- SAR filing (if needed)

### Privacy Design

**What's public:**
- Transaction amounts
- Wallet addresses
- Broker addresses
- Reputation scores
- Proof hashes

**What's private:**
- User names/identities
- Delivery addresses (hashed)
- Phone numbers (hashed)
- Actual photos/documents (IPFS, encrypted)

**Privacy options:**
- Users can use fresh wallets per transaction
- Broker identity revealed only after match
- Delivery details encrypted until confirmed

---

## Conclusion

The Cyrus Protocol architecture balances three critical factors:

1. **Decentralization** - Smart contracts, public reputation, permissionless
2. **Pragmatism** - Human brokers, off-chain data, regulatory compliance
3. **Scalability** - Multi-chain, efficient data structures, modern infrastructure

By combining blockchain automation with human verification networks, we create infrastructure that actually works for real-world value exchange—not just crypto-to-crypto, but bridging digital and physical worlds.

The protocol is designed to be:
- **Extensible** - New use cases without core changes
- **Composable** - Other apps can build on top
- **Resilient** - No single point of failure
- **Sustainable** - Economic incentives align all parties

---

*Next: [Chapter 4: Use Cases & Market Strategy →](./04-use-cases.md)*

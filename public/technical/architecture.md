# Cyrus Network - Technical Architecture

## Overview

Cyrus Network implements an Abstracted Value Transfer Protocol (AVTP) that enables peer-to-peer value exchange without defining what "value" means. This document provides technical specifications for developers, auditors, and technical stakeholders.

---

## System Architecture

### High-Level Component Diagram

```
┌─────────────────────────────────────────────────────────┐
│                  APPLICATION LAYER                       │
│  - Cyrus App (Web/Mobile)                               │
│  - Third-party Integrations (eBay, Etsy, Enterprise)   │
│  - Broker Dashboard                                      │
└─────────────────────────────────────────────────────────┘
                          ↕ REST/GraphQL API
┌─────────────────────────────────────────────────────────┐
│                   API GATEWAY LAYER                      │
│  - Authentication (JWT)                                  │
│  - Rate Limiting                                         │
│  - Request Validation                                    │
└─────────────────────────────────────────────────────────┘
                          ↕
┌─────────────────────────────────────────────────────────┐
│                  BUSINESS LOGIC LAYER                    │
│  - Broker Matching Engine                               │
│  - Notification Service                                  │
│  - Analytics Engine                                      │
│  - Fraud Detection (ML)                                  │
└─────────────────────────────────────────────────────────┘
                          ↕
┌─────────────────────────────────────────────────────────┐
│                  BLOCKCHAIN LAYER                        │
│  Smart Contracts (Solidity):                            │
│  - CyrusEscrow.sol                                      │
│  - BrokerRegistry.sol                                   │
│  - ReputationEngine.sol                                 │
│  - DisputeResolution.sol                                │
│  Networks: Polygon, Arbitrum, Base                      │
└─────────────────────────────────────────────────────────┘
                          ↕
┌─────────────────────────────────────────────────────────┐
│                   DATA LAYER                             │
│  On-chain:  Transaction state, reputation scores        │
│  Off-chain: PostgreSQL (user data, broker profiles)     │
│  IPFS:      Verification proofs, documents              │
│  The Graph: Indexed blockchain data                     │
└─────────────────────────────────────────────────────────┘
```

---

## Smart Contract Architecture

### Contract Hierarchy

```
CyrusCore (Abstract Base)
├── CyrusEscrow (Main escrow logic)
├── BrokerRegistry (Broker management)
├── ReputationEngine (Trust scores)
└── DisputeResolution (Arbitration)
```

### Core State Machines

**Escrow State Flow:**
```
CREATED → BROKER_ASSIGNED → DELIVERY_CONFIRMED
    ↓           ↓                   ↓
EXPIRED    DISPUTED            RECIPIENT_CONFIRMED → RELEASED
    ↓           ↓                   ↓
REFUNDED   ARBITRATION         DISPUTED → ARBITRATION
```

---

## Technology Stack

### Blockchain Infrastructure
- **Primary Chain:** Polygon PoS
- **Secondary:** Arbitrum, Base
- **Settlement Token:** USDC (native)
- **Development Framework:** Hardhat
- **Testing:** Foundry, Waffle
- **Auditing:** Trail of Bits, OpenZeppelin

### Backend Services
- **Runtime:** Node.js 20+
- **Framework:** NestJS (TypeScript)
- **API:** GraphQL (Apollo Server) + REST
- **Database:** PostgreSQL 15
- **Caching:** Redis
- **Queue:** BullMQ
- **Storage:** IPFS (Pinata)

### Frontend
- **Web App:** Next.js 14 (React)
- **Mobile:** React Native
- **State Management:** Zustand
- **Web3:** Wagmi, Viem
- **UI Components:** Tailwind CSS + Shadcn

### Infrastructure
- **Cloud:** AWS (primary), Vercel (frontend)
- **CDN:** CloudFlare
- **Monitoring:** DataDog
- **Indexing:** The Graph Protocol
- **Analytics:** Mixpanel

---

## Security Architecture

### Multi-Layer Defense

**Layer 1: Smart Contract Security**
- OpenZeppelin Upgradeable contracts
- Reentrancy guards on all external calls
- Access control (RBAC)
- Emergency pause mechanism
- Time-locks on critical functions

**Layer 2: Economic Security**
- Broker staking requirements
- Reputation-based limits
- Insurance pools for high-value transactions
- Slashing conditions for fraud

**Layer 3: Application Security**
- JWT authentication with refresh tokens
- Rate limiting (per IP, per user)
- Input validation and sanitization
- SQL injection prevention (parameterized queries)
- XSS protection (CSP headers)

**Layer 4: Operational Security**
- Multi-sig for contract upgrades (3-of-5)
- Bug bounty program ($100K+ rewards)
- Incident response playbook
- Regular penetration testing

---

## Performance & Scalability

### Current Capacity
- **Transactions per second:** 100+ (Polygon)
- **Block time:** ~2 seconds
- **Gas cost per transaction:** $0.01-0.10
- **API throughput:** 10,000 req/sec

### Scaling Strategy
1. **Horizontal scaling:** Add more API servers
2. **Database sharding:** Geographic distribution
3. **Multi-chain deployment:** Spread load
4. **Read replicas:** Analytics queries
5. **CDN caching:** Static content

### Monitoring Metrics
- Transaction success rate (target: >98%)
- Average confirmation time (target: <30 seconds)
- API latency p95 (target: <200ms)
- Broker response time (target: <15 minutes)

---

## Data Architecture

### On-Chain Data
```solidity
struct Escrow {
    address sender;
    address recipient;
    address broker;
    uint256 amount;
    EscrowState state;
    bytes32 deliveryHash;
    uint256 createdAt;
    uint256 timeoutAt;
}

struct BrokerProfile {
    address brokerAddress;
    uint256 stakeAmount;
    uint256 totalTransactions;
    uint256 totalVolume;
    uint256 reputationScore;
    bool isActive;
}
```

### Off-Chain Data (PostgreSQL)
```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY,
    wallet_address VARCHAR(42) UNIQUE,
    email VARCHAR(255),
    phone_hash VARCHAR(64),
    created_at TIMESTAMP
);

-- Brokers table
CREATE TABLE brokers (
    id UUID PRIMARY KEY,
    wallet_address VARCHAR(42) UNIQUE,
    name VARCHAR(255),
    region VARCHAR(100),
    specializations JSONB,
    kyc_status VARCHAR(20),
    created_at TIMESTAMP
);

-- Transactions table
CREATE TABLE transactions (
    id UUID PRIMARY KEY,
    escrow_id VARCHAR(66) UNIQUE,
    sender_id UUID REFERENCES users(id),
    recipient_id UUID,
    broker_id UUID REFERENCES brokers(id),
    amount DECIMAL(20,6),
    state VARCHAR(20),
    created_at TIMESTAMP,
    completed_at TIMESTAMP
);
```

---

## API Architecture

### REST Endpoints

**Escrow Management:**
```
POST   /api/v1/escrow/create
GET    /api/v1/escrow/:id
POST   /api/v1/escrow/:id/confirm-delivery
POST   /api/v1/escrow/:id/confirm-receipt
POST   /api/v1/escrow/:id/dispute
GET    /api/v1/escrow/user/:address
```

**Broker Management:**
```
POST   /api/v1/brokers/register
GET    /api/v1/brokers/:id
GET    /api/v1/brokers/search?region=Lagos&specialization=remittance
PATCH  /api/v1/brokers/:id/status
GET    /api/v1/brokers/:id/transactions
```

**Reputation:**
```
GET    /api/v1/reputation/:address
GET    /api/v1/reputation/:address/history
```

### GraphQL Schema

```graphql
type Escrow {
  id: ID!
  sender: Address!
  recipient: Address!
  broker: Broker!
  amount: Float!
  state: EscrowState!
  createdAt: DateTime!
  deliveryProof: IPFSHash
}

type Broker {
  id: ID!
  address: Address!
  name: String!
  region: String!
  reputationScore: Float!
  totalTransactions: Int!
  successRate: Float!
  specializations: [String!]!
}

type Query {
  escrow(id: ID!): Escrow
  broker(address: Address!): Broker
  searchBrokers(region: String, specialization: String): [Broker!]!
}

type Mutation {
  createEscrow(input: CreateEscrowInput!): Escrow!
  confirmDelivery(escrowId: ID!, proof: String!): Boolean!
}
```

---

## Integration Guides

### Web3 Wallet Integration

```javascript
import { createPublicClient, createWalletClient } from 'viem';
import { polygon } from 'viem/chains';
import { CyrusEscrowABI } from './abis';

// Initialize client
const publicClient = createPublicClient({
  chain: polygon,
  transport: http()
});

// Create escrow
async function createEscrow(recipient, amount, broker) {
  const { request } = await publicClient.simulateContract({
    address: CYRUS_ESCROW_ADDRESS,
    abi: CyrusEscrowABI,
    functionName: 'createEscrow',
    args: [recipient, broker, amount, deliveryHash, timeoutPeriod]
  });

  return walletClient.writeContract(request);
}
```

### SDK Usage (JavaScript)

```javascript
import { CyrusClient } from '@cyrus/sdk';

const cyrus = new CyrusClient({
  network: 'polygon',
  apiKey: process.env.CYRUS_API_KEY
});

// Create escrow with automatic broker matching
const escrow = await cyrus.createEscrow({
  recipient: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  amount: 500,
  deliveryDetails: {
    address: '123 Main St, Manila',
    phoneHash: hash('+639171234567'),
    instructions: 'Deliver to gate 3'
  },
  autoMatchBroker: true
});

// Listen for events
escrow.on('brokerAssigned', (broker) => {
  console.log(`Broker ${broker.name} assigned`);
});

escrow.on('delivered', (proof) => {
  console.log('Delivery confirmed');
});
```

---

## Deployment Architecture

### Multi-Environment Setup

**Development:**
- Polygon Mumbai testnet
- Local PostgreSQL
- IPFS testnet (web3.storage)

**Staging:**
- Polygon Mumbai
- AWS RDS (PostgreSQL)
- Pinata IPFS
- Full monitoring enabled

**Production:**
- Polygon mainnet + Arbitrum
- AWS RDS Multi-AZ
- Pinata IPFS with redundancy
- Full monitoring + alerting

### CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run tests
        run: |
          npm install
          npm run test
          npm run test:contracts

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy contracts
        run: npx hardhat deploy --network polygon
      - name: Deploy backend
        run: |
          docker build -t cyrus-api .
          aws ecs update-service --cluster prod --service api
```

---

## Monitoring & Observability

### Key Metrics

**Business Metrics:**
- Total transaction volume (daily/monthly)
- Number of active brokers
- Success rate by corridor
- Average transaction time
- Dispute rate

**Technical Metrics:**
- API response time (p50, p95, p99)
- Smart contract gas usage
- Database query performance
- Error rates by endpoint
- Uptime (target: 99.9%)

**Security Metrics:**
- Failed authentication attempts
- Unusual transaction patterns
- Contract security events
- Rate limit hits

### Alerting Thresholds

```yaml
Critical:
  - API error rate > 5%
  - Contract security event
  - Database connection lost

High:
  - Transaction success rate < 95%
  - API latency p95 > 1s
  - Dispute rate > 5%

Medium:
  - Broker response time > 30min
  - Cache hit rate < 80%
```

---

## Disaster Recovery

### Backup Strategy
- **Smart contracts:** Immutable on-chain (no backup needed)
- **PostgreSQL:** Daily snapshots + continuous WAL archiving
- **IPFS data:** Pinned on multiple providers (Pinata + web3.storage)
- **Configuration:** Version controlled in Git

### Recovery Time Objectives
- **RTO (Recovery Time):** 1 hour
- **RPO (Recovery Point):** 5 minutes (last transaction)

### Incident Response
1. Detect (automated alerts)
2. Assess (severity classification)
3. Mitigate (pause contracts if needed)
4. Resolve (fix root cause)
5. Post-mortem (document learnings)

---

## Future Technical Roadmap

### Phase 1 (Current)
- ✓ Core smart contracts
- ✓ API layer
- ⏳ Mobile apps
- ⏳ The Graph indexing

### Phase 2 (Q2 2025)
- Multi-chain deployment (Arbitrum, Base)
- Advanced fraud detection (ML models)
- Batch transaction processing
- Account abstraction support

### Phase 3 (Q3-Q4 2025)
- zkRollup integration
- Cross-chain messaging (LayerZero)
- Token launch infrastructure
- DAO governance contracts

### Phase 4 (2026+)
- Fully decentralized governance
- Protocol fee switch to DAO
- Light client support
- Zero-knowledge proofs for privacy

---

## Contributing

For technical contributions, see:
- [Smart Contract Development Guide](./smart-contracts.md)
- [API Integration Guide](../docs/api-guide.md)
- [Security Best Practices](../docs/security.md)

---

*For detailed smart contract specifications, see [smart-contracts.md](./smart-contracts.md)*

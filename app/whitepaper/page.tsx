export default function Whitepaper() {
  return (
    <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Technical Whitepaper
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            A comprehensive overview of the Abstracted Value Transfer Protocol (AVTP) and how it enables
            trustless global commerce.
          </p>
        </div>

        <div className="mt-16 space-y-12">
          {/* Section 1: Problem */}
          <div className="border-l-4 border-gray-900 bg-gray-50 p-6 rounded-r-lg">
            <h2 className="text-2xl font-bold text-gray-900">1. The Problem</h2>
            <p className="mt-4 text-base text-gray-700">
              Global commerce loses over $2 trillion annually due to trust barriers and intermediary inefficiencies.
              Current solutions—banks, escrow agents, payment processors—add weeks of delays and billions in costs.
            </p>
            <div className="mt-6 space-y-2">
              <h3 className="text-sm font-semibold text-gray-900">Key Statistics:</h3>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>Letters of Credit: 8-10 weeks settlement, $500-5,000 per transaction</li>
                <li>India COD: $180B locked capital, 15-25% return-to-origin fraud</li>
                <li>Agricultural loans: 20-43% default rates due to unverified usage</li>
                <li>Construction fraud: $98B annually, 25% of firms victimized</li>
              </ul>
            </div>
          </div>

          {/* Section 2: Solution */}
          <div className="border-l-4 border-gray-900 bg-gray-50 p-6 rounded-r-lg">
            <h2 className="text-2xl font-bold text-gray-900">2. The Solution</h2>
            <p className="mt-4 text-base text-gray-700">
              AVTP solves trust problems by combining smart contract escrow with physical broker verification.
              No traditional intermediaries needed—just protocol infrastructure.
            </p>
            <div className="mt-6 space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Smart Contract Escrow</h3>
                <p className="mt-1 text-sm text-gray-700">
                  Funds locked in non-custodial smart contracts. Automated release based on verification conditions.
                  No manual processing, no bank delays.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Physical Broker Verification</h3>
                <p className="mt-1 text-sm text-gray-700">
                  Local agents verify real-world events (delivery, quality, usage) and provide cryptographic
                  confirmation. Both parties must confirm (handshake) for payment release.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Instant Settlement</h3>
                <p className="mt-1 text-sm text-gray-700">
                  Payment released immediately upon dual confirmation. USDC stablecoins enable instant settlement
                  across currencies without volatility.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Protocol Architecture */}
          <div className="border-l-4 border-gray-900 bg-gray-50 p-6 rounded-r-lg">
            <h2 className="text-2xl font-bold text-gray-900">3. Protocol Architecture</h2>
            <p className="mt-4 text-base text-gray-700">
              AVTP is designed as protocol infrastructure, not a service company. Think Stripe for trust,
              or HTTP for verified value transfer.
            </p>
            <div className="mt-6 space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Core Components</h3>
                <ul className="mt-1 list-disc list-inside text-sm text-gray-700 space-y-1">
                  <li>Escrow smart contracts (Ethereum/Polygon)</li>
                  <li>Broker verification network</li>
                  <li>Cryptographic handshake mechanism</li>
                  <li>USDC settlement layer</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Protocol Properties</h3>
                <ul className="mt-1 list-disc list-inside text-sm text-gray-700 space-y-1">
                  <li><strong>Non-custodial:</strong> Protocol doesn't hold funds, reduces regulatory burden</li>
                  <li><strong>Abstracted:</strong> Same mechanism works for any value transfer type</li>
                  <li><strong>Composable:</strong> Other protocols can build on AVTP</li>
                  <li><strong>Cross-vertical:</strong> Brokers verify across multiple use cases</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 4: Use Cases & Market Opportunity */}
          <div className="border-l-4 border-gray-900 bg-gray-50 p-6 rounded-r-lg">
            <h2 className="text-2xl font-bold text-gray-900">4. Use Cases & Market Opportunity</h2>
            <p className="mt-4 text-base text-gray-700">
              AVTP addresses over $1 trillion in addressable markets across multiple verticals, starting with
              high-trust-friction, high-value transactions.
            </p>
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-900">Initial Focus Areas:</h3>
              <div className="mt-4 space-y-3">
                <div className="bg-white p-3 rounded border border-gray-200">
                  <p className="text-sm font-semibold text-gray-900">Trade Finance ($500B)</p>
                  <p className="text-xs text-gray-600 mt-1">Replace Letters of Credit with instant settlement</p>
                </div>
                <div className="bg-white p-3 rounded border border-gray-200">
                  <p className="text-sm font-semibold text-gray-900">India E-Commerce ($180B COD)</p>
                  <p className="text-xs text-gray-600 mt-1">Digital escrow for cash-on-delivery replacement</p>
                </div>
                <div className="bg-white p-3 rounded border border-gray-200">
                  <p className="text-sm font-semibold text-gray-900">Microfinance ($200B+)</p>
                  <p className="text-xs text-gray-600 mt-1">Verify agricultural loan usage, reduce defaults 60%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Go-to-Market Strategy */}
          <div className="border-l-4 border-gray-900 bg-gray-50 p-6 rounded-r-lg">
            <h2 className="text-2xl font-bold text-gray-900">5. Go-to-Market Strategy</h2>
            <p className="mt-4 text-base text-gray-700">
              Enterprise-first (B2B2C) approach: Partner with enterprises who deploy their own broker networks.
              This solves the two-sided marketplace chicken-egg problem.
            </p>
            <div className="mt-6 space-y-3">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Phase 1: Enterprise Partnerships</h3>
                <p className="text-sm text-gray-700 mt-1">
                  HDFC Bank (India COD), Flipkart (e-commerce), TechMahindra (trade finance)—enterprises bring
                  both supply and demand
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Phase 2: Cross-Vertical Network Effects</h3>
                <p className="text-sm text-gray-700 mt-1">
                  Same broker verifies COD delivery, microfinance purchases, freelance work—exponential scaling
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Phase 3: Protocol Infrastructure</h3>
                <p className="text-sm text-gray-700 mt-1">
                  Open protocol—other companies build on AVTP, similar to Stripe or Plaid
                </p>
              </div>
            </div>
          </div>

          {/* Why Now */}
          <div className="border-l-4 border-gray-900 bg-gray-50 p-6 rounded-r-lg">
            <h2 className="text-2xl font-bold text-gray-900">6. Why Now?</h2>
            <p className="mt-4 text-base text-gray-700">
              Three technological shifts converge to make AVTP viable:
            </p>
            <div className="mt-6 space-y-2">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="h-2 w-2 rounded-full bg-gray-900"></div>
                </div>
                <p className="ml-3 text-sm text-gray-700">
                  <strong>Stablecoins (USDC):</strong> Instant settlement in multiple currencies without volatility
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="h-2 w-2 rounded-full bg-gray-900"></div>
                </div>
                <p className="ml-3 text-sm text-gray-700">
                  <strong>Smart contracts:</strong> Automate escrow logic without manual intermediaries
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="h-2 w-2 rounded-full bg-gray-900"></div>
                </div>
                <p className="ml-3 text-sm text-gray-700">
                  <strong>Mobile penetration:</strong> 90%+ smartphone adoption enables cryptographic verification
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 border-t border-gray-200 pt-10 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Explore Further</h2>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/use-cases"
              className="rounded-md bg-gray-900 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-gray-700"
            >
              View Detailed Use Cases
            </a>
            <a
              href="/about"
              className="rounded-md bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Learn About Cyrus
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

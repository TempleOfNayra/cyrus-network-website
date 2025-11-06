export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <div className="mb-6">
              <span className="inline-block rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700">
                Trust Infrastructure for $2T+ Markets
              </span>
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
              Trust Infrastructure for Global Commerce
            </h1>
            <p className="mt-8 text-xl leading-8 text-gray-700 max-w-3xl mx-auto">
              Cyrus Network is trust infrastructure for global commerce. Our protocol combines smart contract escrow with broker verification to enable secure value exchange without traditional intermediaries.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#problem"
                className="rounded-md bg-gray-900 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-gray-700"
              >
                See The Problem
              </a>
              <a href="/whitepaper" className="text-lg font-semibold leading-6 text-gray-900">
                Read Whitepaper <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Problem Statement */}
      <div id="problem" className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-gray-600">The Problem</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              $2T+ Trapped by Trust Barriers—And Everyone Who Tried Failed
            </p>

            <div className="mt-10 space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">The Market Pain</h3>
                <ul className="mt-4 space-y-3 text-lg text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-3 text-gray-400">•</span>
                    <span><strong>$500B Trade Finance:</strong> Letters of Credit take 8-10 weeks, cost $500-5,000 per transaction</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-gray-400">•</span>
                    <span><strong>$180B India COD:</strong> 60-70% cash-on-delivery locks capital, 15-25% fraud rate</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-gray-400">•</span>
                    <span><strong>$200B+ Microfinance:</strong> 20-43% agricultural loan defaults—can't verify usage</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-gray-400">•</span>
                    <span><strong>$700B Remittances:</strong> 7-10% fees, 3-5 day delays</span>
                  </li>
                </ul>
              </div>

              <div className="border-t border-gray-300 pt-8">
                <h3 className="text-2xl font-bold text-gray-900">Why Previous Attempts Failed</h3>
                <div className="mt-6 space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <p className="font-semibold text-gray-900">OpenBazaar (2014-2021) • $9.25M raised</p>
                    <p className="text-sm text-gray-600 mt-1">P2P marketplace with escrow → $86K total sales in 14 months. Two-sided marketplace death spiral.</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <p className="font-semibold text-gray-900">TradeLens (2018-2023) • IBM + Maersk</p>
                    <p className="text-sm text-gray-600 mt-1">Supply chain trust platform → Competitors wouldn't join Maersk-owned system. Vertical lock-in.</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <p className="font-semibold text-gray-900">LocalBitcoins (2012-2023)</p>
                    <p className="text-sm text-gray-600 mt-1">P2P crypto escrow → Regulatory pressure + fraud. Pure escrow isn't enough.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Solution */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-gray-600">The Solution</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Protocol Abstraction + B2B2C Model
            </p>
            <p className="mt-6 text-xl leading-8 text-gray-700">
              We solved what killed OpenBazaar and TradeLens: <strong>protocol abstraction</strong> eliminates vertical lock-in,
              and <strong>enterprise B2B2C</strong> eliminates the two-sided marketplace problem.
            </p>

            <div className="mt-12 space-y-10">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation #1: Protocol Abstraction</h3>
                <p className="text-base text-gray-700 mb-4">
                  The same escrow + verification mechanism works for <em>any</em> value transfer. We don't define what "value" means.
                </p>
                <div className="bg-white p-4 rounded border border-gray-200">
                  <p className="text-sm font-mono text-gray-700">
                    1. Funds locked in escrow (smart contract)<br/>
                    2. Broker verifies physical event (delivery/quality/usage)<br/>
                    3. Buyer + Broker both confirm (handshake)<br/>
                    4. Payment releases instantly
                  </p>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  <strong>Works for:</strong> Letter of Credit ($500K laptop shipment), India COD (₹15K package), Agricultural loans ($200 seed purchase)
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation #2: Enterprise B2B2C</h3>
                <p className="text-base text-gray-700 mb-4">
                  We're not building a marketplace. We're <strong>infrastructure that enterprises deploy.</strong>
                </p>
                <ul className="space-y-2 text-base text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-3 text-gray-400">→</span>
                    <span><strong>HDFC Bank</strong> deploys brokers for COD verification</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-gray-400">→</span>
                    <span><strong>TechMahindra</strong> deploys brokers for trade finance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-gray-400">→</span>
                    <span><strong>Microfinance banks</strong> deploy brokers for loan verification</span>
                  </li>
                </ul>
                <p className="text-sm text-gray-600 mt-4">
                  <strong>Why this works:</strong> Enterprises bring both supply AND demand. No chicken-egg problem.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Network Effects = Unfair Advantage</h3>
                <p className="text-base text-gray-700">
                  Same broker verifies COD delivery, microfinance purchases, freelance work completion.
                  <strong> Cross-vertical network effects</strong> create exponential scaling—each new vertical strengthens the entire network.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Business Model & Market */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-gray-600">Business Model</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Infrastructure, Not Services
            </p>
            <p className="mt-6 text-xl text-gray-700">
              We're positioning as <strong>Stripe for trust</strong>—protocol infrastructure that enterprises deploy.
              Not a service company, not a marketplace.
            </p>

            <div className="mt-12 space-y-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 text-lg">Revenue Model</h3>
                <ul className="mt-3 space-y-2 text-base text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-3 text-gray-400">•</span>
                    <span><strong>0.5-1% protocol fee</strong> on all transactions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-gray-400">•</span>
                    <span><strong>Enterprise SDK licensing</strong> ($50K-500K annually for Fortune 500)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-gray-400">•</span>
                    <span><strong>Broker tools</strong> (premium analytics, liquidity management)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 text-lg mb-3">Initial Target Markets ($1.5T+)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="font-semibold text-gray-900">Trade Finance</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">$500B</p>
                    <p className="text-sm text-gray-600 mt-1">Letters of Credit → instant settlement</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="font-semibold text-gray-900">India E-Commerce</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">$180B</p>
                    <p className="text-sm text-gray-600 mt-1">COD replacement with digital escrow</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="font-semibold text-gray-900">Microfinance</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">$200B+</p>
                    <p className="text-sm text-gray-600 mt-1">Agricultural loan verification</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="font-semibold text-gray-900">Remittances</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">$700B</p>
                    <p className="text-sm text-gray-600 mt-1">P2P cross-border transfers</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 text-lg">GTM Strategy: Enterprise First</h3>
                <ol className="mt-3 space-y-2 text-base text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-3 font-bold text-gray-900">1.</span>
                    <span><strong>Phase 1:</strong> Partner with HDFC Bank (India COD), TechMahindra (trade finance)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 font-bold text-gray-900">2.</span>
                    <span><strong>Phase 2:</strong> Cross-vertical network effects—same brokers verify multiple use cases</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 font-bold text-gray-900">3.</span>
                    <span><strong>Phase 3:</strong> Open protocol—other companies build on AVTP (like Stripe, Plaid)</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-white">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Raising Seed Round
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              We're raising a $2-5M seed to deploy our first enterprise partnerships (HDFC, TechMahindra) and
              prove the B2B2C model works. Read our full analysis and technical whitepaper.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/docs"
                className="rounded-md bg-gray-900 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-gray-700"
              >
                View All Documentation
              </a>
              <a href="/whitepaper" className="text-lg font-semibold leading-6 text-gray-900">
                Read Whitepaper <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

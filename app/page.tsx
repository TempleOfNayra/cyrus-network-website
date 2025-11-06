export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
              The Trust Layer for Global Commerce
            </h1>
            <p className="mt-8 text-xl leading-8 text-gray-600 max-w-3xl mx-auto">
              Cyrus Network enables instant, verified transactions across borders without traditional intermediaries.
              Our Abstracted Value Transfer Protocol (AVTP) works for any type of value transfer—money, goods, or services.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/whitepaper"
                className="rounded-md bg-gray-900 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-gray-700"
              >
                Read Whitepaper
              </a>
              <a href="/use-cases" className="text-lg font-semibold leading-6 text-gray-900">
                Explore Use Cases <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Problem Statement */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-gray-600">The Problem</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              $2 Trillion Lost to Trust Barriers
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Global commerce faces massive inefficiencies due to trust gaps. Traditional intermediaries add
              weeks of delays and billions in costs to verify transactions.
            </p>
          </div>
        </div>
      </div>

      {/* Solution */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-gray-600">The Solution</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Protocol-Level Trust Infrastructure
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              AVTP combines smart contract escrow with local broker verification to enable instant,
              verified transactions for any value transfer—without traditional banks, payment processors, or escrow agents.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
              <div className="relative">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  Smart Contract Escrow
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Automated fund holding and release based on verification conditions. No manual processing.
                </dd>
              </div>
              <div className="relative">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  Local Broker Network
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Physical verification of goods, services, and events by trusted local agents.
                </dd>
              </div>
              <div className="relative">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  Instant Settlement
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Payment released immediately upon confirmation. No 8-10 week delays.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Key Markets */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-gray-600">Market Opportunity</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Cross-Vertical Applications
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
            <div className="flex gap-x-4 rounded-xl bg-white p-6 ring-1 ring-inset ring-gray-200">
              <div className="text-base leading-7">
                <h3 className="font-semibold text-gray-900">Trade Finance</h3>
                <p className="mt-2 text-gray-600">Replace Letters of Credit with instant settlement. $500B market.</p>
              </div>
            </div>
            <div className="flex gap-x-4 rounded-xl bg-white p-6 ring-1 ring-inset ring-gray-200">
              <div className="text-base leading-7">
                <h3 className="font-semibold text-gray-900">E-Commerce Payments</h3>
                <p className="mt-2 text-gray-600">Cash-on-delivery replacement in India. $180B market.</p>
              </div>
            </div>
            <div className="flex gap-x-4 rounded-xl bg-white p-6 ring-1 ring-inset ring-gray-200">
              <div className="text-base leading-7">
                <h3 className="font-semibold text-gray-900">Microfinance</h3>
                <p className="mt-2 text-gray-600">Verify agricultural loan usage. Reduce defaults 60%.</p>
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
              Ready to learn more?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Explore our detailed use cases and technical whitepaper to understand how AVTP enables trustless global commerce.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/use-cases"
                className="rounded-md bg-gray-900 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-gray-700"
              >
                View Use Cases
              </a>
              <a href="/about" className="text-lg font-semibold leading-6 text-gray-900">
                About Us <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <p className="text-base font-semibold leading-7 text-gray-600">About Cyrus Network</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Building the Trust Infrastructure for Global Commerce
        </h1>

        <div className="mt-10 max-w-2xl">
          <p className="text-xl leading-8">
            Cyrus Network is developing the Abstracted Value Transfer Protocol (AVTP)—a universal trust layer
            that enables instant, verified transactions for any type of value transfer across borders.
          </p>

          <div className="mt-16">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">The Problem We're Solving</h2>
            <p className="mt-6">
              Global commerce loses over $2 trillion annually to trust barriers and intermediary costs. Traditional
              systems like Letters of Credit take 8-10 weeks and cost 0.8-2% in fees. Cash-on-delivery in India
              represents $180B in locked capital. Agricultural loan defaults reach 43% due to inability to verify
              fund usage.
            </p>
            <p className="mt-6">
              These aren't technical problems—they're trust problems. Buyers and sellers don't trust each other.
              Banks don't trust that goods were actually delivered. Lenders don't trust that loans are used properly.
            </p>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Our Solution: AVTP</h2>
            <p className="mt-6">
              The Abstracted Value Transfer Protocol combines two innovations:
            </p>
            <ul className="mt-6 space-y-4 list-disc list-inside">
              <li>
                <strong>Smart Contract Escrow:</strong> Automated holding and conditional release of funds based on
                verification—no manual processing or intermediary delays
              </li>
              <li>
                <strong>Independent Broker Verification:</strong> Local agents verify real-world events (delivery received,
                goods quality, loan usage) and provide cryptographic confirmation
              </li>
            </ul>
            <p className="mt-6">
              When both parties confirm (the "handshake"), the smart contract instantly releases payment. No banks,
              no escrow agents, no 8-10 week processing times.
            </p>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Why "Abstracted"?</h2>
            <p className="mt-6">
              AVTP works for <em>any</em> type of value transfer using the same core mechanism:
            </p>
            <ul className="mt-6 space-y-2 list-disc list-inside">
              <li>International trade: Verify laptop shipment quality before releasing $500K</li>
              <li>E-commerce: Verify customer received package before releasing payment</li>
              <li>Agricultural loans: Verify farmer purchased seeds before releasing loan funds</li>
              <li>Construction: Verify project milestone completion before releasing payment</li>
            </ul>
            <p className="mt-6">
              Same protocol. Same escrow mechanism. Same verification model. Different assets, different industries,
              same trust infrastructure.
            </p>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Market Opportunity</h2>
            <p className="mt-6">
              Our initial focus areas represent over $1 trillion in addressable markets:
            </p>
            <ul className="mt-6 space-y-2 list-disc list-inside">
              <li><strong>Trade Finance:</strong> $500B Letters of Credit market</li>
              <li><strong>India E-Commerce:</strong> $180B cash-on-delivery payments</li>
              <li><strong>Microfinance:</strong> $200B+ with 20-43% default rates</li>
              <li><strong>Construction:</strong> $98B annual fraud losses</li>
            </ul>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Our Approach</h2>
            <p className="mt-6">
              We're building AVTP as <strong>protocol infrastructure</strong>, not a service company. Think Stripe
              for trust, or HTTP for verified value transfer.
            </p>
            <p className="mt-6">
              Our go-to-market strategy is <strong>enterprise-first (B2B2C)</strong>:
            </p>
            <ul className="mt-6 space-y-4 list-disc list-inside">
              <li>
                Target enterprises (HDFC Bank, Flipkart, TechMahindra) who integrate Cyrus infrastructure with their existing operations
              </li>
              <li>
                Avoid two-sided marketplace bootstrap problem—enterprises bring both supply and demand
              </li>
              <li>
                Enable cross-vertical network effects—same broker verifies multiple use cases
              </li>
            </ul>
            <p className="mt-4 text-sm text-gray-600 italic">
              *Note: Enterprise partnerships are target prospects requiring validation through pilot programs.
            </p>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Why Now?</h2>
            <p className="mt-6">
              Three technological shifts make AVTP possible today:
            </p>
            <ul className="mt-6 space-y-2 list-disc list-inside">
              <li><strong>Stablecoins (USDC):</strong> Enable instant settlement in multiple currencies without volatility</li>
              <li><strong>Smart contracts:</strong> Automate escrow logic without intermediaries</li>
              <li><strong>Mobile verification:</strong> 90%+ smartphone penetration enables cryptographic confirmation</li>
            </ul>
          </div>

          <div className="mt-16 border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Learn More</h2>
            <div className="mt-6 flex gap-4">
              <a
                href="/use-cases"
                className="rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700"
              >
                Explore Use Cases
              </a>
              <a
                href="/whitepaper"
                className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Read Whitepaper
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

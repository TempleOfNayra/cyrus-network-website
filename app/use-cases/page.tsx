export default function UseCases() {
  const verticals = [
    {
      title: "Traditional Banking & Trade Finance",
      market: "$3T+ market",
      problem: "Letters of Credit take 8-10 weeks and cost $500-5,000 per transaction",
      solution: "Instant settlement with broker verification—37.5% cheaper, 50% faster",
      example: "Letter of Credit Replacement",
      details: "TechRetail USA imports $500K of laptops from China. Traditional LC costs $4,000 and takes 8-10 weeks. With Cyrus: $2,500 cost, 4-5 weeks settlement.",
    },
    {
      title: "Credit Cards & Payment Networks",
      market: "$180B COD market in India",
      problem: "60-70% of India e-commerce is cash-on-delivery, creating massive capital lock-up and 15-25% RTO costs",
      solution: "Digital escrow with delivery verification—instant settlement, eliminate RTO fraud",
      example: "Cash-on-Delivery Replacement",
      details: "Customer orders ₹15,000 laptop. Funds held in escrow. Delivery person + customer both confirm delivery (handshake). Instant payment release.",
    },
    {
      title: "Microfinance & Lending",
      market: "$200B+ with 20-43% default rates",
      problem: "Agricultural loans have massive defaults because lenders can't verify funds are used for seeds/fertilizer vs. consumption",
      solution: "Escrow release only when broker verifies proper usage—60% reduction in defaults",
      example: "Agricultural Seed Loans",
      details: "Farmer gets $200 loan for seeds. Funds held in escrow. Local broker confirms farmer purchased seeds from authorized dealer. Loan released directly to dealer.",
    },
    {
      title: "Cross-Border Remittances",
      market: "$700B annually",
      problem: "High fees (6-8%), slow delivery (3-5 days), inconvenient pickup",
      solution: "P2P transfers with local broker delivery, 1% fees, same-day",
      example: "Coming soon",
      details: "",
    },
    {
      title: "Supply Chain & Manufacturing",
      market: "$15T global supply chain",
      problem: "60-90 day payment cycles, quality inconsistency, no traceability",
      solution: "Direct payments with quality verification at source, instant settlement",
      example: "Coming soon",
      details: "",
    },
    {
      title: "Marketplace & E-Commerce",
      market: "$1T cross-border e-commerce",
      problem: "Trust issues, high platform fees (5-10%), payment holds",
      solution: "Smart contract escrow with verification, 1-2% fees",
      example: "Coming soon",
      details: "",
    },
    {
      title: "Freelance & Gig Economy",
      market: "$400B+ global gig economy",
      problem: "Payment disputes, platform fees (15-20%), delayed payments",
      solution: "Milestone-based escrow with work verification",
      example: "Coming soon",
      details: "",
    },
    {
      title: "Real Estate & Property",
      market: "$3.5T transaction volume",
      problem: "Escrow fees (1-2%), slow closing (30-60 days), fraud risks",
      solution: "Smart contract escrow with automated verification, faster closing",
      example: "Coming soon",
      details: "",
    },
  ];

  return (
    <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Use Cases by Vertical
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            AVTP enables instant, verified transactions across multiple industries using the same core protocol.
            Here are the key markets where we're creating immediate value.
          </p>
        </div>

        <div className="mt-20 space-y-12">
          {verticals.map((vertical, index) => (
            <div
              key={index}
              className="border-l-4 border-gray-900 bg-gray-50 p-6 rounded-r-lg"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900">{vertical.title}</h2>
                  <p className="mt-1 text-sm font-semibold text-gray-600">{vertical.market}</p>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <div>
                  <span className="text-sm font-semibold text-gray-900">Problem: </span>
                  <span className="text-sm text-gray-700">{vertical.problem}</span>
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-900">Solution: </span>
                  <span className="text-sm text-gray-700">{vertical.solution}</span>
                </div>
              </div>

              {vertical.details && (
                <div className="mt-4 rounded-md bg-white p-4 border border-gray-200">
                  <p className="text-sm font-semibold text-gray-900 mb-2">
                    Example: {vertical.example}
                  </p>
                  <p className="text-sm text-gray-700">{vertical.details}</p>
                </div>
              )}

              {!vertical.details && (
                <div className="mt-4">
                  <span className="inline-flex items-center rounded-md bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                    {vertical.example}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-gray-200 pt-10">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Cross-Vertical Network Effects</h2>
            <p className="mt-4 text-base text-gray-600 max-w-2xl mx-auto">
              The power of AVTP is that the <strong>same broker can verify across multiple verticals</strong>.
              A delivery person who verifies COD packages can also verify microfinance purchases, real estate
              inspections, or freelance work completion. This creates powerful network effects as our broker
              network grows.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href="/whitepaper"
            className="rounded-md bg-gray-900 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-gray-700"
          >
            Read Technical Whitepaper
          </a>
        </div>
      </div>
    </div>
  );
}

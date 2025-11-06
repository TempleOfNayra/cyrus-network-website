export default function Whitepaper() {
  const chapters = [
    {
      num: 1,
      title: "The Problem — Global Financial Exclusion",
      file: "/view/whitepaper/01-problem",
      sections: [
        "The Remittance Crisis",
        "Cross-Border Commerce Barriers",
        "Supply Chain Payment Delays",
        "Trust Infrastructure Gap"
      ]
    },
    {
      num: 2,
      title: "The Solution — Abstracted Value Transfer Protocol",
      file: "/view/whitepaper/02-solution",
      sections: [
        "Core Insight: Abstraction",
        "Three-Layer Architecture",
        "Smart Contract Escrow",
        "Broker Verification Network",
        "Reputation System"
      ]
    },
    {
      num: 3,
      title: "Protocol Architecture",
      file: "/view/whitepaper/03-protocol",
      sections: [
        "Technical Specification",
        "Smart Contract Design",
        "Security Model",
        "Scalability Approach",
        "Interoperability"
      ]
    },
    {
      num: 4,
      title: "Use Cases & Market Opportunity",
      file: "/view/whitepaper/04-use-cases",
      sections: [
        "Remittances ($700B)",
        "Trade Finance ($500B)",
        "E-Commerce ($1T)",
        "Supply Chain Finance ($1.5T)",
        "Microfinance ($200B)"
      ]
    }
  ];

  return (
    <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <div className="sticky top-20">
              <h2 className="text-sm font-semibold text-gray-900 mb-4">Chapters</h2>
              <nav className="space-y-2">
                {chapters.map((chapter) => (
                  <a
                    key={chapter.num}
                    href={chapter.file}
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md hover:text-gray-900"
                  >
                    <span className="font-semibold">{chapter.num}.</span> {chapter.title.split('—')[0].trim()}
                  </a>
                ))}
              </nav>
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Links</h3>
                <div className="space-y-2">
                  <a href="/docs" className="block text-sm text-gray-600 hover:text-gray-900">All Documentation</a>
                  <a href="/use-cases" className="block text-sm text-gray-600 hover:text-gray-900">Use Cases</a>
                  <a href="/about" className="block text-sm text-gray-600 hover:text-gray-900">About Cyrus</a>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Technical Whitepaper
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                A comprehensive overview of the Abstracted Value Transfer Protocol (AVTP) and how it enables
                trustless global commerce.
              </p>
            </div>

            <div className="mt-12 space-y-16">
              {/* Chapters */}
              {chapters.map((chapter) => (
                <div key={chapter.num} className="border-l-4 border-gray-900 bg-gray-50 p-6 rounded-r-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Chapter {chapter.num}: {chapter.title.split('—')[1]?.trim() || chapter.title}
                      </h2>
                      <a
                        href={chapter.file}
                        className="text-sm text-gray-600 hover:text-gray-900 mt-1 inline-block"
                      >
                        Read full chapter →
                      </a>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Key Topics:</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {chapter.sections.map((section, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-gray-400 mr-2">•</span>
                          <span className="text-sm text-gray-700">{section}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}

              {/* Additional Info */}
              <div className="border-t border-gray-200 pt-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Key Highlights</h2>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">The Core Innovation: Abstraction</h3>
                  <p className="text-base text-gray-700">
                    AVTP is the first protocol that <strong>doesn't define what "value" means</strong>. The same
                    escrow + verification mechanism works for money, goods, services, certificates, or any exchange.
                    Think TCP/IP for value transfer—we move verified exchanges, applications define what's exchanged.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg mt-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">$1T+ Market Opportunity</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-white p-4 rounded border border-gray-200">
                      <p className="font-semibold text-gray-900">Trade Finance</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">$500B</p>
                      <p className="text-xs text-gray-600 mt-1">Letters of Credit replacement</p>
                    </div>
                    <div className="bg-white p-4 rounded border border-gray-200">
                      <p className="font-semibold text-gray-900">India COD</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">$180B</p>
                      <p className="text-xs text-gray-600 mt-1">Cash-on-delivery digital escrow</p>
                    </div>
                    <div className="bg-white p-4 rounded border border-gray-200">
                      <p className="font-semibold text-gray-900">Microfinance</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">$200B+</p>
                      <p className="text-xs text-gray-600 mt-1">Agricultural loan verification</p>
                    </div>
                    <div className="bg-white p-4 rounded border border-gray-200">
                      <p className="font-semibold text-gray-900">Remittances</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">$700B</p>
                      <p className="text-xs text-gray-600 mt-1">Cross-border P2P transfers</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-16 border-t border-gray-200 pt-10 text-center">
                <h2 className="text-2xl font-bold text-gray-900">Explore Further</h2>
                <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/docs"
                    className="rounded-md bg-gray-900 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-gray-700"
                  >
                    All Documentation
                  </a>
                  <a
                    href="/use-cases"
                    className="rounded-md bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    View Use Cases
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

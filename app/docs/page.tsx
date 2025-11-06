export default function DocsPage() {
  const docs = {
    overview: [
      { title: "Elevator Pitch", file: "/elevator-pitch.md", description: "One-page investor overview" },
      { title: "Competitive Analysis", file: "/competitive-analysis.md", description: "Market analysis and failed projects" },
      { title: "Terminology & Strategy", file: "/TERMINOLOGY-STRATEGY.md", description: "Strategic positioning and messaging" },
      { title: "TODO", file: "/TODO.md", description: "Project roadmap and tasks" },
    ],
    whitepaper: [
      { title: "Chapter 1: The Problem", file: "/whitepaper/01-problem.md", description: "Global financial exclusion analysis" },
      { title: "Chapter 2: The Solution", file: "/whitepaper/02-solution.md", description: "AVTP protocol overview" },
      { title: "Chapter 3: Protocol Architecture", file: "/whitepaper/03-protocol.md", description: "Technical specification" },
      { title: "Chapter 4: Use Cases", file: "/whitepaper/04-use-cases.md", description: "Market applications" },
    ],
    useCases: [
      { title: "Use Cases by Vertical", file: "/use-cases-by-vertical.md", description: "Detailed examples across industries" },
    ],
    content: [
      { title: "One Pager", file: "/content/one-pager.md", description: "Single-page product summary" },
      { title: "Website Copy", file: "/content/website-copy.md", description: "Marketing website content" },
    ],
    enterprise: [
      { title: "Go-to-Market Strategy", file: "/enterprise/GTM-STRATEGY.md", description: "Enterprise deployment strategy" },
    ],
    finance: [
      { title: "Unit Economics", file: "/finance/unit-economics.md", description: "Financial modeling and projections" },
    ],
    pitch: [
      { title: "Investor Examples", file: "/pitch/investor-examples.md", description: "Pitch examples and talking points" },
      { title: "Pitch Deck Content", file: "/pitch/pitch-deck-content.md", description: "Slide-by-slide deck content" },
    ],
    technical: [
      { title: "Architecture", file: "/technical/architecture.md", description: "System architecture overview" },
      { title: "Smart Contracts", file: "/technical/smart-contracts.md", description: "Contract specifications" },
    ],
  };

  return (
    <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Documentation
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Complete documentation, whitepapers, and strategic materials for Cyrus Network
          </p>
        </div>

        <div className="space-y-12">
          {/* Overview */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-900 pb-2">
              Overview
            </h2>
            <div className="grid gap-4">
              {docs.overview.map((doc, i) => (
                <a
                  key={i}
                  href={doc.file}
                  className="block p-4 border border-gray-200 rounded-lg hover:border-gray-900 hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-gray-900">{doc.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
                </a>
              ))}
            </div>
          </section>

          {/* Whitepaper */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-900 pb-2">
              Whitepaper (4 Chapters)
            </h2>
            <div className="grid gap-4">
              {docs.whitepaper.map((doc, i) => (
                <a
                  key={i}
                  href={doc.file}
                  className="block p-4 border border-gray-200 rounded-lg hover:border-gray-900 hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-gray-900">{doc.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
                </a>
              ))}
            </div>
          </section>

          {/* Use Cases */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-900 pb-2">
              Use Cases
            </h2>
            <div className="grid gap-4">
              {docs.useCases.map((doc, i) => (
                <a
                  key={i}
                  href={doc.file}
                  className="block p-4 border border-gray-200 rounded-lg hover:border-gray-900 hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-gray-900">{doc.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
                </a>
              ))}
            </div>
          </section>

          {/* Content */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-900 pb-2">
              Marketing Content
            </h2>
            <div className="grid gap-4">
              {docs.content.map((doc, i) => (
                <a
                  key={i}
                  href={doc.file}
                  className="block p-4 border border-gray-200 rounded-lg hover:border-gray-900 hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-gray-900">{doc.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
                </a>
              ))}
            </div>
          </section>

          {/* Enterprise */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-900 pb-2">
              Enterprise & Go-to-Market
            </h2>
            <div className="grid gap-4">
              {docs.enterprise.map((doc, i) => (
                <a
                  key={i}
                  href={doc.file}
                  className="block p-4 border border-gray-200 rounded-lg hover:border-gray-900 hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-gray-900">{doc.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
                </a>
              ))}
            </div>
          </section>

          {/* Finance */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-900 pb-2">
              Finance & Economics
            </h2>
            <div className="grid gap-4">
              {docs.finance.map((doc, i) => (
                <a
                  key={i}
                  href={doc.file}
                  className="block p-4 border border-gray-200 rounded-lg hover:border-gray-900 hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-gray-900">{doc.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
                </a>
              ))}
            </div>
          </section>

          {/* Pitch Materials */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-900 pb-2">
              Pitch Materials
            </h2>
            <div className="grid gap-4">
              {docs.pitch.map((doc, i) => (
                <a
                  key={i}
                  href={doc.file}
                  className="block p-4 border border-gray-200 rounded-lg hover:border-gray-900 hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-gray-900">{doc.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
                </a>
              ))}
            </div>
          </section>

          {/* Technical */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-900 pb-2">
              Technical Documentation
            </h2>
            <div className="grid gap-4">
              {docs.technical.map((doc, i) => (
                <a
                  key={i}
                  href={doc.file}
                  className="block p-4 border border-gray-200 rounded-lg hover:border-gray-900 hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-gray-900">{doc.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
                </a>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-16 border-t border-gray-200 pt-10 text-center">
          <p className="text-sm text-gray-600">
            All documentation files are available in markdown format. Click any link to view the raw file.
          </p>
        </div>
      </div>
    </div>
  );
}

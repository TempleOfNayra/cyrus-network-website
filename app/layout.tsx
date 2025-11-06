import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cyrus Network - The Trust Layer for Global Commerce",
  description: "Abstracted Value Transfer Protocol (AVTP) - Enabling instant, verified transactions across borders without traditional intermediaries",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center space-x-8">
                <a href="/" className="text-2xl font-bold text-gray-900 hover:text-gray-700">
                  Cyrus Network
                </a>
                <div className="hidden md:flex md:space-x-6">
                  <a
                    href="/"
                    className="text-sm font-medium text-gray-700 hover:text-gray-900 hover:underline"
                  >
                    Home
                  </a>
                  <a
                    href="/about"
                    className="text-sm font-medium text-gray-700 hover:text-gray-900 hover:underline"
                  >
                    About
                  </a>
                  <a
                    href="/use-cases"
                    className="text-sm font-medium text-gray-700 hover:text-gray-900 hover:underline"
                  >
                    Use Cases
                  </a>
                  <a
                    href="/whitepaper"
                    className="text-sm font-medium text-gray-700 hover:text-gray-900 hover:underline"
                  >
                    Whitepaper
                  </a>
                  <a
                    href="/docs"
                    className="text-sm font-medium text-gray-700 hover:text-gray-900 hover:underline"
                  >
                    Docs
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <main className="min-h-screen">{children}</main>
        <footer className="border-t border-gray-200 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Pages</h3>
                <ul className="space-y-2">
                  <li><a href="/" className="text-sm text-gray-600 hover:text-gray-900">Home</a></li>
                  <li><a href="/about" className="text-sm text-gray-600 hover:text-gray-900">About</a></li>
                  <li><a href="/use-cases" className="text-sm text-gray-600 hover:text-gray-900">Use Cases</a></li>
                  <li><a href="/whitepaper" className="text-sm text-gray-600 hover:text-gray-900">Whitepaper</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Documentation</h3>
                <ul className="space-y-2">
                  <li><a href="/elevator-pitch.md" className="text-sm text-gray-600 hover:text-gray-900">Elevator Pitch</a></li>
                  <li><a href="/competitive-analysis.md" className="text-sm text-gray-600 hover:text-gray-900">Competitive Analysis</a></li>
                  <li><a href="/use-cases-by-vertical.md" className="text-sm text-gray-600 hover:text-gray-900">Detailed Use Cases</a></li>
                  <li><a href="/TERMINOLOGY-STRATEGY.md" className="text-sm text-gray-600 hover:text-gray-900">Terminology & Strategy</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Technical Docs</h3>
                <ul className="space-y-2">
                  <li><a href="/whitepaper/01-problem.md" className="text-sm text-gray-600 hover:text-gray-900">Problem Statement</a></li>
                  <li><a href="/whitepaper/02-solution.md" className="text-sm text-gray-600 hover:text-gray-900">Solution Overview</a></li>
                  <li><a href="/whitepaper/03-protocol.md" className="text-sm text-gray-600 hover:text-gray-900">Protocol Architecture</a></li>
                  <li><a href="/whitepaper/04-use-cases.md" className="text-sm text-gray-600 hover:text-gray-900">Use Cases (Technical)</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t border-gray-200 pt-8">
              <p className="text-sm text-gray-500 text-center">
                © 2025 Cyrus Network. The Trust Layer for Global Commerce.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

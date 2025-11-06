import { promises as fs } from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import MarkdownViewer from '@/app/components/MarkdownViewer';

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateStaticParams() {
  const docs = [
    { slug: ['elevator-pitch'] },
    { slug: ['competitive-analysis'] },
    { slug: ['TERMINOLOGY-STRATEGY'] },
    { slug: ['TODO'] },
    { slug: ['use-cases-by-vertical'] },
    { slug: ['content', 'one-pager'] },
    { slug: ['content', 'website-copy'] },
    { slug: ['enterprise', 'GTM-STRATEGY'] },
    { slug: ['finance', 'unit-economics'] },
    { slug: ['pitch', 'investor-examples'] },
    { slug: ['pitch', 'pitch-deck-content'] },
    { slug: ['technical', 'architecture'] },
    { slug: ['technical', 'smart-contracts'] },
    { slug: ['whitepaper', '01-problem'] },
    { slug: ['whitepaper', '02-solution'] },
    { slug: ['whitepaper', '03-protocol'] },
    { slug: ['whitepaper', '04-use-cases'] },
  ];

  return docs;
}

export default async function ViewDocPage({ params }: PageProps) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), ...slug) + '.md';

  let content: string;
  try {
    content = await fs.readFile(filePath, 'utf-8');
  } catch {
    notFound();
  }

  // Extract title from first h1 or use filename
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1] : slug[slug.length - 1].replace(/-/g, ' ');

  return (
    <div className="bg-white px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <a
            href="/docs"
            className="text-sm text-gray-600 hover:text-gray-900 mb-4 inline-block"
          >
            ← Back to Documentation
          </a>
        </div>
        <MarkdownViewer content={content} />
      </div>
    </div>
  );
}

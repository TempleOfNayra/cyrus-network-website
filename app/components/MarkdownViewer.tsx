'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';

interface MarkdownViewerProps {
  content: string;
}

export default function MarkdownViewer({ content }: MarkdownViewerProps) {
  return (
    <div className="prose prose-gray max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-4xl font-bold text-gray-900 mt-8 mb-4">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-3xl font-bold text-gray-900 mt-6 mb-3">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-2xl font-semibold text-gray-900 mt-5 mb-2">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-xl font-semibold text-gray-900 mt-4 mb-2">{children}</h4>
          ),
          p: ({ children }) => (
            <p className="text-base text-gray-700 mb-4 leading-7 whitespace-pre-line">{children}</p>
          ),
          br: () => <br className="my-2" />,
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="text-gray-700 ml-4">{children}</li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4 text-gray-600">
              {children}
            </blockquote>
          ),
          code: ({ className, children }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">
                  {children}
                </code>
              );
            }
            return (
              <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono my-4">
                {children}
              </code>
            );
          },
          pre: ({ children }) => <div className="my-4">{children}</div>,
          table: ({ children }) => (
            <div className="overflow-x-auto my-6">
              <table className="min-w-full border-collapse border border-gray-300">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-gray-100">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-900">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-gray-300 px-4 py-2 text-gray-700">
              {children}
            </td>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-blue-600 hover:text-blue-800 underline"
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {children}
            </a>
          ),
          hr: () => <hr className="my-8 border-gray-300" />,
          strong: ({ children }) => (
            <strong className="font-semibold text-gray-900">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-gray-700">{children}</em>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

import React, { useState } from "react";
import { LuCopy, LuCopyCheck, LuCode } from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighligther } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
const AiResponsePreview = ({ content }) => {
  return (
    <div className="maz-w-4xl mx-auto">
      <div className="text-[14px] prose prose-slate dark:prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              const language = match ? match[1] : "";
              const isInline = !className;
              return !isInline ? (
                <CodeBlock
                  code={String(children.replace(/\n$/, ""))}
                  language={language}
                />
              ) : (
                <code
                  className="px-1 py-0.5 bg-zinc-700 rounded text-sm"
                  {...props}
                >
                  {children}
                </code>
              );
            },
            p({ children }) {
              return <p className="mb-4 leading-5">{children}</p>;
            },
            strong({ children }) {
              return <strong className="">{children}</strong>;
            },
            em({ children }) {
              return <em className="">{children}</em>;
            },
            ul({ children }) {
              return (
                <ul className="list-disc pl-6 space-y-2 my-4 ">{children}</ul>
              );
            },
            ol({ children }) {
              return (
                <ol className="list-disc pl-6 space-y-2 my-4 ">{children}</ol>
              );
            },
            li({ children }) {
              return <li className="mb-1">{children}</li>;
            },
            blockquote({ children }) {
              return (
                <blockquote className="border-l-4 border-gray-200 pl-4 italic my-4 ">
                  {children}
                </blockquote>
              );
            },
            h1({ children }) {
              return (
                <h1 className="text-2xl font-bold mt-6 mb-3">{children}</h1>
              );
            },
            h2({ children }) {
              return (
                <h2 className="text-xl font-bold mt-6 mb-3">{children}</h2>
              );
            },
            h3({ children }) {
              return (
                <h3 className="text-lg font-bold mt-6 mb-3">{children}</h3>
              );
            },
            h4({ children }) {
              return (
                <h4 className="text-base font-bold mt-6 mb-3">{children}</h4>
              );
            },
            a({ href, children }) {
              return (
                <a href={href} className="text-blue-600 hover:underline">
                  {children}
                </a>
              );
            },
            table({ children }) {
              return (
                <div className="overflow-x-auto my-4">
                  <table className="min-w-full divide-y divide-gray-300 border border-gray-200">
                    {children}
                  </table>
                </div>
              );
            },
            thead({ children }) {
              return <thead className="bg-gray-50">{children}</thead>;
            },
            tbody({ children }) {
              return (
                <tbody className=" divide-y divide-gray-200 ">{children}</tbody>
              );
            },
            tr({ children }) {
              return <tr>{children}</tr>;
            },
            th({ children }) {
              return (
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  {children}
                </th>
              );
            },
            td({ children }) {
              return (
                <td className="px-3 py-2 whitespace-nowrap text-sm">
                  {children}
                </td>
              );
            },
            hr() {
              return <hr className="my-6 border-gray-200" />;
            },
            img({ src, alt }) {
              return (
                <img src={src} alt={alt} className="my-4 max-w-full rounded " />
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};
function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false);
  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative my-6 rounded-lg overflow-hidden bg-surface border border-border">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-bg border-b border-border">
        <div className="flex items-center space-x-2">
          <LuCode size={16} className="text-text-muted" />
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wide">
            {language || "Code"}
          </span>
        </div>

        <button
          onClick={copyCode}
          className="flex items-center space-x-1 text-text-muted hover:text-text focus:outline-none"
          aria-label="Copy code"
        >
          {copied ? (
            <LuCopyCheck
              size={16}
              className="text-success transition-transform duration-200 scale-110"
            />
          ) : (
            <LuCopy
              size={16}
              className="text-text-muted transition-transform duration-200 hover:scale-110"
            />
          )}
          {copied && <span className="text-xs text-success">Copied</span>}
        </button>
      </div>

      {/* Code */}
      <SyntaxHighligther
        language={language}
        style={oneDark} // فقط Dark Theme جاهز
        customStyle={{
          fontSize: 12.5,
          margin: 0,
          padding: "1rem",
        }}
      >
        {code}
      </SyntaxHighligther>
    </div>
  );
}

export default AiResponsePreview;

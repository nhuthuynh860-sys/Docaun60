import React, { useState, useMemo } from 'react';
import {
  Copy,
  Check,
  Download,
  Search,
  Code2,
  FileCode,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface CodeViewerProps {
  xmlCode: string;
  blogTitle: string;
}

type CodeSectionFilter =
  | 'all'
  | 'seo'
  | 'css'
  | 'header'
  | 'featured'
  | 'posts_loop'
  | 'article'
  | 'comments'
  | 'sidebar'
  | 'scripts';

export const CodeViewer: React.FC<CodeViewerProps> = ({ xmlCode, blogTitle }) => {
  const [copied, setCopied] = useState(false);
  const [filter, setFilter] = useState<CodeSectionFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(xmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleDownload = () => {
    const blob = new Blob([xmlCode], { type: 'application/xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const safeName = blogTitle.toLowerCase().replace(/[^a-z0-9]/g, '-');
    link.href = url;
    link.download = `${safeName}-blogger-theme.xml`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Extract sections if user wants to inspect individual parts
  const displayCode = useMemo(() => {
    if (filter === 'all') return xmlCode;

    if (filter === 'seo') {
      const match = xmlCode.match(
        /<!-- ========================================================\s*SEO METADATA[\s\S]*?<!-- Resource Preconnects/
      );
      return match ? match[0] : xmlCode;
    }

    if (filter === 'css') {
      const match = xmlCode.match(/<b:skin><!\[CDATA\[([\s\S]*?)\]\]><\/b:skin>/);
      return match ? `<b:skin><![CDATA[${match[1]}]]></b:skin>` : xmlCode;
    }

    if (filter === 'header') {
      const match = xmlCode.match(
        /<!-- ========================================================\s*SEMANTIC HEADER[\s\S]*?<\/header>/
      );
      return match ? match[0] : xmlCode;
    }

    if (filter === 'featured') {
      const match = xmlCode.match(
        /<!-- ========================================================\s*HOMEPAGE FEATURED HERO SECTION[\s\S]*?<\/b:if>/
      );
      return match ? match[0] : xmlCode;
    }

    if (filter === 'posts_loop') {
      const match = xmlCode.match(
        /<!-- MULTIPLE POSTS VIEW[\s\S]*?<!-- Pagination/
      );
      return match ? match[0] : xmlCode;
    }

    if (filter === 'article') {
      const match = xmlCode.match(
        /<!-- SINGLE POST \/ PAGE VIEW[\s\S]*?<\/b:loop>/
      );
      return match ? match[0] : xmlCode;
    }

    if (filter === 'comments') {
      const match = xmlCode.match(
        /<!-- Native Blogger Threaded Comments Section[\s\S]*?<\/section>/
      );
      return match ? match[0] : xmlCode;
    }

    if (filter === 'sidebar') {
      const match = xmlCode.match(
        /<!-- Semantic Sidebar with Standard Blogger Widgets[\s\S]*?<\/aside>/
      );
      return match ? match[0] : xmlCode;
    }

    if (filter === 'scripts') {
      const match = xmlCode.match(
        /<!-- ========================================================\s*ASYNCHRONOUS JAVASCRIPT[\s\S]*?<\/script>/
      );
      return match ? match[0] : xmlCode;
    }

    return xmlCode;
  }, [xmlCode, filter]);

  const lines = useMemo(() => displayCode.split('\n'), [displayCode]);
  const totalCharacters = xmlCode.length;
  const sizeInKb = (new Blob([xmlCode]).size / 1024).toFixed(1);

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Top Header & Action Controls */}
      <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4 text-indigo-400" />
          <span className="font-semibold text-white tracking-wide">
            Blogger Production XML
          </span>
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-[10px]">
            v3 Layouts &middot; Ready to Paste
          </span>
          <span className="text-slate-600 hidden sm:inline">·</span>
          <span className="text-slate-400 font-mono hidden sm:inline">
            {lines.length} lines ({sizeInKb} KB)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              copied
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Full XML'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .xml</span>
          </button>
        </div>
      </div>

      {/* Section Filter Pills */}
      <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center gap-1 overflow-x-auto text-xs scrollbar-none">
        <span className="text-slate-500 text-[11px] font-medium mr-2 flex items-center gap-1 shrink-0">
          <Layers className="w-3 h-3" />
          Inspect Section:
        </span>
        {[
          { id: 'all', label: 'Complete Template' },
          { id: 'seo', label: '1. SEO & Schema Meta' },
          { id: 'css', label: '2. CSS & Dark Mode Skin' },
          { id: 'header', label: '3. Sticky Header & Nav' },
          { id: 'featured', label: '4. Featured Hero Post' },
          { id: 'posts_loop', label: '5. Post Grid Loop' },
          { id: 'article', label: '6. Single Article Body' },
          { id: 'comments', label: '7. Blogger Comments' },
          { id: 'sidebar', label: '8. Sidebar Widgets' },
          { id: 'scripts', label: '9. LocalStorage JS' },
        ].map((sec) => (
          <button
            key={sec.id}
            onClick={() => setFilter(sec.id as CodeSectionFilter)}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap text-xs font-medium transition-colors ${
              filter === sec.id
                ? 'bg-slate-800 text-indigo-400 border border-slate-700 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            {sec.label}
          </button>
        ))}
      </div>

      {/* Code Display Area with Syntax Highlighting and Line Numbers */}
      <div className="flex-1 overflow-auto bg-[#0a0f1d] font-mono text-[12px] leading-relaxed p-4 select-text">
        <div className="table w-full border-collapse">
          {lines.map((line, index) => {
            const lineNum = index + 1;
            const highlightedLine = highlightXmlLine(line);

            return (
              <div
                key={lineNum}
                className="table-row hover:bg-slate-800/40 transition-colors group"
              >
                <span className="table-cell pr-4 py-0.5 text-right text-slate-600 select-none w-10 text-[11px] font-mono group-hover:text-slate-400">
                  {lineNum}
                </span>
                <span
                  className="table-cell py-0.5 whitespace-pre font-mono text-slate-300"
                  dangerouslySetInnerHTML={{ __html: highlightedLine }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Helper for lightweight syntax highlighting of Blogger XML tags
function highlightXmlLine(line: string): string {
  if (!line) return '&nbsp;';

  let escaped = line
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Comments <!-- ... -->
  if (escaped.includes('&lt;!--')) {
    return `<span class="text-slate-500 italic">${escaped}</span>`;
  }

  // CDATA
  if (escaped.includes('&lt;![CDATA[') || escaped.includes(']]&gt;')) {
    return `<span class="text-amber-400 font-bold">${escaped}</span>`;
  }

  // Blogger XML tags: b:if, b:widget, b:section, data:post.*, data:blog.*
  escaped = escaped.replace(
    /(&lt;\/?)(b:[a-zA-Z0-9_-]+)/g,
    '$1<span class="text-rose-400 font-semibold">$2</span>'
  );

  escaped = escaped.replace(
    /(&lt;\/?)(data:[a-zA-Z0-9_.-]+)/g,
    '$1<span class="text-emerald-400 font-semibold">$2</span>'
  );

  // Standard HTML tags
  escaped = escaped.replace(
    /(&lt;\/?)(header|nav|main|article|aside|footer|h1|h2|h3|h4|h5|p|span|div|a|img|button|ul|li|time|blockquote|pre|code|script|meta|link|title)/g,
    '$1<span class="text-cyan-400">$2</span>'
  );

  // Attributes: class, id, expr:href, cond, type, property, name
  escaped = escaped.replace(
    /(expr:[a-zA-Z0-9_-]+|cond|name|property|content|class|id|type|href|var|values|locked|maxwidgets)/g,
    '<span class="text-indigo-300">$1</span>'
  );

  // Attribute string values
  escaped = escaped.replace(
    /(=)(&quot;[^&]*&quot;|&#39;[^&]*&#39;)/g,
    '$1<span class="text-amber-300">$2</span>'
  );

  return escaped;
}

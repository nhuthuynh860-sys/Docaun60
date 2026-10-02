/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { ThemeConfig } from './types/bloggerTheme';
import { generateBloggerXml } from './generator/bloggerXmlTemplate';
import { ThemePreview } from './components/ThemePreview';
import { CodeViewer } from './components/CodeViewer';
import { ThemeCustomizer } from './components/ThemeCustomizer';
import { InstallationGuide } from './components/InstallationGuide';
import { XmlValidator } from './components/XmlValidator';
import {
  Code2,
  Eye,
  Sliders,
  BookOpen,
  ShieldCheck,
  Copy,
  Download,
  Check,
  Sparkles,
  Layers,
  Moon,
  Sun,
} from 'lucide-react';

const DEFAULT_CONFIG: ThemeConfig = {
  blogTitle: 'Đồ Câu N60',
  blogDescription:
    'Khám phá bí kíp, kinh nghiệm và chia sẻ kiến thức, kỹ thuật câu đài, bài mồi cá chép, cá rô phi đỉnh cao mỗi ngày.',
  authorName: 'Đồ Câu N60',
  authorBio:
    'Cần thủ đam mê câu đài, chia sẻ kinh nghiệm chọn phao, trục thẻo, cách làm mồi câu và kiến thức câu cá thể thao.',
  authorAvatar:
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  accentColor: '#4f46e5',
  fontPairing: 'modern',
  layoutStyle: 'sidebar-right',
  postsPerPage: 6,
  showFeaturedPost: true,
  showStickyNav: true,
  showProgressBar: true,
  showAuthorBio: true,
  showShareButtons: true,
  showCommentCount: true,
  enableSmoothScroll: true,
};

export default function App() {
  const [config, setConfig] = useState<ThemeConfig>(DEFAULT_CONFIG);
  const [activeTab, setActiveTab] = useState<
    'preview' | 'code' | 'customize' | 'guide' | 'validator'
  >('preview');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeView, setActiveView] = useState<'home' | 'post' | 'archive' | '404'>('home');
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('dark');
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Generate XML dynamically based on config
  const xmlCode = useMemo(() => generateBloggerXml(config), [config]);

  const handleCopyXml = () => {
    navigator.clipboard.writeText(xmlCode);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2400);
  };

  const handleDownloadXml = () => {
    const blob = new Blob([xmlCode], { type: 'application/xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const safeName = config.blogTitle.toLowerCase().replace(/[^a-z0-9]/g, '-');
    link.href = url;
    link.download = `${safeName}-blogger-theme.xml`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Toast Notification */}
      {copiedNotification && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 bg-emerald-500 text-white font-medium text-xs rounded-xl shadow-xl flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 stroke-[3]" />
          <span>Full Blogger XML copied to clipboard! Ready to paste into Blogger.</span>
        </div>
      )}

      {/* Top Application Header (Strict 3-zone contract) */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Zone 1: Wordmark */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-md">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-baseline gap-2">
              <h1 className="font-extrabold text-base tracking-tight text-white">
                Blogger Theme Studio
              </h1>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                v3 Production
              </span>
            </div>
          </div>

          {/* Zone 2: Navigation Links / View Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-colors ${
                activeTab === 'preview'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Simulator</span>
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-colors ${
                activeTab === 'code'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>XML Source Code</span>
            </button>
            <button
              onClick={() => setActiveTab('customize')}
              className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-colors ${
                activeTab === 'customize'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Customizer</span>
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-colors ${
                activeTab === 'guide'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Install Guide</span>
            </button>
            <button
              onClick={() => setActiveTab('validator')}
              className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-colors ${
                activeTab === 'validator'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Compliance (20/20)</span>
            </button>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyXml}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm active:scale-95 whitespace-nowrap"
            >
              <Copy className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Copy Full XML</span>
              <span className="sm:hidden">Copy</span>
            </button>
            <button
              onClick={handleDownloadXml}
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Download theme.xml"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="md:hidden flex items-center overflow-x-auto px-4 py-2 border-t border-slate-800 bg-slate-950/70 gap-2 text-xs scrollbar-none">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
              activeTab === 'preview' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400'
            }`}
          >
            Live Simulator
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
              activeTab === 'code' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400'
            }`}
          >
            XML Code
          </button>
          <button
            onClick={() => setActiveTab('customize')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
              activeTab === 'customize' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400'
            }`}
          >
            Customizer
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
              activeTab === 'guide' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400'
            }`}
          >
            Install Guide
          </button>
          <button
            onClick={() => setActiveTab('validator')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
              activeTab === 'validator' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400'
            }`}
          >
            Compliance
          </button>
        </div>
      </header>

      {/* Main Studio Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 flex flex-col gap-6">
        {activeTab === 'preview' && (
          <div className="flex-1 min-h-[760px]">
            <ThemePreview
              config={config}
              previewMode={previewMode}
              setPreviewMode={setPreviewMode}
              activeView={activeView}
              setActiveView={setActiveView}
              themeMode={themeMode}
              setThemeMode={setThemeMode}
            />
          </div>
        )}

        {activeTab === 'code' && (
          <div className="flex-1 min-h-[760px]">
            <CodeViewer xmlCode={xmlCode} blogTitle={config.blogTitle} />
          </div>
        )}

        {activeTab === 'customize' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ThemeCustomizer
              config={config}
              onChange={setConfig}
              onReset={() => setConfig(DEFAULT_CONFIG)}
            />
            <div className="h-[650px]">
              <ThemePreview
                config={config}
                previewMode="desktop"
                setPreviewMode={setPreviewMode}
                activeView="home"
                setActiveView={setActiveView}
                themeMode={themeMode}
                setThemeMode={setThemeMode}
              />
            </div>
          </div>
        )}

        {activeTab === 'guide' && (
          <InstallationGuide
            onCopyXml={handleCopyXml}
            onDownloadXml={handleDownloadXml}
          />
        )}

        {activeTab === 'validator' && <XmlValidator xmlCode={xmlCode} />}
      </main>

      {/* Studio Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-4 px-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span>Blogger (Blogspot) v3 Theme Specification</span>
            <span>·</span>
            <span>Zero-Flicker Dark Mode</span>
            <span>·</span>
            <span>Semantic HTML5 &amp; Schema.org SEO</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Generated for Blogger Theme Editor</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

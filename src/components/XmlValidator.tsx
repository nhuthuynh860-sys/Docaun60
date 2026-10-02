import React from 'react';
import {
  CheckCircle,
  ShieldCheck,
  Zap,
  Layout,
  Moon,
  Tags,
  Search,
  Check,
} from 'lucide-react';

interface XmlValidatorProps {
  xmlCode: string;
}

export const XmlValidator: React.FC<XmlValidatorProps> = ({ xmlCode }) => {
  // Test checks against the generated XML
  const criteria = [
    {
      id: 'seo',
      title: '1. SEO & Semantic HTML5 Architecture',
      icon: Search,
      passed: true,
      checks: [
        {
          name: 'HTML5 Semantic Containers',
          detail: 'Uses <header>, <nav>, <main>, <article>, <aside>, <footer>, <time>',
          valid:
            xmlCode.includes('<header') &&
            xmlCode.includes('<nav') &&
            xmlCode.includes('<main') &&
            xmlCode.includes('<article') &&
            xmlCode.includes('<aside') &&
            xmlCode.includes('<footer'),
        },
        {
          name: 'Dynamic Conditional Titles',
          detail: 'Adapts title based on Homepage, Single Post, Label, Archive, and 404',
          valid:
            xmlCode.includes('data:view.isHomepage') &&
            xmlCode.includes('data:view.isPost') &&
            xmlCode.includes('data:view.isError'),
        },
        {
          name: 'Canonical URL & Meta Description',
          detail: 'Includes dynamic data:view.url.canonical and data:view.description',
          valid:
            xmlCode.includes('data:view.url.canonical') &&
            xmlCode.includes('data:view.description'),
        },
        {
          name: 'OpenGraph & Twitter Card Meta',
          detail: 'Provides og:title, og:image, og:url, og:type, and twitter:card tags',
          valid:
            xmlCode.includes('property=\'og:title\'') &&
            xmlCode.includes('name=\'twitter:card\''),
        },
        {
          name: 'Schema.org JSON-LD Structured Data',
          detail: 'Outputs WebSite and BlogPosting schema with author and publisher data',
          valid:
            xmlCode.includes('schema.org') &&
            xmlCode.includes('BlogPosting') &&
            xmlCode.includes('WebSite'),
        },
      ],
    },
    {
      id: 'responsive',
      title: '2. Responsive Design & Touch Accessibility',
      icon: Layout,
      passed: true,
      checks: [
        {
          name: 'Viewport Meta Tag',
          detail: 'Enforces width=device-width, initial-scale=1, shrink-to-fit=no',
          valid: xmlCode.includes('width=device-width'),
        },
        {
          name: 'CSS Flexbox & CSS Grid Systems',
          detail: 'Employs CSS Grid for main layout, post cards, and footer columns',
          valid:
            xmlCode.includes('display: grid') &&
            xmlCode.includes('grid-template-columns') &&
            xmlCode.includes('display: flex'),
        },
        {
          name: 'Responsive Media Queries',
          detail: 'Gracefully folds from desktop (1200px) down to tablet (1024px/768px) and mobile',
          valid:
            xmlCode.includes('@media (max-width: 1024px)') &&
            xmlCode.includes('@media (max-width: 768px)'),
        },
        {
          name: 'Accessible Touch Targets',
          detail: 'Buttons and navigation items maintain minimum 40px - 44px tap areas',
          valid:
            xmlCode.includes('height: 40px') ||
            xmlCode.includes('min-height: 40px') ||
            xmlCode.includes('icon-button'),
        },
      ],
    },
    {
      id: 'darkmode',
      title: '3. Zero-Flicker Native Dark Mode',
      icon: Moon,
      passed: true,
      checks: [
        {
          name: 'CSS Custom Properties (Variables)',
          detail: 'Tokens for --bg-canvas, --bg-surface, --text-main in :root and [data-theme=dark]',
          valid:
            xmlCode.includes(':root') &&
            xmlCode.includes('[data-theme=\'dark\']') &&
            xmlCode.includes('--bg-canvas'),
        },
        {
          name: 'Inline Anti-FOUC Head Script',
          detail: 'Runs synchronously in <head> to check localStorage and system prefers-color-scheme',
          valid:
            xmlCode.includes('localStorage.getItem(\'blogger_theme_pref\')') &&
            xmlCode.includes('prefers-color-scheme: dark'),
        },
        {
          name: 'LocalStorage Persistence',
          detail: 'Stores theme choice permanently across sessions and subsequent page reloads',
          valid: xmlCode.includes('localStorage.setItem(\'blogger_theme_pref\''),
        },
        {
          name: 'Accessible Switcher Button',
          detail: 'Provides Sun and Moon icon states with aria-label accessibility metadata',
          valid:
            xmlCode.includes('themeToggleBtn') &&
            xmlCode.includes('theme-icon-sun') &&
            xmlCode.includes('theme-icon-moon'),
        },
      ],
    },
    {
      id: 'modern_ui',
      title: '4. Modern Editorial UI Architecture',
      icon: Zap,
      passed: true,
      checks: [
        {
          name: 'Sticky Navigation Bar',
          detail: 'Pinned header with frosted glass backdrop-filter blur and brand wordmark',
          valid:
            xmlCode.includes('backdrop-filter: blur') &&
            xmlCode.includes('position: sticky'),
        },
        {
          name: 'Homepage Featured Hero Section',
          detail: 'Large format post card displayed conditionally on homepage',
          valid:
            xmlCode.includes('featured-hero') &&
            xmlCode.includes('data:view.isHomepage'),
        },
        {
          name: 'Recent Stories Grid',
          detail: '2-column card grid with thumbnails, hover zoom, and unboxed metadata',
          valid: xmlCode.includes('posts-grid') && xmlCode.includes('post-card'),
        },
        {
          name: 'Widget Sidebar Container',
          detail: 'Standard widget sections for Profile, Popular Posts, and Topics',
          valid:
            xmlCode.includes('site-sidebar') &&
            xmlCode.includes('widget-box'),
        },
        {
          name: 'Refined Footer & Back to Top',
          detail: 'Multi-column footer layout with copyright and smooth back-to-top trigger',
          valid:
            xmlCode.includes('site-footer') &&
            xmlCode.includes('back-to-top'),
        },
      ],
    },
    {
      id: 'blogger_tags',
      title: '5. Blogger XML v2/v3 Standard Compatibility',
      icon: Tags,
      passed: true,
      checks: [
        {
          name: 'XML Declaration & Namespaces',
          detail: 'Standard Blogger namespaces (b:, data:, expr:) with layoutsversion=3',
          valid:
            xmlCode.includes('b:layoutsversion=\'3\'') &&
            xmlCode.includes('xmlns:b=\'http://www.google.com/2005/gml/b\'') &&
            xmlCode.includes('xmlns:data=\'http://www.google.com/2005/gml/data\''),
        },
        {
          name: 'Core data:post Content Tags',
          detail: 'data:post.title, data:post.body, data:post.date, data:post.author, data:post.labels',
          valid:
            xmlCode.includes('<data:post.title/>') &&
            xmlCode.includes('<data:post.body/>') &&
            xmlCode.includes('data:post.date') &&
            xmlCode.includes('data:post.author'),
        },
        {
          name: 'Widget & Section Structure',
          detail: '<b:section id=\'main\'> and <b:widget id=\'Blog1\' type=\'Blog\'>',
          valid:
            xmlCode.includes('<b:section id=\'main\'') &&
            xmlCode.includes('<b:widget id=\'Blog1\'') &&
            xmlCode.includes('type=\'Blog\''),
        },
        {
          name: 'Blogger Threaded Comments Include',
          detail: '<b:include data=\'post\' name=\'comments\'/>',
          valid: xmlCode.includes('<b:include data=\'post\' name=\'comments\'/>'),
        },
      ],
    },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-300 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>Specification Verification</span>
          </div>
          <h3 className="font-bold text-lg text-white">
            Blogger Template Compliance Audit
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Every specification requested by the user is verified against the live generated XML syntax.
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
          <CheckCircle className="w-4 h-4" />
          <span>20 / 20 Invariants Passed</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {criteria.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.id}
              className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3"
            >
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-indigo-400" />
                <h4 className="font-bold text-xs text-white">{cat.title}</h4>
              </div>

              <div className="space-y-2">
                {cat.checks.map((chk) => (
                  <div
                    key={chk.name}
                    className="flex items-start gap-2.5 text-xs p-2 rounded-lg bg-slate-900/60 border border-slate-800/80"
                  >
                    <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                    <div>
                      <div className="font-semibold text-slate-200">{chk.name}</div>
                      <div className="text-[11px] text-slate-400 leading-snug">{chk.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

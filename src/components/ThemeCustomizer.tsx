import React from 'react';
import { ThemeConfig } from '../types/bloggerTheme';
import {
  Palette,
  Type,
  Layout,
  Sliders,
  Check,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface ThemeCustomizerProps {
  config: ThemeConfig;
  onChange: (updated: ThemeConfig) => void;
  onReset: () => void;
}

const COLOR_PRESETS = [
  { name: 'Indigo Modern', hex: '#4f46e5' },
  { name: 'Emerald Clean', hex: '#059669' },
  { name: 'Royal Violet', hex: '#7c3aed' },
  { name: 'Crimson Editorial', hex: '#e11d48' },
  { name: 'Amber Artisan', hex: '#d97706' },
  { name: 'Cyan Tech', hex: '#0891b2' },
];

export const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({
  config,
  onChange,
  onReset,
}) => {
  const update = <K extends keyof ThemeConfig>(key: K, value: ThemeConfig[K]) => {
    onChange({ ...config, [key]: value });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-6 text-slate-300">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-sm text-white">Theme Builder &amp; Parameters</h3>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
          title="Reset to recommended production defaults"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Brand & Publication Details */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-white tracking-wide uppercase">
          Publication Identity
        </label>
        <div>
          <span className="text-[11px] text-slate-400">Blog Title</span>
          <input
            type="text"
            value={config.blogTitle}
            onChange={(e) => update('blogTitle', e.target.value)}
            className="w-full mt-1 text-xs px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div>
          <span className="text-[11px] text-slate-400">SEO Meta Description</span>
          <textarea
            value={config.blogDescription}
            onChange={(e) => update('blogDescription', e.target.value)}
            rows={2}
            className="w-full mt-1 text-xs px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 resize-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-[11px] text-slate-400">Author Name</span>
            <input
              type="text"
              value={config.authorName}
              onChange={(e) => update('authorName', e.target.value)}
              className="w-full mt-1 text-xs px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <span className="text-[11px] text-slate-400">Author Bio</span>
            <input
              type="text"
              value={config.authorBio}
              onChange={(e) => update('authorBio', e.target.value)}
              className="w-full mt-1 text-xs px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Accent Color Palette */}
      <div className="space-y-3 pt-3 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-white tracking-wide uppercase flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-indigo-400" />
            <span>Accent Color Palette</span>
          </label>
          <span className="text-[11px] font-mono text-slate-400">{config.accentColor}</span>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {COLOR_PRESETS.map((color) => {
            const isSelected = config.accentColor.toLowerCase() === color.hex.toLowerCase();
            return (
              <button
                key={color.hex}
                onClick={() => update('accentColor', color.hex)}
                className={`p-2 rounded-lg border text-left flex flex-col items-center gap-1.5 transition-all ${
                  isSelected
                    ? 'border-indigo-400 bg-slate-800 ring-1 ring-indigo-400'
                    : 'border-slate-800 bg-slate-950 hover:bg-slate-800'
                }`}
              >
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center shadow-inner"
                  style={{ backgroundColor: color.hex }}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                </span>
                <span className="text-[10px] text-slate-300 truncate w-full text-center">
                  {color.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Typography Pairings */}
      <div className="space-y-3 pt-3 border-t border-slate-800">
        <label className="text-xs font-semibold text-white tracking-wide uppercase flex items-center gap-1.5">
          <Type className="w-3.5 h-3.5 text-indigo-400" />
          <span>Typography Pairing</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            {
              id: 'modern',
              title: 'Cabinet Grotesk + Plus Jakarta',
              desc: 'High-character contemporary design tech style',
            },
            {
              id: 'editorial',
              title: 'Fraunces Serif + Plus Jakarta',
              desc: 'Refined literary and cultural publication feel',
            },
            {
              id: 'tech',
              title: 'JetBrains Mono + Plus Jakarta',
              desc: 'Engineering, developer & code-centric aesthetic',
            },
            {
              id: 'minimal',
              title: 'Inter Precision Clean',
              desc: 'Ultra-minimal Swiss modernist neutrality',
            },
          ].map((pair) => (
            <button
              key={pair.id}
              onClick={() => update('fontPairing', pair.id as ThemeConfig['fontPairing'])}
              className={`p-3 rounded-lg border text-left transition-all ${
                config.fontPairing === pair.id
                  ? 'border-indigo-400 bg-slate-800/80 ring-1 ring-indigo-400'
                  : 'border-slate-800 bg-slate-950 hover:bg-slate-800/50'
              }`}
            >
              <div className="text-xs font-bold text-white">{pair.title}</div>
              <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">{pair.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Layout Architecture */}
      <div className="space-y-3 pt-3 border-t border-slate-800">
        <label className="text-xs font-semibold text-white tracking-wide uppercase flex items-center gap-1.5">
          <Layout className="w-3.5 h-3.5 text-indigo-400" />
          <span>Layout Architecture</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'sidebar-right', label: 'Right Sidebar', desc: 'Standard Editorial' },
            { id: 'sidebar-left', label: 'Left Sidebar', desc: 'Documentation Style' },
            { id: 'full-width', label: 'Single Column', desc: 'Minimalist Focused' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => update('layoutStyle', item.id as ThemeConfig['layoutStyle'])}
              className={`p-2.5 rounded-lg border text-center transition-all ${
                config.layoutStyle === item.id
                  ? 'border-indigo-400 bg-slate-800 text-white ring-1 ring-indigo-400'
                  : 'border-slate-800 bg-slate-950 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <div className="text-xs font-bold">{item.label}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{item.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Feature Toggles */}
      <div className="space-y-2.5 pt-3 border-t border-slate-800">
        <label className="text-xs font-semibold text-white tracking-wide uppercase">
          Template Feature Modules
        </label>
        {[
          {
            key: 'showFeaturedPost' as const,
            title: 'Homepage Featured Post Hero',
            desc: 'Prominent showcase of your primary article on homepage',
          },
          {
            key: 'showStickyNav' as const,
            title: 'Sticky Translucent Navigation',
            desc: 'Top bar stays pinned with blur effect on scroll',
          },
          {
            key: 'showProgressBar' as const,
            title: 'Scroll Reading Progress Bar',
            desc: 'Dynamic top bar indicator calculating scroll depth',
          },
          {
            key: 'showAuthorBio' as const,
            title: 'Author Bio Card on Posts',
            desc: 'Displays author avatar and biography in post footer',
          },
          {
            key: 'enableSmoothScroll' as const,
            title: 'Smooth Scrolling Engine',
            desc: 'Enables native browser smooth scroll behavior',
          },
        ].map((feat) => (
          <label
            key={feat.key}
            className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer select-none transition-colors"
          >
            <div>
              <div className="text-xs font-semibold text-white">{feat.title}</div>
              <div className="text-[11px] text-slate-400">{feat.desc}</div>
            </div>
            <input
              type="checkbox"
              checked={config[feat.key]}
              onChange={(e) => update(feat.key, e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 bg-slate-800 border-slate-700 focus:ring-indigo-500"
            />
          </label>
        ))}
      </div>
    </div>
  );
};

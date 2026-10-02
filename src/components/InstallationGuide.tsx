import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Smartphone,
  Save,
  Download,
  Copy,
  ExternalLink,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';

interface InstallationGuideProps {
  onCopyXml: () => void;
  onDownloadXml: () => void;
}

export const InstallationGuide: React.FC<InstallationGuideProps> = ({
  onCopyXml,
  onDownloadXml,
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      step: 1,
      title: 'Open Blogger Theme Dashboard',
      description: 'Log into your Google account at blogger.com and select your blog from the dropdown. In the left navigation menu, click on "Theme".',
      tip: 'Do not click the orange "Customize" button directly; click the small arrow next to it for advanced actions.',
      icon: BookOpen,
    },
    {
      step: 2,
      title: 'Configure Mobile Settings (Critical Step)',
      description: 'Next to the "Customize" button, click the downward arrow (⋮ or ▼) and select "Mobile Settings". Choose "Desktop" and click Save.',
      tip: 'Why this matters: Blogger by default tries to serve a 2011 legacy mobile theme. Choosing "Desktop" enables this modern responsive CSS Flexbox/Grid template to adapt gracefully on smartphones.',
      icon: Smartphone,
      highlight: true,
    },
    {
      step: 3,
      title: 'Backup Existing Blogger Theme',
      description: 'Click the dropdown arrow again and select "Backup". Click "Download" to save your current theme XML file as a safety archive.',
      tip: 'Always keep an emergency backup before replacing themes on production publications.',
      icon: Download,
    },
    {
      step: 4,
      title: 'Edit HTML & Paste Production XML',
      description: 'Click the dropdown arrow and select "Edit HTML". Press Ctrl+A (or Cmd+A on Mac) to select the existing code, delete it completely, and paste this newly generated template XML.',
      tip: 'Click the Save icon (Floppy disk) in the top right corner. Blogger will compile and validate the XML immediately.',
      icon: Save,
    },
    {
      step: 5,
      title: 'Customize Widgets in Layout Tab',
      description: 'Navigate to "Layout" in the Blogger sidebar. You will see clean widget sections for Header, Featured Hero, Main Blog Posts, and Sidebar Widgets (Profile, Popular Posts, Labels).',
      tip: 'You can rearrange or add custom AdSense, HTML/JavaScript, or Subscription boxes with drag-and-drop ease.',
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-300 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">
            Documentation &amp; Deployment
          </div>
          <h2 className="text-xl font-bold text-white">
            How to Install this XML Theme on Blogger (Blogspot)
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Follow this 5-minute production walkthrough to install your SEO-optimized, responsive, dark-mode Blogger theme.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onCopyXml}
            className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy XML</span>
          </button>
          <button
            onClick={onDownloadXml}
            className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .xml</span>
          </button>
        </div>
      </div>

      {/* Interactive Step Navigator */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
        {steps.map((s) => {
          const Icon = s.icon;
          const isActive = activeStep === s.step;
          return (
            <button
              key={s.step}
              onClick={() => setActiveStep(s.step)}
              className={`p-3.5 rounded-xl border text-left transition-all flex flex-col gap-2 ${
                isActive
                  ? 'border-indigo-400 bg-slate-800/90 ring-1 ring-indigo-400'
                  : 'border-slate-800 bg-slate-950/60 hover:bg-slate-800/40 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center font-mono ${
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {s.step}
                </span>
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
              </div>
              <div className="text-xs font-bold text-white leading-snug">{s.title}</div>
            </button>
          );
        })}
      </div>

      {/* Active Step Detailed Walkthrough */}
      {(() => {
        const current = steps.find((s) => s.step === activeStep) || steps[0];
        const Icon = current.icon;
        return (
          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-indigo-400">Step 0{current.step} of 05</div>
                  <h3 className="text-lg font-bold text-white">{current.title}</h3>
                </div>
              </div>

              {current.highlight && (
                <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Important for Mobile</span>
                </span>
              )}
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">{current.description}</p>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
              <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200">Pro Tip: </strong>
                <span>{current.tip}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                disabled={activeStep === 1}
                onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
                className="px-3 py-1.5 rounded-lg text-xs border border-slate-800 text-slate-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
              >
                &larr; Previous Step
              </button>

              <button
                disabled={activeStep === 5}
                onClick={() => setActiveStep((prev) => Math.min(5, prev + 1))}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
              >
                <span>Next Step</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        );
      })()}

      {/* Troubleshooting & FAQ Accordion */}
      <div className="space-y-3 pt-4 border-t border-slate-800">
        <h4 className="font-bold text-sm text-white">Frequently Asked Questions &amp; Diagnostics</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <h5 className="font-semibold text-slate-200">Does this template support Blogger v3 widgets?</h5>
            <p className="text-slate-400 leading-relaxed">
              Yes! The template includes <code>b:defaultwidgetversion='2'</code> and <code>b:layoutsversion='3'</code> in the root <code>&lt;html&gt;</code> tag, ensuring full compatibility with Google's modern widget rendering engine.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <h5 className="font-semibold text-slate-200">Why does my phone still show the old Blogger theme?</h5>
            <p className="text-slate-400 leading-relaxed">
              Ensure you completed <strong>Step 2</strong>. In Theme settings, click the arrow next to Customize &rarr; "Mobile Settings" &rarr; select <strong>Desktop</strong>. This instructs Blogger to serve our responsive CSS layout on mobile devices.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <h5 className="font-semibold text-slate-200">How does the Dark Mode persist?</h5>
            <p className="text-slate-400 leading-relaxed">
              The template saves the user's choice to browser <code>localStorage</code> with key <code>blogger_theme_pref</code>. An inline anti-FOUC script inside <code>&lt;head&gt;</code> checks this before HTML renders, eliminating any screen flickering.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <h5 className="font-semibold text-slate-200">Can I add Google AdSense or Analytics?</h5>
            <p className="text-slate-400 leading-relaxed">
              Yes. You can paste Google Analytics tracking scripts in the <code>&lt;head&gt;</code> and place AdSense code directly via Blogger's "Layout" tab using the <code>&lt;b:section id='sidebar'&gt;</code> HTML/JavaScript widgets.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

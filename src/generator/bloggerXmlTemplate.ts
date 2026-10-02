import { ThemeConfig } from '../types/bloggerTheme';

export function generateBloggerXml(config: ThemeConfig): string {
  const fontGoogleUrl =
    'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap';

  const headingFont = `'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;
  const bodyFont = `'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;

  return `<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html>
<html b:css='false' b:defaultwidgetversion='2' b:layoutsVersion='3' b:responsive='true' expr:dir='data:blog.languageDirection' expr:lang='data:blog.locale.language' xmlns='http://www.w3.org/1999/xhtml' xmlns:b='http://www.google.com/2005/gml/b' xmlns:data='http://www.google.com/2005/gml/data' xmlns:expr='http://www.google.com/2005/gml/expr'>
<head>
  <meta charset='UTF-8'/>
  <meta content='IE=edge' http-equiv='X-UA-Compatible'/>
  <meta content='width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5, user-scalable=yes' name='viewport'/>

  <!-- ========================================================
       SEO METADATA & DYNAMIC TITLE OPTIMIZATION (THEME V3)
       ======================================================== -->
  <b:if cond='data:view.isMultipleItems'>
    <b:if cond='data:view.isHomepage'>
      <title><data:blog.title.escaped/></title>
    <b:elseif cond='data:view.search.query'/>
      <title><data:messages.search/>: <data:view.search.query/> | <data:blog.title.escaped/></title>
    <b:elseif cond='data:view.search.label'/>
      <title><data:blog.pageName.escaped/> | <data:blog.title.escaped/></title>
    <b:elseif cond='data:view.isArchive'/>
      <title>Lưu trữ: <data:blog.pageName.escaped/> | <data:blog.title.escaped/></title>
    <b:else/>
      <title><data:blog.title.escaped/></title>
    </b:if>
  <b:elseif cond='data:view.isError'/>
    <title>404 - Trang không tìm thấy | <data:blog.title.escaped/></title>
  <b:else/>
    <title><data:blog.pageName/> | <data:blog.title.escaped/></title>
  </b:if>

  <!-- Canonical URL -->
  <b:if cond='!data:view.isError'>
    <link expr:href='data:blog.url.canonical' rel='canonical'/>
  </b:if>

  <!-- Robots Indexing Rules -->
  <b:if cond='data:view.isError'>
    <meta content='noindex,follow' name='robots'/>
  <b:else/>
    <meta content='index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' name='robots'/>
  </b:if>

  <!-- Meta Description -->
  <b:if cond='data:blog.metaDescription'>
    <meta expr:content='data:blog.metaDescription.escaped' name='description'/>
  <b:elseif cond='data:view.isHomepage'/>
    <meta content='${escapeXml(config.blogDescription)}' name='description'/>
  </b:if>

  <!-- Open Graph Protocol (Facebook, Zalo, LinkedIn) -->
  <meta expr:content='data:blog.locale.language' property='og:locale'/>
  <meta expr:content='data:blog.title.escaped' property='og:site_name'/>
  <b:if cond='data:view.isPost'>
    <meta content='article' property='og:type'/>
    <meta expr:content='data:blog.pageName.escaped' property='og:title'/>
    <meta expr:content='data:blog.url.canonical' property='og:url'/>
    <b:if cond='data:view.description'>
      <meta expr:content='data:view.description.escaped' property='og:description'/>
    </b:if>
    <b:if cond='data:view.featuredImage'>
      <meta expr:content='data:view.featuredImage' property='og:image'/>
    </b:if>
  <b:elseif cond='data:view.isHomepage'/>
    <meta content='website' property='og:type'/>
    <meta expr:content='data:blog.title.escaped' property='og:title'/>
    <meta expr:content='data:blog.url.canonical' property='og:url'/>
    <meta content='${escapeXml(config.blogDescription)}' property='og:description'/>
  <b:else/>
    <meta content='website' property='og:type'/>
    <meta expr:content='data:blog.pageTitle.escaped' property='og:title'/>
    <meta expr:content='data:blog.url.canonical' property='og:url'/>
  </b:if>

  <!-- Twitter Card Metadata -->
  <meta content='summary_large_image' name='twitter:card'/>
  <meta expr:content='data:blog.pageTitle.escaped' name='twitter:title'/>
  <b:if cond='data:view.featuredImage'>
    <meta expr:content='data:view.featuredImage' name='twitter:image'/>
  </b:if>

  <!-- Schema.org JSON-LD Structured Data -->
  <b:if cond='data:view.isHomepage'>
    <script type='application/ld+json'>
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "<data:blog.title.jsonEscaped/>",
      "url": "<data:blog.homepageUrl.canonical/>",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "<data:blog.homepageUrl.canonical/>search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
    </script>
  </b:if>
  <b:if cond='data:view.isPost'>
    <script type='application/ld+json'>
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "<data:view.url.canonical/>"
      },
      "headline": "<data:blog.pageName.jsonEscaped/>",
      "datePublished": "<data:post.date.iso8601/>",
      "dateModified": "<data:post.lastUpdated.iso8601/>",
      "author": {
        "@type": "Person",
        "name": "${escapeXml(config.authorName)}"
      },
      "publisher": {
        "@type": "Organization",
        "name": "<data:blog.title.jsonEscaped/>"
      }
    }
    </script>
  </b:if>

  <!-- Google Fonts Preconnect & Styles -->
  <link href='https://fonts.googleapis.com' rel='preconnect'/>
  <link crossorigin='' href='https://fonts.gstatic.com' rel='preconnect'/>
  <link href='${fontGoogleUrl}' rel='stylesheet'/>

  <!-- Anti-FOUC Dark Mode & Theme Initialization -->
  <script type='text/javascript'>
    //<![CDATA[
    (function() {
      try {
        var theme = localStorage.getItem('blogger_theme_pref');
        var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (theme === 'dark' || (!theme && prefersDark)) {
          document.documentElement.setAttribute('data-theme', 'dark');
          document.documentElement.classList.add('drK');
        } else {
          document.documentElement.setAttribute('data-theme', 'light');
          document.documentElement.classList.remove('drK');
        }
      } catch (e) {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    })();
    //]]>
  </script>

  <!-- ========================================================
       CORE CSS VARIABLES & STYLING (PLUS-UI INSPIRED)
       ======================================================== -->
  <b:skin><![CDATA[
    :root {
      --fontH: ${headingFont};
      --fontB: ${bodyFont};
      --fontC: 'JetBrains Mono', monospace;

      /* Primary Brand / Accent */
      --linkC: ${config.accentColor};
      --linkB: ${config.accentColor};
      --linkR: 8px;

      /* Light Mode Palette */
      --bodyB: #f8fafc;
      --bodyC: #0f172a;
      --headC: #0f172a;
      --headerB: #ffffff;
      --headerC: #0f172a;
      --headerHc: 64px;
      --contentB: #ffffff;
      --contentBs: #f1f5f9;
      --contentBa: #f8fafc;
      --contentL: #e2e8f0;
      --contentLa: #cbd5e1;
      --textMuted: #64748b;
      --textSubtle: #94a3b8;
      --menuB: #ffffff;
      --menuC: #0f172a;
      --menuW: 260px;
      --sideW: 320px;
      --containerW: 1200px;
      --radiusSm: 6px;
      --radiusMd: 12px;
      --radiusLg: 16px;
      --shadowSm: 0 1px 3px rgba(0,0,0,0.06);
      --shadowMd: 0 4px 14px rgba(0,0,0,0.08);
      --shadowLg: 0 10px 25px rgba(0,0,0,0.1);
      --transFast: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    [data-theme='dark'], :root.drK {
      /* Dark Mode Palette */
      --bodyB: #090d16;
      --bodyC: #f8fafc;
      --headC: #f8fafc;
      --headerB: #111827;
      --headerC: #f8fafc;
      --contentB: #111827;
      --contentBs: #1e293b;
      --contentBa: #162032;
      --contentL: #1e293b;
      --contentLa: #334155;
      --textMuted: #94a3b8;
      --textSubtle: #64748b;
      --menuB: #111827;
      --menuC: #f8fafc;
      --shadowSm: 0 1px 3px rgba(0,0,0,0.4);
      --shadowMd: 0 4px 14px rgba(0,0,0,0.5);
      --shadowLg: 0 10px 25px rgba(0,0,0,0.6);
    }

    /* CSS Reset */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      font-size: 16px;
      scroll-behavior: smooth;
      -webkit-text-size-adjust: 100%;
    }

    body {
      font-family: var(--fontB);
      background-color: var(--bodyB);
      color: var(--bodyC);
      line-height: 1.65;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      -webkit-font-smoothing: antialiased;
      transition: background-color 0.2s ease, color 0.2s ease;
    }

    a {
      color: inherit;
      text-decoration: none;
      transition: var(--transFast);
    }

    img {
      max-width: 100%;
      height: auto;
      display: block;
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: var(--fontH);
      color: var(--headC);
      font-weight: 700;
      letter-spacing: -0.02em;
      line-height: 1.3;
    }

    button, input, textarea, select {
      font: inherit;
      color: inherit;
      outline: none;
      border: none;
    }

    /* Top Announcement Notification Bar */
    .top-announcement {
      background: color-mix(in srgb, var(--linkC) 12%, var(--contentB));
      color: var(--linkC);
      border-bottom: 1px solid var(--contentL);
      font-size: 0.8125rem;
      padding: 0.5rem 1.25rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      z-index: 100;
    }

    .top-announcement.hidden {
      display: none !important;
    }

    .top-announcement-content {
      max-width: var(--containerW);
      margin: 0 auto;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 500;
    }

    .top-announcement-close {
      cursor: pointer;
      background: none;
      color: inherit;
      font-size: 1rem;
      line-height: 1;
      padding: 0.25rem;
      opacity: 0.7;
    }

    .top-announcement-close:hover {
      opacity: 1;
    }

    /* Reading Progress Top Bar */
    .reading-progress-track {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 3px;
      z-index: 1000;
      background: transparent;
      pointer-events: none;
    }

    .reading-progress-bar {
      height: 100%;
      width: 0%;
      background: var(--linkC);
      transition: width 80ms ease-out;
    }

    /* Sticky Navigation Header */
    .site-header {
      position: sticky;
      top: 0;
      z-index: 900;
      background-color: color-mix(in srgb, var(--headerB) 92%, transparent);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--contentL);
      height: var(--headerHc);
      display: flex;
      align-items: center;
      transition: var(--transFast);
    }

    .header-inner {
      width: 100%;
      max-width: var(--containerW);
      margin: 0 auto;
      padding: 0 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.25rem;
    }

    .brand-wrap {
      display: flex;
      align-items: center;
      gap: 0.625rem;
      font-weight: 800;
      font-size: 1.25rem;
      font-family: var(--fontH);
      white-space: nowrap;
    }

    .brand-dot {
      width: 10px;
      height: 10px;
      border-radius: 9999px;
      background-color: var(--linkC);
    }

    .brand-tagline {
      font-size: 0.6875rem;
      font-weight: 600;
      color: var(--linkC);
      background: color-mix(in srgb, var(--linkC) 12%, transparent);
      padding: 0.125rem 0.5rem;
      border-radius: 9999px;
      margin-left: 0.25rem;
    }

    /* Desktop Navigation Menu */
    .desktop-nav {
      display: flex;
      align-items: center;
      gap: 1.75rem;
      list-style: none;
    }

    .nav-item a {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--textMuted);
      padding: 0.375rem 0;
      position: relative;
    }

    .nav-item a:hover,
    .nav-item a.active {
      color: var(--bodyC);
    }

    .nav-item a::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 2px;
      background-color: var(--linkC);
      transition: width 0.2s ease;
    }

    .nav-item a:hover::after {
      width: 100%;
    }

    /* Header Actions */
    .header-actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .icon-btn {
      width: 40px;
      height: 40px;
      min-width: 40px;
      min-height: 40px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radiusMd);
      background-color: var(--contentBs);
      border: 1px solid var(--contentL);
      color: var(--bodyC);
      cursor: pointer;
      position: relative;
      transition: var(--transFast);
    }

    .icon-btn:hover {
      background-color: var(--contentL);
      transform: translateY(-1px);
    }

    .icon-btn svg {
      width: 18px;
      height: 18px;
    }

    .badge-count {
      position: absolute;
      top: -4px;
      right: -4px;
      background-color: var(--linkC);
      color: #ffffff;
      font-size: 0.6875rem;
      font-weight: 700;
      min-width: 18px;
      height: 18px;
      border-radius: 9999px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 4px;
      border: 2px solid var(--headerB);
    }

    .drawer-toggle-btn {
      display: none;
    }

    /* Live Search Dropdown Box */
    .search-modal {
      position: fixed;
      top: var(--headerHc);
      left: 0;
      width: 100%;
      background: var(--contentB);
      border-bottom: 1px solid var(--contentL);
      box-shadow: var(--shadowLg);
      padding: 1.25rem;
      z-index: 850;
      display: none;
    }

    .search-modal.active {
      display: block;
      animation: fadeInDown 0.2s ease;
    }

    .search-container {
      max-width: 680px;
      margin: 0 auto;
      position: relative;
    }

    .search-input-wrap {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      background: var(--contentBs);
      border: 1px solid var(--contentL);
      border-radius: var(--radiusMd);
      padding: 0.625rem 1rem;
    }

    .search-input-wrap input {
      flex: 1;
      background: transparent;
      font-size: 0.9375rem;
      color: var(--bodyC);
    }

    /* Side Drawer Menu for Mobile */
    .mobile-drawer-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
      z-index: 950;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.25s ease, visibility 0.25s ease;
    }

    .mobile-drawer-overlay.active {
      opacity: 1;
      visibility: visible;
    }

    .mobile-drawer {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      width: 82%;
      max-width: 320px;
      background: var(--menuB);
      border-right: 1px solid var(--contentL);
      z-index: 1000;
      transform: translateX(-100%);
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      flex-direction: column;
      box-shadow: var(--shadowLg);
    }

    .mobile-drawer.active {
      transform: translateX(0);
    }

    .drawer-header {
      padding: 1.25rem 1.5rem;
      border-bottom: 1px solid var(--contentL);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .drawer-links {
      list-style: none;
      padding: 1.25rem 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      overflow-y: auto;
    }

    .drawer-link {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.625rem 0.875rem;
      border-radius: var(--radiusMd);
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--bodyC);
      transition: var(--transFast);
    }

    .drawer-link:hover {
      background-color: var(--contentBs);
      color: var(--linkC);
    }

    /* Submenu dropdown */
    .drawer-has-submenu input[type="checkbox"] {
      display: none;
    }

    .drawer-submenu-toggle {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      cursor: pointer;
    }

    .drawer-submenu {
      display: none;
      list-style: none;
      padding-left: 1.5rem;
      margin-top: 0.25rem;
    }

    .drawer-has-submenu input[type="checkbox"]:checked ~ .drawer-submenu {
      display: block;
    }

    /* Sub-nav Scroll Menu */
    .category-scroll-bar {
      background: var(--contentB);
      border-bottom: 1px solid var(--contentL);
      overflow-x: auto;
      white-space: nowrap;
      scrollbar-width: none;
    }

    .category-scroll-bar::-webkit-scrollbar {
      display: none;
    }

    .category-scroll-inner {
      max-width: var(--containerW);
      margin: 0 auto;
      padding: 0.625rem 1.5rem;
      display: flex;
      align-items: center;
      gap: 1.25rem;
    }

    .category-scroll-item {
      font-size: 0.8125rem;
      font-weight: 600;
      color: var(--textMuted);
      padding: 0.25rem 0.5rem;
      border-radius: var(--radiusSm);
      transition: var(--transFast);
    }

    .category-scroll-item:hover,
    .category-scroll-item.active {
      color: var(--linkC);
      background: var(--contentBs);
    }

    /* Featured Post Spotlight */
    .spotlight-section {
      max-width: var(--containerW);
      margin: 2rem auto 1rem;
      padding: 0 1.5rem;
    }

    .spotlight-card {
      background: var(--contentB);
      border: 1px solid var(--contentL);
      border-radius: var(--radiusLg);
      overflow: hidden;
      display: grid;
      grid-template-columns: 1.15fr 1fr;
      box-shadow: var(--shadowSm);
      transition: var(--transFast);
    }

    .spotlight-card:hover {
      border-color: var(--linkC);
      box-shadow: var(--shadowMd);
    }

    .spotlight-media {
      position: relative;
      aspect-ratio: 16/10;
      overflow: hidden;
      background: var(--contentBs);
    }

    .spotlight-media img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }

    .spotlight-card:hover .spotlight-media img {
      transform: scale(1.03);
    }

    .spotlight-body {
      padding: 2.25rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 0.875rem;
    }

    .meta-tag-line {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.8125rem;
      color: var(--textMuted);
    }

    .meta-separator {
      color: var(--textSubtle);
    }

    .spotlight-title {
      font-size: 1.75rem;
      font-weight: 800;
      line-height: 1.3;
    }

    .spotlight-title a:hover {
      color: var(--linkC);
    }

    .spotlight-excerpt {
      font-size: 0.9375rem;
      color: var(--textMuted);
      line-height: 1.6;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .read-more-cta {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--linkC);
      font-weight: 700;
      font-size: 0.875rem;
      margin-top: 0.5rem;
    }

    .read-more-cta:hover {
      gap: 0.75rem;
    }

    /* Main Container (Content & Sidebar) */
    .main-wrap {
      max-width: var(--containerW);
      margin: 1.5rem auto 3.5rem;
      padding: 0 1.5rem;
      display: grid;
      grid-template-columns: minmax(0, 1fr) var(--sideW);
      gap: 2.5rem;
      align-items: start;
    }

    .section-head-bar {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      margin-bottom: 1.5rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid var(--contentL);
    }

    .section-head-title {
      font-size: 1.25rem;
      font-weight: 800;
    }

    /* Posts Grid (2 Column Desktop, Adaptive Mobile) */
    .posts-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1.5rem;
    }

    .post-card {
      background: var(--contentB);
      border: 1px solid var(--contentL);
      border-radius: var(--radiusMd);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: var(--shadowSm);
      transition: var(--transFast);
    }

    .post-card:hover {
      border-color: var(--linkC);
      transform: translateY(-2px);
      box-shadow: var(--shadowMd);
    }

    .post-card-thumb {
      aspect-ratio: 16/9;
      position: relative;
      overflow: hidden;
      background: var(--contentBs);
    }

    .post-card-thumb img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .post-card:hover .post-card-thumb img {
      transform: scale(1.04);
    }

    .thumb-actions {
      position: absolute;
      top: 8px;
      right: 8px;
      display: flex;
      align-items: center;
      gap: 6px;
      z-index: 2;
    }

    .thumb-btn {
      width: 32px;
      height: 32px;
      border-radius: var(--radiusSm);
      background: rgba(17, 24, 39, 0.7);
      backdrop-filter: blur(4px);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: var(--transFast);
    }

    .thumb-btn:hover {
      background: var(--linkC);
    }

    .thumb-btn.bookmarked {
      background: var(--linkC);
      color: #ffffff;
    }

    .thumb-btn svg {
      width: 15px;
      height: 15px;
    }

    .post-card-body {
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      flex: 1;
      gap: 0.625rem;
    }

    .post-card-title {
      font-size: 1.125rem;
      font-weight: 700;
      line-height: 1.4;
    }

    .post-card:hover .post-card-title {
      color: var(--linkC);
    }

    .post-card-snippet {
      font-size: 0.875rem;
      color: var(--textMuted);
      line-height: 1.55;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .post-card-foot {
      margin-top: auto;
      padding-top: 0.875rem;
      border-top: 1px solid var(--contentBs);
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.8125rem;
      color: var(--textMuted);
    }

    .author-info-lockup {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .author-avatar-xs {
      width: 24px;
      height: 24px;
      border-radius: 9999px;
      object-fit: cover;
    }

    /* Single Post / Article Styling */
    .article-container {
      background: var(--contentB);
      border: 1px solid var(--contentL);
      border-radius: var(--radiusLg);
      padding: 2.5rem;
      box-shadow: var(--shadowSm);
    }

    .article-breadcrumbs {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.8125rem;
      color: var(--textMuted);
      margin-bottom: 1.25rem;
    }

    .article-title {
      font-size: 2.25rem;
      font-weight: 800;
      line-height: 1.25;
      margin-bottom: 1.25rem;
      text-wrap: balance;
    }

    .article-meta-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 0;
      margin-bottom: 1.75rem;
      border-top: 1px solid var(--contentL);
      border-bottom: 1px solid var(--contentL);
    }

    .article-author-box {
      display: flex;
      align-items: center;
      gap: 0.875rem;
    }

    .article-author-img {
      width: 44px;
      height: 44px;
      border-radius: 9999px;
      object-fit: cover;
    }

    .article-hero-banner {
      width: 100%;
      aspect-ratio: 16/9;
      border-radius: var(--radiusMd);
      overflow: hidden;
      margin-bottom: 2rem;
      background: var(--contentBs);
    }

    .article-hero-banner img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* Rich Post Body Styles */
    .post-content-body {
      font-size: 1.0625rem;
      line-height: 1.85;
      color: var(--bodyC);
      word-break: break-word;
    }

    .post-content-body p {
      margin-bottom: 1.5rem;
    }

    .post-content-body h2 {
      font-size: 1.625rem;
      margin: 2.5rem 0 1rem;
    }

    .post-content-body h3 {
      font-size: 1.3125rem;
      margin: 2rem 0 0.75rem;
    }

    /* Note and Alert Boxes */
    .note, .alert {
      padding: 1rem 1.25rem;
      border-radius: var(--radiusMd);
      margin: 1.75rem 0;
      font-size: 0.9375rem;
      line-height: 1.6;
    }

    .note.info, .alert.info {
      background: color-mix(in srgb, var(--linkC) 10%, var(--contentB));
      border-left: 4px solid var(--linkC);
      color: var(--bodyC);
    }

    .note.warning, .alert.warning {
      background: color-mix(in srgb, #f59e0b 12%, var(--contentB));
      border-left: 4px solid #f59e0b;
      color: var(--bodyC);
    }

    .note.success, .alert.success {
      background: color-mix(in srgb, #10b981 12%, var(--contentB));
      border-left: 4px solid #10b981;
      color: var(--bodyC);
    }

    /* Blockquote */
    blockquote {
      border-left: 4px solid var(--linkC);
      padding: 0.75rem 1.25rem;
      margin: 2rem 0;
      font-style: italic;
      color: var(--textMuted);
      background: var(--contentBs);
      border-radius: 0 var(--radiusMd) var(--radiusMd) 0;
    }

    /* Code Blocks with Copy Feature */
    pre {
      background: var(--contentBs);
      border: 1px solid var(--contentL);
      border-radius: var(--radiusMd);
      padding: 1.25rem;
      margin: 1.75rem 0;
      overflow-x: auto;
      font-family: var(--fontC);
      font-size: 0.875rem;
      position: relative;
    }

    pre code {
      font-family: inherit;
    }

    .copy-code-btn {
      position: absolute;
      top: 8px;
      right: 8px;
      padding: 4px 8px;
      font-size: 0.75rem;
      font-weight: 600;
      border-radius: var(--radiusSm);
      background: var(--contentB);
      border: 1px solid var(--contentL);
      cursor: pointer;
      color: var(--textMuted);
      transition: var(--transFast);
    }

    .copy-code-btn:hover {
      color: var(--linkC);
    }

    /* Post Share Bar */
    .article-share-bar {
      display: flex;
      align-items: center;
      gap: 0.625rem;
      flex-wrap: wrap;
      margin: 2.5rem 0 1.5rem;
      padding: 1.25rem 0;
      border-top: 1px solid var(--contentL);
      border-bottom: 1px solid var(--contentL);
    }

    .share-btn {
      padding: 0.5rem 0.875rem;
      border-radius: var(--radiusSm);
      font-size: 0.8125rem;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      color: #ffffff;
      cursor: pointer;
      transition: var(--transFast);
    }

    .share-btn.fb { background: #1877f2; }
    .share-btn.tw { background: #000000; }
    .share-btn.wa { background: #25d366; }
    .share-btn.tg { background: #229ed9; }
    .share-btn.cp { background: var(--contentBs); color: var(--bodyC); border: 1px solid var(--contentL); }

    /* Author Bio Box */
    .author-bio-card {
      margin-top: 2rem;
      padding: 1.5rem;
      background: var(--contentBs);
      border-radius: var(--radiusMd);
      display: flex;
      align-items: flex-start;
      gap: 1.25rem;
    }

    .author-bio-card img {
      width: 56px;
      height: 56px;
      border-radius: 9999px;
      object-fit: cover;
      flex-shrink: 0;
    }

    /* Floating Table of Contents (TOC) */
    .toc-drawer {
      position: fixed;
      top: 0;
      right: -320px;
      bottom: 0;
      width: 320px;
      background: var(--contentB);
      border-left: 1px solid var(--contentL);
      box-shadow: var(--shadowLg);
      z-index: 950;
      transition: right 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      flex-direction: column;
    }

    .toc-drawer.active {
      right: 0;
    }

    .toc-header {
      padding: 1.25rem 1.5rem;
      border-bottom: 1px solid var(--contentL);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .toc-body {
      padding: 1.5rem;
      overflow-y: auto;
      flex: 1;
    }

    .toc-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      font-size: 0.875rem;
    }

    .toc-list a {
      color: var(--textMuted);
    }

    .toc-list a:hover {
      color: var(--linkC);
    }

    /* Floating Circular Back to Top */
    .floating-back-top {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 44px;
      height: 44px;
      border-radius: 9999px;
      background: var(--contentB);
      border: 1px solid var(--contentL);
      box-shadow: var(--shadowMd);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 700;
      transition: var(--transFast);
    }

    .floating-back-top:hover {
      transform: translateY(-2px);
    }

    .floating-back-top svg {
      width: 20px;
      height: 20px;
      stroke: var(--bodyC);
    }

    /* Toast Notification */
    .toast-box {
      position: fixed;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: #111827;
      color: #ffffff;
      padding: 0.75rem 1.25rem;
      border-radius: var(--radiusMd);
      box-shadow: var(--shadowLg);
      font-size: 0.875rem;
      font-weight: 500;
      z-index: 1050;
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      pointer-events: none;
    }

    .toast-box.show {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }

    /* Mobile Bottom App Bar */
    .mobile-bottom-bar {
      display: none;
    }

    /* Responsive Media Queries */
    @media (max-width: 1024px) {
      .main-wrap {
        grid-template-columns: 1fr;
      }

      .site-sidebar {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 1.5rem;
      }
    }

    @media (max-width: 768px) {
      .desktop-nav {
        display: none;
      }

      .drawer-toggle-btn {
        display: inline-flex;
      }

      .spotlight-card {
        grid-template-columns: 1fr;
      }

      .spotlight-body {
        padding: 1.5rem;
      }

      .posts-grid {
        grid-template-columns: 1fr;
      }

      .article-container {
        padding: 1.5rem;
      }

      .article-title {
        font-size: 1.75rem;
      }

      .site-sidebar {
        grid-template-columns: 1fr;
      }

      /* Mobile bottom navigation bar active */
      .mobile-bottom-bar {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 56px;
        background: var(--headerB);
        border-top: 1px solid var(--contentL);
        display: flex;
        align-items: center;
        justify-content: space-around;
        z-index: 800;
        box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.05);
      }

      .mob-bar-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: var(--textMuted);
        font-size: 0.6875rem;
        gap: 2px;
        background: none;
        cursor: pointer;
      }

      .mob-bar-btn svg {
        width: 18px;
        height: 18px;
      }

      .mob-bar-btn:hover,
      .mob-bar-btn.active {
        color: var(--linkC);
      }

      body {
        padding-bottom: 60px;
      }

      .floating-back-top {
        bottom: 70px;
      }
    }
  ]]></b:skin>
</head>

<body>

  <!-- Toast Notification Container -->
  <div class='toast-box' id='globalToast'>Thông báo</div>

  <!-- Reading Progress Bar -->
  <div class='reading-progress-track'>
    <div class='reading-progress-bar' id='readingProgressBar' role='progressbar'></div>
  </div>

  <!-- Announcement Bar (Dismissible) -->
  <div class='top-announcement' id='topAnnouncement'>
    <div class='top-announcement-content'>
      <span>✨</span>
      <span>Chào mừng bạn đến với ${escapeXml(config.blogTitle)} - Chúc bạn có trải nghiệm tuyệt vời!</span>
    </div>
    <button aria-label='Đóng thông báo' class='top-announcement-close' id='closeAnnouncementBtn' type='button'>&times;</button>
  </div>

  <!-- ========================================================
       STICKY HEADER WITH BRAND, SEARCH & THEME ACTIONS
       ======================================================== -->
  <header class='site-header'>
    <div class='header-inner'>
      <!-- Brand Logo / Wordmark -->
      <a class='brand-wrap' expr:href='data:blog.homepageUrl'>
        <span class='brand-dot'></span>
        <span><data:blog.title/></span>
        <span class='brand-tagline'>v3.7</span>
      </a>

      <!-- Desktop Nav Links -->
      <nav class='desktop-nav' role='navigation'>
        <li class='nav-item'><a class='active' expr:href='data:blog.homepageUrl'>Trang chủ</a></li>
        <li class='nav-item'><a expr:href='data:blog.homepageUrl + "search/label/Kỹ thuật"'>Kỹ thuật</a></li>
        <li class='nav-item'><a expr:href='data:blog.homepageUrl + "search/label/Bài mồi"'>Bài mồi</a></li>
        <li class='nav-item'><a expr:href='data:blog.homepageUrl + "search/label/Sản phẩm"'>Sản phẩm</a></li>
        <li class='nav-item'><a expr:href='data:blog.homepageUrl + "p/about-us.html"'>Giới thiệu</a></li>
      </nav>

      <!-- Action Items: Search, Bookmark, Dark Mode, Drawer -->
      <div class='header-actions'>
        <!-- Search Toggle -->
        <button aria-label='Tìm kiếm' class='icon-btn' id='searchToggleBtn' title='Tìm kiếm bài viết' type='button'>
          <svg fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24'>
            <circle cx='11' cy='11' r='8'/>
            <line x1='21' x2='16.65' y1='21' y2='16.65'/>
          </svg>
        </button>

        <!-- Bookmark / Read Later Drawer Button -->
        <button aria-label='Bài viết đã lưu' class='icon-btn' id='bookmarkToggleBtn' title='Danh sách đã lưu' type='button'>
          <svg fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24'>
            <path d='M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z'/>
          </svg>
          <span class='badge-count' id='bookmarkCountBadge' style='display:none;'>0</span>
        </button>

        <!-- Dark Mode Toggle Button -->
        <button aria-label='Đổi giao diện Sáng / Tối' class='icon-btn' id='themeToggleBtn' title='Giao diện Dark Mode' type='button'>
          <!-- Moon Icon (Light Mode) -->
          <svg class='theme-icon-moon' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24'>
            <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'/>
          </svg>
        </button>

        <!-- Mobile Drawer Hamburger -->
        <button aria-label='Mở menu' class='icon-btn drawer-toggle-btn' id='drawerOpenBtn' type='button'>
          <svg fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24'>
            <line x1='3' x2='21' y1='12' y2='12'/>
            <line x1='3' x2='21' y1='6' y2='6'/>
            <line x1='3' x2='21' y1='18' y2='18'/>
          </svg>
        </button>
      </div>
    </div>
  </header>

  <!-- Live Search Overlay Modal -->
  <div class='search-modal' id='searchModal'>
    <div class='search-container'>
      <div class='search-input-wrap'>
        <svg fill='none' height='18' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24' width='18'>
          <circle cx='11' cy='11' r='8'/>
          <line x1='21' x2='16.65' y1='21' y2='16.65'/>
        </svg>
        <input autocomplete='off' id='liveSearchInput' placeholder='Nhập từ khoá tìm kiếm...' type='text'/>
        <button id='searchCloseBtn' style='cursor:pointer; background:none;' type='button'>&times;</button>
      </div>
    </div>
  </div>

  <!-- Mobile Drawer Menu & Overlay -->
  <div class='mobile-drawer-overlay' id='drawerOverlay'></div>
  <aside class='mobile-drawer' id='mobileDrawer'>
    <div class='drawer-header'>
      <a class='brand-wrap' expr:href='data:blog.homepageUrl'>
        <span class='brand-dot'></span>
        <span><data:blog.title/></span>
      </a>
      <button id='drawerCloseBtn' style='cursor:pointer; background:none; font-size:1.25rem;' type='button'>&times;</button>
    </div>
    <ul class='drawer-links'>
      <li><a class='drawer-link' expr:href='data:blog.homepageUrl'>Trang chủ</a></li>
      <li class='drawer-has-submenu'>
        <input id='sub-drawer-1' type='checkbox'/>
        <label class='drawer-link drawer-submenu-toggle' for='sub-drawer-1'>
          <span>Chuyên mục</span>
          <span>&darr;</span>
        </label>
        <ul class='drawer-submenu'>
          <li><a class='drawer-link' expr:href='data:blog.homepageUrl + "search/label/Kỹ thuật"'>Kỹ thuật</a></li>
          <li><a class='drawer-link' expr:href='data:blog.homepageUrl + "search/label/Bài mồi"'>Bài mồi</a></li>
          <li><a class='drawer-link' expr:href='data:blog.homepageUrl + "search/label/Cá chép"'>Cá chép</a></li>
          <li><a class='drawer-link' expr:href='data:blog.homepageUrl + "search/label/Cá rô phi"'>Cá rô phi</a></li>
        </ul>
      </li>
      <li><a class='drawer-link' expr:href='data:blog.homepageUrl + "p/about-us.html"'>Giới thiệu</a></li>
      <li><a class='drawer-link' expr:href='data:blog.homepageUrl + "p/lien-he.html"'>Liên hệ</a></li>
      <li><a class='drawer-link' expr:href='data:blog.homepageUrl + "p/chinh-sach-bao-mat.html"'>Chính sách bảo mật</a></li>
    </ul>
  </aside>

  <!-- Sub-Category Scroll Bar -->
  <nav class='category-scroll-bar'>
    <div class='category-scroll-inner'>
      <a class='category-scroll-item active' expr:href='data:blog.homepageUrl'>Tất cả</a>
      <a class='category-scroll-item' expr:href='data:blog.homepageUrl + "search/label/Kỹ thuật"'>Kỹ thuật</a>
      <a class='category-scroll-item' expr:href='data:blog.homepageUrl + "search/label/Bài mồi"'>Bài mồi</a>
      <a class='category-scroll-item' expr:href='data:blog.homepageUrl + "search/label/Cá chép"'>Cá chép</a>
      <a class='category-scroll-item' expr:href='data:blog.homepageUrl + "search/label/Cá rô phi"'>Cá rô phi</a>
      <a class='category-scroll-item' expr:href='data:blog.homepageUrl + "search/label/Dây câu cá"'>Dây câu</a>
      <a class='category-scroll-item' expr:href='data:blog.homepageUrl + "search/label/Phụ kiện"'>Phụ kiện</a>
    </div>
  </nav>

  <!-- ========================================================
       HOMEPAGE SPOTLIGHT HERO SECTION
       ======================================================== -->
  <b:if cond='data:view.isHomepage'>
    <section class='spotlight-section'>
      <article class='spotlight-card'>
        <div class='spotlight-media'>
          <img alt='Bài viết tiêu điểm' loading='eager' src='https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&amp;fit=crop&amp;w=1200&amp;q=80'/>
        </div>
        <div class='spotlight-body'>
          <div class='meta-tag-line'>
            <span style='color:var(--linkC); font-weight:700;'>Tiêu điểm</span>
            <span class='meta-separator'>·</span>
            <span>Kỹ thuật chuyên sâu</span>
            <span class='meta-separator'>·</span>
            <span>6 phút đọc</span>
          </div>
          <h2 class='spotlight-title'>
            <a expr:href='data:blog.homepageUrl + "#featured"'>Kinh nghiệm chọn phao và cân chỉnh mồi câu cá chép hồ dịch vụ</a>
          </h2>
          <p class='spotlight-excerpt'>
            Tổng hợp phương pháp cân phao chì rơi, cách đọc tín hiệu phao nhịp đè và kỹ thuật phối mồi tự nhiên giúp tăng tỷ lệ bắt cá chép củ hiệu quả.
          </p>
          <a class='read-more-cta' expr:href='data:blog.homepageUrl + "#featured"'>
            <span>Xem chi tiết</span>
            <svg fill='none' height='16' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24' width='16'>
              <path d='M5 12h14'/><path d='m12 5 7 7-7 7'/>
            </svg>
          </a>
        </div>
      </article>
    </section>
  </b:if>

  <!-- ========================================================
       MAIN WRAPPER: POSTS GRID & SIDEBAR WIDGETS
       ======================================================== -->
  <div class='main-wrap'>
    <main class='main-blog-container' id='main' role='main'>

      <!-- Heading for Multiple Items -->
      <b:if cond='data:view.isMultipleItems'>
        <div class='section-head-bar'>
          <h2 class='section-head-title'>
            <b:if cond='data:view.isHomepage'>Bài viết mới nhất<b:elseif cond='data:view.isLabelSearch'/>Chủ đề: <data:view.search.label/><b:elseif cond='data:view.search.query'/>Kết quả: <data:view.search.query/><b:else/>Danh sách bài viết</b:if>
          </h2>
        </div>
      </b:if>

      <b:section id='main-section' maxwidgets='1' showaddelement='no'>
        <b:widget id='Blog1' locked='true' title='Bài đăng trên Blog' type='Blog' version='2'>
          <b:includable id='main' var='top'>

            <!-- MULTIPLE POSTS (HOMEPAGE & ARCHIVES) -->
            <b:if cond='data:view.isMultipleItems'>
              <div class='posts-grid'>
                <b:loop values='data:posts' var='post'>
                  <article class='post-card' expr:data-id='data:post.id'>
                    <b:if cond='data:post.featuredImage'>
                      <div class='post-card-thumb'>
                        <a expr:href='data:post.url'>
                          <img expr:alt='data:post.title' expr:src='data:post.featuredImage' loading='lazy'/>
                        </a>
                        <div class='thumb-actions'>
                          <button class='thumb-btn bookmark-btn' expr:data-id='data:post.id' expr:data-title='data:post.title' expr:data-url='data:post.url' title='Lưu bài viết' type='button'>
                            <svg fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24'>
                              <path d='M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z'/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </b:if>

                    <div class='post-card-body'>
                      <div class='meta-tag-line'>
                        <b:if cond='data:post.labels'>
                          <span><data:post.labels.first.name/></span>
                          <span class='meta-separator'>·</span>
                        </b:if>
                        <time expr:datetime='data:post.date.iso8601'><data:post.date/></time>
                      </div>

                      <h3 class='post-card-title'>
                        <a expr:href='data:post.url'><data:post.title/></a>
                      </h3>

                      <p class='post-card-snippet'><data:post.snippets.short/></p>

                      <div class='post-card-foot'>
                        <div class='author-info-lockup'>
                          <b:if cond='data:post.author.avatarUrl'>
                            <img expr:alt='data:post.author.name' expr:src='data:post.author.avatarUrl' class='author-avatar-xs'/>
                          </b:if>
                          <span><data:post.author.name/></span>
                        </div>
                        <a class='read-more-cta' expr:href='data:post.url'>Đọc tiếp &rarr;</a>
                      </div>
                    </div>
                  </article>
                </b:loop>
              </div>

              <!-- Pager Next/Prev -->
              <b:include name='nextprev'/>

            <!-- SINGLE POST ARTICLE VIEW -->
            <b:else/>
              <b:loop values='data:posts' var='post'>
                <article class='article-container'>
                  <!-- Breadcrumb Navigation -->
                  <nav class='article-breadcrumbs' aria-label='Breadcrumbs'>
                    <a expr:href='data:blog.homepageUrl'>Trang chủ</a>
                    <span class='meta-separator'>/</span>
                    <b:if cond='data:post.labels'>
                      <a expr:href='data:post.labels.first.url'><data:post.labels.first.name/></a>
                      <span class='meta-separator'>/</span>
                    </b:if>
                    <span><data:post.title/></span>
                  </nav>

                  <h1 class='article-title'><data:post.title/></h1>

                  <div class='article-meta-row'>
                    <div class='article-author-box'>
                      <b:if cond='data:post.author.avatarUrl'>
                        <img expr:alt='data:post.author.name' class='article-author-img' expr:src='data:post.author.avatarUrl'/>
                      </b:if>
                      <div>
                        <div style='font-weight:700;'><data:post.author.name/></div>
                        <div class='meta-tag-line'>
                          <time expr:datetime='data:post.date.iso8601'><data:post.date/></time>
                          <span class='meta-separator'>·</span>
                          <span id='readTimeCalc'>5 phút đọc</span>
                        </div>
                      </div>
                    </div>

                    <button class='icon-btn' id='articleTocOpenBtn' title='Mục lục bài viết' type='button'>
                      <svg fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24'>
                        <line x1='8' x2='21' y1='6' y2='6'/>
                        <line x1='8' x2='21' y1='12' y2='12'/>
                        <line x1='8' x2='21' y1='18' y2='18'/>
                        <line x1='3' x2='3.01' y1='6' y2='6'/>
                        <line x1='3' x2='3.01' y1='12' y2='12'/>
                        <line x1='3' x2='3.01' y1='18' y2='18'/>
                      </svg>
                    </button>
                  </div>

                  <!-- Featured Image Banner -->
                  <b:if cond='data:post.featuredImage'>
                    <div class='article-hero-banner'>
                      <img expr:alt='data:post.title' expr:src='data:post.featuredImage'/>
                    </div>
                  </b:if>

                  <!-- Dynamic Article Body Content -->
                  <div class='post-content-body' id='postBodyContent'>
                    <data:post.body/>
                  </div>

                  <!-- Post Tags / Labels -->
                  <b:if cond='data:post.labels'>
                    <div style='margin-top:2rem; display:flex; flex-wrap:wrap; gap:0.5rem;'>
                      <span style='font-size:0.8125rem; font-weight:700; color:var(--textMuted);'>Thẻ tag:</span>
                      <b:loop values='data:post.labels' var='label'>
                        <a expr:href='data:label.url' style='font-size:0.75rem; background:var(--contentBs); padding:0.25rem 0.625rem; border-radius:var(--radiusSm);'>
                          #<data:label.name/>
                        </a>
                      </b:loop>
                    </div>
                  </b:if>

                  <!-- Post Share Bar -->
                  <div class='article-share-bar'>
                    <span style='font-size:0.875rem; font-weight:700;'>Chia sẻ bài viết:</span>
                    <a class='share-btn fb' expr:href='"https://www.facebook.com/sharer/sharer.php?u=" + data:post.url' target='_blank'>Facebook</a>
                    <a class='share-btn tw' expr:href='"https://twitter.com/intent/tweet?url=" + data:post.url' target='_blank'>X (Twitter)</a>
                    <a class='share-btn tg' expr:href='"https://t.me/share/url?url=" + data:post.url' target='_blank'>Telegram</a>
                    <button class='share-btn cp' id='copyLinkBtn' type='button'>Sao chép link</button>
                  </div>

                  <!-- Author Bio Card -->
                  <div class='author-bio-card'>
                    <b:if cond='data:post.author.avatarUrl'>
                      <img expr:alt='data:post.author.name' expr:src='data:post.author.avatarUrl'/>
                    </b:if>
                    <div>
                      <h4 style='font-size:1.0625rem; font-weight:800; margin-bottom:0.25rem;'><data:post.author.name/></h4>
                      <p style='font-size:0.875rem; color:var(--textMuted);'>Tác giả chia sẻ kinh nghiệm, kỹ thuật câu đài, cách trộn mồi và văn hoá câu cá thể thao lành mạnh.</p>
                    </div>
                  </div>

                  <!-- Threaded Comments Section -->
                  <section style='margin-top:2.5rem; padding-top:2rem; border-top:1px solid var(--contentL);'>
                    <h3 style='font-size:1.25rem; font-weight:800; margin-bottom:1.5rem;'>
                      Bình luận &amp; Thảo luận (<data:post.numberOfComments/>)
                    </h3>
                    <b:include data='post' name='comments'/>
                  </section>
                </article>
              </b:loop>
            </b:if>

          </b:includable>
        </b:widget>
      </b:section>
    </main>

    <!-- Sidebar Widgets Section -->
    <aside class='site-sidebar' role='complementary'>
      <b:section id='sidebar-widgets' maxwidgets='6' showaddelement='yes'>

        <!-- Popular Posts Widget -->
        <b:widget id='PopularPosts1' locked='false' title='Bài viết xem nhiều' type='PopularPosts' version='2'>
          <b:includable id='main'>
            <div style='background:var(--contentB); border:1px solid var(--contentL); border-radius:var(--radiusMd); padding:1.5rem; margin-bottom:1.5rem; box-shadow:var(--shadowSm);'>
              <h3 style='font-size:1.0625rem; font-weight:800; margin-bottom:1.25rem; padding-bottom:0.5rem; border-bottom:1px solid var(--contentL);'>
                <data:title/>
              </h3>
              <div style='display:flex; flex-direction:column; gap:1rem;'>
                <b:loop index='i' values='data:posts' var='post'>
                  <div style='display:flex; align-items:flex-start; gap:0.75rem;'>
                    <span style='font-family:var(--fontH); font-size:1.125rem; font-weight:800; color:var(--textSubtle); width:24px; flex-shrink:0;'>0<expr:value expr='data:i + 1'/></span>
                    <div>
                      <a expr:href='data:post.href' style='font-size:0.875rem; font-weight:600; line-height:1.4;'><data:post.title/></a>
                      <div style='font-size:0.75rem; color:var(--textMuted); margin-top:0.25rem;'><data:post.date/></div>
                    </div>
                  </div>
                </b:loop>
              </div>
            </div>
          </b:includable>
        </b:widget>

        <!-- Category Labels Widget -->
        <b:widget id='Label1' locked='false' title='Chuyên mục bài viết' type='Label' version='2'>
          <b:includable id='main'>
            <div style='background:var(--contentB); border:1px solid var(--contentL); border-radius:var(--radiusMd); padding:1.5rem; margin-bottom:1.5rem; box-shadow:var(--shadowSm);'>
              <h3 style='font-size:1.0625rem; font-weight:800; margin-bottom:1.25rem; padding-bottom:0.5rem; border-bottom:1px solid var(--contentL);'>
                <data:title/>
              </h3>
              <div style='display:flex; flex-wrap:wrap; gap:0.5rem;'>
                <b:loop values='data:labels' var='label'>
                  <a expr:href='data:label.url' style='font-size:0.8125rem; color:var(--textMuted); background:var(--contentBs); padding:0.375rem 0.625rem; border-radius:var(--radiusSm);'>
                    <data:label.name/> (<data:label.count/>)
                  </a>
                </b:loop>
              </div>
            </div>
          </b:includable>
        </b:widget>

      </b:section>
    </aside>
  </div>

  <!-- Table of Contents Slide-out Drawer -->
  <div class='toc-drawer' id='tocDrawer'>
    <div class='toc-header'>
      <h4 style='font-size:1rem; font-weight:800;'>Mục lục bài viết</h4>
      <button id='tocCloseBtn' style='cursor:pointer; background:none; font-size:1.25rem;' type='button'>&times;</button>
    </div>
    <div class='toc-body'>
      <ul class='toc-list' id='tocListContainer'>
        <!-- Headings parsed automatically via JS -->
      </ul>
    </div>
  </div>

  <!-- Bookmark Drawer Modal -->
  <div class='toc-drawer' id='bookmarkDrawer'>
    <div class='toc-header'>
      <h4 style='font-size:1rem; font-weight:800;'>Bài viết đã lưu</h4>
      <button id='bookmarkCloseBtn' style='cursor:pointer; background:none; font-size:1.25rem;' type='button'>&times;</button>
    </div>
    <div class='toc-body'>
      <ul class='toc-list' id='bookmarkListContainer'>
        <!-- Populated via localStorage -->
      </ul>
    </div>
  </div>

  <!-- Floating Circular Back to Top Button -->
  <div class='floating-back-top' id='backToTopBtn' title='Lên đầu trang'>
    <svg fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2.5' viewBox='0 0 24 24'>
      <polyline points='18 15 12 9 6 15'/>
    </svg>
  </div>

  <!-- Mobile Bottom App Bar -->
  <nav class='mobile-bottom-bar'>
    <a class='mob-bar-btn active' expr:href='data:blog.homepageUrl'>
      <svg fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'/></svg>
      <span>Trang chủ</span>
    </a>
    <button class='mob-bar-btn' id='mobSearchBtn' type='button'>
      <svg fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><circle cx='11' cy='11' r='8'/><line x1='21' x2='16.65' y1='21' y2='16.65'/></svg>
      <span>Tìm kiếm</span>
    </button>
    <button class='mob-bar-btn' id='mobDrawerBtn' type='button'>
      <svg fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><line x1='3' x2='21' y1='12' y2='12'/><line x1='3' x2='21' y1='6' y2='6'/><line x1='3' x2='21' y1='18' y2='18'/></svg>
      <span>Menu</span>
    </button>
    <button class='mob-bar-btn' id='mobThemeBtn' type='button'>
      <svg fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'/></svg>
      <span>Giao diện</span>
    </button>
  </nav>

  <!-- ========================================================
       SEMANTIC FOOTER
       ======================================================== -->
  <footer style='background:var(--contentB); border-top:1px solid var(--contentL); margin-top:auto; padding:3.5rem 1.5rem 2rem;'>
    <div style='max-width:var(--containerW); margin:0 auto; display:grid; grid-template-columns:2fr 1fr 1fr; gap:3rem; padding-bottom:2.5rem; border-bottom:1px solid var(--contentL);'>
      <div>
        <a class='brand-wrap' expr:href='data:blog.homepageUrl'>
          <span class='brand-dot'></span>
          <span><data:blog.title/></span>
        </a>
        <p style='margin-top:0.75rem; font-size:0.875rem; color:var(--textMuted); max-width:380px;'>
          ${escapeXml(config.blogDescription)}
        </p>
      </div>

      <div>
        <h5 style='font-size:0.9375rem; font-weight:700; margin-bottom:1rem;'>Liên kết</h5>
        <ul style='list-style:none; display:flex; flex-direction:column; gap:0.625rem; font-size:0.875rem; color:var(--textMuted);'>
          <li><a expr:href='data:blog.homepageUrl'>Trang chủ</a></li>
          <li><a expr:href='data:blog.homepageUrl + "p/about-us.html"'>Giới thiệu</a></li>
          <li><a expr:href='data:blog.homepageUrl + "p/lien-he.html"'>Liên hệ</a></li>
        </ul>
      </div>

      <div>
        <h5 style='font-size:0.9375rem; font-weight:700; margin-bottom:1rem;'>Chính sách</h5>
        <ul style='list-style:none; display:flex; flex-direction:column; gap:0.625rem; font-size:0.875rem; color:var(--textMuted);'>
          <li><a expr:href='data:blog.homepageUrl + "p/chinh-sach-bao-mat.html"'>Bảo mật</a></li>
          <li><a expr:href='data:blog.homepageUrl + "feeds/posts/default"'>RSS Feeds</a></li>
        </ul>
      </div>
    </div>

    <div style='max-width:var(--containerW); margin:1.5rem auto 0; display:flex; align-items:center; justify-content:space-between; font-size:0.8125rem; color:var(--textMuted);'>
      <span>&copy; <script>document.write(new Date().getFullYear())</script> <data:blog.title/>. Bản quyền thuộc về tác giả.</span>
      <span>Tối ưu chuẩn Blogger v3 Layouts</span>
    </div>
  </footer>

  <!-- ========================================================
       ASYNCHRONOUS JAVASCRIPT LOGIC
       ======================================================== -->
  <script type='text/javascript'>
    //<![CDATA[
    document.addEventListener('DOMContentLoaded', function() {
      // 1. Toast Notification Helper
      function showToast(msg) {
        var toast = document.getElementById('globalToast');
        if (!toast) return;
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(function() {
          toast.classList.remove('show');
        }, 2500);
      }

      // 2. Dark Mode Switcher with localStorage
      var themeToggle = document.getElementById('themeToggleBtn');
      var mobThemeBtn = document.getElementById('mobThemeBtn');
      function toggleTheme() {
        var cur = document.documentElement.getAttribute('data-theme') || 'light';
        var next = cur === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        if (next === 'dark') {
          document.documentElement.classList.add('drK');
        } else {
          document.documentElement.classList.remove('drK');
        }
        try {
          localStorage.setItem('blogger_theme_pref', next);
        } catch(e) {}
        showToast('Giao diện: ' + (next === 'dark' ? 'Chế độ Tối' : 'Chế độ Sáng'));
      }
      if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
      if (mobThemeBtn) mobThemeBtn.addEventListener('click', toggleTheme);

      // 3. Scroll Reading Progress Bar
      var progBar = document.getElementById('readingProgressBar');
      if (progBar) {
        window.addEventListener('scroll', function() {
          var winScroll = document.documentElement.scrollTop || document.body.scrollTop;
          var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          if (height > 0) {
            progBar.style.width = ((winScroll / height) * 100) + '%';
          }
        }, { passive: true });
      }

      // 4. Smooth Back to Top
      var btt = document.getElementById('backToTopBtn');
      if (btt) {
        btt.addEventListener('click', function() {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }

      // 5. Drawer Menu
      var drawerOpen = document.getElementById('drawerOpenBtn');
      var mobDrawerBtn = document.getElementById('mobDrawerBtn');
      var drawerClose = document.getElementById('drawerCloseBtn');
      var drawer = document.getElementById('mobileDrawer');
      var drawerOverlay = document.getElementById('drawerOverlay');

      function openDrawer() {
        if (drawer && drawerOverlay) {
          drawer.classList.add('active');
          drawerOverlay.classList.add('active');
        }
      }
      function closeDrawer() {
        if (drawer && drawerOverlay) {
          drawer.classList.remove('active');
          drawerOverlay.classList.remove('active');
        }
      }
      if (drawerOpen) drawerOpen.addEventListener('click', openDrawer);
      if (mobDrawerBtn) mobDrawerBtn.addEventListener('click', openDrawer);
      if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
      if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

      // 6. Live Search Modal
      var searchOpen = document.getElementById('searchToggleBtn');
      var mobSearchBtn = document.getElementById('mobSearchBtn');
      var searchClose = document.getElementById('searchCloseBtn');
      var searchModal = document.getElementById('searchModal');
      var searchInput = document.getElementById('liveSearchInput');

      function toggleSearch() {
        if (!searchModal) return;
        var active = searchModal.classList.toggle('active');
        if (active && searchInput) {
          searchInput.focus();
        }
      }
      if (searchOpen) searchOpen.addEventListener('click', toggleSearch);
      if (mobSearchBtn) mobSearchBtn.addEventListener('click', toggleSearch);
      if (searchClose) searchClose.addEventListener('click', function() {
        if (searchModal) searchModal.classList.remove('active');
      });

      // 7. Announcement Bar Close
      var closeAnn = document.getElementById('closeAnnouncementBtn');
      var topAnn = document.getElementById('topAnnouncement');
      if (closeAnn && topAnn) {
        closeAnn.addEventListener('click', function() {
          topAnn.classList.add('hidden');
          try {
            sessionStorage.setItem('announcement_closed', 'true');
          } catch(e) {}
        });
        try {
          if (sessionStorage.getItem('announcement_closed') === 'true') {
            topAnn.classList.add('hidden');
          }
        } catch(e) {}
      }

      // 8. Auto Table of Contents (TOC) Generator
      var postBody = document.getElementById('postBodyContent');
      var tocList = document.getElementById('tocListContainer');
      var tocDrawer = document.getElementById('tocDrawer');
      var tocOpen = document.getElementById('articleTocOpenBtn');
      var tocClose = document.getElementById('tocCloseBtn');

      if (postBody && tocList) {
        var headings = postBody.querySelectorAll('h2, h3');
        if (headings.length > 0) {
          headings.forEach(function(h, idx) {
            var id = h.id || ('heading-' + idx);
            h.id = id;
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.href = '#' + id;
            a.textContent = h.textContent;
            a.addEventListener('click', function() {
              if (tocDrawer) tocDrawer.classList.remove('active');
            });
            li.appendChild(a);
            tocList.appendChild(li);
          });
        }
      }
      if (tocOpen && tocDrawer) {
        tocOpen.addEventListener('click', function() {
          tocDrawer.classList.add('active');
        });
      }
      if (tocClose && tocDrawer) {
        tocClose.addEventListener('click', function() {
          tocDrawer.classList.remove('active');
        });
      }

      // 9. Bookmarks System (LocalStorage)
      var bkmKey = 'blogger_saved_bookmarks';
      var bkmToggle = document.getElementById('bookmarkToggleBtn');
      var bkmDrawer = document.getElementById('bookmarkDrawer');
      var bkmClose = document.getElementById('bookmarkCloseBtn');
      var bkmCount = document.getElementById('bookmarkCountBadge');
      var bkmList = document.getElementById('bookmarkListContainer');

      function getBookmarks() {
        try {
          return JSON.parse(localStorage.getItem(bkmKey)) || [];
        } catch(e) {
          return [];
        }
      }
      function saveBookmarks(items) {
        try {
          localStorage.setItem(bkmKey, JSON.stringify(items));
        } catch(e) {}
        updateBookmarkUI();
      }
      function updateBookmarkUI() {
        var items = getBookmarks();
        if (bkmCount) {
          if (items.length > 0) {
            bkmCount.textContent = items.length;
            bkmCount.style.display = 'flex';
          } else {
            bkmCount.style.display = 'none';
          }
        }
        if (bkmList) {
          bkmList.innerHTML = '';
          if (items.length === 0) {
            bkmList.innerHTML = '<li style="color:var(--textMuted);">Chưa có bài viết nào được lưu.</li>';
          } else {
            items.forEach(function(item) {
              var li = document.createElement('li');
              li.innerHTML = '<a href="' + item.url + '">' + item.title + '</a>';
              bkmList.appendChild(li);
            });
          }
        }
      }
      updateBookmarkUI();

      if (bkmToggle && bkmDrawer) {
        bkmToggle.addEventListener('click', function() {
          bkmDrawer.classList.add('active');
        });
      }
      if (bkmClose && bkmDrawer) {
        bkmClose.addEventListener('click', function() {
          bkmDrawer.classList.remove('active');
        });
      }

      // Bookmark button clicks on cards
      document.querySelectorAll('.bookmark-btn').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
          e.stopPropagation();
          var id = btn.getAttribute('data-id');
          var title = btn.getAttribute('data-title');
          var url = btn.getAttribute('data-url');
          var items = getBookmarks();
          var exists = items.some(function(i) { return i.id === id; });
          if (exists) {
            items = items.filter(function(i) { return i.id !== id; });
            btn.classList.remove('bookmarked');
            showToast('Đã xoá khỏi danh sách lưu');
          } else {
            items.push({ id: id, title: title, url: url });
            btn.classList.add('bookmarked');
            showToast('Đã lưu bài viết thành công');
          }
          saveBookmarks(items);
        });
      });

      // 10. Copy Link Button
      var cpBtn = document.getElementById('copyLinkBtn');
      if (cpBtn) {
        cpBtn.addEventListener('click', function() {
          if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href);
            showToast('Đã sao chép liên kết vào bộ nhớ tạm!');
          }
        });
      }
    });
    //]]>
  </script>

</body>
</html>`;
}

function escapeXml(unsafe: string): string {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

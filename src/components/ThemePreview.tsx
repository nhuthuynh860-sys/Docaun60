import React, { useState, useEffect, useRef } from 'react';
import { ThemeConfig, MockPost, MockComment } from '../types/bloggerTheme';
import {
  INITIAL_MOCK_POSTS,
  INITIAL_MOCK_COMMENTS,
  MOCK_POPULAR_POSTS,
  MOCK_LABELS,
} from '../data/mockBloggerData';
import {
  Moon,
  Sun,
  Menu,
  X,
  Search,
  ArrowRight,
  ArrowUp,
  Share2,
  Bookmark,
  Heart,
  MessageSquare,
  Check,
  Send,
  Eye,
  Smartphone,
  Tablet,
  Laptop,
  Maximize2,
  ChevronRight,
  Sparkles,
  Info,
} from 'lucide-react';

interface ThemePreviewProps {
  config: ThemeConfig;
  previewMode: 'desktop' | 'tablet' | 'mobile';
  setPreviewMode: (mode: 'desktop' | 'tablet' | 'mobile') => void;
  activeView: 'home' | 'post' | 'archive' | '404';
  setActiveView: (view: 'home' | 'post' | 'archive' | '404') => void;
  themeMode: 'light' | 'dark';
  setThemeMode: (mode: 'light' | 'dark') => void;
}

export const ThemePreview: React.FC<ThemePreviewProps> = ({
  config,
  previewMode,
  setPreviewMode,
  activeView,
  setActiveView,
  themeMode,
  setThemeMode,
}) => {
  const [selectedPost, setSelectedPost] = useState<MockPost>(INITIAL_MOCK_POSTS[0]);
  const [selectedLabel, setSelectedLabel] = useState<string>('Design Systems');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [comments, setComments] = useState<MockComment[]>(INITIAL_MOCK_COMMENTS);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(42);
  const [bookmarked, setBookmarked] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showTagAnnotations, setShowTagAnnotations] = useState(false);
  const [announcementClosed, setAnnouncementClosed] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  const [bookmarkDrawerOpen, setBookmarkDrawerOpen] = useState(false);
  const [savedBookmarks, setSavedBookmarks] = useState<MockPost[]>([INITIAL_MOCK_POSTS[0]]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2400);
  };

  const toggleSaveBookmark = (post: MockPost) => {
    setSavedBookmarks((prev) => {
      const exists = prev.some((p) => p.id === post.id);
      if (exists) {
        showToast('Đã xoá khỏi danh sách bài viết lưu');
        return prev.filter((p) => p.id !== post.id);
      } else {
        showToast('Đã lưu bài viết vào danh sách');
        return [...prev, post];
      }
    });
  };

  const containerRef = useRef<HTMLDivElement>(null);

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const el = containerRef.current;
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      if (scrollHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100)));
      }
    };

    const node = containerRef.current;
    if (node) {
      node.addEventListener('scroll', handleScroll, { passive: true });
    }
    return () => {
      if (node) node.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handlePostClick = (post: MockPost) => {
    setSelectedPost(post);
    setActiveView('post');
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLabelClick = (label: string) => {
    setSelectedLabel(label);
    setActiveView('archive');
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentText.trim()) return;

    const newComment: MockComment = {
      id: `c-${Date.now()}`,
      authorName: newCommentName.trim(),
      avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(newCommentName)}`,
      date: 'Just now',
      content: newCommentText.trim(),
    };

    setComments((prev) => [newComment, ...prev]);
    setNewCommentName('');
    setNewCommentText('');
  };

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Filtered posts based on search or label
  const displayedPosts =
    activeView === 'archive'
      ? INITIAL_MOCK_POSTS.filter((p) => p.labels.includes(selectedLabel))
      : searchQuery.trim()
      ? INITIAL_MOCK_POSTS.filter(
          (p) =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.snippet.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : INITIAL_MOCK_POSTS;

  // Frame width based on selected device preview
  const frameWidthClass =
    previewMode === 'mobile'
      ? 'w-[380px] max-w-full'
      : previewMode === 'tablet'
      ? 'w-[780px] max-w-full'
      : 'w-full';

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Top Device & Viewport Controller Bar */}
      <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white tracking-wide flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Blogger Live Simulator
          </span>
          <span className="text-slate-600">·</span>
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
            <button
              onClick={() => setActiveView('home')}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                activeView === 'home'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveView('post')}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                activeView === 'post'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Single Article
            </button>
            <button
              onClick={() => setActiveView('archive')}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                activeView === 'archive'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Category Archive
            </button>
            <button
              onClick={() => setActiveView('404')}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                activeView === '404'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              404 Page
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Tag Annotation Overlay Toggle */}
          <button
            onClick={() => setShowTagAnnotations(!showTagAnnotations)}
            className={`px-2.5 py-1 rounded border text-xs font-medium flex items-center gap-1.5 transition-colors ${
              showTagAnnotations
                ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title="Inspect Blogger XML markup bindings"
          >
            <Sparkles className="w-3 h-3" />
            <span>{showTagAnnotations ? 'Blogger Tags: ON' : 'Inspect Blogger Tags'}</span>
          </button>

          {/* Device switcher */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
            <button
              onClick={() => setPreviewMode('desktop')}
              className={`p-1.5 rounded transition-colors ${
                previewMode === 'desktop' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Desktop View (1440px)"
            >
              <Laptop className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setPreviewMode('tablet')}
              className={`p-1.5 rounded transition-colors ${
                previewMode === 'tablet' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Tablet View (768px)"
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setPreviewMode('mobile')}
              className={`p-1.5 rounded transition-colors ${
                previewMode === 'mobile' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Mobile View (375px)"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Theme switcher */}
          <button
            onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
            className="p-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors"
            title={`Toggle Theme Mode (currently ${themeMode})`}
          >
            {themeMode === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-400" />}
          </button>
        </div>
      </div>

      {/* Simulator Viewport Area */}
      <div className="flex-1 bg-slate-950 p-2 sm:p-4 overflow-auto flex justify-center items-start">
        <div
          className={`${frameWidthClass} transition-all duration-300 rounded-lg overflow-hidden border border-slate-800 shadow-2xl bg-white dark:bg-[#090d16] flex flex-col h-[760px] relative`}
          data-theme={themeMode}
          style={
            {
              '--color-primary': config.accentColor,
            } as React.CSSProperties
          }
        >
          {/* Scrollable Container */}
          <div ref={containerRef} className="flex-1 overflow-y-auto flex flex-col relative select-text">
            {/* Reading progress bar */}
            {config.showProgressBar && (
              <div className="sticky top-0 left-0 w-full h-[3px] bg-transparent z-50">
                <div
                  className="h-full transition-all duration-100 ease-out"
                  style={{
                    width: `${scrollProgress}%`,
                    backgroundColor: config.accentColor,
                  }}
                />
              </div>
            )}

            {/* Blogger Tag Overlay Notification */}
            {showTagAnnotations && (
              <div className="bg-emerald-950/90 border-b border-emerald-500/40 px-3 py-1.5 text-[11px] text-emerald-300 flex items-center justify-between">
                <span>Showing dynamic Blogger v3 XML bindings &lt;data:post.*&gt;</span>
                <span className="font-mono text-[10px] bg-emerald-900/60 px-1.5 py-0.5 rounded">b:layoutsversion='3'</span>
              </div>
            )}

            {/* Top Announcement Bar (Dismissible) */}
            {!announcementClosed && (
              <div className="bg-indigo-600/10 border-b border-indigo-500/20 text-indigo-700 dark:text-indigo-300 px-4 py-1.5 text-xs flex items-center justify-between">
                <span className="truncate">✨ Chào mừng bạn đến với {config.blogTitle} - Giao diện Blogger v3.7 Tối ưu SEO!</span>
                <button
                  onClick={() => setAnnouncementClosed(true)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 ml-2 font-bold"
                  title="Đóng thông báo"
                >
                  &times;
                </button>
              </div>
            )}

            {/* Sticky Header & Navbar */}
            <header
              className={`${
                config.showStickyNav ? 'sticky top-0 z-40' : ''
              } bg-white/90 dark:bg-[#111827]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors`}
            >
              <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
                {/* Brand Title */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveView('home')}
                    className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white flex items-center gap-2 hover:opacity-80 transition-opacity"
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: config.accentColor }}
                    />
                    <span>{config.blogTitle}</span>
                  </button>
                  {showTagAnnotations && (
                    <span className="text-[10px] font-mono bg-blue-500/20 text-blue-600 dark:text-blue-300 px-1.5 py-0.5 rounded">
                      &lt;data:blog.title/&gt;
                    </span>
                  )}
                </div>

                {/* Desktop Navigation Links */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
                  <button
                    onClick={() => setActiveView('home')}
                    className={`hover:text-slate-900 dark:hover:text-white transition-colors relative py-1 ${
                      activeView === 'home' ? 'text-slate-900 dark:text-white font-semibold' : ''
                    }`}
                  >
                    Home
                  </button>
                  <button
                    onClick={() => handleLabelClick('Kỹ thuật')}
                    className="hover:text-slate-900 dark:hover:text-white transition-colors py-1"
                  >
                    Kỹ thuật
                  </button>
                  <button
                    onClick={() => handleLabelClick('Bài mồi')}
                    className="hover:text-slate-900 dark:hover:text-white transition-colors py-1"
                  >
                    Bài mồi
                  </button>
                  <button
                    onClick={() => handleLabelClick('Cá chép')}
                    className="hover:text-slate-900 dark:hover:text-white transition-colors py-1"
                  >
                    Cá chép
                  </button>
                  <button
                    onClick={() => handleLabelClick('Cá rô phi')}
                    className="hover:text-slate-900 dark:hover:text-white transition-colors py-1"
                  >
                    Cá rô phi
                  </button>
                </nav>

                {/* Header Action Buttons */}
                <div className="flex items-center gap-2">
                  {/* Search toggle */}
                  <button
                    onClick={() => setSearchOpen(!searchOpen)}
                    className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    aria-label="Search"
                    title="Tìm kiếm bài viết"
                  >
                    <Search className="w-4 h-4" />
                  </button>

                  {/* Bookmark Drawer toggle */}
                  <button
                    onClick={() => setBookmarkDrawerOpen(!bookmarkDrawerOpen)}
                    className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
                    aria-label="Bookmarks"
                    title="Bài viết đã lưu"
                  >
                    <Bookmark className="w-4 h-4" />
                    {savedBookmarks.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                        {savedBookmarks.length}
                      </span>
                    )}
                  </button>

                  {/* Dark Mode switcher */}
                  <button
                    onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
                    className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    aria-label="Toggle Theme"
                  >
                    {themeMode === 'dark' ? (
                      <Sun className="w-4 h-4 text-amber-400" />
                    ) : (
                      <Moon className="w-4 h-4 text-indigo-500" />
                    )}
                  </button>

                  {/* Mobile hamburger */}
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    aria-label="Menu"
                  >
                    {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Category Scroll Bar */}
              <div className="bg-slate-50 dark:bg-[#0c1220] border-t border-slate-200 dark:border-slate-800 px-4 py-2 overflow-x-auto flex items-center gap-2 text-xs font-semibold whitespace-nowrap scrollbar-none">
                <button
                  onClick={() => setActiveView('home')}
                  className={`px-3 py-1 rounded-full transition-colors ${
                    activeView === 'home'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Tất cả
                </button>
                {['Kỹ thuật', 'Bài mồi', 'Cá chép', 'Cá rô phi', 'Dây câu cá', 'Phụ kiện'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleLabelClick(cat)}
                    className={`px-3 py-1 rounded-full transition-colors ${
                      activeView === 'archive' && selectedLabel === cat
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Mobile Drawer Menu */}
              {mobileMenuOpen && (
                <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 space-y-2">
                  <button
                    onClick={() => {
                      setActiveView('home');
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-2 px-3 rounded text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Home
                  </button>
                  <button
                    onClick={() => {
                      handleLabelClick('Design Systems');
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-2 px-3 rounded text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Design Systems
                  </button>
                  <button
                    onClick={() => {
                      handleLabelClick('Architecture');
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-2 px-3 rounded text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Architecture
                  </button>
                  <button
                    onClick={() => {
                      handleLabelClick('Frontend');
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-2 px-3 rounded text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Frontend Engineering
                  </button>
                </div>
              )}

              {/* Search Bar Drawer */}
              {searchOpen && (
                <div className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-4 py-3">
                  <div className="max-w-2xl mx-auto flex items-center gap-2">
                    <Search className="w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search articles across topics..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
                      autoFocus
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>
              )}
            </header>

            {/* VIEW 1: HOMEPAGE */}
            {activeView === 'home' && (
              <main className="flex-1 bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100">
                {/* Featured Hero Post */}
                {config.showFeaturedPost && (
                  <section className="max-w-6xl mx-auto px-4 pt-6 pb-2">
                    {showTagAnnotations && (
                      <div className="mb-2 text-[10px] font-mono text-purple-500 bg-purple-500/10 px-2 py-0.5 rounded inline-block">
                        &lt;b:if cond='data:view.isHomepage'&gt; Featured Section
                      </div>
                    )}
                    <article
                      onClick={() => handlePostClick(INITIAL_MOCK_POSTS[0])}
                      className="cursor-pointer group bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden grid md:grid-cols-2 shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden bg-slate-100 dark:bg-slate-800">
                        <img
                          src={INITIAL_MOCK_POSTS[0].featuredImage}
                          alt={INITIAL_MOCK_POSTS[0].title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6 md:p-8 flex flex-col justify-center gap-3">
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                          <span
                            className="font-semibold"
                            style={{ color: config.accentColor }}
                          >
                            Featured
                          </span>
                          <span>·</span>
                          <span>Design Systems</span>
                          <span>·</span>
                          <span>6 min read</span>
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {INITIAL_MOCK_POSTS[0].title}
                        </h2>
                        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                          {INITIAL_MOCK_POSTS[0].snippet}
                        </p>
                        <div className="pt-2 flex items-center gap-2 text-sm font-semibold" style={{ color: config.accentColor }}>
                          <span>Read Complete Article</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </article>
                  </section>
                )}

                {/* Main Content + Sidebar Grid */}
                <div
                  className={`max-w-6xl mx-auto px-4 py-6 grid gap-8 ${
                    config.layoutStyle === 'full-width'
                      ? 'grid-cols-1 max-w-4xl'
                      : config.layoutStyle === 'sidebar-left'
                      ? 'grid-cols-1 lg:grid-cols-[300px_1fr]'
                      : 'grid-cols-1 lg:grid-cols-[1fr_320px]'
                  }`}
                >
                  {/* Left Sidebar if layoutStyle is sidebar-left */}
                  {config.layoutStyle === 'sidebar-left' && renderSidebar()}

                  {/* Main Posts Area */}
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-6 border-b border-slate-200 dark:border-slate-800">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                          Recent Stories
                        </h3>
                        {showTagAnnotations && (
                          <span className="text-[10px] font-mono text-emerald-500">
                            &lt;b:section id='main'&gt; &lt;b:widget type='Blog' id='Blog1'&gt;
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-500 font-mono">
                        {displayedPosts.length} posts
                      </span>
                    </div>

                    {/* Posts Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {displayedPosts.map((post) => (
                        <article
                          key={post.id}
                          onClick={() => handlePostClick(post)}
                          className="cursor-pointer group bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden flex flex-col shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all"
                        >
                          <div className="aspect-[16/9] relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                            <img
                              src={post.featuredImage}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSaveBookmark(post);
                              }}
                              className={`absolute top-2 right-2 w-7 h-7 rounded-lg flex items-center justify-center transition-colors z-10 ${
                                savedBookmarks.some((b) => b.id === post.id)
                                  ? 'bg-indigo-600 text-white'
                                  : 'bg-black/60 text-white/90 hover:bg-black/80'
                              }`}
                              title="Lưu bài viết"
                              type="button"
                            >
                              <Bookmark className="w-3.5 h-3.5 fill-current" />
                            </button>
                            {showTagAnnotations && (
                              <div className="absolute top-2 left-2 bg-black/70 text-white font-mono text-[9px] px-1.5 py-0.5 rounded">
                                &lt;data:post.featuredImage/&gt;
                              </div>
                            )}
                          </div>
                          <div className="p-4 flex flex-col flex-1 gap-2">
                            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                              <span>{post.labels[0]}</span>
                              <span>·</span>
                              <time>{post.date}</time>
                            </div>
                            <h4 className="font-bold text-slate-900 dark:text-white leading-snug group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                              {post.title}
                            </h4>
                            <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                              {post.snippet}
                            </p>
                            <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                              <div className="flex items-center gap-1.5">
                                <img
                                  src={post.author.avatar}
                                  alt={post.author.name}
                                  className="w-5 h-5 rounded-full object-cover"
                                />
                                <span>{post.author.name}</span>
                              </div>
                              <span className="flex items-center gap-1">
                                <MessageSquare className="w-3 h-3" />
                                <span>{post.commentCount}</span>
                              </span>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
                      <button className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        &larr; Newer Posts
                      </button>
                      <span className="text-slate-400">Page 1 of 3</span>
                      <button className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        Older Posts &rarr;
                      </button>
                    </div>
                  </div>

                  {/* Right Sidebar if layoutStyle is sidebar-right */}
                  {config.layoutStyle === 'sidebar-right' && renderSidebar()}
                </div>
              </main>
            )}

            {/* VIEW 2: SINGLE POST ARTICLE */}
            {activeView === 'post' && (
              <main className="flex-1 bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 py-6">
                <div
                  className={`max-w-6xl mx-auto px-4 grid gap-8 ${
                    config.layoutStyle === 'full-width'
                      ? 'grid-cols-1 max-w-3xl'
                      : config.layoutStyle === 'sidebar-left'
                      ? 'grid-cols-1 lg:grid-cols-[300px_1fr]'
                      : 'grid-cols-1 lg:grid-cols-[1fr_320px]'
                  }`}
                >
                  {config.layoutStyle === 'sidebar-left' && renderSidebar()}

                  <article className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 shadow-sm">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-4">
                      <button onClick={() => setActiveView('home')} className="hover:underline">
                        Home
                      </button>
                      <span>/</span>
                      <button
                        onClick={() => handleLabelClick(selectedPost.labels[0])}
                        className="hover:underline"
                      >
                        {selectedPost.labels[0]}
                      </button>
                      <span>/</span>
                      <span className="text-slate-400 dark:text-slate-500 truncate max-w-[200px]">
                        {selectedPost.title}
                      </span>
                    </nav>

                    {/* Article Headline */}
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight mb-4">
                      {selectedPost.title}
                    </h1>

                    {showTagAnnotations && (
                      <div className="mb-4 text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded inline-block">
                        &lt;data:post.title/&gt; &middot; Article Schema Active
                      </div>
                    )}

                    {/* Author Meta Row */}
                    <div className="flex flex-wrap items-center justify-between gap-4 py-4 mb-6 border-y border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <img
                          src={selectedPost.author.avatar}
                          alt={selectedPost.author.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-semibold text-sm text-slate-900 dark:text-white">
                            {selectedPost.author.name}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                            <time>{selectedPost.date}</time>
                            <span>·</span>
                            <span>{selectedPost.readTime}</span>
                          </div>
                        </div>
                      </div>

                      {/* Social Actions */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setTocOpen(!tocOpen)}
                          className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1 transition-colors"
                          title="Mục lục bài viết"
                          type="button"
                        >
                          <span>Mục lục</span>
                        </button>
                        <button
                          onClick={() => {
                            setLiked(!liked);
                            setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
                          }}
                          className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                            liked
                              ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400'
                              : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-current' : ''}`} />
                          <span>{likeCount}</span>
                        </button>
                        <button
                          onClick={() => toggleSaveBookmark(selectedPost)}
                          className={`p-2 rounded-lg border text-xs transition-colors ${
                            savedBookmarks.some((b) => b.id === selectedPost.id)
                              ? 'bg-indigo-600 text-white border-indigo-600'
                              : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                          }`}
                          title="Lưu bài viết"
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${savedBookmarks.some((b) => b.id === selectedPost.id) ? 'fill-current' : ''}`} />
                        </button>
                        <button
                          onClick={() => {
                            setCopiedLink(true);
                            showToast('Đã sao chép liên kết vào bộ nhớ tạm');
                            setTimeout(() => setCopiedLink(false), 2000);
                          }}
                          className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title="Sao chép liên kết"
                        >
                          {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    {/* Featured Image */}
                    <div className="rounded-xl overflow-hidden aspect-[16/9] mb-8 bg-slate-100 dark:bg-slate-800">
                      <img
                        src={selectedPost.featuredImage}
                        alt={selectedPost.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Post Content Entry (matching <data:post.body/>) */}
                    <div
                      className="prose prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 leading-relaxed space-y-4"
                      dangerouslySetInnerHTML={{
                        __html: selectedPost.bodyHtml || `<p>${selectedPost.snippet}</p>`,
                      }}
                    />

                    {/* Labels List */}
                    <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold text-slate-400">Labels:</span>
                      {selectedPost.labels.map((lbl) => (
                        <button
                          key={lbl}
                          onClick={() => handleLabelClick(lbl)}
                          className="text-xs px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        >
                          {lbl}
                        </button>
                      ))}
                    </div>

                    {/* Author Bio Box */}
                    {config.showAuthorBio && (
                      <div className="mt-8 p-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl flex items-start gap-4">
                        <img
                          src={config.authorAvatar || selectedPost.author.avatar}
                          alt={config.authorName}
                          className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="space-y-1">
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                            About {config.authorName}
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                            {config.authorBio}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Interactive Blogger Comments Section */}
                    <section className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-800">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                          <MessageSquare className="w-5 h-5 text-indigo-500" />
                          <span>Reader Comments</span>
                          <span className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500">
                            {comments.length}
                          </span>
                        </h3>
                        {showTagAnnotations && (
                          <span className="text-[10px] font-mono text-purple-400">
                            &lt;b:include data='post' name='comments'/&gt;
                          </span>
                        )}
                      </div>

                      {/* Add comment form */}
                      <form onSubmit={handleAddComment} className="mb-6 space-y-3 bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          Leave a Thoughtful Reply
                        </span>
                        <input
                          type="text"
                          placeholder="Your Name (or alias)"
                          value={newCommentName}
                          onChange={(e) => setNewCommentName(e.target.value)}
                          className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                        <textarea
                          placeholder="Share your perspective, feedback or questions..."
                          value={newCommentText}
                          onChange={(e) => setNewCommentText(e.target.value)}
                          rows={3}
                          className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
                        />
                        <div className="flex justify-end">
                          <button
                            type="submit"
                            className="px-4 py-2 rounded-lg text-xs font-semibold text-white flex items-center gap-1.5 transition-transform active:scale-95 shadow-sm"
                            style={{ backgroundColor: config.accentColor }}
                          >
                            <Send className="w-3 h-3" />
                            <span>Publish Comment</span>
                          </button>
                        </div>
                      </form>

                      {/* Comments List */}
                      <div className="space-y-3">
                        {comments.map((c) => (
                          <div
                            key={c.id}
                            className="p-4 bg-slate-50/50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-xl space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <img
                                  src={c.avatar}
                                  alt={c.authorName}
                                  className="w-7 h-7 rounded-full object-cover"
                                />
                                <span className="font-semibold text-xs text-slate-900 dark:text-white">
                                  {c.authorName}
                                </span>
                              </div>
                              <span className="text-[11px] text-slate-400">{c.date}</span>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-9">
                              {c.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>
                  </article>

                  {config.layoutStyle === 'sidebar-right' && renderSidebar()}
                </div>
              </main>
            )}

            {/* VIEW 3: ARCHIVE / LABEL VIEW */}
            {activeView === 'archive' && (
              <main className="flex-1 bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 py-6">
                <div className="max-w-6xl mx-auto px-4">
                  <div className="p-6 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-2xl mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-1">
                        Topic Archive
                      </div>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {selectedLabel}
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Curated articles tagged under {selectedLabel}. Dynamic Blogger label loop.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveView('home')}
                      className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-1"
                    >
                      <span>&larr; Return to All Stories</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {displayedPosts.map((post) => (
                      <article
                        key={post.id}
                        onClick={() => handlePostClick(post)}
                        className="cursor-pointer group bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all"
                      >
                        <div className="aspect-[16/9] relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                          <img
                            src={post.featuredImage}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="p-4 flex flex-col flex-1 gap-2">
                          <time className="text-xs text-slate-400">{post.date}</time>
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-500 transition-colors line-clamp-2">
                            {post.title}
                          </h4>
                          <p className="text-xs text-slate-500 line-clamp-2">{post.snippet}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </main>
            )}

            {/* VIEW 4: 404 NOT FOUND */}
            {activeView === '404' && (
              <main className="flex-1 bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 flex items-center justify-center p-8">
                <div className="max-w-md text-center space-y-4">
                  <div className="text-6xl font-extrabold text-slate-300 dark:text-slate-700 font-mono">
                    404
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Page Not Found
                  </h2>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    The requested URL could not be located on this Blogger publication. It may have been moved, renamed, or deleted.
                  </p>
                  <div>
                    <button
                      onClick={() => setActiveView('home')}
                      className="px-5 py-2.5 rounded-lg text-xs font-semibold text-white shadow-sm transition-transform active:scale-95"
                      style={{ backgroundColor: config.accentColor }}
                    >
                      Return to Homepage
                    </button>
                  </div>
                </div>
              </main>
            )}

            {/* Footer */}
            <footer className="mt-auto bg-white dark:bg-[#111827] border-t border-slate-200 dark:border-slate-800 py-8 px-4 text-slate-600 dark:text-slate-400 text-xs">
              <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div className="space-y-2">
                  <div className="font-extrabold text-slate-900 dark:text-white flex items-center gap-2 text-sm">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: config.accentColor }}
                    />
                    <span>{config.blogTitle}</span>
                  </div>
                  <p className="text-xs leading-relaxed max-w-sm text-slate-500">
                    {config.blogDescription}
                  </p>
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 dark:text-white text-xs mb-3">
                    Categories
                  </h5>
                  <ul className="space-y-1.5 text-xs">
                    {MOCK_LABELS.slice(0, 4).map((l) => (
                      <li key={l.name}>
                        <button
                          onClick={() => handleLabelClick(l.name)}
                          className="hover:text-slate-900 dark:hover:text-white transition-colors"
                        >
                          {l.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 dark:text-white text-xs mb-3">
                    Blogger Architecture
                  </h5>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Built with semantic HTML5 tags, standard Blogger v3 layout syntax, responsive CSS Flexbox/Grid, and zero-flicker dark mode.
                  </p>
                </div>
              </div>

              <div className="max-w-6xl mx-auto pt-4 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-400">
                <span>&copy; {new Date().getFullYear()} {config.blogTitle}. All rights reserved.</span>
                <button
                  onClick={scrollToTop}
                  className="flex items-center gap-1 font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <span>Back to Top</span>
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
              </div>
            </footer>

            {/* Mobile Bottom Navigation Bar (Visible in mobile mode) */}
            {previewMode === 'mobile' && (
              <div className="sticky bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-t border-slate-200 dark:border-slate-800 h-12 flex items-center justify-around z-40 text-[10px] shadow-lg">
                <button
                  onClick={() => setActiveView('home')}
                  className={`flex flex-col items-center gap-0.5 ${
                    activeView === 'home' ? 'text-indigo-600 font-bold' : 'text-slate-500'
                  }`}
                >
                  <span>Trang chủ</span>
                </button>
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="flex flex-col items-center gap-0.5 text-slate-500"
                >
                  <span>Tìm kiếm</span>
                </button>
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="flex flex-col items-center gap-0.5 text-slate-500"
                >
                  <span>Menu</span>
                </button>
                <button
                  onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
                  className="flex flex-col items-center gap-0.5 text-slate-500"
                >
                  <span>Giao diện</span>
                </button>
                <button
                  onClick={scrollToTop}
                  className="flex flex-col items-center gap-0.5 text-slate-500"
                >
                  <span>Lên đầu</span>
                </button>
              </div>
            )}

            {/* Slide-out Bookmarks Drawer Modal */}
            {bookmarkDrawerOpen && (
              <div className="absolute inset-y-0 right-0 w-72 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl z-50 p-4 flex flex-col animate-slide-in">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Bookmark className="w-4 h-4 text-indigo-500" />
                    <span>Bài viết đã lưu ({savedBookmarks.length})</span>
                  </div>
                  <button
                    onClick={() => setBookmarkDrawerOpen(false)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg font-bold"
                  >
                    &times;
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto py-3 space-y-3">
                  {savedBookmarks.length === 0 ? (
                    <div className="text-center text-xs text-slate-400 py-8">
                      Chưa có bài viết nào được lưu vào danh sách.
                    </div>
                  ) : (
                    savedBookmarks.map((bkm) => (
                      <div
                        key={bkm.id}
                        onClick={() => {
                          handlePostClick(bkm);
                          setBookmarkDrawerOpen(false);
                        }}
                        className="cursor-pointer p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 hover:border-indigo-500 transition-colors"
                      >
                        <h5 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-2">
                          {bkm.title}
                        </h5>
                        <div className="text-[10px] text-slate-400 mt-1">{bkm.date}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Slide-out Table of Contents Drawer Modal */}
            {tocOpen && (
              <div className="absolute inset-y-0 right-0 w-72 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl z-50 p-4 flex flex-col">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="font-bold text-sm text-slate-900 dark:text-white">
                    Mục lục bài viết
                  </div>
                  <button
                    onClick={() => setTocOpen(false)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg font-bold"
                  >
                    &times;
                  </button>
                </div>
                <ul className="flex-1 overflow-y-auto py-3 space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <li className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded cursor-pointer">
                    1. Nguyên lý cân phao đài
                  </li>
                  <li className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded cursor-pointer">
                    2. Kỹ thuật phối trộn mồi hạt &amp; cám
                  </li>
                  <li className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded cursor-pointer">
                    3. Đọc tín hiệu phao nhịp đè và nhịp trồi
                  </li>
                </ul>
              </div>
            )}

            {/* Floating Toast Notification */}
            {toastMessage && (
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-2xl z-50 border border-slate-700 animate-fade-in whitespace-nowrap">
                {toastMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  function renderSidebar() {
    return (
      <aside className="space-y-6">
        {showTagAnnotations && (
          <div className="text-[10px] font-mono text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">
            &lt;b:section id='sidebar'&gt; (Widgets)
          </div>
        )}

        {/* Profile Widget */}
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
          <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider pb-2 border-b border-slate-100 dark:border-slate-800">
            About the Author
          </div>
          <div className="flex items-center gap-3">
            <img
              src={config.authorAvatar || INITIAL_MOCK_POSTS[0].author.avatar}
              alt={config.authorName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="font-bold text-sm text-slate-900 dark:text-white">
                {config.authorName}
              </div>
              <div className="text-xs text-slate-500">Editor &amp; Technologist</div>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {config.authorBio}
          </p>
        </div>

        {/* Popular Posts Widget */}
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
          <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider pb-2 border-b border-slate-100 dark:border-slate-800">
            Trending Stories
          </div>
          <div className="space-y-3">
            {MOCK_POPULAR_POSTS.map((item, index) => (
              <div
                key={item.id}
                onClick={() => {
                  const found = INITIAL_MOCK_POSTS.find((p) => p.title === item.title) || INITIAL_MOCK_POSTS[0];
                  handlePostClick(found);
                }}
                className="cursor-pointer group flex items-start gap-3 py-1"
              >
                <span className="font-extrabold text-sm text-slate-300 dark:text-slate-600 font-mono tabular-nums">
                  0{index + 1}
                </span>
                <div className="space-y-0.5">
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white leading-snug group-hover:text-indigo-500 transition-colors">
                    {item.title}
                  </h5>
                  <div className="text-[11px] text-slate-400">{item.views}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Topics / Labels Widget */}
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
          <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider pb-2 border-b border-slate-100 dark:border-slate-800">
            Explore Topics
          </div>
          <div className="flex flex-wrap gap-1.5">
            {MOCK_LABELS.map((lbl) => (
              <button
                key={lbl.name}
                onClick={() => handleLabelClick(lbl.name)}
                className="text-xs px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1"
              >
                <span>{lbl.name}</span>
                <span className="text-[10px] text-slate-400">({lbl.count})</span>
              </button>
            ))}
          </div>
        </div>
      </aside>
    );
  }
};

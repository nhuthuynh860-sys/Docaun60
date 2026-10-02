export interface ThemeConfig {
  blogTitle: string;
  blogDescription: string;
  authorName: string;
  authorBio: string;
  authorAvatar: string;
  accentColor: string; // hex color
  fontPairing: 'modern' | 'editorial' | 'minimal' | 'tech';
  layoutStyle: 'sidebar-right' | 'sidebar-left' | 'full-width';
  postsPerPage: number;
  showFeaturedPost: boolean;
  showStickyNav: boolean;
  showProgressBar: boolean;
  showAuthorBio: boolean;
  showShareButtons: boolean;
  showCommentCount: boolean;
  enableSmoothScroll: boolean;
}

export interface MockPost {
  id: string;
  title: string;
  url: string;
  snippet: string;
  featuredImage: string;
  date: string;
  isoDate: string;
  readTime: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  labels: string[];
  bodyHtml?: string;
  commentCount: number;
  featured?: boolean;
}

export interface MockComment {
  id: string;
  authorName: string;
  avatar: string;
  date: string;
  content: string;
  replies?: MockComment[];
}

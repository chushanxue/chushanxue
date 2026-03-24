export type NewsSourceType = 'rss' | 'api' | 'html' | 'manual';

export interface NewsItem {
  id: string;
  title: string;
  titleZh?: string;
  summary: string;
  url: string;
  source: string;
  sourceUrl?: string;
  publishedAt: string;
  category: string;
  tags: string[];
  score: number;
  sourceType: NewsSourceType;
  cover?: string;
  author?: string;
}

export interface NewsSection {
  key: string;
  title: string;
  description: string;
  items: NewsItem[];
}

export interface NewsSourceStats {
  totalItems: number;
  totalSources: number;
  succeededSources: number;
  failedSources: number;
}

export interface NewsDigest {
  generatedAt: string;
  headline?: NewsItem;
  latest: NewsItem[];
  featuredTools: NewsItem[];
  sections: NewsSection[];
  sourceFailures: string[];
  sourceStats: NewsSourceStats;
}

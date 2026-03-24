import { getBasePath } from '@/hooks/useBasePath';
import type { NewsDigest } from '@/types/news';

const NEWS_DIGEST_PATH = '/news/daily-digest.json';

export const fetchNewsDigest = async (): Promise<NewsDigest> => {
  const response = await fetch(`${getBasePath()}${NEWS_DIGEST_PATH}`);

  if (!response.ok) {
    throw new Error('Failed to load news digest');
  }

  return response.json();
};

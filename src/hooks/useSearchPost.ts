import posts from '@/models/data/posts.json';
import { fetchMarkdownByTitle } from '@/services/content';
import type { SearchMatchPost } from '@/types/post';

const escapeRegExp = (keyword: string) =>
  keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getMatchText = (content: string, keyword: string) => {
  const regex = new RegExp(
    `[^\\p{P}\\p{S}]{0,20}${escapeRegExp(keyword)}[^\\p{P}\\p{S}]{0,20}`,
    'gu',
  );
  const matchTextList: string[] = [];

  let match: RegExpExecArray | null;
  while ((match = regex.exec(content)) !== null) {
    matchTextList.push(match[0]);
  }

  return matchTextList;
};

export const useSearchPost = async (
  keyword?: string,
): Promise<SearchMatchPost[]> => {
  const normalizedKeyword = keyword?.trim();

  if (!normalizedKeyword) {
    return [];
  }

  const matchedPosts = new Map<string, SearchMatchPost>();

  await Promise.all(
    posts.map(async (post) => {
      const titleMatched = post.title.includes(normalizedKeyword);
      const nextMatchedPost: SearchMatchPost = titleMatched
        ? { ...post }
        : { ...post, matchText: [] };

      const text = await fetchMarkdownByTitle(post.title).catch(() => '');

      if (text.includes(normalizedKeyword)) {
        nextMatchedPost.matchText = getMatchText(text, normalizedKeyword);
      }

      if (titleMatched || nextMatchedPost.matchText?.length) {
        matchedPosts.set(post.title, nextMatchedPost);
      }
    }),
  );

  return Array.from(matchedPosts.values());
};

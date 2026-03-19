import {
  DEFAULT_POST_INTRO,
  DEFAULT_POST_TAG,
  MARKDOWN_DIRECTORY,
} from '@/constants';
import { getBasePath } from '@/hooks/useBasePath';
import type { PostItem, PostQueryParams, PostTagIntro } from '@/types/post';
import querystring from 'querystring';

const normalizeQueryValue = (value?: string | string[]) => {
  if (Array.isArray(value)) {
    return value[0] || '';
  }

  return value || '';
};

export const buildPostQueryString = (
  post: Pick<PostItem, 'title' | 'tag' | 'time'>,
) =>
  querystring.stringify({
    title: post.title,
    tags: post.tag,
    time: post.time,
  });

export const parsePostQuery = (search: string): PostQueryParams => {
  const query = querystring.parse(search.replace(/^\?/, ''));
  const rawTags = query.tags;

  return {
    title: normalizeQueryValue(query.title),
    tags: Array.isArray(rawTags)
      ? rawTags.filter((item): item is string => typeof item === 'string')
      : rawTags
        ? [rawTags]
        : [],
    time: normalizeQueryValue(query.time) || undefined,
  };
};

export const getPostIntro = (tag: string, intros: PostTagIntro[]): string => {
  const matchedIntro = intros.find((item) => item.name === tag)?.intro;

  if (matchedIntro) {
    return matchedIntro;
  }

  return tag === DEFAULT_POST_TAG ? DEFAULT_POST_INTRO : DEFAULT_POST_INTRO;
};

export const fetchMarkdownByTitle = async (title: string) => {
  const response = await fetch(
    `${getBasePath()}${MARKDOWN_DIRECTORY}/${title}.md`,
  );

  if (!response.ok) {
    throw new Error(`Failed to load markdown: ${title}`);
  }

  return response.text();
};

export const normalizeMarkdownAssetPaths = (markdown: string) =>
  markdown.replace(
    /!\[([^\]]*)\]\(\/md/g,
    `![$1](${getBasePath()}${MARKDOWN_DIRECTORY}`,
  );

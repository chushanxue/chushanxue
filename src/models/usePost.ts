import { DEFAULT_POST_INTRO, DEFAULT_POST_TAG } from '@/constants';
import intros from '@/pages/Post/data/intro.json';
import { getPostIntro } from '@/services/content';
import type { PostItem, PostStatus, PostTagIntro } from '@/types/post';
import { useMemo, useState } from 'react';
import posts from './data/posts.json';

type SortMode = 'time' | 'rate';

const allPosts = posts as PostItem[];
const postIntros = intros as PostTagIntro[];

const usePost = () => {
  const [tag, setTag] = useState<string>(DEFAULT_POST_TAG);
  // 当前文章提问
  const [question, setQuestion] = useState<string>('');
  // 当前文章排序  true倒序 false正序
  const [sort, setSort] = useState<boolean>(true);
  // 当前文章状态 0 已完成 1 未完成 2 有疑问
  const [status, setStatus] = useState<PostStatus | null>(null);
  const [sortMode, setSortMode] = useState<SortMode>('time');
  
  // 由tag筛选出来的文章列表（用于状态筛选）
  const tagPost = useMemo(() => {
    if (tag === DEFAULT_POST_TAG) {
      return allPosts;
    }

    return allPosts.filter((item) => item.tag.includes(tag));
  }, [tag]);

  // 当前文章列表
  const post = useMemo(() => {
    let nextPosts = [...tagPost];

    if (status !== null) {
      nextPosts = nextPosts.filter((item) => item.status === status);
    }

    if (sortMode === 'rate') {
      nextPosts = [...nextPosts].sort(
        (prev, next) => (prev.rate ?? 0) - (next.rate ?? 0),
      );
    }

    if (!sort) {
      nextPosts.reverse();
    }

    return nextPosts;
  }, [sort, sortMode, status, tagPost]);
  
  // 当前文章tag描述
  const intro = useMemo(() => {
    const matchedIntro = getPostIntro(tag, postIntros);
    return matchedIntro || DEFAULT_POST_INTRO;
  }, [tag]);

  const updateTag = (nextTag: string) => {
    setTag(nextTag);
  };

  const updateStatus = (nextStatus: PostStatus) => {
    setStatus((currentStatus) =>
      currentStatus === nextStatus ? null : nextStatus,
    );
  };

  const toggleSortOrder = () => {
    setSort((currentSort) => !currentSort);
  };

  const sortByReviewRate = () => {
    setSortMode((currentSortMode) => {
      if (currentSortMode === 'rate') {
        setSort((currentSort) => !currentSort);
        return currentSortMode;
      }

      setSort(false);
      return 'rate';
    });
  };

  const resetPostSort = () => {
    setSortMode('time');
    setSort(true);
  };

  return {
    post,
    intro,
    question,
    sort,
    tag,
    status,
    tagPost,
    setQuestion,
    setTag: updateTag,
    setStatus: updateStatus,
    setSort: setSort,
    toggleSortOrder,
    sortByReviewRate,
    resetPostSort,
  };
};

export default usePost;

// 全局共享数据示例
import { useState } from 'react';
import posts from './data/posts.json';

interface Post {
  rate?: number;
  title: string;
  desc?: string;
  time: string;
  tag: string[];
  status?: number; //状态图标 0已完成 1 未完成 2 有疑问
}

const usePost = () => {
  // 当前文章列表
  const [post, setPost] = useState<Post[]>(posts);
  // 由tag筛选出来的文章列表（用于状态筛选）
  const [TagPost, setTagPost] = useState<Post[]>(posts);
  // 当前文章tag
  const [tag, setTag] = useState<string>('全部');
  // 当前文章tag描述
  const [intro, setIntro] = useState<string>('学而时习之');
  // 当前文章排序  true倒序 false正序
  const [sort, setSort] = useState<boolean>(true);
  // 当前文章状态 0 已完成 1 未完成 2 有疑问
  const [status, setStatus] = useState<number | null>(null);
  return {
    post,
    setPost,
    intro,
    setIntro,
    sort,
    setSort,
    tag,
    setTag,
    status,
    setStatus,
    TagPost,
    setTagPost,
  };
};

export default usePost;

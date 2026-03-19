import { BLOG_BASE_PATH } from '@/constants';

export const getBasePath = () =>
  process.env.NODE_ENV === 'development' ? '' : BLOG_BASE_PATH;

export const useBasePath = getBasePath;

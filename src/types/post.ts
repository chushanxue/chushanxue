export type PostStatus = 0 | 1 | 2;

export interface PostItem {
  question?: string;
  rate?: number;
  title: string;
  desc?: string;
  time: string;
  tag: string[];
  status?: PostStatus;
}

export interface PostTagIntro {
  name: string;
  intro: string;
  color: string;
}

export interface SearchMatchPost extends PostItem {
  matchText?: string[];
}

export interface PostQueryParams {
  title: string;
  tags: string[];
  time?: string;
}

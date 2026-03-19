import type { GitHubCommitItem } from '@/types/site';
import { request } from '@umijs/max';

const GITHUB_COMMITS_API =
  'https://api.github.com/repos/chushanxue/chushanxue/commits';

export const getRecentCommits = () =>
  request<GitHubCommitItem[]>(GITHUB_COMMITS_API, {
    method: 'GET',
  });

export const getDaysSinceLatestCommit = (commits: GitHubCommitItem[]) => {
  const latestCommitDate = commits[0]?.commit?.committer?.date;

  if (!latestCommitDate) {
    return false;
  }

  const commitDate = new Date(latestCommitDate);
  const timeDiff = Date.now() - commitDate.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  return daysDiff || false;
};

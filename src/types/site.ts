export interface GitCommitSummary {
  message: string;
  committer?: {
    date?: string;
  };
}

export interface GitHubCommitItem {
  commit?: GitCommitSummary;
}

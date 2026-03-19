import type { GitHubCommitItem } from '@/types/site';
import { Timeline } from 'antd';
import React from 'react';
import styles from './index.less';

interface Iprops {
  updateInfoList: GitHubCommitItem[];
}

interface Task {
  dot?: React.ReactNode;
  children: string;
  color?: string;
}

const TimeLine: React.FC<Iprops> = ({ updateInfoList }) => {
  if (!updateInfoList?.length) {
    return null;
  }

  const events: Task[] = updateInfoList.slice(0, 10).map((item) => {
    return {
      children: item?.commit?.message || 'No commit message',
      color: 'blue',
    };
  });

  return (
    <Timeline mode="alternate" items={events} className={styles.timeLine} />
  );
};

export default TimeLine;

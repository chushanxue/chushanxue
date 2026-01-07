import { Timeline } from 'antd';
import React from 'react';
import styles from './index.less';

interface Iprops {
  UpdateInfoList: any[]; //commit信息列表
}

interface Task {
  dot?: React.ReactNode;
  children: string;
  color?: string;
}

const TimeLine: React.FC<Iprops> = ({ UpdateInfoList }) => {
  console.log('UpdateInfoList', UpdateInfoList);
  if (!UpdateInfoList?.length) {
    return null;
  }
  const events: Task[] = UpdateInfoList?.slice(0, 10)?.map((item) => {
    console.log('item', item);
    return {
      children: item?.commit?.message || 'No commit message',
      color: 'blue', // 默认颜色，可根据需要调整
    };
  });

  return (
    <Timeline mode="alternate" items={events} className={styles.timeLine} />
  );
};

export default TimeLine;

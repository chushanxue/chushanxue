import { ClockCircleOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';
import React from 'react';
import styles from './index.less';

interface Task {
  dot?: React.ReactNode;
  children: string;
  color?: string;
}

const events: Task[] = [
  {
    dot: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
    children: '构思博客 2023-03-02',
  },
  {
    children: '云服务器购买 2023-03-15',
    color: 'green',
  },
  {
    children: '域名注册 2023-03-16',
  },
  {
    color: 'red',
    children: '博客重构 2023-04-24',
  },
  {
    dot: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
    children: '未完待续',
  },
];

const TimeLine: React.FC = () => {
  return (
    <Timeline mode="alternate" items={events} className={styles.timeLine} />
  );
};

export default TimeLine;

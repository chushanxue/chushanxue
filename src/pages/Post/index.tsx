import { buildPostQueryString } from '@/services/content';
import type { PostItem } from '@/types/post';
import {
  CheckCircleOutlined,
  PauseCircleOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { useMount } from 'ahooks';
import { List, Rate } from 'antd';
import VirtualList from 'rc-virtual-list';
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import styles from './index.less';

const Status = [
  <CheckCircleOutlined style={{ color: 'green' }} key={0} />,
  <PauseCircleOutlined style={{ color: '#0958d9' }} key={1} />,
  <QuestionCircleOutlined style={{ color: 'orange' }} key={2} />,
];

const DocsPage: React.FC = () => {
  const { post, sort, setQuestion } = useModel('usePost');

  const mergeTitle = (index: number, item: PostItem) =>
    `${sort ? post.length - index : index + 1}、${item.title}${
      item.desc ? `（${item.desc}）` : ''
    }`;

  const [windowHeight, setWindowHeight] = useState<number>(0);
  const [scrollY, setScrollY] = useState<number>(350);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (windowHeight > 900) {
      setScrollY(450);
    } else {
      setScrollY(350);
    }
  }, [windowHeight]);

  useMount(() => {
    // 注意赋值时机
    setWindowHeight(window.innerHeight);
  });

  return (
    <div className={styles.post}>
      <List size="large" header={<Header />} bordered>
        {/* 小屏350 大屏450 */}
        <VirtualList
          data={post}
          height={scrollY}
          itemHeight={47}
          itemKey="title"
        >
          {(item, index) => (
            <List.Item
              key={item.title}
              onClick={() => {
                setQuestion(item.question);
                history.push(`/md?${buildPostQueryString(item)}`);
              }}
            >
              <span>
                {mergeTitle(index, item)}
                <span style={{ marginLeft: '10px' }}>
                  {Status[item.status ?? 1]}
                </span>
              </span>

              <span>
                <Rate
                  disabled
                  defaultValue={item?.rate || 0}
                  style={{ marginRight: '10px' }}
                />
                {'——' + item.time}
              </span>
            </List.Item>
          )}
        </VirtualList>
      </List>
    </div>
  );
};

export default DocsPage;

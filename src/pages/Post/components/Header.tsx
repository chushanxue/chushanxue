import { useBasePath } from '@/hooks/useBasePath';
import {
  CheckCircleOutlined,
  PauseCircleOutlined,
  QuestionCircleOutlined,
  StarFilled,
  SwapOutlined,
} from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Divider, Row, Tag } from 'antd';
import React from 'react';
import intros from '../data/intro.json';
import styles from '../index.less';

const Header: React.FC = () => {
  const {
    intro,
    setTag,
    tag,
    status,
    setStatus,
    toggleSortOrder,
    sortByReviewRate,
  } = useModel('usePost');

  const handleTagClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    setTag(event.currentTarget.innerText);
  };

  const filteredStatus = (val: 0 | 1 | 2) => {
    setStatus(val);
  };

  return (
    <>
      <a className={styles.banner}>
        <SwapOutlined
          rotate={90}
          style={{ position: 'absolute', right: 0, bottom: 0 }}
          onClick={toggleSortOrder}
        />
        <PauseCircleOutlined
          onClick={() => filteredStatus(1)}
          style={{
            color: status === 1 ? '#003eb3' : '#0958d9',
            position: 'absolute',
            right: 30,
            bottom: 0,
          }}
        />
        <QuestionCircleOutlined
          onClick={() => filteredStatus(2)}
          style={{
            color: status === 2 ? '#d46b08' : 'orange',
            position: 'absolute',
            right: 55,
            bottom: 0,
          }}
        />
        <CheckCircleOutlined
          onClick={() => filteredStatus(0)}
          style={{
            color: status === 0 ? '#237804' : 'green',
            position: 'absolute',
            right: 80,
            bottom: 0,
          }}
        />
        <StarFilled
          onClick={sortByReviewRate}
          style={{
            color: 'rgb(247, 212, 0)',
            position: 'absolute',
            right: 120,
            bottom: 0,
          }}
        />
        <img src={useBasePath() + '/img/banner/post.svg'} />

        <div className={styles.tags}>
          <Row gutter={[16, 26]}>
            {intros.map((item) => {
              return (
                <Tag
                  color={item.color}
                  onClick={handleTagClick}
                  key={item.name}
                >
                  {item.name}
                </Tag>
              );
            })}
          </Row>
          <Divider />
          <p className={styles.intro}>
            {intro}
            <img src={useBasePath() + '/img/decorate/pencil.svg'} />
          </p>
        </div>
      </a>
    </>
  );
};

export default Header;

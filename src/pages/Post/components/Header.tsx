import { ReactComponent as PostImage } from '@/assets/img/banner/post.svg';
import posts from '@/models/data/posts.json';
import {
  CheckCircleOutlined,
  PauseCircleOutlined,
  QuestionCircleOutlined,
  StarFilled,
  SwapOutlined,
} from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Divider, Row, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import intros from '../data/intro.json';
import styles from '../index.less';

const Header: React.FC = () => {
  const {
    setPost,
    sort,
    setSort,
    setIntro,
    intro,
    setTag,
    tag,
    status,
    setStatus,
    TagPost,
    setTagPost,
  } = useModel('usePost');
  const [rate, setRate] = useState(false);

  const handleTagClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    setTag(event.currentTarget.innerText);
  };

  const filteredStatus = (val: number) => {
    setStatus(val);
  };

  // 文章重新排序
  const reSort = () => {
    setPost((s) => s.reverse());
    setSort(() => !sort);
  };

  // 文章按复习频率排序
  const review = () => {
    // 若已经按频率排好序，就只翻转
    if (rate) {
      setPost((s) => s.reverse());
      return;
    }
    setPost((s) => {
      setRate(() => !rate);
      let ss = JSON.parse(JSON.stringify(s));
      // 必须保证每个元素都有rate属性，排序才能生效
      return ss.sort((a, b) => a?.rate - b?.rate);
    });
  };
  // 按tag筛选文章（一级筛选条件，每次都从posts中重新筛选）
  useEffect(() => {
    setPost(() => {
      return tag === '全部'
        ? posts
        : posts.filter((item) => {
            return item.tag.includes(tag);
          });
    });
    setTagPost(() => {
      return tag === '全部'
        ? posts
        : posts.filter((item) => {
            return item.tag.includes(tag);
          });
    });
    setIntro(
      () => intros.find((intro) => intro.name === tag)?.intro || '学而时习之',
    );
  }, [tag]);

  // 按状态筛选文章（二级筛选条件，每次都从TagPost中重新筛选）
  useEffect(() => {
    if (status === 0 || status === 1 || status === 2) {
      setPost(() => {
        return TagPost.filter((item) => item.status === status);
      });
    }
  }, [status]);

  return (
    <>
      <a className={styles.banner}>
        <SwapOutlined
          rotate={90}
          style={{ position: 'absolute', right: 0, bottom: 0 }}
          onClick={reSort}
        />
        <PauseCircleOutlined
          onClick={() => filteredStatus(1)}
          style={{
            color: '#0958d9',
            position: 'absolute',
            right: 30,
            bottom: 0,
          }}
        />
        <QuestionCircleOutlined
          onClick={() => filteredStatus(2)}
          style={{
            color: 'orange',
            position: 'absolute',
            right: 55,
            bottom: 0,
          }}
        />
        <CheckCircleOutlined
          onClick={() => filteredStatus(0)}
          style={{
            color: 'green',
            position: 'absolute',
            right: 80,
            bottom: 0,
          }}
        />
        <StarFilled
          onClick={review}
          style={{
            color: 'rgb(247, 212, 0)',
            position: 'absolute',
            right: 120,
            bottom: 0,
          }}
        />
        {/* <img src={postImage} /> */}
        <PostImage />
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
            <img src="/img/decorate/pencil.svg" />
          </p>
        </div>
      </a>
    </>
  );
};

export default Header;

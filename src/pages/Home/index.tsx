import Locale from '@/locales';
import { SearchOutlined, SmileTwoTone } from '@ant-design/icons';
import { ReactComponent as SvgLogo } from '@public/img/banner/blog.svg';
import { history } from '@umijs/max';
import { Button } from 'antd';
import React from 'react';
import Timeline from './components/TimeLine';
import styles from './index.less';

const Home: React.FC = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles['banner']}>
          <h1>{Locale.Home.Title}</h1>
          <div className={styles['button-group']}>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              className={styles['start']}
              onClick={() => history.push('/post')}
            >
              {Locale.Home.Start}
            </Button>
            <p className={styles['slogan']}>
              {Locale.Home.Slogan} <SmileTwoTone twoToneColor="#52c41a" />
            </p>
          </div>
        </div>
        <div className={styles.head}></div>
        <div className={styles['logo']}>
          <SvgLogo />
        </div>
      </div>
      <Timeline />
    </>
  );
};

export default Home;

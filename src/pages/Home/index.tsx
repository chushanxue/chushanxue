import { useUpdateTime } from '@/hooks/useUpdateTime';
import Locale from '@/locales';
import { FrownTwoTone, SearchOutlined, SmileTwoTone } from '@ant-design/icons';
import { ReactComponent as SvgLogo } from '@public/img/banner/blog.svg';
import { history } from '@umijs/max';
import { useMount } from 'ahooks';
import { Button } from 'antd';
import React, { useState } from 'react';
// import Timeline from './components/TimeLine';
import styles from './index.less';

const Home: React.FC = () => {
  const [updateTime, setUpdateTime] = useState<any>(false);
  useMount(() => {
    setUpdateTime(useUpdateTime());
  });
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
              {!updateTime && Locale.Home.Slogan}
              {!updateTime && <SmileTwoTone twoToneColor="#52c41a" />}
              {updateTime && `已经${updateTime}天没有更新博客啦`}
              {updateTime && <FrownTwoTone twoToneColor="#faa219" />}
            </p>
          </div>
        </div>
        <div className={styles.head}></div>
        <div className={styles['logo']}>
          <SvgLogo />
        </div>
      </div>
      {/* <Timeline /> */}
    </>
  );
};

export default Home;

import { prettyLog } from '@/hooks/useConsole';
import { useUpdateTime } from '@/hooks/useUpdateTime';
import Locale from '@/locales';
import { FrownTwoTone, SearchOutlined, SmileTwoTone } from '@ant-design/icons';
import { ReactComponent as SvgLogo } from '@public/img/banner/blog.svg';
import { history } from '@umijs/max';
import { useMount } from 'ahooks';
import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.less';

const Home: React.FC = () => {
  const [updateTime, setUpdateTime] = useState<any>(false);
  // 创建打印对象
  const log = prettyLog();
  useMount(() => {
    setUpdateTime(useUpdateTime());
  });

  useEffect(() => {
    const fetchDeploymentTime = async () => {
      const response = await fetch(
        'https://api.github.com/repos/chushanxue/chushanxue/commits',
        {
          headers: {
            Authorization:
              'Bearer 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',
          },
        },
      );
      const data = await response.json();
      const lastCommit = data[0]; // 获取最近的提交信息
      const commitDate = new Date(lastCommit.commit.committer.date);
      // 格式化时间
      const formattedDate = commitDate.toLocaleString();
      // 计算与今天相隔的天数以及是不是今天
      const today = new Date();
      const timeDiff = today.getTime() - commitDate.getTime();
      const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
        ? Math.floor(timeDiff / (1000 * 60 * 60 * 24))
        : false;
      setUpdateTime(daysDiff);
      // console.log(formattedDate, daysDiff, timeDiff);  不要忘记基础的写法
      log.info('daysDiff', `${formattedDate}, ${daysDiff}, ${timeDiff}`); //挺好的，醒目，图片打印很实用
    };

    fetchDeploymentTime();
  }, []);

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
              {/* {!deploymentTime && Locale.Home.Slogan}
              {deploymentTime && `上次更新于：${deploymentTime}`} */}
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

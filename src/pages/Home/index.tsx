import { prettyLog } from '@/hooks/useConsole';
import { useUpdateTime } from '@/hooks/useUpdateTime';
import Locale from '@/locales';
import { getDaysSinceLatestCommit, getRecentCommits } from '@/services/site';
import type { GitHubCommitItem } from '@/types/site';
import { FrownTwoTone, SearchOutlined, SmileTwoTone } from '@ant-design/icons';
import { ReactComponent as SvgLogo } from '@public/img/banner/blog.svg';
import { history } from '@umijs/max';
import { useMount } from 'ahooks';
import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import Timeline from './components/TimeLine';
import styles from './index.less';

const Home: React.FC = () => {
  const [updateTime, setUpdateTime] = useState<number | false>(false);
  const [updateInfoList, setUpdateInfoList] = useState<GitHubCommitItem[]>([]);

  // 创建打印对象
  const log = prettyLog();
  useMount(() => {
    setUpdateTime(useUpdateTime());
  });

  useEffect(() => {
    const fetchDeploymentTime = async () => {
      const data = await getRecentCommits();
      const nextUpdateTime = getDaysSinceLatestCommit(data || []);
      const latestCommitDate = data?.[0]?.commit?.committer?.date;

      setUpdateInfoList(data || []);
      setUpdateTime(nextUpdateTime);

      if (latestCommitDate) {
        const commitDate = new Date(latestCommitDate);
        log.info(
          'daysDiff',
          `${commitDate.toLocaleString()}, ${nextUpdateTime}, ${Date.now() - commitDate.getTime()}`,
        );
      }
    };

    fetchDeploymentTime().catch(() => {
      setUpdateInfoList([]);
    });
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
              {/* {!updateTime && `（${UpdateInfo}）`} */}
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
      <Timeline updateInfoList={updateInfoList} />
    </>
  );
};

export default Home;

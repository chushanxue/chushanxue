import { useBasePath } from '@/hooks/useBasePath';
import { Helmet, history, useModel } from '@umijs/max';
import { Space, Tag } from 'antd';
import MarkNav from 'markdown-navbar';
import querystring from 'querystring';
import React, { useEffect, useState } from 'react';
import { icons } from './content';
import style from './index.less';
import Markdown from './Markdown';
import './navbar.less';
const MD = () => {
  const [md, handleMD] = useState('loading... ...');
  const [tags, handleTags] = useState<any>(['']);
  const [time, handleTime] = useState<any>();
  const [title, handleTitle] = useState<any>('');
  const { setTag } = useModel('usePost');
  const back = (event: React.MouseEvent<HTMLSpanElement>) => {
    setTag(event.currentTarget.innerText);
    history.back();
  };

  useEffect(() => {
    const queryParams = querystring.parse(location.search.slice(1));
    const title = queryParams.title;
    if (!Array.isArray(queryParams.tags) && queryParams.tags) {
      queryParams.tags = [queryParams.tags];
    }
    const tags = queryParams.tags;
    const time = queryParams.time;
    handleTitle(title);
    handleTags(tags);
    handleTime(time);

    fetch(`${useBasePath()}/md/${title}.md`)
      .then((resp) => resp.text())
      .then((txt) => handleMD(txt));
  }, []);

  return (
    <div className={style.container}>
      {/* 页签标题 */}
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {/* 目录 */}
      <div className={style.mdNavigation}>
        <div className={style.navTitle}>目录</div>
        <MarkNav source={md} ordered={false} headingTopOffset={-150} />
      </div>
      {/* 文章信息 */}
      <div className={style.banner}>
        <p>{title}</p>
        <p>
          {icons.map((item, index) => (
            <img src={item} onClick={() => location.reload()} key={index} />
          ))}
        </p>
        <Space size={25}>
          <img
            src={useBasePath() + '/img/decorate/back.svg'}
            onClick={() => history.back()}
          />
          {tags &&
            tags.map((item: any) => (
              <Tag color="purple" onClick={back} key={item}>
                {item}
              </Tag>
            ))}
          <span>{time}</span>
        </Space>
      </div>
      {/* 正文 */}
      <Markdown>{md}</Markdown>
    </div>
  );
};

export default MD;

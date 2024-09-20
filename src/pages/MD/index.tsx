import { useBasePath } from '@/hooks/useBasePath';
import { endSpeak, handleSpeak, trans } from '@/hooks/useRead';
import { CustomerServiceOutlined } from '@ant-design/icons';
import { Helmet, history, useModel } from '@umijs/max';
import { FloatButton, Space, Tag } from 'antd';
import MarkNav from 'markdown-navbar';
import querystring from 'querystring';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();
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
      .then((txt) => {
        // 使用正则表达式替换文本中的路径
        const updatedText = txt.replace(
          /!\[ ]\(\/md/g,
          `![ ](${useBasePath()}/md`,
        );
        handleMD(updatedText);
      });
  }, [location.search]);

  const [isRead, setIsRead] = useState<boolean>(false); //是否正在播放语音

  const changeSpeek = () => {
    if (!isRead) {
      console.log('开始语音播报');
      setIsRead(true);
      handleSpeak(trans(md));
    } else {
      console.log('结束语音播报');
      setIsRead(false);
      endSpeak();
    }
  };

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
      {/* 朗读功能 */}
      <FloatButton
        shape="circle"
        type="primary"
        style={{ insetInlineEnd: 94 }}
        icon={<CustomerServiceOutlined />}
        onClick={() => changeSpeek()}
      />
    </div>
  );
};

export default MD;

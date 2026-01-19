import Clues from '@/components/Clues';
import { useBasePath } from '@/hooks/useBasePath';
import { useSearchPost } from '@/hooks/useSearchPost';
import { getIP, getWeather } from '@/services/UseWeather';
import { NavLink } from '@umijs/max';
import { useMount } from 'ahooks';
import { Input, Space } from 'antd';
import React, { useState } from 'react';
import styles from './header.less';

const { Search } = Input;

const Header: React.FC = () => {
  // const { city, weather, temperature, setCity, setWeather, setTemperature } =
  //   useModel('useWeathers'); // todo 不要使用钩子 线上不显示的原因还不清楚
  const [keyword, setKeyword] = useState<string>('');
  const [matchPosts, setMatchPosts] = useState<any>([]);
  const [city, setCity] = useState();
  const [weather, setWeather] = useState();
  const [temperature, setTemperature] = useState();

  const onSearch = (value: string) => {
    setKeyword(value);
    // 异步promise的赋值方法
    useSearchPost(value).then((matchedPosts) => {
      setMatchPosts(matchedPosts);
    });
  };

  useMount(() => {
    getIP().then((res: any) => {
      if (res.adcode) {
        getWeather(res.adcode).then((res: any) => {
          setCity(res.lives[0].city);
          setWeather(res.lives[0].weather);
          setTemperature(res.lives[0].temperature);
        });
      }
    });
  });

  return (
    <>
      <div className={styles.header} style={{ borderTop: 0 }}>
        {/* 左侧内容 */}
        <div className={styles.left}>
          <Space size={40}>
            {/* logo */}
            <NavLink className={styles.logo} to="/">
              <img src={useBasePath() + '/img/logo/logo3.svg'} />
            </NavLink>
            <div className={styles.searchBar}>
              <Search
                placeholder="站内搜索"
                onSearch={onSearch}
                className={styles.search}
              />
              <Clues
                keyword={keyword}
                matchPosts={matchPosts}
                cleanKeyword={() => setKeyword('')}
                cleanMatchPosts={() => setMatchPosts([])}
              />
            </div>
          </Space>
        </div>
        {/* 右侧内容 */}
        <div className={styles.right}>
          <Space size={30}>
            {weather ? (
              <Space>
                <div className={styles.location}>
                  <img src={useBasePath() + '/svg/location.svg'} />
                </div>
                <Space direction="vertical" size={1}>
                  <span>{city.slice(0, city.length - 1)}</span>
                  <span>{weather + ' / ' + temperature + '℃'}</span>
                </Space>
              </Space>
            ) : (
              <></>
            )}
          </Space>
        </div>
      </div>
      <div className={styles.header}>
        {/* 左侧内容 */}
        <div className={styles.left}>
          <Space size={40}>
            {/* 目录 */}
            <NavLink
              to="/post"
              className={styles.menu}
              style={({ isActive }) => (isActive ? { color: '#faa219' } : {})}
            >
              技术博客
            </NavLink>
            <NavLink
              to="/nav"
              className={styles.menu}
              style={({ isActive }) => (isActive ? { color: '#faa219' } : {})}
            >
              资源导航
            </NavLink>
            {/* <NavLink
              to="/week"
              className={styles.menu}
              style={({ isActive }) => (isActive ? { color: '#faa219' } : {})}
            >
              个人作品
            </NavLink> */}
            {/* <NavLink
              to="/talk"
              className={styles.menu}
              style={({ isActive }) => (isActive ? { color: '#faa219' } : {})}
            >
              心得成长
            </NavLink> */}
            {/* <NavLink
              to="/about"
              className={styles.menu}
              style={({ isActive }) => (isActive ? { color: '#faa219' } : {})}
            >
              关于
            </NavLink> */}
          </Space>
        </div>
        {/* 右侧内容 */}
        <div className={styles.right}></div>
      </div>
    </>
  );
};
export default Header;

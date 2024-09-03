import { request } from '@umijs/max';

// 通过高德地图获取当地的城市编码，进一步获取实时天气  https://lbs.amap.com/api/webservice/guide/api/weatherinfo

/**
 * 请求天气数据
 */
export const getWeather = async (adcode: any) => {
  return request(
    `/weather/weatherInfo?city=${adcode}&key=b2544abe394eeb9fe62acc712a9ca8f0`,
    {
      method: 'GET',
    },
  );
};

/**
 * 获取用户的IP地址
 */
export const getIP = () => {
  return request('/ip?key=b2544abe394eeb9fe62acc712a9ca8f0', {
    method: 'GET',
  });
};

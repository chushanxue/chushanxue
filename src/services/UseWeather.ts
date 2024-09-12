import { request } from '@umijs/max';
const isDev = process.env.NODE_ENV === 'development';
const urlWeather = isDev
  ? '/weather/weatherInfo'
  : 'https://restapi.amap.com/v3/weather';

const urlIp = isDev
  ? '/ip'
  : 'https://restapi.amap.com/v3/ip';

// 通过高德地图获取当地的城市编码，进一步获取实时天气  https://lbs.amap.com/api/webservice/guide/api/weatherinfo

/**
 * 请求天气数据
 */
export const getWeather = async (adcode: any) => {
  return request(
    urlWeather,
    {
      method: 'GET',
      params: {
        city: adcode,
        key: 'b2544abe394eeb9fe62acc712a9ca8f0',
      }
    },
  );
};

/**
 * 获取用户的IP地址
 */
export const getIP = () => {
  return request(urlIp, {
    method: 'GET',
    params: {
      key: 'b2544abe394eeb9fe62acc712a9ca8f0',
    },
  });
};

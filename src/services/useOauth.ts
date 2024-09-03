import { request } from '@umijs/max';

/**
 * github第三方登录
 */
export const getOauth = () => {
  return request('/login/oauth/authorize', {
    method: 'GET',
    params: {
      client_id: '4bb13df3c37e8d038b03',
      redirect_uri: 'redirect_uri=http://127.0.0.1:7070/api/oauth',
    },
  });
};

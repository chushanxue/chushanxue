import { defineConfig } from '@umijs/max';

const path = require('path');

export default defineConfig({
  links: [{ rel: 'icon', href: './favicon.ico' }],
  title: '兀米的技术小站（正式版）',
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  dva: {
    immer: { enableES5: true },
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '博客',
      path: '/post',
      component: './Post',
    },
    {
      name: '关于',
      path: '/about',
      component: './About',
    },
    {
      name: '正文',
      path: '/md',
      component: './MD',
    },
    {
      name: '资源导航',
      path: '/nav',
      component: './Nav',
    },
    {
      name: '社区贡献',
      path: '/contribute',
      component: './Contribute',
    },
    {
      name: '重定向',
      path: '/redirect',
      component: './Redirect',
    },
    { path: '/*', component: '@/pages/404' },
  ],
  npmClient: 'pnpm',
  alias: {
    '@public': path.resolve(__dirname, 'public'),
  },
  proxy: {
    '/weather': {
      target: 'https://restapi.amap.com/v3/weather',
      changeOrigin: true,
      secure: true,
      pathRewrite: { '^/weather': '' },
    },
    '/ip': {
      target: 'https://restapi.amap.com/v3/ip',
      changeOrigin: true,
      secure: true,
      pathRewrite: { '^/ip': '' },
    },
  },
  mfsu: {},
  base: '/chushanxue/',
  publicPath: '/chushanxue/',
});

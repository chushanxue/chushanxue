## 一、前言

技术栈切换成`react`以后，终于能够用上`Ant Design Pro`了，先鼓掌👏🏻

不过，虽然`Ant Design Pro`所使用的技术栈是`umi+antd`这样熟悉的组合，但是他的写法还是比较有挑战性的，借着这个契机上手一下高端局的写法，同时借鉴优化上一个项目

> 由于ant-design-pro基于umi，所以，如无特殊说明，本文中umi便指代ant-design-pro项目

## 二、项目之初

官方文档：<https://pro.ant.design/zh-CN>

安装：

- `npm i @ant-design/pro-cli -g`
- `pro create myapp`（第一个坑☝🏻，此命令需在特定文件夹下，直接敲命令会安装到主目录中，比较麻烦）

启动：

- `pnpm i`
- `pnpm start`（第二个坑✌🏻，注意不要用`pnpm dev`，否则在登录时接口会报错，这里其实文档中有说明）

## 三、细抠代码

### 1、个性化修改

- 修改页签图标及网页名称

  页签图标直接替换favicon.ico这个文件即可

- 其他类似的配置基本都在config文件夹里的`config.ts`和`defaultSettings.ts`中

### 2、layout配置

`defaultSettings.ts`便是layout的配置文件，样式什么的不多说了，主要记一下路由目录是如何配置的

- 首先，不同的路由在不同的page下建立文件夹，并且要在routes文件中进行详细的路由配置，这里跟之前umi的写法是一致的
- 那么，路由是如何对应上目录标题的呢，答案是国际化配置，重点在路由的配置文件中name的值
  > @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题

还有一部分配置在`app.tsx`里面

### 3、登录登出

这一块基本只需要修改`接口api`，登录的那块添加一个报错处理，登出的那块删掉多余的menu（如个人中心等下拉操作）

有几个点值得一说：

- 实现重新登录后回到登出时的页面

  通过 `new URL(window.location.href)` 创建一个 `URL` 对象，然后使用 `.searchParams` 获取 `URL` 的查询参数部分

  ```js
  /**
   * 退出登录，并且将当前的 url 保存（目的是重新登录后能够回到原来的页面）
   */
  const loginOut = async () => {
    <!-- 退出登录操作 -->
    await outLogin();
    <!-- 保存当前url -->
    const { search, pathname } = window.location;
    const urlParams = new URL(window.location.href).searchParams;
    const redirect = urlParams.get('redirect');
    <!-- 跳转至登录页操作（带上跳转页以及那页的跳转参数） -->
    if (window.location.pathname !== '/user/login' && !redirect) {
      history.replace({
        pathname: '/user/login',
        // 这里其实会有点安全问题
        search: stringify({
          <!-- 注意注意，这里如果是带前缀项目记得先去掉前缀，不然会重复拼接 -->
          // redirect: (pathname + search).replace(/^\/manage/, ''),  如果前缀是manage的话
          redirect: pathname + search,
        }),
      });
    }
  };
  ```

  ```js
  // 登录
  // 获取当前页面的 URL 参数，并根据参数中的 redirect 值进行页面跳转
  const urlParams = new URL(window.location.href).searchParams;
  history.push(urlParams.get('redirect') || '/');
  ```

### 3、网络请求

#### 3.1 请求报错处理

- 全局错误处理

  找到`requestErrorConfig.ts`这个文件，**这里不仅是错误处理，也包括拦截器**，所以其实他就是请求配置，叫错误处理是命名问题。

  - 以全局401错误为例

    ```js
    // 错误处理

    errorHandler: (error: any, opts: any) => {

      ......

      if (error.response) {
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        if (error.response.status === 401) {
          // 处理全局401错误
          message.info({
            key: 'logout',
            type: 'info',
            content: '登录已失效',
          });
          localStorage.removeItem('token');
          history.push(loginPath);
        }
      }
    },

      ......

    ```

  - 以全局添加token为例

    ```js
    // 请求拦截器
    requestInterceptors: [
    (url, options) => {
      // 全局添加token
      if (!options.headers.Authorization) {
        options.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
      }
      if (options.headers.Authorization === 'none') {
        options.headers.Authorization = '';
      }
      return { url, options };
    },
    ],
    ```

- 非全局错误处理

  以登录接口的报错信息为例，由于登录接口一旦账号密码错误就会抛出400，虽然会被全局错误处理捕获，但如果需要自定义表现，需要在组件内捕获到错误，可以通过`try...catch`，也可以通过`useRequest`（更为推荐）

  ```js
  // 登录
  const handleSubmit = async (values: API.LoginParams) => {
    try {
      const msg = await login({ ...values });
      message.success('登录成功！');
      if (msg.access_token) {
        localStorage.setItem('token', msg.access_token);
        localStorage.setItem('userId', msg.user_id);
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      } else {
        setUserLoginState('重要信息缺失，请联系管理员');
      }
    } catch (error: any) {
      // 处理非全局的401错误
      if (error?.message.includes('timeout')) {
        setUserLoginState('登录超时，请稍后重试');
        return;
      }
      const err = error?.response?.data;
      if (err?.error === 'access_denied' || err?.error === 'invalid_grant') {
        setUserLoginState(err?.error_description);
      } else {
        setUserLoginState('登录失败，请联系管理员');
      }
    }
  };
  ```

  ```js
    const { run: runLogin } = useRequest(login, {
    manual: true,
    async onSuccess(data) {
      message.success('登录成功！');
      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('userId', data.user_id);
        await fetchUserInfo();
        // 获取当前页面的 URL 参数，并根据参数中的 redirect 值进行页面跳转
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      } else {
        setUserLoginState('重要信息缺失，请联系管理员');
      }
    },
    onError(error: any) {
      console.log('页面拿到的错误', error);
      if (error?.message.includes('timeout')) {
        setUserLoginState('登录超时，请稍后重试');
        return;
      }
      const err = error?.response?.data;
      if (err?.error === 'access_denied' || err?.error === 'invalid_grant') {
        setUserLoginState(err?.error_description);
      } else {
        setUserLoginState('登录失败，请联系管理员');
      }
    },
  });

  // 登录
  const handleSubmit = async (values: LoginParams) => {
    runLogin(values);
  };
  ```

### 4、数据流

- `initialState`

  @umi/max 内置了全局初始状态管理插件，详细解释在`umi文档查漏补缺.md`

  `initialState`一般用于存储用户信息，用户信息可以包含路由权限列表，而路由权限列表又可用于access.ts文件，这也是权限系统的实现流程

### 5、权限系统

- 不同的用户对页面的访问权限不同（路由级别的权限管理）

  原理：不同的用户会分配不同的角色，不同的角色具备不同的路由权限，也就是不同的路由路径list，通过用户信息接口拿到这个list，放到initialState中，在access.ts使用

  ```js
  // 记得先开启配置
  export default {
    access: {},
    // access 插件依赖 initial State 所以需要同时开启
    initialState: {},
  };
  ```

  ```js
  access.ts

  export default function access(initialState: { currentUser?: any } | undefined) {
  // 后端要给的就是这样一个数组
  // [
  //   '/operation/dashboard',
  //   '/operation',
  //   '/evaluate',
  //   '/evaluate/evaluatebase',
  //   '/evaluate/evaluatebase/base',
  //   '/evaluate/evaluatebase/data',
  //   '/evaluate/evaluatebase/detail',
  // ];

  const { currentUser } = initialState ?? {};

  // 返回一个对象，对象的每一个值就对应定义了一条权限
  return {
    normalRouteFilter: (route: any) => currentUser.routes.includes(route.path), // initialState 中包含了的路由作为normalRouteFilter这个“角色”可访问的路由
    // normalRouteFilter: true,  // 直接设置为布尔值也可
  };
  }
  ```

  ```js
  routes: [
    {
      path: '/foo',
      name: 'foo',
      // ...
      access: 'normalRouteFilter', // 会调用 src/access.ts 中返回的 normalRouteFilter 进行鉴权
    },
  ];
  ```

  <mark>一个小坑：由于路由表是固定在前端的，所以不同权限的用户首次进入都会跳转到原先规定的'/'，而'/'的重定向已然是无法更改的，这就导致部分用户一登录就会看到403</mark>

  解决方案：从路由跳转入手

  前面有提过能够实现**记录退出前的路由，登录后依然重定向到那个路由**，我们可以改造下那个方法，跳转到有权限的第一个路由

  ```js

   const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();

    // 获取用户权限的第一个路由路径，并进行页面跳转
    const redirectPath = userInfo?.routePaths[0] || '/';
    // 获取当前页面的 URL 参数，并根据参数中的 redirect 值进行页面跳转
    const urlParams = new URL(window.location.href).searchParams;
    history.push(redirectPath || urlParams.get('redirect'));

    ...
    }

  ```

- 不同的用户在页面中可以看到的元素和操作不同（元素级别的权限管理）

  需要配合`useAccess`和`<Access/>`组件使用，不过也不难，用到的时候再做补充，权限的原理其实最终都是布尔值判断

## 四、报错

### 1、typescript严格模式

<p>
<img src="/md/Ant%20Design%20Pro踩坑记录/1.png" width=800 />
</p>

以上代码飘红是`typescript`严格模式导致的，由于没办法保证`username`和`password`一定有值，解决方案：**在类型定义的时候就规定字段一定存在**

```js
  type LoginParams = {
    username: string;// username?: string 导致报错
    password: string;
  };
```

## 五、打包部署

### 1、带前缀项目

有时候我们不会给每个项目都分配一个域名

例如，**面客端**项目的域名为`http://xxx.com`，那么**管理端**项目的域名可能就为`http://xxx.com/manage`

> 由于是单页面应用，所以我们无需在部署流程中配置具体的路由，路由的切换由js内部进行处理，我们只需在匹配到前缀时（只有刷新网页才会去服务器匹配资源，路由切换是不经过服务器的）把index.html传回，index.html又会带出配套的js文件，也就是所有的项目文件一步到位，接下来交给路由和ajax

- 配置项目**路由**前缀（页面url配置）

  - base

    要在非根目录下部署 `umi` 项目时，你可以使用 `base` 配置。

    `base` 配置允许你为应用程序设置路由前缀。比如有路由 `/` 和 `/users`，设置 `base` 为 `/foo/` 后就可通过 `/foo/` 和 `/foo/users` 访问到之前的路由。

  - hash

    这个配置其实跟前缀没关系，但是它也很有用，记录一下

    开启 `hash` 模式，让 `build` 之后的产物包含 `hash` 后缀。通常用于增量发布和避免浏览器加载缓存。

    意思就是避免每次打包后的文件都是同名的，导致浏览器有缓存，加载不出最新的代码

    `html` 文件始终没有 `hash`（umi框架默认将哈希值应用于生成的`JavaScript`和`CSS`文件，而不是`HTML`文件。通常情况下，哈希值主要用于标识和管理静态资源文件（如`JavaScript`和`CSS`），以便在发布新版本时避免浏览器加载缓存。**HTML文件作为入口文件，本身在每次访问时都会被加载，并且通常不会发生更改**。因此，在`umi`中，默认情况下不对`HTML`文件应用哈希后缀。）

- 配置项目打包后的**静态资源**路径前缀（静态资源url配置）

  - publicPath

    `umi`中的`publicPath`实际上就是在配置`webpack` 的 `publicPath`

    可以通过它来**指定应用程序中所有资源的基础路径**。

    这个配置不要跟base混淆，base只服务于路由，且只用于打包（也就是开发环境不要写这个配置，否则会报错）

    如果同时要兼顾开发环境正常调试，你可以这样配置：

    ```js
    publicPath: process.env.NODE_ENV === 'production' ? '/foo/' : '/',
    ```

    当打包的时候，webpack 会在静态文件路径前面添加 publicPath 的值

    ```css
      比如，这是我们在css中引用的图片资源：
      background-image: url('@/assets/imgs/bg.png');

      打包上线后，请求路径就变成了：
      https://xxx.com/manage/static/bg.1bbe175e.png

      不仅给我们加上了前缀，还放进了static的目录下（这里就是webpack在做的事情了），还加上了hash后缀
    ```

    ```js

    比如，这是我们在页面中引入的图片资源（注意：@前缀只在import时生效，直接在src中不生效）
    import imgUrl from '@/assets/svgs/logo.svg';

    <img alt="logo" src={imgUrl} />;

    打包上线后，webpack会进行base64的处理，请求路径会变得很长，但能正确请求到，只要经过了webpack，那么路径一定是对的
    ```

    好了，坑来了⚠

    public文件夹下的文件我们引用起来非常方便，但是，它有一个致命的问题，就是它打包时不经过webpack，打包时是直接平移到dist文件夹内的，这就会导致前缀并没有加上去

    ```js

    比如，这是我们在配置中引入的图片或者js资源

    headScripts: [
    //解决首次加载时白屏的问题
      { src: '/scripts/loading.js', async: true },
    ],

    logo: '/svgs/logo.svg',

    打包上线后，请求路径就变成了：
    https://xxx.com/scripts/loading.js
    https://xxx.com/svgs/logo.svg

    请求前缀没有带上，自然也就404了

    ```

    所以我们在开发带前缀的项目时，有三种处理方案：

    - 不要用到public文件夹

      有些时候无法避免，比如在配置文件中除了public里的资源，其他一概不接受，也是挺奇怪。。。。

    - 把路径写全（绝对路径）

      暂时没用过这种方案

    - 打包时带上前缀（改造起来最方便，但资源一多就麻烦）
    - 本地和生产各写一份配置文件

      ```js
      // 生产配置文件需要加上前缀，以及给public文件夹下的文件加上前缀路径（但本地通通不用写）
      publicPath: '/manage/',
      base: '/manage/',
      favicons: ['/manage/favicon.ico'],

      // 有时候配置文件无法分成两个，那么就需要判断在哪个环境下
      const isDev = process.env.NODE_ENV === 'development';
      logo: `${isDev ? '' : '/manage'}/svgs/logo.svg`,
      ```

### 2、gzip压缩

原始项目并不带gzip压缩配置，所以打包后的文件夹中不含有.gz后缀的文件，需要我们手动去配

这一步配置实现的是：在构建时就压缩好，等到浏览器请求对应的静态资源时，直接传回压缩好的文件

- 下载`compression-webpack-plugin`插件

- 在.umirc.ts （config.js、config.ts）文件添加

  ```js
  // 开启gzip压缩
  import CompressionWebpackPlugin from 'compression-webpack-plugin';
  const productionGzipExtensions = ['js', 'css'];
  chainWebpack(config, {}) {
    // 开启gzip压缩模式
    process.env.NODE_ENV == 'production' &&
      config.plugin('CompressionWebpackPlugin').use(CompressionWebpackPlugin, [
        {
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8,
        },
      ]);
  },
  ```

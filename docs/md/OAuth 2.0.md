### 一、前言

应用场景：第三方平台账号登录

- 比如 `github` 登录，登陆后就能访问头像、邮箱、昵称等信息

- 比如 `qq`、微信、淘宝账号作为第三方登录 `app` 或网站

**简单说，`OAuth` 就是一种授权机制。数据的所有者告诉系统，同意授权第三方应用进入系统，获取这些数据。系统从而产生一个短期的进入令牌（`token`），用来代替密码，供第三方应用使用。**

### 二、示例

以 [github](https://github.com/settings/applications/new) 为例，授权之前，必须填写登记表

![ ](/md/OAuth%202.0/1.png)

应用的名称随便填，主页 `URL` 填写 `http://localhost:81`（前端主页地址），跳转网址填写 `http://127.0.0.1:7070/api/oauth`（后端接口地址）。

提交表单以后，`GitHub` 会返回客户端 `ID（client ID）`和客户端密钥（`client secret`），这就是应用的身份识别码。

注意 `client secret` 申请后要及时复制保存，只能看一次

`A` 网站允许 `GitHub` 登录，背后就是下面的流程：

```bash
A 网站让用户跳转到 GitHub。
GitHub要求用户登录，然后询问"A 网站要求获得 xx 权限，你是否同意？"
用户同意，GitHub就会重定向回 A 网站，同时发回一个授权码。
A 网站使用授权码，向 GitHub请求令牌。
GitHub返回令牌.
A 网站使用令牌，向 GitHub请求用户数据。
```

具体的代码实现：

1、前端发起请求到 github 授权页面，授权成功拿到`code`重定向到配置的后端`callback URL`

```html
<a
  href="https://github.com/login/oauth/authorize?client_id=xxxx&redirect_uri=http://127.0.0.1:7070/api/oauth"
></a>
```

2、用户同意授权， GitHub 就会跳转到 redirect_uri 指定的跳转网址，并且带上授权码，跳转回来的 URL 就是下面的样子

```js
http://127.0.0.1:7070/api/oauth?code=xxxx
```

3、后端针对 `api/oauth` 的请求，编写一个路由，完成 `OAuth` 认证。（后端拿到 `code`，带着 `code` 请求 `github`，拿到 `token`,再通过 `token` 请求到 `github` 信息，将信息放在 `url` 上传递给前端）

- 这一步使用 `node`，首先拿出一个准备好的 `node` 项目
- 使用 `axios` 调用第三方服务 `API`

  ```js
  //github授权处理
  exports.oauth = (req, res) => {
    tokenResponse(req.query.code).then(() => {
      res.redirect(redirectUrl); //请求成功后重定向到前端页面
    });
  };

  const axios = require('axios');
  // 创建忽略 SSL 的 axios 实例（否则会报错）
  const ignoreSSL = axios.create({
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  });
  let redirectUrl; //前端重定向地址
  const config = {
    client_id: 'xxxx',
    client_secret: 'xxxx',
  };

  const tokenResponse = async (code) => {
    console.log('code：', code);
    let accessToken;
    // 这个请求时好时坏
    await ignoreSSL({
      method: 'post',
      url: 'https://github.com/login/oauth/access_token',
      data: qs.stringify({
        client_id: config.client_id,
        client_secret: config.client_secret,
        code,
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      timeout: 100000, // 增加请求超时时间
    })
      .then(async (res) => {
        console.log(
          'token请求成功',
          res.data,
          res.data.split('=')[1].split('&')[0],
        );
        accessToken = res.data.split('=')[1].split('&')[0];
      })
      .catch((err) => {
        console.log('token请求失败', err);
      });

    //拿到用户数据，得到用户的身份
    if (accessToken) {
      await ignoreSSL({
        method: 'get',
        url: `https://api.github.com/user`,
        headers: {
          accept: 'application/json',
          Authorization: `token ${accessToken}`,
        },
      })
        .then((res) => {
          console.log('用户身份请求成功', res.data);
          //优化成cookie携带信息
          redirectUrl = `http://localhost:81/home?name=${res.data.name}&avatar_url=${res.data.avatar_url}`;
        })
        .catch((err) => {
          console.log('用户身份请求失败', err);
        });
    }
  };
  ```

4、前端需要在重定向页面写好接收的逻辑

```js
const [name, handleName] = useState < any > '';
const [avatarUrl, handleAvatarUrl] = useState < any > '';
useEffect(() => {
  // 这两个数据需要存进store
  const searchParams = new URLSearchParams(location.search);
  handleName(searchParams.get('name'));
  handleAvatarUrl(searchParams.get('avatar_url'));
}, []);
```

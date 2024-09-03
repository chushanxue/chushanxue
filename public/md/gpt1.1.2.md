## 一、登录

### 1、思路

- 1、点击登录按钮，调用后端的登陆接口，发送用户名和密码（密码需经过`rsa`加密）

- 2、后端收到请求，验证用户名和密码，验证成功，就给前端返回一个 `token`

- 3、前端拿到 `token`，将 `token` 存储到 `localStorage` 和 `pinia` 中，并跳转路由页面

- 4、前端每次跳转路由，就判断 `localStroage` 中有无 `token` ，没有就跳转到登录页面，有则跳转到对应路由页面

- 5、每次调后端接口，都要在请求头中加 `token`

- 6、后端判断请求头中有无 `token`，有 `token`，就拿到 `token` 并验证 `token`，验证成功就返回数据，验证失败（例如：`token` 过期）就返回 401，请求头中没有 `token` 也返回 401

- 7、如果前端拿到状态码为 401，就清除 `token` 信息并跳转到登录页面

### 2、实现

```js
const submit = async () => {
  loading.value = true;
  const url = xxx;

  const formData = new URLSearchParams();
  formData.append('username', formState.username);
  formData.append('password', passwordEncryption(formState.password) || ''); //rsa加密

  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
    loading.value = false; //用于按钮的loading状态
    message.info('登录超时，请重试');
  }, 5000);

  fetch(url, {
    method: 'post',
    body: formData.toString(),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded', //这个类型的参数写法不太一样，可以注意下
      Authorization: 'xxx',
    },
    signal: controller.signal, //由于原生的fetch请求没有超时处理，所以借用定时器实现5秒超时
  })
    .then((res) => {
      clearTimeout(timeout);
      return res.json();
    })
    .then((res) => {
      loading.value = false;
      if (res.access_token) {
        store.$patch({ token: res.access_token }); //拿到token并存储
        message.success('登录成功');
        router.replace('/');
      } else {
        if (res.error === 'access_denied' || res.error === 'invalid_grant') {
          message.error(res.error_description);
        } else {
          message.error('登录失败，请联系管理员');
        }
      }
    });
};
```

### 3、测试优化过程

1、报错的提示是当初没有考虑周到的地方

目前我们能捕获到的错误有：

- `用户名或密码错误`
- `该帐号已被锁，请确认`
- `登录超时`-->这个不会有红色显示，只会弹出一个提示
- 未知错误--->统一显示为`登录失败，请联系管理员`

2、报错采用的是 `antd` 自带的表单验证，且针对的是密码输入框，这是不太合理的

3、表单验证的红色提示不美观、直接弹出提示更好，且解决了上一个问题

### 4、react改写

```js
export const login = async (username: string, password: string) => {
  const formData = new URLSearchParams({
    grant_type: 'password',
    username,
    password: passwordEncryption(password) || '',
    scope: 'all',
  });

  return request('/chatbot-auth/oauth/token', {
    method: 'POST',
    timeout: 5000,
    data: formData.toString(),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic Y2hhdGJvdDpjaGF0Ym90X3NlY3JldA==',
    },
  });
};

 /**
   * @description 登录
   * @param username 域账号
   * @param password 密码
   */
  const getToken = async (username: string, password: string) => {
    login(username, password)
      .then((res) => {
        if (res.access_token) {
          // 重新登录清除某些内容
          resetMessages();
          resetChat();
          message.success('登录成功');
          localStorage.setItem('token', res.access_token);
          localStorage.setItem('userId', res.user_id);
          history.push('/');
        } else {
          message.error('登录失败，请联系管理员');
        }
      })
      // 报错处理
      .catch((res) => {
        if (res?.message.includes('timeout')) {
          message.info('登录超时，请稍后重试');
          return;
        }
        const err = res?.response?.data;
        if (err?.error === 'access_denied' || err?.error === 'invalid_grant') {
          message.error(err?.error_description);
        } else {
          message.error('登录失败，请联系管理员');
        }
      });
  };
```

## 二、引用

> [Vue 实现登录功能全套详解（含封装 axios）](https://blog.csdn.net/weixin_52691965/article/details/126499565)

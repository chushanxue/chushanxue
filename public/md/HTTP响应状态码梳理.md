## 一、3xx

### 304 Not Modified

说明无需再次传输请求的内容，也就是说可以使用缓存的内容。

相当于重定向到缓存❓

> ant-design-pro中经常有304的状态码，暂未知道什么原因

## 二、4xx

### 400 Bad Request

服务器因某些被认为是客户端错误的原因，而无法或不会处理该请求。

如：请求语法错误、无效请求消息格式或者欺骗性请求路由

### 401 Unauthorized

客户端错误，缺乏目标资源要求的身份验证凭证，发送的请求未得到满足。

即**用户未通过身份验证**

如：请求头缺少`Authorization`字段

### 403 Forbidden

客户端错误，指的是服务器端有能力处理该请求，但是拒绝授权访问。

这个状态类似于 401，不过是业务层面的错误，即**用户通过了身份验证，但没有足够的权限访问该资源**

### 404 Not Found

服务器无法找到所请求的资源

如：请求url有误、服务器资源丢失

### 405 Method Not Allowed

服务器禁止了使用当前 HTTP 方法的请求。

## 三、http出错处理

```js
export const showMessage = (status: number | string): string => {
  let message = '';
  switch (status) {
    case 400:
      message = '请求错误(400)';
      break;
    case 401:
      {
        message = '未授权，请登录(401)';
        ...//其他操作
      }
      break;
    case 403:
      message = '拒绝访问(403)';
      break;
    case 404:
      message = '请求出错(404)';
      break;
    case 408:
      message = '请求超时(408)';
      break;
    case 500:
      message = '服务器错误(500)';
      break;
    case 501:
      message = '服务未实现(501)';
      break;
    case 502:
      message = '网络错误(502)';
      break;
    case 503:
      message = '服务不可用(503)';
      break;
    case 504:
      message = '网络超时(504)';
      break;
    case 505:
      message = 'HTTP版本不受支持(505)';
      break;
    default:
      message = `连接出错(${status})!`;
  }
  if (message !== '未授权，请登录(401)') {
    // 401错误一般需要特殊处理
    Message.error(message);
  }
  return message;
};
```

## 四、引用

> [MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/401)

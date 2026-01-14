### 一、概念

- http

  直译：超文本传输协议

- 超文本

  含有指向其他资源链接内容的文本

- 常见状态码

  - 1xx 提示信息
  - 2xx 成功
  - 3xx 重定向
  - 4xx 客户端错误
  - 5xx 服务端错误

- 无状态

  - 每个请求都是完全独立的，每包含了处理这个请求所需的完整的数据，不依赖于其他请求。
  - 服务器也不会保留任何关于客户端的状态信息

### 二、同源策略

- 每个网站 是一个独立的小区
- 同源策略 是小区严格的门禁系统：**只允许本小区住户（同源请求）自由进出**
- 跨域请求 就像你想从“A小区”去“B小区的朋友家做客”
- 浏览器 是尽职的保安，默认会**阻止这种跨小区访问**

1. 协议相同
2. 域名相同
3. 端口相同

以上三个组合起来其实就是一个完整域名前缀地址，如：`https://xxx.com`

所以我们在项目中调用的接口地址：`https://xxx.com/xxxx`，是符合同源策略的

一旦不符合同源策略，就会出现**跨域问题**，解决方案要么前端nginx代理转发，要么后端代理转发

<mark> 一个特殊情况：https 的页面发送不了 http 请求</mark>

> 看起来是同源策略的问题，实际上还没到那一步，**混合内容的安全策略**是在浏览器端判定的，而是否能跨域要看服务器返回的Response头，请求都被浏览器block掉了，也就不存在是否跨域的问题。

#### 如何实现跨域

- CORS（跨域资源共享）

  原理：B小区（服务器）告诉保安（浏览器）：“我允许A小区的访客进来”

  前端：必须了解<mark>和CORS相关的、**简单请求及复杂请求**的、**响应**头</mark>

- JSONP（只支持get）

  原理：利用`<script>` 标签没有跨域限制的特性

  后端：返回JS函数调用，而不是JSON

  前端：

  ```html
  <!-- 通过添加一个 script 标签，指定 src 属性为跨域请求的 URL，而这个 URL 返回的不是 JSON 数据，而是一段可执行的 JavaScript 代码，这段代码会调用一个指定的函数，并且将 JSON 数据作为参数传入函数中 -->
  <script>
    function handleResponse(data) {
      console.log('收到数据:', data);
    }
  </script>
  <!-- 后端需要返回类似 handleResponse({...}) 的JS代码 -->
  <script src="https://api.other-site.com/data?callback=handleResponse"></script>
  ```

- 代理服务器(前端开发常用)

  就是工作中最常用的那一套

  原理：让同源的代理服务器转发请求，绕过**浏览器限制**。

  开发环境（Vite/Webpack配置）、生产环境（Nginx配置）

### 三、HTTP和HTTPS

HTTPS是在HTTP的基础上加入了**SSL协议**，SSL依靠**证书**来验证服务器的身份，并为浏览器和服务器之间的通信加密（在传输层）

HTTP + 加密 + 认证 + 完整性保护 = HTTPS

- HTTPS 协议需要申请证书
- HTTP 和 HTTPS 使用端口不一样，前者是80，后者是443
- HTTP 协议运行在 TCP 之上，所有传输的内容都是明文，HTTPS 运行在 SSL/TLS（安全传输层协议） 之上，SSL/TLS运行在TCP之上，所有传输的内容都经过加密的

### 四、HTTP复杂请求和简单请求

在涉及到**CORS**的请求中，我们会把请求分为简单请求和复杂请求。

- 简单请求

  - 请求方法只能是GET、POST或HEAD。（其他方法都是复杂请求：PUT, DELETE, PATCH, CONNECT, OPTIONS, TRACE）
  - 请求头中的内容只能是Accept、Accept-Language、Content-Language、Content-Type（且值只能是 application/x-www-form-urlencoded、multipart/form-data 或 text/plain）和 Origin。（不能自定义）
  - 请求中没有使用ReadableStream流。
  - 请求没有使用客户端提供的证书。

- 复杂请求

  - 不满足简单请求的都是复杂请求
  - 复杂请求需要发送预检请求

#### 1、CORS有哪些关键请求头

> ⚠️注意：使用vite代理转发时，因为Vite代理会帮你处理这些响应头。代理服务器转发请求时，相当于前端和代理是同域，浏览器不会触发跨域检查，所以不管简单还是复杂请求，都不用前端手动配置CORS响应头了。（这也是为什么在项目中从来没有配置过这些的原因）

分为浏览器发送和服务器返回两类

- 浏览器发送的请求头：

  - Origin：所有CORS请求都带，表示请求来源
  - Access-Control-Request-Method：预检请求特有，说明要用的方法
  - Access-Control-Request-Headers：预检请求特有，说明要用的自定义头

- 服务器返回的响应头：

  - Access-Control-Allow-Origin：允许的源（必需）
  - Access-Control-Allow-Methods：允许的方法（预检响应）
  - Access-Control-Allow-Headers：允许的头（预检响应）
  - Access-Control-Allow-Credentials：是否允许凭证
  - Access-Control-Expose-Headers：前端能访问的额外响应头
  - Access-Control-Max-Age：预检结果缓存时间

#### 2、携带Cookie的CORS请求需要前端、后端、浏览器三方配合

- ✅ 前端：设置credentials: 'include'
- ✅ 后端：设置Access-Control-Allow-Credentials: true
- ✅ 后端：Access-Control-Allow-Origin必须是具体域名（不能是\*）
- ✅ Cookie本身：需要正确的SameSite属性

#### 3、预检的结果是怎么返回的

核心机制：预检请求返回空响应体+特定状态码+响应头

预检请求通过`OPTIONS`方法发送，服务器通过HTTP响应返回预检结果。返回机制包括三个方面：

- 状态码：必须返回2xx状态码（通常是204 No Content或200 OK）
- 响应头：必须在响应头中包含CORS相关信息
- 响应体：通常为空（推荐204 No Content无响应体），也可以包含内容但浏览器会忽略。

```js
# 预检请求（浏览器发送）
OPTIONS /api/data HTTP/1.1
Host: api.example.com
Origin: https://frontend.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: content-type, authorization

# ✅ 正确的预检响应
HTTP/1.1 204 No Content  # 或 200 OK
Access-Control-Allow-Origin: https://frontend.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: content-type, authorization
Access-Control-Allow-Credentials: true  # 如果需要凭证
Access-Control-Max-Age: 600
```

### 五、HTTP强制缓存和协商缓存

浏览器缓存(Brower Caching)是浏览器对**之前请求过的文件**进行缓存，以便下一次访问时重复使用，节省带宽，提高访问速度，降低服务器压力

浏览器缓存分为强缓存和协商缓存

- 强缓存：浏览器不会像服务器发送任何请求，直接从本地缓存中读取文件并返回Status Code: 200 OK
- 协商缓存: 向服务器发送请求，服务器会根据这个请求的request header的一些参数来判断是否命中协商缓存，如果命中，则返回304状态码并带上新的response header通知浏览器从缓存中读取资源；

  > ETag（Entity Tag）是HTTP协议中的一个“实体标签”，它是Web服务器给特定资源（如网页、图片、文件）版本打上的“指纹”，用于高效缓存验证和并发控制，避免不必要的数据传输。当浏览器请求资源时，服务器返回**ETag**；后续请求时，浏览器会带上If-None-Match头部和之前的ETag值，服务器比对若未改变，则返回304 Not Modified（不带内容），节省带宽；若改变，则返回新ETag和新内容

### 引用

> [四、HTTP复杂请求和简单请求](https://juejin.cn/post/7229573641373286459) [什么是简单请求和复杂请求](https://segmentfault.com/a/1190000022601274)

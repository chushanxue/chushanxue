### 一、概念

`http` 协议缺陷：通信只能由客户端发起，服务器无法主动向客户端推送信息。所以客户端要获取服务器连续的状态变化，只能使用<mark>轮询</mark>。

`websocket` 协议的最大特点：双向平等对话，服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息。（属于<mark>服务器推送技术</mark>的一种）

特点：

- 建立在 **TCP 协议**之上，服务器端的实现比较容易。
- 与 HTTP 协议有着良好的兼容性。默认端口也是 80 和 443，并且握手阶段采用 HTTP 协议，因此**握手时不容易屏蔽，能通过各种 HTTP 代理服务器**。
- 数据格式比较轻量，性能开销小，通信高效。⭐
- 可以发送文本，也可以发送二进制数据。⭐
- 没有同源限制，客户端可以与任意服务器通信。⭐
- 协议标识符是 `ws`（如果加密，则为 `wss`）。⭐

![ ](https://www.ruanyifeng.com/blogimg/asset/2017/bg2017051503.jpg)

### 二、基本使用

```js
// 这句就是在建立连接
var ws = new WebSocket('wss://echo.websocket.org');

// 下面是一些事件的回调函数（都可用addEventListener改写）
ws.onopen = function (evt) {
  console.log('Connection open ...');
  ws.send('Hello WebSockets!');
};

ws.onmessage = function (evt) {
  console.log('Received Message: ' + evt.data);
  ws.close();
};

ws.onclose = function (evt) {
  console.log('Connection closed.');
};

ws.onerror = function (event) {
  // handle error event
};

// 向服务端发送数据
ws.send('your message');
```

`WebSocket` 实例对象的常用属性：

- `readyState` 属性返回实例对象的当前状态，共有四种：

  - `CONNECTING`：值为 0，表示正在连接。
  - `OPEN`：值为 1，表示连接成功，可以通信了。
  - `CLOSING`：值为 2，表示连接正在关闭。
  - `CLOSED`：值为 3，表示连接已经关闭，或者打开连接失败。

  ```js
  switch (ws.readyState) {
    case WebSocket.CONNECTING:
      // do something
      break;
    case WebSocket.OPEN:
      // do something
      break;
    case WebSocket.CLOSING:
      // do something
      break;
    case WebSocket.CLOSED:
      // do something
      break;
    default:
      // this never happens
      break;
  }
  ```

- `bufferedAmount`属性，表示还有多少字节的二进制数据没有发送出去。它可以用来判断发送是否结束。

### 三、心跳机制

心跳机制解决的问题：**onclose事件无法检测到连接断开的所有情况**，比如信号不好，或者网络临时性关闭，则无法及时得知连接已经断开。

心跳机制实现原理：**发送websocket数据到后端，一旦请求超时，onclose便会执行**，这时候便可进行绑定好的重连操作

```js
// gpt示例代码
let socket;

function connect() {
  socket = new WebSocket('wss://example.com/socket');

  socket.onopen = function () {
    console.log('WebSocket连接已建立');
    startHeartbeat();
  };

  socket.onclose = function (event) {
    console.log('WebSocket连接已关闭');
    reconnect();
  };

  socket.onerror = function (error) {
    console.error('WebSocket发生错误:', error);
    reconnect();
  };

  socket.onmessage = function (event) {
    console.log('收到消息:', event.data);
    // 处理收到的消息
  };
}

function startHeartbeat() {
  setInterval(function () {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send('ping');
    }
  }, 5000); // 每5秒发送一次心跳包
}

function reconnect() {
  setTimeout(function () {
    console.log('尝试重新连接...');
    connect();
  }, 3000); // 等待3秒后重新连接
}

connect();
```

### 四、实际应用（以vue为例）

```js
// socket.ts文件
// 创建ws连接
const useWebsocket = () => {
  const ws: any = ref(null);

  const createWebSocket = (url: string) => {
    ws.value = new WebSocket(url);
    return ws.value;
  };

  // 关闭 WebSocket
  const closeWebSocket = () => {
    ws.value?.close();
  };

  return {
    createWebSocket,
    closeWebSocket
  };
};
export default useWebsocket;
```

```ts
const { closeWebSocket, createWebSocket } = useWebsocket();

// 写在开启时机中
createWebSocket('ws地址').onmessage = (e: any) => {
  console.log('接收到', e.data);
  // 这里是接收到消息后的处理
};
// 写在关闭时机中
closeWebSocket();
```

### 五、引用

> [封装一套前端几乎通用的 WebSocket 代码](https://blog.csdn.net/nbaqq2010/article/details/108992288)[初探和实现websocket心跳重连](https://juejin.cn/post/6844903734170894343?from=search-suggest)

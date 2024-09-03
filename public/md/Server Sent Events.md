### 一、概念

- http
- websoket
- sse

### 二、前端实战

- 前端请求sse接口的代码，与普通的`fetch`请求并无不同，只是增加了`signal`用于手动断开请求连接

  ```js
  export const qa = (controller: AbortController,) => {
    const data = {
      xxx,
    };
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'xxx',
      },
      signal: controller.signal,
    });
  };
  ```

  ```js
  var source = new EventSource(url);

  source.onopen = function (event) {
    // ...
  };

  source.onmessage = function (event) {
    var data = event.data;
    // handle message
  };

  source.onerror = function (event) {
    // handle error event
  };
  ```

- 拿到sse接口传回来的数据这一步，与普通的fetch请求也并无不同

  ```js
  let controller = new AbortController();
  const { body, status } = await qa(controller);
  if (status !== 200) {
    // 处理错误
  }
  ```

- 处理sse接口传回来的数据，才是关键所在

  - `Response.body` 属性是 `Response` 对象暴露出的底层接口，返回一个 `ReadableStream` 对象，供用户操作。

  - `ReadableStream` 接口的 `getReader()` 方法会创建一个 `reader`，并将流锁定。只有当前 `reader` 将流释放后，其他 `reader` 才能使用。

  ```js
  const reader = body.getReader();
  const decoder = new TextDecoder('utf-8');

  let count = 0;

  while (true) {
    // 循环读取数据，每次reader读取的内容块是不一样的，所有的reader读取完毕，拼起来才是完整的数据。
    //循环只是一种手段，【不同时间节点去读取不同的数据才是目的】
    const { done, value } = await reader.read();

    // 如果一直读取不到数据，计数1000次后便手动停掉，否则一直在读取页面会卡死
    if (!value) {
      count++;
      if (count === 1000) {
        reader.cancel();
        break;
      }
    }

    // 直到done触发，本次连接断开
    if (done) {
      reader.cancel();
      break;
    }

    // 之所以需要用decoder.decode来解码是因为value是Uint8Array类型
    const text = decoder.decode(value);
    addResponse(text);
  }
  ```

  ```js
  const reader = body.getReader();
  let count = 0;

  while (true) {
    const { done, value } = await reader.read();

    if (!value) {
      count++;
      if (count === 1000) {
        reader.cancel();
        break;
      }
    }

    if (done) {
      reader.cancel();
      break;
    }

    // 数据处理
  }
  ```

- 完整的代码

  这里主要讲一下`try..catch`在本次请求中的作用，解答之前的疑惑：**网络异常不是可以通过status去处理吗，为什么还需要通过`try..catch`去处理**

  首先，`try...catch`语句是用来处理在执行`qa(controller)`过程中可能出现的任何异常，而不仅仅是网络异常。这可能包括但不限于网络问题、服务器错误、代码错误等。

  虽然某些网络问题可以通过`HTTP`状态码（`status`）来识别，但并非所有的网络问题都会返回一个`HTTP`响应。例如，如果服务器没有响应，或者请求被客户端（如浏览器）在收到响应之前中止，则不会有`HTTP`状态码可供检查。

  > 比如前端通过controller.abort()手动停止了本来200的请求，那么这个请求的状态就依然是200，通过status无法捕捉到这一种情况。

  此外，即使在收到HTTP响应的情况下，也可能存在需要通过抛出异常来处理的问题。

  ```js
  try {
    const { body, status } = await qa(controller);
    ...//数据处理
  } catch (e) {
    if (String(e).includes('aborted')) {
        // 特殊异常处理
        addResponse('\n\n <span style="color:#868686">已停止生成</span>');
      } else {
        // 其他异常都归为网络异常
        addResponse('网络异常，请稍后重试');
      }
      setTalkTime(null);
  }
  ```

### 三、后端实战

用nest框架写了一个sse的接口，目前还不太清楚这种写法的底层原理

```js
  @Get('sse')
  sse(@Res() res: any) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    interval(1000)
      .pipe(map(() => `data: ${JSON.stringify({ hello: 'world' })}\n\n`))
      .subscribe((data) => res.write(data));
  }
```

### 四、原生思路

上述`fetch`请求的方式，包括流行的第三方库`fetch-event-source`，都是利用`fetch`的功能+循环监听，实现流式输出，实际`SSE`有专门的前端实现方式

这种方式能在浏览器的`event-stream`字段实时展示消息流，非常理想，但是只支持get请求，且无法添加身份验证，就如之前`websocket`的弊端一样，所以适用性不强，仅做了解

```js
const eventSource = new EventSource('xxxx');
eventSource.onmessage = ({ data }) => {
  console.log('New message', JSON.parse(data));
};
```

### 一、概念

- http

  HTTP 是基础协议，提供请求-响应模型

- websoket

  全双工，真正的实时对话（利用了HTTP来完成握手，然后切换到自己的协议）

- sse

  SSE是运行在HTTP之上的一个标准。它利用了HTTP的长连接特性，定义了一套**服务器如何向客户端持续推送数据**的格式。(注意客户端只能听，不能说)

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
      // 全局状态
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

eventSource.onopen = function (event) {
  // ...
};

eventSource.onmessage = function (event) {
  var data = event.data;
  // handle message
};

eventSource.onerror = function (event) {
  // handle error event
};
```

### 五、实践思路

#### 1、断流问题分析

在流式输出的过程中，有三种情况前端会停止输出：

- 明确给出done标识
- 网络异常
- 解析数据结构失败

#### 2、思路

后端给的数据结构是固定的，都是data对象，每一次可能收到多个data对象，拆分出来后，就可以拆解中间我们需要的字段

当我们存储流式数据时，start标志是实现流式的核心，一旦有了start标志，就新开一个对象去接受它，start的后面的数据都陆续写入改对象，直到新的start出现，type是UI展示的核心，不同的type展示的位置和性质不一样，这也是agent实现的核心

#### 3、具体代码

```js
// 使用换行符 \n 拆分原始数据，并过滤掉空字符串元素
const dataStrings = text.split('\n').filter((line) => line.trim() !== '');

// 去除"data:"前缀，并解析字符串数组为 JSON 对象数组
// 注意，能解析为正常对象的才解析，所以需要isJSON方法（注意这一步还没有剔除null）
const dataArray = dataStrings.map((dataString) => {
  const trimmedDataString = dataString.replace('data:', '').trim();
  return isJSON(trimmedDataString) ? JSON.parse(trimmedDataString) : null;
});

// 开始解析对象数组
for (let item of dataArray) {
  // 绕过null
  if (item === null) {
    continue;
  }
  // 与后端约定的结束标志
  if (item.event === 'end') {
    //结束整体的解析
    ...
  }
  // 与后端约定的消息开始标志
  if (item.event === 'message_start') {
    addResponseStart({
      content: item.content,
      type: item.type,
      answerId: item.answerId,
    });
  }
  // 与后端约定的消息中间标志（其实没有必要有结束标志，有开始标志就可以了）
  else if (item.event === 'message' || item.event === 'message_end') {
    addResponse({
      content: item.content,
      type: item.type,
      answerId: item.answerId,
    });
  }
}
```

```js
// 判断一个字符串是否为 JSON 格式
export const isJSON = (str: string) => {
  if (typeof str === 'string') {
    try {
      let obj = JSON.parse(str);
      if (typeof obj === 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  return false;
};

```

### 六、sse相关面试问题



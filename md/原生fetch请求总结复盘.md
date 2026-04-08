### 一、前置知识

#### 1、AJAX 出现之前

`Web` 的运作原理：一次 `HTTP` 请求对应一个页面。

#### 2、AJAX出现之后

<mark>允许 JavaScript 脚本向服务器发起 HTTP 请求。</mark>

用脚本发起通信，叫做 AJAX 通信。

### 二、概念

#### 1、`XMLHttpRequest`

`XMLHttpRequest`对象简单用法的完整例子：

与 ws 的连接类似，都是<mark>新建实例，指定回调函数</mark>，其中，需要注意是的 XMLHttpRequest 的**实例属性、实例方法、实例的事件**

```js
var xhr = new XMLHttpRequest();
//实例的事件
xhr.onreadystatechange = function () {
  // 通信成功时，状态值为4（实例属性）
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      console.log(xhr.responseText);
    } else {
      console.error(xhr.statusText);
    }
  }
};
xhr.onerror = function (e) {
  console.error(xhr.statusText);
};
// 实例方法
xhr.open('GET', '/endpoint', true);
xhr.send(null);
```

#### 2、`fetch`

`fetch()`是 `XMLHttpRequest` 的升级版

`fetch` 是在 `ES6` 引入的，`fetch` 返回有一个 `Promise` 对象，写法更加简便友好

`fetch()`的功能与 `XMLHttpRequest` 基本相同，但有三个主要的差异：

- `fetch()`使用 `Promise`，不使用回调函数，因此大大简化了写法，写起来更简洁。
- `fetch()`采用模块化设计，`API` 分散在多个对象上（`Response` 对象、`Request` 对象、`Headers` 对象），更合理一些；相比之下，`XMLHttpRequest` 的 `API` 设计并不是很好，输入、输出、状态都在同一个接口管理，容易写出非常混乱的代码。
- `fetch()`通过数据流（`Stream` 对象）处理数据，可以分块读取，有利于提高网站性能表现，减少内存占用，对于请求大文件或者网速慢的场景相当有用。`XMLHTTPRequest` 对象不支持数据流，所有的数据必须放在缓存里，不支持分块读取，必须等待全部拿到后，再一次性吐出来。

在用法上，`fetch()`接受一个 `URL` 字符串作为参数，默认向该网址发出 `GET` 请求，返回一个 `Promise` 对象。它的基本用法如下：

```js
fetch(url)
  .then(...)
  .catch(...)

// 一个例子，从服务器获取 JSON 数据。
fetch('https://api.github.com/users/ruanyf')
// fetch()接收到的response是一个 Stream 对象
// response.json()是一个异步操作，取出所有内容，并将其转为 JSON 对象。
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(err => console.log('Request Failed', err));


//Promise 可以使用 await 语法改写，使得语义更清晰。
//await语句必须放在try...catch里面，这样才能捕捉异步操作中可能发生的错误。
async function getJSON() {
  let url = 'https://api.github.com/users/ruanyf';
  try {
    let response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log('Request Failed', error);
  }
}

```

### 三、fetch 请求详解

#### 1、Response 对象：处理 HTTP 回应

`fetch()`请求成功以后，得到的是一个 `Response` 对象。它对应服务器的 `HTTP` 回应。

```js
const response = await fetch(url);
```

`Response` 包含的数据通过 `Stream` 接口异步读取，但是它还包含一些同步属性，对应 `HTTP` 回应的标头信息（`Headers`），可以立即读取。

```js
async function fetchText() {
  let response = await fetch('/readme.txt');
  console.log(response.status);
  console.log(response.statusText);
}
```

`fetch()`发出请求以后，有一个很重要的注意点：只有**网络错误，或者无法连接时**，`fetch()`才会报错，其他情况都不会报错，而是认为请求成功。

这就是说，即使服务器返回的状态码是 `4xx` 或 `5xx`，`fetch()`也不会报错（即 `Promise` 不会变为 `rejected` 状态）。

只有通过 `Response.status` 属性，得到 `HTTP` 回应的真实状态码，才能判断请求是否成功。

#### 2、读取内容的方法

`Response` 对象根据服务器返回的不同类型的数据，提供了不同的读取方法。

```js
response.text()：得到文本字符串。
response.json()：得到 JSON 对象。
response.blob()：得到二进制 Blob 对象。
response.formData()：得到 FormData 表单对象。
response.arrayBuffer()：得到二进制 ArrayBuffer 对象。

//上面 5个读取方法都是异步的，返回的都是 Promise 对象。必须等到异步操作结束，才能得到服务器返回的完整数据。
```

> ArrayBuffer 是 JavaScript 中的一种数据类型，用于表示一段连续的内存区域，可以用来存储和操作二进制数据。

#### 3、Response.body 属性

`Response.body` 属性是 `Response` 对象暴露出的底层接口，返回一个 `ReadableStream` 对象，供用户操作。

<mark>它可以用来分块读取内容</mark>，应用之一就是显示下载的进度。（以及非常重要的**流式输出**）

```js
const response = await fetch('flower.jpg');
//response.body.getReader()方法返回一个遍历器。
const reader = response.body.getReader();

// while里的条件只是为了开启循环，停止由内部决定
while (true) {
  //遍历器的read()方法每次返回一个对象，表示本次读取的内容块。
  const { done, value } = await reader.read();

  // 这个对象的done属性是一个布尔值，用来判断有没有读完（如果请求出错，一直接收不到done值，那么就会陷入死循环导致页面卡死，所以最好用一个计数器停掉）
  if (done) {
    break;
  }

  // value属性是一个 arrayBuffer 数组，表示内容块的内容，而value.length属性是当前块的大小。
  console.log(`Received ${value.length} bytes`);
}
```

#### 4、fetch()配置对象的完整 API

```js
const response = fetch(url, {
  method: 'GET',
  headers: {
    'Content-Type': 'text/plain;charset=UTF-8',
  },
  body: undefined, // 注意，GET请求不能带body参数
  referrer: 'about:client',
  referrerPolicy: 'no-referrer-when-downgrade',
  mode: 'cors', //指定请求的模式（'cors'默认值，允许跨域请求。）❓
  credentials: 'same-origin',
  cache: 'default',
  redirect: 'follow',
  integrity: '',
  keepalive: false, //用于页面卸载时，告诉浏览器在后台保持连接，继续发送数据。
  signal: undefined, //指定一个 AbortSignal 实例，用于取消fetch()请求
});
```

#### 5、取消 fetch()请求

fetch()请求发送以后，如果中途想要取消，需要使用 AbortController 对象。

```js
let controller = new AbortController();
let signal = controller.signal;

fetch(url, {
  signal: controller.signal,
});

signal.addEventListener('abort', () => console.log('abort!'));

controller.abort(); // 取消

console.log(signal.aborted); // true
```

### 四、引用

> [Fetch API 教程](https://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html)

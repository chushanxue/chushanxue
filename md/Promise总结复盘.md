### 一、概念

js中有两种实现异步的方式，第一种是传统的回调函数，比如我们可以使用setTimeout()让一个函数在指定的时间后执行

如果我们需要依次执行多个异步操作，我们的程序可能会写成这样：

```js
// 这就是函数的回调地狱
setTimeout(() => {
  console.log('1');
  setTimeout(() => {
    console.log('2');
    setTimeout(() => {
      console.log('3');
    }, 1000);
  }, 1000);
}, 1000);
```

为了解决这个问题，promise应运而生。

js中使用promise的api fetch()就是一个很好的例子

promise的优点在于它可以用一种链式结构将多个异步操作串联起来：

```js
//链式结构避免了代码的层层嵌套，可读性会提升很多
fetch('https://api.github.com/users/ruanyf')
  .then((response) => response.json())
  .then((json) => console.log(json))
  // 如果之前任意一个操作发生了错误，就会跳到catch() （和同步变成提供的try...catch很类似）
  .catch((err) => console.log('Request Failed', err))
  // finally()方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。可以在这里做一些清理工作
  .finally(() => console.log('finally'));
```

### 二、async/await

简单来说，它们是基于promise之上的一个语法糖，可以让异步操作更加简单明了

- async关键字将函数标记为异步函数（异步函数就是返回值为promise的函数，比如fetch）

  ```js
  async function fn() {}

  fn(); //这个函数的返回值永远是一个promise对象
  ```

- 在异步函数中我们可以调用其他的异步函数，不过我们不需要.then，而是使用更简洁的await语法，await会等待promise完成之后直接返回最终的结果

  ```js
  async function fn() {
    //所以这里的response已经是服务器返回的结果了
    const response = await fetch('https://api.github.com/users/ruanyf');
    // 如果这样写会打破fetch的并行，因为response2会等待response执行完成才开始执行，这里更高效的做法是使用Promise.all()，然后再去await
    const response2 = await fetch('https://api.github.com/users/ruanyf2');
    const json = await response.json();
    console.log(json);
  }
  ```

  > 需要注意的是，await虽然看上去会暂停代码的执行，但在等待的过程中，js同样可以处理其他的任务（比如更新界面，运行其他代码等等），这是因为await底层是基于promise和事件循环机制实现的

### 三、promise

Promise 是异步编程的一种解决方案。

Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。（只有**异步操作的结果**，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。）

#### 1、promise.all()

Promise.all()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

```js
const p = Promise.all([p1, p2, p3]);
```

p的状态由p1、p2、p3决定，分成两种情况。

- 只有p1、p2、p3的状态**都**变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的**返回值组成一个数组**，传递给p的回调函数。
- 只要p1、p2、p3之中**有一个**被rejected，p的状态就变成rejected，此时**第一个**被reject的实例的返回值，会传递给p的回调函数。

#### 2、promise.race()

Promise.race()方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

```js
const p = Promise.race([p1, p2, p3]);
```

只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。

#### 3、promise.allSettled()

有时候，我们希望等到一组异步操作都结束了，不管每一个操作是成功还是失败，再进行下一步操作。但是，现有的 Promise 方法很难实现这个要求。

Promise.all()方法只适合所有异步操作都成功的情况，如果有一个操作失败，就无法满足要求。

```js
// 注意这种写法，直接把promise数组传入allSettled()，有时候会忘了三个promise组成的数组也是一个promise
// const promises = [fetch('/api-1'), fetch('/api-2'), fetch('/api-3')];

await Promise.allSettled([fetch('/api-1'), fetch('/api-2'), fetch('/api-3')]);
// 数组promises包含了三个请求，只有等到这三个请求都结束了（不管请求成功还是失败），removeLoadingIndicator()才会执行。
removeLoadingIndicator();
```

```js
const promises = [fetch('index.html'), fetch('https://does-not-exist/')];
const results = await Promise.allSettled(promises);

// 过滤出成功的请求
const successfulPromises = results.filter((p) => p.status === 'fulfilled');

// 过滤出失败的请求，并输出原因
const errors = results
  .filter((p) => p.status === 'rejected')
  .map((p) => p.reason);
```

### 引用

> [异步编程: 一次性搞懂 Promise, async, await (#js #javascript)](https://www.bilibili.com/video/BV1WP4y187Tu/?spm_id_from=333.337.search-card.all.click&vd_source=c108fb8f6c838d5d891d1da802282ab5)

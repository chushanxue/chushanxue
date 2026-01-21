### 五、promise

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

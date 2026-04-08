### 一、前言

有些时候，后端排查不出问题，前端排查不出问题，那么，很有可能就是浏览器这个媒介的问题。

当然了，并不是说完全是浏览器性能或者内部bug的问题，也许是我们的一些操作拖累了浏览器的性能，从而导致连锁反应，影响了某些功能

### 二、踩坑记录

#### 1、日志打印

<mark>部署时，保留必要的日志打印信息即可</mark>，过多的打印信息会影响浏览器的性能，可能会导致一些意想不到的问题

遇到的问题有：拖累路由跳转速度、拖累DOM渲染

#### 2、url

通过浏览器的地址栏输入url，发送的只能是get请求

#### 3、js文件加载运行时机

在JavaScript中，代码的执行方式取决于其位置和上下文。

通常情况下，当浏览器加载包含JavaScript代码的**页面**时，会按照代码的顺序执行。

但如果JavaScript代码是在页面加载过程中直接放在 `<script>` 标签内或者外部的 `.js` 文件中，并且没有被包裹在任何函数或事件处理程序中，那么这些代码将在页面加载时就执行。

<mark>如果希望在调用时才执行代码，可以将代码封装在一个函数中，然后在需要的时候调用该函数</mark>

总的来说，JavaScript代码的执行时间取决于其在页面中的位置以及是否被封装在函数中。

遇到一个坑，就是在函数调用时才运行`localStorage.setItem('token',xxxx);`，但在js文件中直接使用`let token = localStorage.getItem('token')`，时机异步会导致获取不到token，解决方案就是把获取token的代码放到函数中调用

### 三、使用技巧

#### 1、运行js代码

有两种情况，一是借助控制台，运行一些简单的js代码，这种直接在控制台操作即可

另一种情况是需要和页面进行交互，这个时候就需要点开`source`模块，选择`Snippets`，新建文件再敲入代码，保存后右键`run`即可

![ ](https://www.runoob.com/wp-content/uploads/2020/11/0DBBF606-1F97-4861-B690-1DBED83A0E5E.jpg)

```js
// 摸鱼神器，去除页面中所有图片
const imgArr = document.querySelectorAll('img');
imgArr.forEach((item) => {
  item.style.display = 'none';
});
```

### 引用

> [Chrome 浏览器中执行 JavaScript](https://www.runoob.com/js/js-chrome.html)

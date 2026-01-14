### 1、隐藏元素的方法

- display: none; 元素在页面上不可见，也不会占据空间
- visibility: hidden; 元素在页面上不可见，但仍然占据空间。
- opacity: 0; 元素在页面上不可见，但仍然占据空间。

### 2、什么是重绘，重排，如何避免？

- 重绘（Repaint）： 重绘指的是当元素的**外观**发生改变（例如颜色、背景等），但不影响布局的情况下，浏览器会重新绘制元素的外观。重绘不会引起页面的重新布局，因此性能开销相对较小。
- 重排（Reflow）： 重排指的是当元素的**尺寸、位置或布局**发生改变时，浏览器会重新计算整个页面的布局。这可能会影响到页面中其他元素的尺寸和位置，导致页面的重新排列。重排是性能开销较大的操作，可能会触发多次的重绘。

避免重绘和重排可以提高页面的性能和响应速度。以下是一些减少重绘和重排的方法：

- ⭐使用 **transform** 和 **opacity**： 使用 transform 属性进行平移、缩放、旋转等操作，以及使用 opacity 属性进行淡入淡出效果，这些属性不会触发重排。
- ⭐使用绝对定位或 **fixed** 定位： 这些定位方式不会影响其他元素的布局，因此对元素进行移动或动画时会减少重排。
- ⭐使用 **visibility** 而非 display： 使用 visibility: hidden; 而不是 display: none; 隐藏元素，前者不会触发重排。
- ⭐使用虚拟DOM： 在修改 DOM 结构时，可以使用文档片段进行离线操作，最后再一次性插入文档，减少了多次重排。
- ⭐避免频繁的 DOM 操作： 将多次 DOM 操作合并为一次，减少触发重排的次数。
- 使用 CSS3 动画： CSS3 动画通常使用 GPU 加速，减少了重排和重绘的开销。

### 3、把一个元素水平居中有哪些方式

- `text-align`：针对行内/行内块元素（子元素居中）
- `margin: 0 auto`：针对块级元素，必须指定宽度（在父容器内居中）
- `Flexbox`：父元素设置 `display:flex` + `justify-content:center`（在父容器内居中）
- 绝对定位 + transform：

  ```css
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  ```

- `Grid` 方案：父元素设置 `display:grid` + `justify-content:center`

### 引用

> [2023前端面试题总结：CSS，CSS3篇完整版](https://juejin.cn/post/7270648629378531368)[个人笔记](https://gitee.com/YBY2020/yby_html_css)

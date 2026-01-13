### 1、什么是CSS的层叠性

在网页中应用多个 CSS 规则时，这些规则会根据特定的优先级和规则进行叠加和应用，以确定最终的样式效果。

### 2、CSS的优先级

- ① !important 规则

  <mark>注意：通过js无法改变样式</mark>

- ② 内联样式（Inline Styles）

  <mark>注意，内联样式的优先级很高</mark>

- ③ ID 选择器

- ④ 类和伪类选择器

- ⑤ 通配选择器

- ⑥ 继承样式

  <mark>某些样式属性会从父元素继承到子元素。这些样式具有较低的优先级。</mark>

- ⑦ 浏览器默认样式

### 3、CSS的继承性

继承的设计是为了方便我们的开发，(一般默认有的都是对我们有用的)

- 可继承的属性

  - 文字相关属性： `font-family、font-size、font-weight、font-style` 等。
  - 颜色属性： `color、background-color`。
  - 文本相关属性： `line-height、text-align、text-transform` 等。
  - 链接相关属性： `text-decoration、link、visited、hover、active` 等。
  - 列表属性： `list-style-type、list-style-image` 等。
  - 表格属性： `border-collapse、border-spacing` 等。
  - 元素显示属性： `visibility`。
  - 百分比属性： 某些属性（如 `padding、margin`）中的百分比值可以继承。

- 不可继承的属性

  - 盒模型属性： `width、height、margin、padding、border` 等。
  - 定位和布局属性： `position、top、right、bottom、left、float、clear` 等。
  - 背景属性： `background-image、background-position、background-repeat` 等。
  - 定位属性： `z-index`。
  - 轮廓属性： `outline、outline-width、outline-style、outline-color`。
  - 文字选择属性： `user-select、cursor`。
  - 表格属性： `table-layout、border-collapse、border-spacing`。
  - 元素显示属性： `display`。

### 4、伪类和伪元素

- 伪类用于选择处于特定状态的元素

  伪类以单冒号 `:` 开头，后面跟上伪类名称

  ```css
  :hover /*鼠标悬停在元素上时应用样式。*/
  :active/*元素被激活（例如鼠标点击）时应用样式。*/
  :nth-child(n)/*选择某个父元素的第 n 个子元素。*/
  ```

  ```css
  /* 超链接的伪类 */
  a:link /*用来表示没访问过的链接（正常的链接）*/
  a:visited /*用来表示访问过的链接由于隐私的原因，所以visited这个伪类只能修改链接的颜色(访问过的链接)*/
  ```

- 伪元素用于在元素的特定位置插入内容或样式，如在元素的前面或后面插入额外的内容。

  伪元素以双冒号 `::` 开头，后面跟上伪元素名称

  ```css
  ::before/*在元素之前插入内容或样式。*/
  ::after/*在元素之后插入内容或样式。*/
  ::first-line/*选择元素的第一行文字。*/
  ::first-letter/*选择元素的第一个字母。*/
  ```

### 5、盒模型

<mark>理解上的误区：和flex无关</mark>

CSS将页面中的所有元素都设置为了一个矩形的盒子（将元素设置为矩形的盒子后，对页面的布局就变成将不同的盒子摆放到不同的位置）

每一个盒子都由以下几个部分组成：

- 内容区（content）
- 内边距（padding）
- 边框（border）//以上三个决定盒子的大小
- 外边距（margin）//决定盒子的位置

盒模型有两种类型：

- 标准盒模型 (content-box)：width/height 只包含内容区域,添加 padding 和 border 会增加元素总尺寸,容易造成布局计算混乱

  ```css
  div {
    box-sizing: content-box; /* 默认值 */

    width: 200px; /* 这只是内容宽度 */
    padding: 20px; /* 会增加总宽度：200 + 20×2 = 240px */
    border: 5px solid; /* 继续增加：240 + 5×2 = 250px */
    margin: 10px; /* 最终占用空间：250 + 10×2 = 270px */
  }
  ```

- IE盒模型 (border-box)：width/height 包含：内容 + padding + border，布局计算更直观，现代开发推荐使用

  ```css
  div {
    box-sizing: border-box; /* 现代开发推荐 */

    width: 200px; /* 包含：内容 + padding + border */
    padding: 20px; /* 从200px中扣除 */
    border: 5px solid; /* 从200px中扣除 */
    margin: 10px; /* 外边距额外计算 */

    /* 实际内容宽度 = 200 - 20×2 - 5×2 = 150px */
  }
  ```

### 6、display属性

CSS 属性 display 用于控制元素在布局中的显示方式，决定元素是以何种方式在页面中呈现

display 属性的一些常见值：

- block：元素被呈现为块级元素，会独占一行，并从上到下排列。（元素的宽度默认为父元素的宽度，可以设置宽度和高度。）
- inline：元素被呈现为行内元素，不会独占一行，可以与其他行内元素共享一行。（元素的宽度和高度由内容决定，不能设置宽度和高度。）
- inline-block：结合了块级元素和行内元素的特点，元素会在同一行显示，但可以设置宽度和高度。
- none：元素不会在页面中显示，即不会占据空间。（元素会被隐藏，不会渲染，也不会影响布局。）
- flex：元素被呈现为弹性盒子容器，可以使用 Flexbox 布局。（元素的子元素可以通过 Flexbox 进行排列和对齐）
- ......

### 7、隐藏元素的方法

- display: none; 元素在页面上不可见，也不会占据空间
- visibility: hidden; 元素在页面上不可见，但仍然占据空间。
- opacity: 0; 元素在页面上不可见，但仍然占据空间。

### 8、什么是重绘，重排，如何避免？

- 重绘（Repaint）： 重绘指的是当元素的**外观**发生改变（例如颜色、背景等），但不影响布局的情况下，浏览器会重新绘制元素的外观。重绘不会引起页面的重新布局，因此性能开销相对较小。
- 重排（Reflow）： 重排指的是当元素的**尺寸、位置或布局**发生改变时，浏览器会重新计算整个页面的布局。这可能会影响到页面中其他元素的尺寸和位置，导致页面的重新排列。重排是性能开销较大的操作，可能会触发多次的重绘。

避免重绘和重排可以提高页面的性能和响应速度。以下是一些减少重绘和重排的方法：

- ⭐使用 **transform** 和 **opacity**： 使用 transform 属性进行平移、缩放、旋转等操作，以及使用 opacity 属性进行淡入淡出效果，这些属性不会触发重排。
- ⭐使用绝对定位或 **fixed** 定位： 这些定位方式不会影响其他元素的布局，因此对元素进行移动或动画时会减少重排。
- ⭐使用 **visibility** 而非 display： 使用 visibility: hidden; 而不是 display: none; 隐藏元素，前者不会触发重排。
- ⭐使用虚拟DOM： 在修改 DOM 结构时，可以使用文档片段进行离线操作，最后再一次性插入文档，减少了多次重排。
- ⭐避免频繁的 DOM 操作： 将多次 DOM 操作合并为一次，减少触发重排的次数。
- 使用 CSS3 动画： CSS3 动画通常使用 GPU 加速，减少了重排和重绘的开销。

### 9、把一个元素水平居中有哪些方式

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

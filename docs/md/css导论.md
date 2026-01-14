### 一、 css的概念

Cascading Style Sheet

"层叠"通常指的是样式层叠，即多个样式规则应用在同一元素上时，根据规则的特定性和顺序进行层叠和应用。这也是 CSS（层叠样式表）中的基本概念。

#### 1、什么是CSS的层叠性

在网页中应用多个 CSS 规则时，这些规则会根据特定的优先级和规则进行叠加和应用，以确定最终的样式效果。

#### 2、CSS的优先级

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

#### 3、CSS的继承性

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

#### 4、伪类和伪元素

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

#### 5、盒模型

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

#### 6、display属性

CSS 属性 display 用于控制元素在布局中的显示方式，决定元素是以何种方式在页面中呈现

display 属性的一些常见值：

- block：元素被呈现为块级元素，会独占一行，并从上到下排列。（元素的宽度默认为父元素的宽度，可以设置宽度和高度。）
- inline：元素被呈现为行内元素，不会独占一行，可以与其他行内元素共享一行。（元素的宽度和高度由内容决定，不能设置宽度和高度。）
- inline-block：结合了块级元素和行内元素的特点，元素会在同一行显示，但可以设置宽度和高度。
- none：元素不会在页面中显示，即不会占据空间。（元素会被隐藏，不会渲染，也不会影响布局。）
- flex：元素被呈现为弹性盒子容器，可以使用 Flexbox 布局。（元素的子元素可以通过 Flexbox 进行排列和对齐）
- ......

### 二、css布局

- 正常布局流

  正常布局流（normal flow）是指在不对页面进行任何布局控制时，浏览器默认的 HTML 布局方式。

- display 属性

  在 css 中实现页面布局的主要方法是设定display属性的值。此属性允许我们更改默认的显示方式。

- 弹性盒子

  它被专门设计出来用于创建横向或是纵向的一维页面布局。要使用 flexbox，你只需要在想要进行 flex 布局的父元素上应用 display: flex ，所有直接子元素都将会按照 flex 进行布局。

- Grid 布局

  Flexbox 用于设计横向或纵向的布局，而 Grid 布局则被设计用于同时在两个维度上把元素按行和列排列整齐。

- 浮动
- 定位技术

### 三、css框架

`CSS`框架是一种**预先编写好的CSS代码集合**，旨在帮助开发人员快速构建具有一致样式和布局的网页。它们提供了一套**可重用的样式规则和组件**，使开发人员能够更高效地设计和开发网页。常见的`CSS`框架包括`Bootstrap、Foundation、Bulma`等。这些框架通常具有**响应式设计、网格系统、按钮样式、表单样式**等功能，并且可以根据需要进行自定义配置。使用`CSS`框架可以节省开发时间，并确保网页在不同设备上具有良好的可视化效果。

![ ](/md/css导论/3.webp)

上图可以清晰地总结出，css框架具有三种类型：

- 一类只提供带样式组件或者样式，你需要定义组件的行为，如`Bootstrap/PaperCSS/NES.css/Animate.css`
- 一类只提供带行为的组件，你需要定义组件的样式，如`Radix`
- 一类相当于plus版的css，不提供组件也不提供行为，只是让你的css写起来更方便快捷，如`Tailwind`

ps：实际上所有的css框架和ui库都能放到某个定义或者某些定义相结合的概念中，本文中不会将css框架和ui库分得太开

#### 1、Bootstrap

指路：<https://getbootstrap.com/docs/5.3/components/buttons/>

Bootstrap提供了大量的**预定义样式和组件**，可以直接使用或进行自定义配置。开发人员可以通过修改变量、覆盖样式或使用`Sass`等方法来定制主题。

你只需要了解相关的class、标签名称等所代表的意思，然后在构建页面的时候，导入`bootstrap`的`JS、css`等，它就会去表现相应的效果出来。（**类似于Tailwind CSS，区别是Tailwind CSS鼓励开发人员通过组合原子级别的CSS类来构建自定义样式，它没有预定义的主题或组件**）

![ ](/md/css导论/1.png)

#### 2、Tailwind CSS

指路：<https://nerdcave.com/tailwind-cheat-sheet>

许多现代 CSS 框架都在利用构建用户界面方面的最新趋势：使用单一用途的实用程序类，也称为 Atomic CSS。

例如，Tailwind 不包含任何类型的 按钮 组件。但是您可以使用以下内容来构建自己的按钮：

```html
<button class="bg-blue-500 text-white font-bold py-2 px-4 rounded">
  Button
</button>
```

#### 3、PaperCSS

指路：<https://www.getpapercss.com>

PaperCSS 包括一个 flexbox 网格、徽章、按钮、卡片和一些交互式纯 CSS 组件。**这个框架可能比较小众，加进来是因为样式设计得挺有意思的**

#### 4、NES.css

指路：<https://nostalgic-css.github.io/NES.css/>

像 PaperCSS 一样，NES.css 也具有一组唯一的样式。它模仿了 8 位 Nintendo Entertainment System 图形，营造出复古的游戏外观

#### 5、Radix

Radix UI 是一组26 个无样式的React 组件，用于构建高质量、可访问的UI、设计系统和Web 应用程序。

> 这是一种特殊的css框架，不定义样式（样式由用户自定义），只定义行为

![ ](/md/css导论/2.png)

#### 6、Animate.css

这个有趣的库包含数十种预构建的动画，它们可以摇动、淡入淡出、滑动、缩放等等

### 四、UI库

> UI库更注重提供**可重用的组件和工具函数**，而UI框架则更全面，并提供了更多功能和约束。选择适合自己项目需求和开发风格的库或框架非常重要。

#### 1、Material UI(MUI)

指路：<https://m3.material.io/>

文档：<https://github.com/material-components/material-web/blob/main/docs/quick-start.md>

#### 2、 Ant Design

不用多介绍了

### 引用

> [CSS 框架 2023](https://commandnotfound.cn/css-layout/101/468/CSS-%E6%A1%86%E6%9E%B6-2023) [CSS in 2023 - Tailwind vs MUI vs Bootstrap vs Chakra vs...](https://www.youtube.com/watch?v=CQuTF-bkOgc) [An Overview of 25+ UI Component Libraries in 2023](https://www.builder.io/blog/25-plus-ui-component-libraries#strong-what-makes-a-good-ui-library-strong)

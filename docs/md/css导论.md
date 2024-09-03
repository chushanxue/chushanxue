### 一、 css的概念

Cascading Style Sheet

"层叠"通常指的是样式层叠，即多个样式规则应用在同一元素上时，根据规则的特定性和顺序进行层叠和应用。这也是 CSS（层叠样式表）中的基本概念。

### 二、css框架

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

### 三、UI库

> UI库更注重提供**可重用的组件和工具函数**，而UI框架则更全面，并提供了更多功能和约束。选择适合自己项目需求和开发风格的库或框架非常重要。

#### 1、Material UI(MUI)

指路：<https://m3.material.io/>

文档：<https://github.com/material-components/material-web/blob/main/docs/quick-start.md>

#### 2、 Ant Design

不用多介绍了

### 四、引用

> [CSS 框架 2023](https://commandnotfound.cn/css-layout/101/468/CSS-%E6%A1%86%E6%9E%B6-2023) [CSS in 2023 - Tailwind vs MUI vs Bootstrap vs Chakra vs...](https://www.youtube.com/watch?v=CQuTF-bkOgc) [An Overview of 25+ UI Component Libraries in 2023](https://www.builder.io/blog/25-plus-ui-component-libraries#strong-what-makes-a-good-ui-library-strong)

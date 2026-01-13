### 一、概念

CSS 是一门标记语言，用于元素布局及样式定义。它存在很多问题，例如书写效率和维护性低；缺乏模块机制、变量、函数等概念；容易出现**全局样式污染和样式冲突**等。目前前端社区存在很多解决上述问题的方案，主要包括 CSS Module以及 styled-components（CSS-in-JS 的代表）。

CSS Modules 更贴近传统CSS，易于上手和迁移。Styled Components 能实现更动态的样式逻辑。

### 二、CSS Modules配合Sass / Less

- CSS Modules的核心理念是编译时生成唯一类名，实现隔离。
- 写的是CSS/SCSS文件，通过 import styles from ‘./index.module.css’ 使用。
- 可通过props和className结合实现动态样式（常用）
- 如果团队CSS基础好，或项目中有**大量全局样式/主题需要复用**，CSS Modules 更合适。

### 三、styled-components

- 运行时生成唯一类名，样式是JS的一部分。
- 在JS/JSX中直接写CSS字符串，样式即组件。
- 天生支持动态样式，能根据props/theme轻松实现动态样式。
- 如果需要**大量基于状态的样式变化**（如主题切换、状态UI），Styled Components 优势明显。

### 四、如何解决样式冲突

- 无论选择CSS Modules还是Styled Components，其核心价值就是自动化的局部作用域，这从根本上杜绝了组件间的样式冲突。这是第一道，也是最重要的防线。
- 全局样式规范化：严格管理 global.css 或 reset.css，只放重置样式、CSS变量（Custom Properties）定义、通用工具类（如 .text-center）和第三方全局样式。这部分需要所有人遵守，严禁随意添加。
- 命名约定：主要增强可维护性
- 避免全局选择器：在业务代码中，严格禁止直接使用标签选择器（如 div { ... }）或过于宽泛的类选择器。

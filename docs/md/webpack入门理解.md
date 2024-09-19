### 一、概念

#### 1、loader

<mark>Webpack 支持使用 loader 对文件进行预处理。</mark>

在Webpack中，`Loader`是一个转换器，它负责把某种文件格式的内容转换成Webpack可以处理的有效模块。简单来说，**Loader就是一个函数**，在该函数中对接收到的内容进行转换，返回转换后的结果。

**Webpack本身只理解JavaScript**，所以 Loader 就成了翻译官，对其他类型的资源进行转译的预处理工作。

Loader将Webpack变得更强大，使其能够处理其他类型的文件，并将它们转换为有效模块。

- 有哪些常见的Loader

  - `css-loader`
  - `style-loader`
  - `babel-loader`
  - `i18n-loader`
  - [.....](https://webpack.docschina.org/loaders/)

- loader 的执行顺序

  loader 的执行顺序是从后往前、从下往上

#### 2、Plugin

与Loader不同，插件并不直接操作单个文件，而是在整个构**建过程中的特定时刻**执行操作，提供了对Webpack构建流程更广泛的访问能力。

插件通常被用来执行范围更广、不直接与特定文件类型相关联的任务。这些任务包括打包优化、压缩、定义环境变量等等。

- 有哪些常见的Plugin

  - `html-webpack-plugin`（在dist下生成html文件。简化HTML文件创建 (依赖于html-loader)）
  - `webpack-bundle-analyzer`（可视化Webpack输出文件的体积）
  - `clean-webpack-plugin`（目录清理。把dist删除再生成打包结果）
  - `open-browser-webpack-plugin` （启动webpack之后，自动打开浏览器）
  - [.....](https://webpack.docschina.org/plugins/)

- 与loader的区别

  - 概念不一样
  - 配置方式不一样
  - 运行时机不一样

    `Loader`运行在打包文件之前（`loader`为在模块加载时的预处理文件）；`plugins`在整个编译周期都起作用

### 二、原理

#### 1、webpack 如何优化构建体积跟速度

#### 2、Webpack 的热更新原理

#### 3、Webpack proxy 为什么能解决跨域

### 三、手写

### 四、实践

目前已经很少接触到webpack的项目了，若是后面遇到相关问题，再记录在这里

### 引用

> [Webpack面试题](https://juejin.cn/post/6844904094281236487)[9个常见的 Webpack 面试题，中高级前端必会！](https://juejin.cn/post/7157998164627161095)

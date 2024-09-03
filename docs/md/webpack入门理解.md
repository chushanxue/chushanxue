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

#### 2、Plugin

与Loader不同，插件并不直接操作单个文件，而是在整个构**建过程中的特定时刻**执行操作，提供了对Webpack构建流程更广泛的访问能力。

插件通常被用来执行范围更广、不直接与特定文件类型相关联的任务。这些任务包括打包优化、压缩、定义环境变量等等。

- 有哪些常见的Plugin

  - `ignore-plugin`
  - `html-webpack-plugin`
  - `webpack-bundle-analyzer`
  - [.....](https://webpack.docschina.org/plugins/)

### 二、引用

> [Webpack面试题](https://juejin.cn/post/6844904094281236487)

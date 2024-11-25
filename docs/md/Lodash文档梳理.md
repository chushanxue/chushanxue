### 概述

首先要明白的是lodash的所有函数都不会在原有的数据上进行操作，而是复制出一个新的数据而不改变原有数据。

lodash是一套工具库，内部封装了很多字符串、数组、对象等常见数据类型的处理函数。

Lodash 通过降低 array、number、objects、string 等等的使用难度从而让 JavaScript 变得更简单。

lodash的引用：

```js
// 方式1：引入整个lodash对象
import _ from 'lodash';
// 方式2：按名称引入特定的函数
import { cloneDeep } from 'lodash';

// 上述2种方式都会引入整个lodash库，体积大，而下面2种方式都能实现按需引入，减小体积
// 1.只引入cloneDeep函数
import cloneDeep from 'lodash/cloneDeep';
// 2.使用lodash-es
import { cloneDeep } from 'lodash-es';
```

对于lodash，知道有这么一个库，知道怎么用就可以了（vueuse也是如此）

### 引用

> [Lodash 个人使用文档](https://juejin.cn/post/6922710332813082638#heading-42)[使用lodash原地起飞，总结了几个常用的lodash方法](https://blog.csdn.net/weixin_43288600/article/details/135570114)

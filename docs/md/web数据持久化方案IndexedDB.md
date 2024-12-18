![indexedDb](https://www.wangbase.com/blogimg/asset/201807/bg2018070401.png)

### 一、概念

#### 1、**现有的浏览器存储方案**

- `Cookie`：大小不超过 4KB，且每次请求都会发送回服务器
- `LocalStorage`：在 2.5MB 到 10MB 之间（各家浏览器不同），而且不提供搜索功能，不能建立自定义的索引

#### 2、**IndexedDB**

`IndexedDB` 是浏览器提供的本地数据库，<mark>允许储存大量数据，提供查找接口，还能建立索引。</mark>这些都是 `LocalStorage`所不具备的。就数据库类型而言，`IndexedDB` <mark>不属于关系型数据库</mark>（不支持 `SQL` 查询语句），更接近 `NoSQL` 数据库。

#### 3、**Dexie.js**

`dexie.js` 是一个对浏览器 `indexexDB`的包装库，使得我们可以更方便地操作 `indexedDB`。

### 二、Dexie.js 在 vue 中的使用（ts 版）

#### 1、**创建 【db】.ts 文件**

使用 `ts` 需在子类上明确表类型，以帮助 `db` 实例、其表和实体模型进行类型化

```js
// db.ts  单独的一个文件（【】内皆为自定义项）

import Dexie from 'dexie';

// 以Friend 表为例，定义实体模型类型
export interface 【Friend】 {
  id?: number;
  name: string;
  age: number;
}

// 以Friend 表为例，定义实体模型
const 【friends】 = ['++id', 'name', 'age'].toString(); // 或者直接const friends= '++id, name, age'

// 声明子类
export class MySubClassedDexie extends Dexie {
  【friends】!: Dexie.Table<【Friend】>;

  constructor() {
    super(【'myDatabase'】);//数据库名称
    this.version(【1】).stores({//数据库版本
      【friends】
    });
  }
}

export const db = new MySubClassedDexie();

```

#### 2、数据库增删改查操作

```js
import { db } from '../db';

async function addFriend() {
  try {
    const id = await db.friends.add({
      name: '冥夜',
      age: '500',
    });
    //添加新数据成功
  } catch (error) {
    //添加新数据失败
  }
}
```

### 三、引用

> [dexie.js 中文教程](https://blog.csdn.net/hjb2722404/article/details/118670300)[中文教程](https://www.tangshuang.net/3735.html#title-1) [MDN（web 技术文档）](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API/Using_IndexedDB) [阮一峰](https://www.ruanyifeng.com/blog/2018/07/indexeddb.html) [Dexie.js](https://dexie.org/) [vue 使用 dexie.js](https://dexie.org/docs/Tutorial/Vue)

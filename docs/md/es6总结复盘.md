## 前言

ECMAScript 和 JavaScript 的关系是，前者是后者的规格，后者是前者的一种实现（日常场合，这两个词是可以互换的。）

## ES6 的新特性

### 一、symbol

ES5 的对象属性名都是字符串，这容易造成**属性名的冲突**。比如，你使用了一个他人提供的对象，但又想为这个对象添加新的方法（mixin 模式），新方法的名字就有可能与现有方法产生冲突。如果有一种机制，保证每个属性的名字都是独一无二的就好了，这样就从根本上防止属性名的冲突。这就是 ES6 引入Symbol的原因。

⭐其他数据类型是：undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、大整数（BigInt）、对象（Object）。

```js
let s = Symbol();

typeof s;
// "symbol"
```

Symbol 值通过Symbol()函数生成。这就是说，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的 Symbol 类型。凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。

### 二、数组的拓展

#### 1、数组解构

曾经我们要获取数组中的元素，会写这样的代码：

```js
let introduction = ['Hello', 'I', 'am', 'Sarah'];
let greeting = introduction[0];
let name = introduction[3];

console.log(greeting); //"Hello"
console.log(name); //"Sarah"
```

ES6 的解构赋值使提取数据变得更加容易：

```js
let introduction = ['Hello', 'I', 'am', 'Sarah'];
// 请注意这里是按顺序拿的，以及这里的符号是[]中括号，与数组对应
let [greeting, pronoun] = introduction;

console.log(greeting); //"Hello"
console.log(pronoun); //"I"
```

如果要跳过数组中的项目，只需使用逗号即可：

```js
let [greeting, , , name] = ['Hello', 'I', 'am', 'Sarah'];

console.log(greeting); //"Hello"
console.log(name); //"Sarah"
```

#### 2、扩展运算符（spread）

将一个数组转为用逗号分隔的参数序列。

```js
console.log(...[1, 2, 3]);
// 1 2 3
```

注意扩展运算符还有一个妙用，能够去掉不想要的参数：

```js
const response = await getUsers({
  ...params,
  size: pageSize,
});

上面的写法虽然重命名了pageSize，但是原始的pageSize也还存在，请求时就可能导致出错

const { pageSize, ...restParams } = params;
const response = await getUsers({
  ...restParams, //去掉了不想要的字段
  size: pageSize,
});
```

#### 3、数组的复制

数组是复合的数据类型，直接复制的话，只是复制了指向底层数据结构的指针，而不是克隆一个全新的数组。(浅拷贝)

```js
const a1 = [1, 2];
const a2 = a1;

a2[0] = 2;
a1; // [2, 2]
```

> 深拷贝主要是将另一个对象的属性值拷贝过来之后，另一个对象的属性值并不受到影响，因为此时它自己在堆中开辟了自己的内存区域，不受外界干扰。

扩展运算符提供了复制数组的简便写法。下面的两种写法，a2都是a1的克隆。（**针对于基本类型数组的深拷贝**）

```js
const a1 = [1, 2];
// 写法一
const a2 = [...a1];
// 写法二
const [...a2] = a1;
```

注意：如果是对象数组，扩展运算符就不是深拷贝，而是浅拷贝

针对对象数组，使用`JSON.stringify()`将原始对象数组转换为字符串，然后再使用`JSON.parse()`将字符串转换回对象数组。这样做会创建一个新的对象数组，并且所有嵌套的对象也会被复制，从而实现了深拷贝。

```js
// 定义一个对象数组
const originalArray = [
  { name: 'John', age: 25 },
  { name: 'Jane', age: 30 },
];

// 使用扩展运算符和递归进行深拷贝
const deepCopyArray = JSON.parse(JSON.stringify(originalArray));

// 修改深拷贝后的数组中的对象属性
deepCopyArray[0].name = 'Mike';

console.log(originalArray); // 输出: [ { name: 'John', age: 25 }, { name: 'Jane', age: 30 } ]
console.log(deepCopyArray); // 输出: [ { name: 'Mike', age: 25 }, { name: 'Jane', age: 30 } ]
```

> JSON.parse(JSON.stringify(originalArray))方法在处理包含函数、正则表达式等特殊类型值的对象数组时会出现问题。因为这些特殊类型的值在转换为 JSON 字符串时会被忽略或转换为其他类型。考虑使用递归和自定义的深拷贝函数来处理

### 三、es6中的class

#### 1、ES5构造函数

在ES6 之前并没有像java、C#等语言有具体的“类”的概念，这对于面向对象开发是一件很难受的体验。

于是乎，ES6 为了减少 JavaScript 开发的痛苦，就提供了这么一个让对象原型写法更加清晰的语法糖：Class。

让我们对比一下传统构造函数写法，来看 class 关键字写法的优势：

```js
// 传统写法
function Animal(type, name) {
  this.type = type;
  this.name = name;
}

// 往原型上挂载
Animal.prototype.toString = function () {
  return '(' + this.type + ',' + this.name + ')';
};
var m = new Animal('monkey', 'yuan');

// class 写法
class Animal {
  constructor(type, name) {
    this.type = type;
    this.name = name;
  }
  toString() {
    return '(' + this.type + ',' + this.name + ')';
  }
}
var m = new Animal('monkey', 'yuan');
m.toString(); // (monkey,yuan)
```

#### 2、类与函数对比

[MDN 教程](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes)

[菜鸟教程](https://www.runoob.com/w3cnote/es6-class.html)

1、类是用于创建对象的模板。

2、函数的两种定义方式：

- 函数表达式

  ```js
  let a = ([params]) => {};

  let a = function ([params]) {};
  ```

- 函数声明

  ```js
  function a([params]) {}
  ```

3、类是特殊的函数，也有两种定义方式：

- 类声明

  ```js
  class Rectangle {
    constructor(height, width) {
      this.height = height;
      this.width = width;
    }
  }
  ```

- 类表达式

  ```js
  // 未命名/匿名类
  let Rectangle = class {
    constructor(height, width) {
      this.height = height;
      this.width = width;
    }
  };
  console.log(Rectangle.name); //"Rectangle"

  // 命名类
  let Rectangle = class Rectangle2 {
    constructor(height, width) {
      this.height = height;
      this.width = width;
    }
  };
  console.log(Rectangle.name); //"Rectangle2"
  ```

#### 3、注意点

1、函数声明和类声明之间的一个重要区别在于，函数声明会提升，类声明不会。你首先需要声明你的类，然后再访问它

2、类声明和类表达式的主体都执行在严格模式下

3、`constructor` 方法是一个特殊的方法，这种方法用于创建和初始化一个由 `class` 创建的对象。一个类只能拥有一个名为`constructor`的特殊方法。

4、一个构造函数可以使用 `super` 关键字来调用一个父类的构造函数。

5、静态属性：`class` 本身的属性，即直接定义在类内部的属性（ `Class.propname` ），不需要实例化。

#### 4、使用

```js
class Rectangle {
  // constructor
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  // Getter
  get area() {
    return this.calcArea();
  }
  // Method
  calcArea() {
    return this.height * this.width;
  }
}
const square = new Rectangle(10, 10);

console.log(square.area);
// 100
```

#### 5、实际运用

1、单例模式

一个类只能有一个实例，即使多次实例化该类，也只返回第一次实例化后的实例对象。

单例模式不仅能减少不必要的内存开销, 并且在减少全局的函数和变量冲突也具有重要的意义。

```js
export default class WkJanus {
  constructor() {
    if (!WkJanus.instance) {
      WkJanus.instance = this;
    }
    return WkJanus.instance;
  }
  ...
}
```

### 四、promise

Promise 是异步编程的一种解决方案。

Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。（只有**异步操作的结果**，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。）

#### 1、promise.all()

Promise.all()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

```js
const p = Promise.all([p1, p2, p3]);
```

p的状态由p1、p2、p3决定，分成两种情况。

- 只有p1、p2、p3的状态**都**变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的**返回值组成一个数组**，传递给p的回调函数。
- 只要p1、p2、p3之中**有一个**被rejected，p的状态就变成rejected，此时**第一个**被reject的实例的返回值，会传递给p的回调函数。

#### 2、promise.race()

Promise.race()方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

```js
const p = Promise.race([p1, p2, p3]);
```

只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。

#### 3、promise.allSettled()

有时候，我们希望等到一组异步操作都结束了，不管每一个操作是成功还是失败，再进行下一步操作。但是，现有的 Promise 方法很难实现这个要求。

Promise.all()方法只适合所有异步操作都成功的情况，如果有一个操作失败，就无法满足要求。

```js
// 注意这种写法，直接把promise数组传入allSettled()，有时候会忘了三个promise组成的数组也是一个promise
// const promises = [fetch('/api-1'), fetch('/api-2'), fetch('/api-3')];

await Promise.allSettled([fetch('/api-1'), fetch('/api-2'), fetch('/api-3')]);
// 数组promises包含了三个请求，只有等到这三个请求都结束了（不管请求成功还是失败），removeLoadingIndicator()才会执行。
removeLoadingIndicator();
```

```js
const promises = [fetch('index.html'), fetch('https://does-not-exist/')];
const results = await Promise.allSettled(promises);

// 过滤出成功的请求
const successfulPromises = results.filter((p) => p.status === 'fulfilled');

// 过滤出失败的请求，并输出原因
const errors = results
  .filter((p) => p.status === 'rejected')
  .map((p) => p.reason);
```

## 引用

> [JavaScript 数组解构和对象解构](https://www.freecodecamp.org/chinese/news/array-and-object-destructuring-in-javascript/)[ES6 入门教程](https://es6.ruanyifeng.com/)[从 ES6 重新认识 JavaScript 设计模式(一): 单例模式](https://zhuanlan.zhihu.com/p/34754447) [ES6 构造函数语法糖：class 类](https://www.jianshu.com/p/8a1a60709e7e)

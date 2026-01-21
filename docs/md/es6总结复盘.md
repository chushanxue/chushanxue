## 前言

ECMAScript 和 JavaScript 的关系是，前者是后者的规格，后者是前者的一种实现（日常场合，这两个词是可以互换的。）

## ES6 的新特性

### 一、var、let、const

ES6 的特性之一是添加了 let 和 const，可用于变量声明。

在 ES6 出现之前，var 声明占主导地位。但是，使用 var 声明的变量存在一些问题。这就是为什么有必要出现新的声明变量的方法。

#### 1、var

- 当 var 变量在函数外部声明时，作用域是全局的。这意味着在函数体外用 var 声明的任何变量都可以在整个窗口中使用。
- var 在函数中声明时，它的作用域是在函数体内。这意味着它只能在该函数中被访问。
- var 变量可以重新声明和更新
- var 的提升（hoisting）是一种 JavaScript 机制，其中变量和函数声明在代码执行之前被移动到其作用域的顶部

#### 2、let

let 现在是变量声明的首选

- let 是块作用域

  块是由 {} 界定的代码块。一个块存在于花括号中。花括号内的任何内容都是一个块。

- let 可以更新但不能重新声明

  但是，如果同一个变量定义在不同的作用域，就不会报错

- 不存在变量提升
- 暂时性死区⭐⭐⭐

  只要块级作用域内存在let命令，这个区域就不再受外部影响，使用let声明变量前，该变量都不可用，也就是大家常说的“暂时性死区”

  ```js
  var a = 123;
  if (true) {
    a = 'abc'; // ReferenceError
    let a;
  }

  // 使用let声明变量时，只要变量在还没有声明完成前使用，就会报错
  let x = x; // ReferenceError: x is not defined
  ```

#### 3、const

const声明一个只读的常量，一旦声明，常量的值就不能改变（因此，每个 const 声明都必须在声明时进行初始化。）

- 与 let 声明一样，const 声明只能在它们声明的块内访问。
- const实际上保证的并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动
  - 对于简单类型的数据，值就保存在变量指向的那个内存地址，因此等同于常量
  - 对于复杂类型的数据，变量指向的内存地址，保存的只是一个指向实际数据的指针，const只能保证这个指针是固定的，并不能确保改变量的结构不变

#### 4、var、let、const 的区别

- 变量提升
  - var声明的变量存在变量提升，即变量可以在声明之前调用，值为undefined
  - let和const不存在变量提升，即它们所声明的变量一定要在声明后使用，否则报错
- 暂时性死区
  - var不存在暂时性死区
  - let和const存在暂时性死区，只有等到声明变量的那一行代码出现，才可以获取和使用该变量
- 块级作用域
  - var不存在块级作用域
  - let和const存在块级作用域
- 重复声明
  - var允许重复声明变量
  - let和const在同一作用域不允许重复声明变量
- 修改声明的变量
  - var和let可以
  - const声明一个只读的常量。一旦声明，常量的值就不能改变
- 使用
  - 能用const的情况尽量使用const，其他情况下大多数使用let，避免使用var

### 二、symbol

ES5 的对象属性名都是字符串，这容易造成**属性名的冲突**。比如，你使用了一个他人提供的对象，但又想为这个对象添加新的方法（mixin 模式），新方法的名字就有可能与现有方法产生冲突。如果有一种机制，保证每个属性的名字都是独一无二的就好了，这样就从根本上防止属性名的冲突。这就是 ES6 引入Symbol的原因。

⭐其他数据类型是：undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、大整数（BigInt）、对象（Object）。

```js
let s = Symbol();

typeof s;
// "symbol"
```

Symbol 值通过Symbol()函数生成。这就是说，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的 Symbol 类型。凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。

### 三、数组的拓展

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

### 四、箭头函数

ES6中允许使用箭头`=>`来定义箭头函数，箭头函数最常见的用处就是简化回调函数。

```js
// 箭头函数
let fun = (name) => {
  // 函数体
  return `Hello ${name} !`;
};

// 等同于
let fun = function (name) {
  // 函数体
  return `Hello ${name} !`;
};
```

- 关于箭头函数的参数

  ```js
  // 没有参数
  let fun1 = () => {
    console.log(111);
  };

  // 只有一个参数，可以省去参数括号
  let fun2 = (name) => {
    console.log(`Hello ${name} !`);
  };

  // 有多个参数
  let fun3 = (val1, val2, val3) => {
    return [val1, val2, val3];
  };
  ```

- 关于箭头函数的函数体

  - 如果箭头函数的函数体只有一句代码，就是简单返回某个变量或者返回一个简单的JS表达式，可以省去函数体的大括号{ }
  - 如果箭头函数的函数体只有一句代码，且是返回一个对象，可以用小括号包裹要返回的对象
  - 如果箭头函数的函数体只有一条语句并且不需要返回值（最常见是调用一个函数），可以给这条语句前面加一个void关键字

  ```js
  let f = (val) => val;
  // 等同于
  let f = function (val) {
    return val;
  };

  let sum = (num1, num2) => num1 + num2;
  // 等同于
  let sum = function (num1, num2) {
    return num1 + num2;
  };

  // 用小括号包裹要返回的对象，不报错
  let getTempItem = id => ({ id: id, name: "Temp" });

  // 但绝不能这样写，会报错。
  // 因为对象的大括号会被解释为函数体的大括号
  let getTempItem = id => { id: id, name: "Temp" };

  let fn = () => void doesNotReturn();
  ```

#### 箭头函数和普通函数的区别

- 语法更加简洁、清晰
- 箭头函数不会创建自己的this⭐⭐⭐

  箭头函数没有自己的this，它会捕获自己在定义时（注意，是定义时，不是调用时）所处的外层执行环境的this，并继承这个this值。所以，箭头函数中this的指向在它被定义的时候就已经确定了，之后永远不会改变。

- 待补充，这一块和this指向绑定很深

### 五、es6中的class

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

## 引用

> [JavaScript 数组解构和对象解构](https://www.freecodecamp.org/chinese/news/array-and-object-destructuring-in-javascript/)[ES6 入门教程](https://es6.ruanyifeng.com/)[从 ES6 重新认识 JavaScript 设计模式(一): 单例模式](https://zhuanlan.zhihu.com/p/34754447) [ES6 构造函数语法糖：class 类](https://www.jianshu.com/p/8a1a60709e7e) [Var、Let 和 Const 有什么区别？](https://www.freecodecamp.org/chinese/news/var-let-and-const-whats-the-difference/) [ES6 - 箭头函数、箭头函数与普通函数的区别](https://juejin.cn/post/6844903805960585224)

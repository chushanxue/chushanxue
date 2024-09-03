### 一、ES5构造函数

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

### 二、类与函数对比

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

### 三、注意点

1、函数声明和类声明之间的一个重要区别在于，函数声明会提升，类声明不会。你首先需要声明你的类，然后再访问它

2、类声明和类表达式的主体都执行在严格模式下

3、`constructor` 方法是一个特殊的方法，这种方法用于创建和初始化一个由 `class` 创建的对象。一个类只能拥有一个名为`constructor`的特殊方法。

4、一个构造函数可以使用 `super` 关键字来调用一个父类的构造函数。

5、静态属性：`class` 本身的属性，即直接定义在类内部的属性（ `Class.propname` ），不需要实例化。

### 四、使用

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

### 五、实际运用

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

### 六、引用

> [从 ES6 重新认识 JavaScript 设计模式(一): 单例模式](https://zhuanlan.zhihu.com/p/34754447) [ES6 构造函数语法糖：class 类](https://www.jianshu.com/p/8a1a60709e7e)

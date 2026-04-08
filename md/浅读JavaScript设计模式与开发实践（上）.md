## 一、前言

设计模式的定义是：在面向对象软件设计过程中针对特定问题的**简洁而优雅的解决方案**。

通俗一点说，设计模式就是给面向对象软件开发中的一些**好的设计取个名字**。

在软件设计中，一个好的设计方案有了名字之后，才能被更好地传播，人们才有更多的机会去分享和学习它们。

## 二、基础知识

### 1、多态

> 多态的实际含义是：**同一操作作用于不同的对象上面，可以产生不同的解释和不同的执行结果**。换句话说，给不同的对象发送同一个消息的时候，这些对象会根据这个消息分别给出不同的反馈。多态背后的思想是将“做什么”和“谁去做以及怎样去做”分离开来，也就是将“不变的事物”与 “可能改变的事物”分离开来。

一个多次调用的方法，需要<mark>具备健壮性</mark>，以及尽量<mark>解耦合</mark>，如果每多一个来调用此方法的对象，该方法就要定制化改动，或者这个方法里面有很多判断条件，那么这个方法就是可以优化的

```js
  <Tag color="red" onClick={handleTagClick}>
  全部
  </Tag>
  <Tag color="purple" onClick={handleTagClick}>
  html5
  </Tag>
  <Tag color="purple" onClick={handleTagClick}>
  css
  </Tag>
  <Tag color="purple" onClick={handleTagClick}>
  js
  </Tag>
  <Tag color="purple" onClick={handleTagClick}>
  ts
  </Tag>
  ....


  const handleTagClick = (event) => {
      filteredIntros(event.currentTarget.innerText);
  };

  event.currentTarget.innerText能够取出所有的tag内容，避免了每次调用的时候写不同的参数
```

```js
var renderMap = function (type) {
  if (type === 'google') {
    googleMap.show();
  } else if (type === 'baidu') {
    baiduMap.show();
  }
};
renderMap('google'); // 输出：开始渲染谷歌地图
renderMap('baidu'); // 输出：开始渲染百度地图

  同样的道理，上面的写法应该改成下面这种（不然如果有别的地图又需要改动renderMap方法）

var renderMap = function (map) {
  if (map.show instanceof Function) { //这句体现了健壮性
    map.show(); //这句体现了解耦合
  }
};

renderMap(googleMap); // 输出：开始渲染谷歌地图
renderMap(baiduMap); // 输出：开始渲染百度地图
```

### 2、封装

封装的目的是将信息隐藏。一般而言，我们讨论的封装是封装数据和封装实现。而更广义的封装，不仅包括封装数据和封装实现，还包括封装类型和封装变化。

- 封装数据

  js 没有关键字来提供不同的访问权限，所以只能依赖变量的作用域来实现封装特性，而且只能模拟出 public 和 private 这两种封装性。

- 封装实现

  对象对它自己的行为负责，其他对象或者用户都不关心它的内部实现。封装使得对象之间的耦合变松散，对象之间只通过暴露的 API 接口来通信。

- 封装类型

  把对象的真正类型隐藏在抽象类或者接口之后，相比对象的类型，客户更关心对象的行为。

- 封装变化

  把系统中稳定不变的部分和容易变化的部分隔离开来，在系统的演变过程中，我们只需要替换那些容易变化的部分，这可以最大程度地保证程序的稳定性和可扩展性。

  当我们想办法把程序中变化的部分封装好之后，剩下的即是稳定而可复用的部分了。

  **不需要变动的**和**经常需要变动的**是封装实现和封装变化的区别所在

### 3、原型

原型模式是一种设计模式，也是一种编程泛型，它构成了 `JavaScript` 这门语言的根本。通过原型来实现的面向对象系统虽然简单，但能力同样强大。

在 `JavaScript` 语言中不存在类的概念（`ECMAScript 6` 带来了新的 `Class` 语法），对象也并非从类中创建出来的，所有的 `JavaScript` 对象都是从某个对象上克隆而来的。

如果 `A` 对象是从 `B` 对象克隆而来的，那么 `B` 对象就是 `A` 对象的原型。

**原型编程中的一个重要特性，即当对象无法响应某个请求时，会把该请求委托给它自己的原型。**

`JavaScript` 中的原型继承：

- 所有的数据都是对象

  > JavaScript 在设计的时候，模仿 Java 引入了两套类型机制：基本类型和对象类型。基本类型包括 undefined、number、boolean、string、function、object。 我们不能说在 JavaScript 中所有的数据都是对象，但可以说绝大部分数据都是对象。JavaScript 中的根对象是 Object.prototype 对象。Object.prototype 对象是一个空的对象。我们在 JavaScript 遇到的每个对象，实际上都是从 Object.prototype 对象克隆而来的， Object.prototype 对象就是它们的原型。

- 要得到一个对象，不是通过实例化类，而是找到一个对象作为原型并克隆它

  > 在 JavaScript 语言里，我们并不需要关心克隆的细节，因为这是引擎内部负责实现的。我们所需要做的只是显式地调用 var obj1 = new Object()或者 var obj2 = {}。此时，引擎内部会从 Object.prototype 上面克隆一个对象出来，我们最终得到的就是这个对象。

- 对象会记住它的原型（如何委托）

  > JavaScript 给对象提供了一个名为\_\_proto\_\_的隐藏属性，某个对象的\_\_proto\_\_属性默认会指向它的原型对象，即{Constructor}.prototype，通过\_\_proto\_\_属性，对象把请求顺利地转交给它的原型

- 如果对象无法响应某个请求，它会把这个请求委托给它的构造器的原型

  > 原型链并不是无限长的，如果 `Object.prototype` 不存在某个属性或方法，会返回 `undefined`。

### 4、this、call 和 apply

#### ① this

**this 永远指向一个对象**

**this 的指向是动态的，完全取决于函数调用的位置**（箭头函数打破了这一点）

<mark>实际应用中，this 的指向大致可以分为以下 5 种：</mark>

- 作为对象的**方法调用**。

  当函数作为对象的方法被调用时（函数是对象的一部分，类比 `pinia` 中的 `actions`），`this` 指向该对象

  像一些数组的方法，也是一样的原理，只不过这些方法都在数组的原型对象上而已

- 作为普通**函数调用**。

  当函数不作为对象的属性被调用时，也就是我们常说的普通函数方式，此时的 `this` 总是指向全局对象。在浏览器的 `JavaScript` 里，这个全局对象是 `window` 对象。

  ```js

  有时候我们会遇到一些困扰，比如在 div 节点的事件函数内部，有一个局部的 callback 方法，
  callback 被作为普通函数调用时，callback 内部的 this 指向了 window，但我们往往是想让它指向
  该 div 节点

  此时有一种简单的解决方案，可以用一个变量保存 div 节点的引用

  document.getElementById( 'div1' ).onclick = function(){
  var that = this; // 保存 div 的引用
  var callback = function(){
  alert ( that.id ); // 输出：'div1'
  }
  callback();
  };

  在 ECMAScript 5 的 strict 模式下，这种情况下的 this 已经被规定为不会指向全局对象，而
  是 undefined

  function func(){
  "use strict"
  alert ( this ); // 输出：undefined
  }
  func();

  ```

- **事件绑定**

  事件绑定共有三种方式：行内绑定、动态绑定、事件监听

  ```js
  <input type="button" value="按钮" onclick="clickFun()">
  <script>
    function clickFun(){
        this // 此函数的运行环境在全局window对象下，因此this指向window;
    }
  </script>
  ​
  <input type="button" value="按钮" onclick="this">
  <!-- 运行环境在节点对象中，因此this指向本节点对象 -->

  <input type="button" value="按钮" id="btn">
  <script>
    var btn = document.getElementById('btn');
    btn.onclick = function(){
        this ;  // this指向本节点对象
    }
  </script>
  ```

- 构造器调用。

  当用 new 运算符调用函数时，该函数总会返回一个对象，**通常情况下**，构造器里的 this 就指向返回的这个对象

- Function.prototype.call 或 Function.prototype.apply 调用（**隐式调用**）。

  跟普通的函数调用相比，用 Function.prototype.call 或 Function.prototype.apply 可以动态地改变传入函数的 this

  ```js
  var obj1 = {
    name: 'sven',
    getName: function () {
      return this.name;
    },
  };
  var obj2 = {
    name: 'anne',
  };
  console.log(obj1.getName()); // 输出: sven
  console.log(obj1.getName.call(obj2)); // 输出：anne
  ```

#### ② call apply

能熟练运用这两个方法，是我们真正成为一名 `JavaScript` 程序员的重要一步。

`call` 与 `apply` 的作用一模一样，区别仅在于传入参数形式的不同。

当使用 `call` 或者 `apply` 的时候，如果我们传入的第一个参数为 `null`，函数体内的 `this` 会指向默认的宿主对象（也就是不起作用），**但如果是在严格模式下，函数体内的 this 还是为 null**

- `apply` 接受两个参数，第一个参数指定了函数体内 `this` 对象的指向，第二个参数为一个带下标的集合，这个集合可以为数组，也可以为类数组，`apply` 方法把这个集合中的元素作为参数传递给被调用的函数

```js
var func = function (a, b, c) {
  alert([a, b, c]); // 输出 [ 1, 2, 3 ]
};

apply起作用与函数的运行不相关，所以下面这句就是调用func，只不过在调用的时候用上了apply
之前一直有一个误区，认为func.apply就只是在执行apply()，其实不是的，是在执行func()，捎带执行apply()
这样func()执行的时候，参数放到了第二个位置，因为第一个位置要留给apply用

func.apply(null, [1, 2, 3]);
```

- `call` 传入的参数数量不固定，跟 `apply` 相同的是，第一个参数也是代表函数体内的 `this` 指向，从第二个参数开始往后，每个参数被依次传入函数

```js
var func = function (a, b, c) {
  alert([a, b, c]); // 输出 [ 1, 2, 3 ]
};

其实就是传func()本身的参数的时候不用数组包裹起来而已，其他方面没有任何区别

func.call(null, 1, 2, 3);
```

应用场景：

```js
在实际开发中，经常会遇到 this 指向被不经意改变的场景，比如有一个 div 节点，div 节点
的 onclick 事件中的 this 本来是指向这个 div 的：

document.getElementById( 'div1' ).onclick = function(){
 alert( this.id ); // 输出：div1
};

假如该事件函数中有一个内部函数 func，在事件内部调用 func 函数时，func 函数体内的 this
就指向了 window，而不是我们预期的 div，见如下代码：
document.getElementById( 'div1' ).onclick = function(){
 alert( this.id ); // 输出：div1
 var func = function(){
 alert ( this.id ); // 输出：undefined
 }
 // 注意这里不是【作为对象的方法调用】，因为不是在对象外面，而是作为普通函数调用
 func();
};

这时候我们用 call 来修正 func 函数内的 this，使其依然指向 div：
document.getElementById( 'div1' ).onclick = function(){
 var func = function(){
 alert ( this.id ); // 输出：div1
 }
 func.call( this );
};

```

#### ③ bind

`bind()` 方法创建一个新的函数，在 `bind()` 被调用时，这个新函数的 `this` 被指定为 `bind()` 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

```js
在 Function.prototype.bind 的内部实现中，我们先把 func 函数的引用保存起来，然后返回一
个新的函数。当我们在将来执行 func 函数时，实际上先执行的是这个刚刚返回的新函数。在新
函数内部，self.apply( context, arguments )这句代码才是执行原来的 func 函数，并且指定 context
对象为 func 函数体内的 this。

Function.prototype.bind = function( context ){
 var self = this; // 保存原函数（bind是【作为对象的方法调用】，所以this指向该对象，也就是func）
 return function(){ // 返回一个新的函数
  return self.apply( context, arguments ); // 执行新的函数的时候，会把之前传入的 context当作新函数体内的 this
 }
};
var obj = {
 name: 'sven'
};
var func = function(){
 alert ( this.name ); // 输出：sven
}.bind( obj);

func();
```

#### ④ 箭头函数

<mark>注意这里只是跟 this 指向相关，平时我们用不到 this 指向的两种写法都可以，而且箭头函数更简洁</mark>

箭头函数使用的是声明时所处的上下文的`this`值，而不是被调用时的`this`值。

由于箭头函数没有自己的 `this`，所以当然也就不能用 `call()`、`apply()`、`bind()`这些方法去改变 `this` 的指向。

长期以来，JavaScript 语言的 this 对象一直是一个令人头痛的问题，**在对象方法中使用 this**（也就是上面说的那种需要特意去改 `this` 指向不然就出错的），必须非常小心。箭头函数”绑定”this，很大程度上解决了这个困扰。

箭头函数不适用的场合：

- 定义对象的方法，**且该方法内部包括 this**（没有 this 就不用担心）。

这是因为**对象不构成单独的作用域**，导致 jumps 箭头函数定义时的作用域就是全局作用域。

```js
【错误】
const cat = {
  lives: 9,
  jumps: () => {
    console.log(this.lives);
  },
};

cat.jumps(); //输出：NaN（注意jumps后面需要跟()，不然就是输出jumps对象，而不是执行jumps方法）

【正确】
const cat = {
  lives: 9,
  jumps: function () {
    console.log(this.lives);
  },
};

定义的时候jumps中的this确实指向全局，但运行的时候jumps是在cat对象上下文，自然this指向cat对象，
箭头函数在定义的时候就写死了this，所以达不到这种效果
cat.jumps(); //输出：9
```

- 需要动态 this 的时候，也不应使用箭头函数

```js
前置知识：classList 是 DOM 内置api，它返回一个元素的类列表，并且提供方法操作它们
classList.toggle(xx)用于切换 xx 类是否存在于当前元素的 class 列表

var button = document.getElementById('press');
button.addEventListener('click', () => {
  // this指向全局对象
  this.classList.toggle('on');
});

与上一个例子原理一样，定义的时候this都是指向全局，但真正起作用的时候
普通函数能动态更改自己的this
button.addEventListener('click', function () {
  // this 关键字动态指向当前被点击的按钮。
  this.classList.toggle('on');
});
```

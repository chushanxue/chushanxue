### 一、基本语法

- 语句

  JavaScript 程序的执行单位为行（line），也就是一行一行地执行。一般情况下，每一行就是一个语句。

  语句（statement）是为了完成某种任务而进行的操作

  > 表达式（expression），指一个为了得到返回值的计算式。语句和表达式的区别在于，前者主要为了进行某种操作，一般情况下不需要返回值；后者则是为了得到返回值，一定会返回一个值。凡是 JavaScript 语言中预期为值的地方，都可以使用表达式。比如，赋值语句的等号右边，预期是一个值，因此可以放置各种表达式。

- 变量/变量提升

  JavaScript 是一种动态类型语言，也就是说，变量的类型没有限制，变量可以随时更改类型。

  JavaScript 引擎的工作方式是，先解析代码，获取所有被声明的变量，然后再一行一行地运行。这造成的结果，就是所有的变量的声明语句，都会被提升到代码的头部，这就叫做变量提升（hoisting）。

- 标识符

  标识符（`identifier`）指的是用来识别各种值的合法名称。最常见的标识符就是变量名和函数名。

  `JavaScript` 语言的标识符对大小写敏感，所以a和A是两个不同的标识符。

  - 第一个字符，可以是任意 `Unicode` 字母（包括英文字母和其他语言的字母），以及美元符号（`$`）和下划线（`\_`）。
  - 第二个字符及后面的字符，除了 `Unicode` 字母、美元符号和下划线，还可以用数字`0-9`。
  - 中文是合法的标识符，可以用作变量名。
  - 注意`JavaScript` 有一些保留字，不能用作标识符

- 注释
- 区块

  JavaScript 使用大括号，将多个相关的语句组合在一起，称为“区块”（block）。

- 条件语句

  `JavaScript` 提供`if`结构（三元运算符可以被视为`if...else...`的简写形式）和`switch`结构，完成条件判断，即只有满足预设的条件，才会执行相应的语句。

  多个`if...else`连在一起使用的时候，可以转为使用更方便的`switch`结构。

  > 关于switch：如果所有case都不符合，则执行最后的default部分。需要注意的是，每个case代码块内部的break语句不能少，否则会接下去执行下一个case代码块（不满足条件也会去执行），而不是跳出switch结构。

- 循环语句

  `while`循环、`for`循环、`do...while`循环

  `break` 语句和 `continue` 语句、`label`标签

  > 如果存在多重循环，不带参数(如标签)的break语句和continue语句都只针对最内层循环。

  > 在循环中使用return语句可以终止当前的**函数**并立即返回，同时也可以终止包含它的循环。（注意return语句不能直接写在循环里，会报错，必须包裹在函数里）

### 二、数据类型

#### 1、概述

JavaScript 语言的每一个值，都属于某一种数据类型。JavaScript 的数据类型，共有六种。

- number

  NaN不等于任何值，包括它本身，表示本来要返回数值的操作失败了（而不是抛出错误）

  ```js
  console.log(0 / 0); // NaN
  console.log(-0 / +0); // NaN
  ```

- string

  字符串默认只能写在一行内，分成多行将会报错。如果长字符串必须分成多行，可以在每一行的尾部使用反斜杠。

  ```js
  const longString =
    'Long \
  long \
  long \
  string';
  ```

  转义字符：

  ```bash
  \0 ：null（\u0000）
  \b ：后退键（\u0008）
  \f ：换页符（\u000C）
  \n ：换行符（\u000A）
  \r ：回车键（\u000D）
  \t ：制表符（\u0009）
  \v ：垂直制表符（\u000B）
  \' ：单引号（\u0027）
  \" ：双引号（\u0022）
  \\ ：反斜杠（\u005C）
  ```

  <mark>字符串可以被视为字符数组，因此可以使用数组的方括号运算符，用来返回某个位置的字符（位置编号从0开始）</mark>

  如果方括号中的数字超过字符串的长度，或者方括号中根本不是数字，则返回undefined。

  但是，字符串与数组的相似性仅此而已。实际上，无法改变字符串之中的单个字符。

  > Base64 就是一种编码方法，可以将任意值转成 0～9、A～Z、a-z、+和/这64个字符组成的可打印字符。使用它的主要目的，不是为了加密，而是为了不出现特殊字符，简化程序的处理。有时，文本里面包含一些不可打印的符号，比如 ASCII 码0到31的符号都无法打印出来，这时可以使用 Base64 编码，将它们转成可以打印的字符。另一个场景是，有时需要以文本格式传递二进制数据，那么也可以使用 Base64 编码。

- boolean
- undefined

  表示“未定义”或不存在，即由于目前没有定义，所以此处暂时没有任何值。

  <mark>注意未定义不代表未声明</mark>，含义要区分开，比如声明了一个变量，却没有给他赋值，那么这个变量的值就是`undefined`，如果没有声明就使用这个变量，会报错

  注意：`null`是一个表示“空”的对象，转为数值时为0；`undefined`是一个表示"此处无定义"的原始值，转为数值时为`NaN`。

  返回`undefined`的典型场景：

  ```js
  // 变量声明了，但没有赋值
  var i;
  i; // undefined

  // 调用函数时，应该提供的参数没有提供，该参数等于 undefined
  function f(x) {
    return x;
  }
  f(); // undefined

  // 对象没有赋值的属性
  var o = new Object();
  o.p; // undefined

  // 函数没有返回值时，默认返回 undefined
  function f() {}
  f(); // undefined
  ```

- null

  表示空值，即此处的值为空。

  <mark>null的类型是object，这是由于历史原因造成的。</mark>

  只要变量要保存对象，而当时又没有那个对象可保存，就可用 null来填充该变量，<mark>这也是如何解决不想初始化对象的问题hhhh</mark>

  ```js
  type Post = {
    title?: string;
    id?: number;
  };
  const [post, setPost] = useState<Post | null>(null);
  ```

- object

  > 在JavaScript中，当你创建一个新的对象或数组，即使它的内容与旧的对象或数组完全相同，它们也是不同的引用。这是因为对象和数组在JavaScript中是引用类型，每次创建都会生成一个新的引用。更新对象时，其实是创建了一个新的对象，重新赋值给原来的变量，所以对象具有相同的内容，但它们是不同的引用。以及，对于旧的引用来说，如果没有其他变量再使用它，那么JavaScript的垃圾回收机制会自动清理掉它。所以不需要担心旧引用会占用额外的内存。

  - 狭义的对象

    创建对象的方法有：使用构造函数、使用 `Object.create()`、使用类（ES6+）、使用对象字面量表示法

    创建object常用方式为对象字面量表示法，属性名可以是字符串或<mark>数值</mark>

    ```js
    let person = {
      name: 'Nicholas',
      age: 29,
      5: true,
    };
    ```

  - array

    JavaScript数组是一组有序的数据，但跟其他语言不同的是，数组中每个槽位可以**存储任意类型的数据**。并且，数组也是动态大小的，会随着数据添加而自动增长

    `let colors = ["red", 2, {age: 20 }]`

  - function

#### 2、判断值的类型

JavaScript 有三种方法，可以确定一个值到底是什么类型。

- typeof:最适合判断基本类型（除null会返回'object'），对函数返回'function'，对未声明变量返回'undefined'且不会报错。

  ```js
  // 基本类型
  typeof undefined; // "undefined"
  typeof true; // "boolean"
  typeof 42; // "number"
  typeof 'hello'; // "string"
  typeof 123n; // "bigint"
  typeof Symbol(); // "symbol"

  // 特殊值
  typeof null; // "object" ❌ 历史遗留bug
  typeof function () {}; // "function"
  typeof class MyClass {}; // "function"

  // 引用类型（除了function）
  typeof []; // "object"
  typeof {}; // "object"
  typeof new Date(); // "object"
  typeof /regex/; // "object"

  // 未声明的变量
  typeof undeclaredVar; // "undefined"（不会报错）
  ```

- instanceof:检查原型链，适合判断对象是否属于某个构造函数，但有基本类型判断问题。

  ```js
    // instanceof 检查原型链
    [] instanceof Array               // true
    [] instanceof Object              // true（Array继承Object）
    new Date() instanceof Date        // true
    new Date() instanceof Object      // true

    // 自定义构造函数
    function Person(name) {
      this.name = name;
    }
    const john = new Person('John');
    console.log(john instanceof Person);   // true
    console.log(john instanceof Object);   // true

    // 原型链继承
    function Animal() {}
    function Dog() {}
    Dog.prototype = Object.create(Animal.prototype);
    const dog = new Dog();
    console.log(dog instanceof Dog);      // true
    console.log(dog instanceof Animal);   // true
    console.log(dog instanceof Object);   // true

    // 基本类型返回false(局限性❌)
    console.log('hello' instanceof String);    // false
    console.log(42 instanceof Number);         // false
    console.log(true instanceof Boolean);      // false

  ```

- Object.prototype.toString:最精确的方法，能返回'[object Type]'格式，能区分所有内置类型，是类型判断的终极方案。

  ```js
  // 基本类型
  Object.prototype.toString.call(undefined); // "[object Undefined]"
  Object.prototype.toString.call(null); // "[object Null]"
  Object.prototype.toString.call(true); // "[object Boolean]"
  Object.prototype.toString.call(42); // "[object Number]"
  Object.prototype.toString.call('hello'); // "[object String]"
  Object.prototype.toString.call(123n); // "[object BigInt]"
  Object.prototype.toString.call(Symbol()); // "[object Symbol]"

  // 引用类型
  Object.prototype.toString.call([]); // "[object Array]"
  Object.prototype.toString.call({}); // "[object Object]"
  Object.prototype.toString.call(function () {}); // "[object Function]"
  Object.prototype.toString.call(new Date()); // "[object Date]"
  Object.prototype.toString.call(/regex/); // "[object RegExp]"
  Object.prototype.toString.call(new Error()); // "[object Error]"
  Object.prototype.toString.call(Math); // "[object Math]"
  Object.prototype.toString.call(JSON); // "[object JSON]"

  // 包装对象
  Object.prototype.toString.call(new String()); // "[object String]"
  Object.prototype.toString.call(new Number()); // "[object Number]"
  Object.prototype.toString.call(new Boolean()); // "[object Boolean]"
  ```

<mark></mark>

#### 3、数据类型转换

虽然变量的数据类型是不确定的，但是各种运算符对数据类型是有要求的。如果运算符发现，运算子的类型与预期不符，就会自动转换类型。比如，减法运算符预期左右两侧的运算子应该是数值，如果不是，就会自动将它们转为数值。

- 手动强制转换

  强制转换主要指使用`Number()、String()`和`Boolean()`三个函数，手动将各种类型的值，分别转换成数字、字符串或者布尔值。

  - Number()

    原始类型值的转换规则如下：

    ```js
    // 数值：转换后还是原来的值
    Number(324); // 324

    // 字符串：如果可以被解析为数值，则转换为相应的数值
    Number('324'); // 324

    // 字符串：如果不可以被解析为数值，返回 NaN
    Number('324abc'); // NaN

    // 空字符串转为0
    Number(''); // 0

    // 布尔值：true 转成 1，false 转成 0
    Number(true); // 1
    Number(false); // 0

    // undefined：转成 NaN
    Number(undefined); // NaN

    // null：转成0
    Number(null); // 0

    // Number方法的参数是对象时，将返回NaN，除非是包含单个数值的数组。
    Number({ a: 1 }); // NaN
    Number([1, 2, 3]); // NaN
    Number([5]); // 5
    ```

  - String()

    - 数值：转为相应的字符串。
    - 字符串：转换后还是原来的值。
    - 布尔值：true转为字符串"true"，false转为字符串"false"。
    - undefined：转为字符串"undefined"。
    - null：转为字符串"null"。
    - String方法的参数如果是对象，返回一个类型字符串；如果是数组，返回该数组的字符串形式。

    ```js
    String(123); // "123"
    String('abc'); // "abc"
    String(true); // "true"
    String(undefined); // "undefined"
    String(null); // "null"
    String({ a: 1 }); // "[object Object]"
    String([1, 2, 3]); // "1,2,3"
    ```

  - Boolean()

    除了以下五个值的转换结果为false，其他的值全部为true。

    ```js
    Boolean(undefined); // false
    Boolean(null); // false
    Boolean(0); // false
    Boolean(NaN); // false
    Boolean(''); // false
    ```

- 自动转换

  遇到以下三种情况时，JavaScript 会自动转换数据类型，即转换是自动完成的，用户不可见。

  - 不同类型的数据互相运算

    ```js
    123 + 'abc'; // "123abc"
    ```

  - 对非布尔值类型的数据求布尔值

    ```js
    if ('abc') {
      console.log('hello');
    } // "hello"
    ```

  - 对非数值类型的值使用一元运算符（即+和-）

    `+ {foo: 'bar'} // NaN`

    `- [1, 2, 3] // NaN`

  > 自动转换的规则是这样的：预期什么类型的值，就调用该类型的转换函数。比如，某个位置预期为字符串，就调用String()函数进行转换。如果该位置既可以是字符串，也可能是数值，那么默认转为数值。

  由于自动转换具有不确定性，而且不易除错，建议在预期为布尔值、数值、字符串的地方，全部使用Boolean()、Number()和String()函数进行显式转换。

### 三、运算符

#### 1、比较运算符

JavaScript 一共提供了8个比较运算符。**注意，比较运算符可以比较各种类型的值，不仅仅是数值。**

```bash
> 大于运算符
< 小于运算符
<= 小于或等于运算符
>= 大于或等于运算符
== 相等运算符
=== 严格相等运算符
!= 不相等运算符
!== 严格不相等运算符
```

> 这八个比较运算符分成两类：相等比较和非相等比较。两者的规则是不一样的，对于非相等的比较，算法是先看两个运算子是否都是字符串，如果是的，就按照字典顺序比较（实际上是比较 Unicode 码点）；否则，将两个运算子都转成数值，再比较数值的大小。

一些需要注意的比较：

- 相等运算符（==）

  **比较两个值是否相等**

  如果两个值不是同一类型，相等运算符（==）会将它们转换成同一个类型，再用严格相等运算符进行比较。

- 严格相等运算符（===）

  **比较它们是否为“同一个值”**。同一类型的原始类型的值（数值、字符串、布尔值）比较时，值相同就返回true，值不同就返回false。

  两个复合类型（对象、数组、函数）的数据比较时，不是比较它们的值是否相等，而是比较它们是否指向同一个地址。

  ```js
  {} === {} // false
  [] === [] // false
  (function () {} === function () {}) // false
  ```

#### 2、布尔运算符

布尔运算符用于将表达式转为布尔值，一共包含四个运算符。

```bash
取反运算符：!
且运算符：&&
或运算符：||
三元运算符：?:
空值合并运算符：??
```

- 且运算符（&&）

  如果第一个运算子的布尔值为true，则返回第二个运算子的值（注意是值，不是布尔值）；**如果第一个运算子的布尔值为false，则直接返回第一个运算子的值**，且不再对第二个运算子求值。

  <mark>注意此处值和布尔值的区别</mark>

  &&经常用于react组件的条件显示，但需要注意前面的表达式不能真的有值，否则页面上会出现一些预期之外的显示

  ```js
  {
    predictIsSame && (
      <Tag icon={<CheckCircleOutlined />} color="success">
        与标记回答一致
      </Tag>
    );
  }
  {
    predictIsSame === 1 && (
      <Tag icon={<CheckCircleOutlined />} color="success">
        与标记回答一致
      </Tag>
    );
  }
  ```

  predictIsSame只有1和0两个值，想实现的效果是只有当它为1时页面上才显示标签UI，但第一种写法，在它为0时，页面会显示0

  换成第二种写法后就能实现预期效果，因为第一个表达式的值为布尔值，<mark>布尔值、null、undefined这些值在直接放置在 JSX 中进行渲染时，不会显示任何内容</mark>，因为他们会被渲染成空字符串（这也是为什么有时候我们用三元运算符实现上述类似效果时经常会用到空字符串表示什么也不渲染）

- 或运算符（||）和空值合并运算符（??）

  空值合并运算符（??）是一个逻辑运算符，当左侧的操作数为 null 或者 undefined 时，返回其右侧操作数，否则返回左侧操作数。

  逻辑或运算符会在左侧操作数为假值时返回右侧操作数。也就是说，如果使用 || 来为某些变量设置默认值，可能会遇到意料之外的行为。比如为假值（例如，'' 或 0）时。

  由于 || 是一个布尔逻辑运算符，左侧的操作数会被强制转换成布尔值用于求值。任何假值（0， ''， NaN， null， undefined）都不会被返回。这导致如果你**使用0，''或NaN作为有效值**，就会出现不可预料的后果。

  通常情况下这两者都能用，判断用哪个的条件就是**是否使用0，''或NaN作为有效值**

### 四、错误处理机制

用try...catch去引出对js错误机制的理解

在 JavaScript 中，try...catch 结构用于捕获和处理代码中的错误。

JavaScript 中的错误可以分为两种类型：

#### 1、内置错误

- SyntaxError

  解析代码时发生的语法错误，如变量名错误，缺少括号

- ReferenceError

  引用一个不存在的变量时发生的错误，或者将一个值分配给无法分配的对象

- RangeError

  值超出有效范围时发生的错误，主要有几种情况，一是数组长度为负数，二是Number对象的方法参数超出范围，以及函数堆栈超过最大值。

- TypeError

  变量或参数不是预期类型时发生的错误，比如，对字符串、布尔值、数值等原始类型的值使用new命令，就会抛出这种错误，因为new命令的参数应该是一个构造函数。

  调用对象不存在的方法，也会抛出TypeError错误

- ....

#### 2、自定义错误

除了 JavaScript 原生提供的七种错误对象，还可以定义自己的错误对象。

基本使用不到，这里不作解释

### 五、事件

#### 1、事件模型

浏览器的事件模型，就是通过监听函数（`listener`）对事件做出反应。事件发生后，浏览器监听到了这个事件，就会执行对应的监听函数。这是事件驱动编程模式（`event-driven`）的主要编程方式。

所有 DOM 节点实例都有`addEventListener`方法，用来为该节点定义事件的**监听函数**。

<mark>注意一个认知误区，事件触发不一定要真实操作</mark>

```js
// 比如点击事件，可以使用js触发
document.getElementById('btn').click();
```

#### 2、事件对象

事件发生以后，会产生一个事件对象，作为参数传给**监听函数**。

事件对象的常用实例方法：

- Event.preventDefault()

  `Event.preventDefault`方法取消浏览器对当前事件的默认行为。比如点击链接后，浏览器默认会跳转到另一个页面，使用这个方法以后，就不会跳转了；再比如，按一下空格键，页面向下滚动一段距离，使用这个方法以后也不会滚动了。

- Event.stopPropagation()

  stopPropagation方法阻止事件在 DOM 中继续传播，防止再触发定义在别的节点上的监听函数，但是不包括在当前节点上其他的事件监听函数。

  > 这个方法非常有用，比如当你在页面上绑定了键盘事件，但当用户输入的时候不希望触发这些键盘事件，那么就可以阻止输入框的事件往外走，@keydown="(e) => e.stopPropagation()"

拓展：$event的不同场景

- 对于原生事件，$event就是一个特殊的占位符，它其实就是一个事件对象。
- 对于自定义事件，$event就是触发事件时，所能传递的数据，不能`.target`

  ```js
  <OssPath  @save="savePath(item, $event)" @cancel="closePath" />
  const savePath = (item: string, path: string) => {
    // item是父组件传递的参数，path是子组件传递的参数
  }
  ```

#### 3、鼠标事件

MouseEvent接口代表了鼠标相关的事件，单击（click）、双击（dblclick）、松开鼠标键（mouseup）、按下鼠标键（mousedown）等动作，所产生的事件对象都是MouseEvent实例。此外，滚轮事件和拖拉事件也是MouseEvent实例。

MouseEvent接口继承了Event接口，所以拥有Event的所有属性和方法，并且还提供鼠标独有的属性和方法。下面罗列一些常用的属性：

```bash
screenX：数值，鼠标相对于屏幕的水平位置（单位像素），默认值为0，设置该属性不会移动鼠标。
screenY：数值，鼠标相对于屏幕的垂直位置（单位像素），其他与screenX相同。
clientX：数值，鼠标相对于程序窗口的水平位置（单位像素），默认值为0，设置该属性不会移动鼠标。
clientY：数值，鼠标相对于程序窗口的垂直位置（单位像素），其他与clientX相同。
ctrlKey：布尔值，是否同时按下了 Ctrl 键，默认值为false。
shiftKey：布尔值，是否同时按下了 Shift 键，默认值为false。
altKey：布尔值，是否同时按下 Alt 键，默认值为false。
```

- 点击事件
  - click：按下鼠标（通常是按下主按钮）时触发。
  - dblclick：在同一个元素上双击鼠标时触发。
  - mousedown：按下鼠标键时触发。
  - mouseup：释放按下的鼠标键时触发。
- 移动事件
  - mousemove：当鼠标在一个节点内部移动时触发。当鼠标持续移动时，该事件会连续触发。为了避免性能问题，建议对该事件的监听函数做一些限定，比如限定一段时间内只能运行一次。
  - mouseenter：鼠标进入一个节点时触发，进入子节点不会触发这个事件（详见后文）。
  - mouseover：鼠标进入一个节点时触发，进入子节点会再一次触发这个事件（详见后文）。
  - mouseout：鼠标离开一个节点时触发，离开父节点也会触发这个事件（详见后文）。
  - mouseleave：鼠标离开一个节点时触发，离开父节点不会触发这个事件（详见后文）。
- 其他事件
  - contextmenu：按下鼠标右键时（上下文菜单出现前）触发，或者按下“上下文”菜单键时触发。
  - wheel：滚动鼠标的滚轮时触发，该事件继承的是WheelEvent接口。

#### 4、键盘事件

KeyboardEvent接口用来描述用户与键盘的互动。这个接口继承了Event接口，并且定义了自己的实例属性和实例方法。

- keydown：按下键盘时触发。
- keypress：按下有值的键时触发，即按下 Ctrl、Alt、Shift、Meta 这样无值的键，这个事件不会触发。对于有值的键，按下时先触发keydown事件，再触发这个事件。
- keyup：松开键盘时触发该事件。

<mark>键盘事件两个注意点：</mark>

- 在禁用原生键盘事件时，不要全局禁用，那么浏览器的快捷键就失效了，打字输入也失效了

  ```js
  const handleKeyDown = async (e: KeyboardEvent) => {
  if (e.code === 'Tab') {
    //禁用可以写在具体的键盘事件中
    e.preventDefault();
  }
  };
  ```

- 注册键盘事件时，要注意不要放到被循环的子组件里，否则被循环几次，键盘事件就会被调用几次

#### 5、窗口事件

- scroll 事件：在文档或文档元素滚动时触发，主要出现在用户拖动滚动条。
- resize 事件：在改变浏览器窗口大小时触发，主要发生在window对象上面。

#### 6、焦点事件

以下四个事件的事件对象都继承了FocusEvent接口。

- focus：元素节点获得焦点后触发，该事件不会冒泡。
- blur：元素节点失去焦点后触发，该事件不会冒泡。
- focusin：元素节点将要获得焦点时触发，发生在focus事件之前。该事件会冒泡。
- focusout：元素节点将要失去焦点时触发，发生在blur事件之前。该事件会冒泡。

#### 7、事件冒泡与事件捕获

- 事件冒泡是指子元素的事件冒泡到父元素

  事件从内部元素“冒泡”到所有父级，就像在水里的气泡一样

  <mark>注意有些事件不会冒泡，比如focus 事件</mark>

- 事件捕获是指父元素的事件被子元素捕获。

### 六、this指向

待补充

### 引用

> [JavaScript 教程](https://wangdoc.com/javascript/basic/grammar#%E8%AF%AD%E5%8F%A5)

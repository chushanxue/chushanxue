### 一、概念

`JavaScript` 的发明目的，就是作为**浏览器的内置脚本语言**，为网页开发者提供操控浏览器的能力。它是目前唯一一种通用的浏览器脚本语言，所有浏览器都支持。它可以让网页呈现各种特殊效果，为用户提供良好的互动体验。

#### 1、脚本语言

所谓“脚本语言”（`script language`），指的是它不具备开发操作系统的能力，而是只用来编写控制其他大型应用程序（比如浏览器）的“脚本”。

`JavaScript` 也是一种嵌入式（`embedded`）语言。它本身提供的核心语法不算很多，只能用来做一些数学和逻辑运算。`JavaScript` 本身不提供任何与 `I/O`（输入/输出）相关的 `API`，都要靠宿主环境（`host`）提供，所以 `JavaScript` 只合适嵌入更大型的应用程序环境，去调用宿主环境提供的底层 `API`。

目前，已经嵌入 `JavaScript` 的宿主环境有多种，最常见的环境就是浏览器，另外还有服务器环境，也就是 `Node` 项目。

#### 2、核心语法

- 基本语法（比如操作符、控制结构、语句）
- 标准库（就是一系列具有各种功能的对象比如 `Array、Date、Math` 等）
- 宿主环境提供额外的 `API`（即只能在该环境使用的接口，以浏览器为例）
  - 浏览器控制类：操作浏览器
  - `DOM` 类：操作网页的各种元素
  - `Web` 类：实现互联网的各种功能

> 如果宿主环境是服务器，则会提供各种操作系统的 API，比如文件操作 API、网络通信 API 等等。此处不作介绍

### 二、学习 js 的必要性

#### 1、广泛的使用领域

近年来，`JavaScript` 的使用范围，慢慢超越了浏览器，正在向通用的系统语言发展。

- 浏览器的平台化

  随着 `HTML5` 的出现 ❓，浏览器本身的功能越来越强，不再仅仅能浏览网页，而是越来越像一个平台，`JavaScript` 因此得以调用许多系统功能，比如操作本地文件、操作图片、调用摄像头和麦克风等等。这使得 `JavaScript` 可以完成许多以前无法想象的事情。

- `Node`

  `Node` 项目使得 `JavaScript` 可以用于开发服务器端的大型项目，网站的前后端都用 `JavaScript` 开发已经成为了现实。

- 数据库操作

- 移动平台开发

  `JavaScript` 也正在成为手机应用的开发语言。一般来说，安卓平台使用 `Java` 语言开发，`iOS` 平台使用 `Objective-C` 或 `Swift` 语言开发。许多人正在努力，让 `JavaScript` 成为各个平台的通用开发语言。

- 内嵌脚本语言

  越来越多的应用程序，将 `JavaScript` 作为内嵌的脚本语言，比如 `Adobe` 公司的著名 `PDF` 阅读器 `Acrobat`、`Linux` 桌面环境 `GNOME 3`。

- 跨平台的桌面应用程序

  `Chromium OS、Windows 8` 等操作系统直接支持 `JavaScript` 编写应用程序。`Mozilla` 的 `Open Web Apps` 项目、`Google` 的 `Chrome App` 项目、`GitHub` 的 `Electron` 项目、以及 `TideSDK` 项目，都可以用来编写运行于 `Windows`、`Mac OS` 和 `Android` 等多个桌面平台的程序，不依赖浏览器。

#### 2、易学性

- 学习环境无处不在

  只要有浏览器，就能运行 `JavaScript` 程序；只要有文本编辑器，就能编写 `JavaScript` 程序。这意味着，几乎所有电脑都原生提供 `JavaScript` 学习环境，不用另行安装复杂的 `IDE`（集成开发环境）和编译器。

- 简单性

  相比其他脚本语言（比如 `Python` 或 `Ruby`），`JavaScript` 的语法相对简单一些，本身的语法特性并不是特别多。而且，那些语法中的复杂部分，也不是必需要学会。完全可以只用简单命令，完成大部分的操作。

- 与主流语言的相似性

  `JavaScript` 的语法很类似 `C/C++` 和 `Java`，如果学过这些语言（事实上大多数学校都教），`JavaScript` 的入门会非常容易。

  必须说明的是，虽然核心语法不难，但是 `JavaScript` 的复杂性体现在另外两个方面。

  - 涉及大量的外部 `API`。`JavaScript` 要发挥作用，必须与其他组件配合，这些外部组件五花八门，数量极其庞大，几乎涉及网络应用的各个方面，掌握它们绝非易事。
  - `JavaScript` 语言有一些设计缺陷。
    - 学习 `JavaScript`，很大一部分时间是用来搞清楚哪些地方有陷阱。
    - 对于其他语言，你需要学习语言的各种功能，而对于 `JavaScript`，你常常需要学习各种解决问题的模式。
    - 由于来源多样，从一开始就注定，`JavaScript` 的编程风格是函数式编程和面向对象编程的一种混合体。

#### 3、强大的性能

- 灵活的语法，表达力强。
- 支持编译运行。

  `JavaScript` 语言本身，虽然是一种解释型语言，但是在现代浏览器中，`JavaScript` 都是编译后运行。程序会被高度优化，运行效率接近二进制程序。而且，`JavaScript` 引擎正在快速发展，性能将越来越好。

- 事件驱动和非阻塞式设计。

#### 4、开放性

`JavaScript` 是一种开放的语言。它的标准 `ECMA-262` 是 `ISO` 国际标准，写得非常详尽明确；该标准的主要实现（比如 `V8` 和 `SpiderMonkey` 引擎）都是开放的，而且质量很高。这保证了**这门语言不属于任何公司或个人，不存在版权和专利的问题**。

语言标准由 `TC39` 委员会负责制定，该委员会的运作是透明的，所有讨论都是开放的，会议记录都会对外公布。

不同公司的 `JavaScript` 运行环境，兼容性很好，程序不做调整或只做很小的调整，就能在所有浏览器上运行。

#### 5、社区支持和就业机会

### 三、历史表现

`ECMAScript` 和 `JavaScript` 的关系是，前者是后者的规格，后者是前者的一种实现。在日常场合，这两个词是可以互换的。

`ECMAScript` 只用来标准化 `JavaScript` 这种语言的基本语法结构，与部署环境相关的标准都由其他标准规定，比如 `DOM` 的标准就是由 `W3C` 组织（`World Wide Web Consortium`）制定的。

`V8` 编译器是 `Google` 公司为 `Chrome` 浏览器而开发的，它的特点是让 `JavaScript` 的运行变得非常快。它提高了 `JavaScript` 的性能，推动了语法的改进和标准化，改变外界对 `JavaScript` 的不佳印象。同时，`V8` 是开源的，任何人想要一种快速的嵌入式脚本语言，都可以采用 `V8`，这拓展了 `JavaScript` 的应用领域。

`Node.js` 项目标志着 `JavaScript` 可以用于服务器端编程，从此网站的前端和后端可以使用同一种语言开发。并且，`Node.js` 可以承受很大的并发流量，使得开发某些互联网大规模的实时应用变得容易。

### 四、常见问题

#### 1、闭包

闭包是指**函数能够记住并访问其词法作用域**。

关键特征：函数嵌套函数、内部函数引用外部函数的变量、外部函数执行完毕后，内部函数仍能访问那些变量

- 延续局部变量的寿命

  ```js
  function outerFunction() {
    let outerVariable = 'I am outside!';

    function innerFunction() {
      console.log(outerVariable); // 访问外部函数的变量
    }

    return innerFunction; // 返回内部函数
  }

  let myInnerFunction = outerFunction(); // outerFunction 执行完毕
  // 正常情况下，outerVariable 应该被垃圾回收
  // 但由于闭包，它仍然存在
  myInnerFunction(); // 仍然可以访问 outerVariable，输出: 'I am outside!'
  ```

  - ✅ 函数嵌套函数（innerFunction 在 outerFunction 内）
  - ✅ 内部函数引用了外部函数的变量（innerFunction 访问 outerVariable）
  - ✅ 外部函数执行完毕后，内部函数仍能访问外部变量

  在上述代码中，`innerFunction` 是一个闭包。尽管 `outerFunction` 已经执行完毕，但 `innerFunction` 仍然可以访问 `outerVariable`。 这是因为当 `innerFunction` 被创建时，它保存了一个指向 `outerFunction` 的作用域的引用。

  ```js
  function createMultiplier(multiplyBy) {
    // multiplyBy 参数也会被闭包"记住"
    return function (number) {
      return number * multiplyBy;
    };
  }

  const double = createMultiplier(2);
  const triple = createMultiplier(3);

  console.log(double(5)); // 10，还记得 multiplyBy = 2
  console.log(triple(5)); // 15，还记得 multiplyBy = 3

  // 即使 createMultiplier 早已执行完毕
  // double 和 triple 仍然记得各自的 multiplyBy 值
  ```

- useEffect 中的闭包陷阱与解决方案

  - 定时器中的旧值

    useEffect 只在组件挂载时执行一次（空依赖数组），回调函数形成了闭包，捕获了初始的 count = 0，后续所有定时器回调都使用这个旧的 count 值

  ```js
  function Counter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        console.log(count); // 永远输出 0！
        setCount(count + 1); // 永远设置成 1！
      }, 1000);

      return () => clearInterval(timer);
    }, []); // 空依赖数组

    return <div>Count: {count}</div>;
  }
  ```

  方案1：添加正确的依赖项,即添加 count 作为依赖

  方案2：使用函数式更新

  ```js
  function Counter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        // 使用函数式更新，不依赖闭包中的 count
        setCount((prevCount) => prevCount + 1);
      }, 1000);

      return () => clearInterval(timer);
    }, []); // 空依赖，只在挂载时执行

    return <div>Count: {count}</div>;
  }
  ```

### 五、引用

> [阮一峰 JavaScript 教程](https://www.bookstack.cn/read/javascript-tutorial/docs-basic-introduction.md)

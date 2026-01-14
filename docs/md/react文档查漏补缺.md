## 一、组件

`React`是`SPA`（`single page application`单页应用）

> 单页应用是一种网络应用程序或网站的模型，它通过动态重写当前页面来与用户交互，而非传统的从服务器重新加载整个新页面。 这种方法避免了页面之间切换打断用户体验，使应用程序更像一个桌面应用程序。

`React` 应用程序是由**组件**组成的。一个组件是 `UI`（用户界面）的一部分，它具有自己的集成和外观。组件可以小到一个按键，也可以大到整个页面。

`React` 组件是返回标签的 `JavaScript` **函数**

`React` 组件必须以大写字母开头，而 `HTML` 标签则必须是小写字母。

> 如果组件首字母为小写，转义时它会被当成字符串进行传递，在创建虚拟DOM的时候，就会把它当成一个**html标签**，而html没有app这个标签，就会报错。组件首字母为大写，转义时它会被当成一个变量进行传递，React知道它是个**自定义组件**就不会报错了

- 关于组件的默认导出和命名导出

  - 默认导出（每个模块包含一个）

    ```js
    export default const xxx =()=> {}

    import xxx from './xxx.js';//这里的xxx可以随便取名，因为不管取什么名字，引入的都是同一个对象
    ```

  - 命名导出（每个模块包含任意数量）

    ```js
    export const xxx = () => {};

    import { xxx } from './xxx.js'; //这里的xxx必须一一对应，且需用大括号包裹
    ```

## 二、JSX

- `JSX` 是 `JavaScript` 语法扩展，可以让你在 `JavaScript` 文件中书写类似 `HTML` 的标签。

  ```js
  意思是只要你想在ts文件中用html标签，都可以把文件后缀改成tsx
  ```

- `JSX` 比 `HTML` 更严格。你必须关闭标签，例如`<br />`。你的组件也不能返回多个 `JSX` 标签。你必须将它们打包到一个共享的父级中，例如或者`<div>...</div>`使用空间的`<>...</>`包装

> 1、React组件最后会编译为render函数，函数的返回值只能是1个，如果不用单独的根节点包裹，就会并列返回多个值，这在js中是不允许的；2、react的虚拟DOM是一个树状结构，树的根节点只能是1个，如果有多个根节点，无法确认是在哪棵树上进行更新

> <> 用在 react 中，其实算是 标签的一个语法糖 表示一个 Dom 片段 它可以在一个内存里面创建一个 Dom 节点 但是并不在 Dom 模板上渲染，进而提升性能

- 如果有大量的 `HTML` 需要移植到 `JSX` 中，可以使用[在线转换器](https://transform.tools/html-to-jsx)。
- 内联 `style` 属性 使用驼峰命名法编写
- `JSX`中的 {{ 和 }}，只不过是包在大括号里的一个对象
- `JSX` 是一种模板语言的最小实现，因为它允许你通过 `JavaScript` 来组织数据和逻辑。
- 将未经处理的对象作为文本内容使用会抛出错误，因为 `React` 并不知道你想如何展示它们。

- `JSX` 中的`className`渲染后就是`class`的结果，如`className={styles.tag} --> class="tag"`，反过来`class="tag1 tag2"--> className={styles.tag + " " + styles.tag2}`，模板字符串，`""`中间要有空格

## 三、条件渲染的三种方式

- if 语句

  ```js
  let content;

  if (isLoggedIn) {
    content = <AdminPanel />;
  } else {
    content = <LoginForm />;
  }

  //返回语句可以全写在一行上，但注意如果标签和 return 关键字不在同一行，则必须把它包裹在一对括号中
  return <div>{content}</div>;
  ```

- 条件 ? 运算符（更为紧凑的代码）

  ```js
  //本人常用
  <div>{isLoggedIn ? <AdminPanel /> : <LoginForm />}</div>
  ```

- 逻辑 && 语法（不需要 else 分支时）

  ```js
  <div>{isLoggedIn && <AdminPanel />}</div>
  ```

## 四、渲染列表

对于列表中的每一个元素，你应该传递一个字符串或者数字给 `key`，用于在其兄弟节点中唯一标识该元素。通常，`key` 应该来自你的数据，比如，数据库中的 `ID`。如果你在后续插入、删除或重新排序这些项目，**React 将依靠你提供的 key 来思考发生了什么**。

## 五、响应事件

注意，`onClick={handleClick}` 的结尾没有小括号！不要**调用**事件处理函数：你只需**传递给事件**即可。当用户点击按钮时，React 会调用你的事件处理函数。

<mark>如果有小括号，它会在 HTML 元素渲染时被立即执行，这不是我们期望的行为，因为我们希望当用户点击元素时触发事件。</mark>

```js
function MyButton() {
  function handleClick() {
    alert('You clicked me!');
  }

  return <button onClick={handleClick}>Click me</button>;
}
```

如果是作为对象的方法调用（必须有小括号），那么我们就把这里变成一个回调函数，原理一样，也是**不执行**，只是把这个函数传递

<mark>重点在于不执行/不调用，只传递</mark>

```js
<button onClick={() => history.back()}>Click me</button>
```

## 六、更新界面

`react`没有双向绑定，所以要通过**函数**去记住并更新页面上的数据（这也是react相比起vue更麻烦的一点）

`useState` 是 `React` 提供的一个内置 `Hook`，你将从 `useState` 中获得两样东西：当前的 `state`（`something`），以及用于更新它的函数（`setSomething`）。你可以给它们起任何名字，但按照惯例，需要像这样`[something, setSomething]`为它们命名。

## 七、使用 hook

以 `use` 开头的函数被称为 `Hook`（所以 `react` 中要慎将普通函数取名为`use`开头）

可以在 `React API` 参考 中找到其他内置的 `Hook`。也可以通过组合现有的 `Hook` 来编写属于自己的 `Hook`。

`Hook` 比普通函数更为严格。**只能在组件（或其他 `Hook`）的 顶层 调用**（这是因为 `React Hook` 的实现依赖于 `React` 的内部机制）。如果想在一个条件或循环中使用 `useState`，请提取一个新的组件并在组件内部使用它。

## 八、组件间共享数据

这里介绍的是 `react` 中的 `prop`，不必出现 `prop` 这个字段的显式含义，因为每个`react`组件都是一个函数，`prop` 通过函数传参并接收

```js
export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Counters that update together</h1>
      //父组件中表现
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}
```

还有一种特殊的方式，在React中，通过**将一个组件放置在另一个组件的标签内部**，我们可以创建一种**父子关系**。这种关系使得父级组件能够访问、操作和控制其子级组件，并将其嵌入到自己的渲染结构中。

```js
// 解构写法：({children})
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}

function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title"> Welcome </h1>
      <p className="Dialog-message"> Thank you for visiting our spacecraft! </p>
    </FancyBorder>
  );
}
```

这种写法通常运用于**错误边界**。

- 使用React的错误边界机制

  在React中，我们可以使用componentDidCatch生命周期方法来捕获子组件中发生的错误，并将其设置到错误边界组件的状态中。当发生错误时，componentDidCatch方法会被调用，并且可以接收到错误信息作为参数。在该方法内部，我们可以将hasError设置为true来表示发生了错误。

  ```js
  class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }

    componentDidCatch(error, errorInfo) {
      // 可以在这里记录或处理错误信息
      this.setState({ hasError: true });
    }

    render() {
      if (this.state.hasError) {
        return <div>Oops! Something went wrong.</div>;
      }
      return this.props.children;
    }
  }
  ```

- 其他方式来判断是否发生了错误

  ```js
  function checkForErrors() {
    // 假设这里是你自定义的逻辑判断
    const errorOccurred = // 根据某些条件判断是否发生了错误
    return errorOccurred;
  }

  function ErrorBoundary({ children }) {
    const hasError = checkForErrors(); // 调用 checkForErrors 函数来判断是否发生了错误
    if (hasError) {
      return <div>Oops! Something went wrong.</div>;
    }
    return children;
  }
  ```

不管错误边界是如何实现的，使用的时候如下：

```js
<ErrorBoundary>
  <Router>
    <Screen />
  </Router>
</ErrorBoundary>
```

## 九、特殊标签

1、Helmet标签

有时，需要动态修改页面的`<head>`中的标签，如修改标题`<title>、<link> <meta>`等时，可以用这个实现

<mark>通常用于修改路由页面的页签标题</mark>

```js
import { Helmet } from 'react-helmet';

const comp = () => {
  return (
    <>
      <Helmet>
        <title>这是页面的标题</title>
      </Helmet>
    </>
  );
};
```

2、Fragment标签

即`<>...</>`语法糖

## 十、react中的ts

### 1、React.FC

通过使用 FC 来定义函数组件类型，则组件 `props` 类型的设置就会被自动识别和定义。

```js
interface IProps {
  name: string;
}

const App: React.FC<IProps> = ({ name }) => {
  return (
    <div className="App">
      <h1>hello world</h1>
      <h2>{name}</h2>
    </div>
  );
};

export default App;
```

```js
//子组件中表现（这里可以优化改成ts的形式）
function MyButton({ count, onClick }) {
  return <button onClick={onClick}>Clicked {count} times</button>;
}
```

### 2、eslint报错

有的项目不会每次都引入React,能跑起来,但eslint会报错，以下是不引入的解决方法：

在React@17以后，是不需要再手动去引入React的。因为该版本之后加入了`react/jsx-runtime`，会自动对JSX进行解析。

现在报错，就是因为eslint中的extends中没有加入这个runtime

```js
// .eslintrc.js
module.exports = {
  // ...
  extends: [
    // 加上这一条
    'plugin:react/jsx-runtime',
  ],
  // ...
};
```

## 十一、受控组件和非受控组件

在 React 中，表单元素有两种方式来管理状态：受控组件和非受控组件。

- 受控组件是指表单输入元素的值由 React 组件的状态（state）控制。也就是说，表单的数据被存储在组件的状态中，并且任何对表单元素值的更改都要通过状态更新来实现。

- 非受控组件是指表单输入元素的值由 DOM 自身处理，React 通过 ref 属性来获取其值。非受控组件往往在不需要频繁与 React 组件状态同步的情况下使用。

## 十二、React18的自动批处理

“批处理” 是 React 的一种性能优化机制：当多次状态更新（如连续调用setState、useState更新函数）在 “**同一事件循环**” 中触发时，React 会将这些更新合并为一次重新渲染，避免多次渲染带来的性能开销。

在 React 18 之前，“**状态更新批处理**” 仅在 React 自身触发的事件（如onClick、onChange）中生效，而在setTimeout、Promise.then或原生事件中，状态更新会触发多次渲染，导致性能浪费。

React 18 的自动批处理（Automatic Batching） 彻底解决了这个问题 —— 无论状态更新在什么场景触发，都能自动合并为一次渲染，大幅优化性能。

```js
// React 17/18 中，在onClick（React事件）内的状态更新会被批处理
function Counter() {
  const [count, setCount] = useState(0);

  const [name, setName] = useState('React');

  const handleClick = () => {
    // 连续触发2次状态更新

    setCount(count + 1);

    setName('React 18');

    // React会合并为1次渲染，而不是2次
  };

  console.log('组件渲染了'); // 点击按钮后，仅打印1次

  return (
    <div>
      <p>Count: {count}</p>

      <p>Name: {name}</p>

      <button onClick={handleClick}>更新</button>
    </div>
  );
}
```

<mark>React 17 的痛点：批处理 “不彻底”</mark>

```js
// React 17 中，setTimeout内的状态更新不会被批处理

function Counter() {
  const [count, setCount] = useState(0);

  const [name, setName] = useState('React');

  const handleClick = () => {
    setTimeout(() => {
      // 连续触发2次状态更新，但React 17不会批处理

      setCount(count + 1);

      setName('React 17');

      // React 17会触发2次渲染，打印2次“组件渲染了”
    }, 1000);
  };

  console.log('组件渲染了');

  return (
    <div>
      <p>Count: {count}</p>

      <p>Name: {name}</p>

      <button onClick={handleClick}>更新</button>
    </div>
  );
}
```

React 18 通过 “自动批处理” 解决了上述痛点：无论状态更新在什么场景触发（React 事件、setTimeout、Promise.then、原生事件等），都能自动合并为一次渲染，实现了 “全场景批处理”。

将上面的案例放到 React 18 中运行：

```js
// React 18 中，setTimeout内的状态更新会被自动批处理

function Counter() {
  const [count, setCount] = useState(0);

  const [name, setName] = useState('React');

  const handleClick = () => {
    setTimeout(() => {
      setCount(count + 1);

      setName('React 18');

      // React 18会合并为1次渲染，仅打印1次“组件渲染了”
    }, 1000);
  };

  // React 18 运行结果：点击按钮 1 秒后，“组件渲染了” 仅打印 1 次，性能大幅优化。
  console.log('组件渲染了');

  return (
    <div>
      <p>Count: {count}</p>

      <p>Name: {name}</p>

      <button onClick={handleClick}>更新</button>
    </div>
  );
}
```

### flushsync

automatic batching是默认开启的，当然如果你不想进行batch update，也可以使用react-dom提供的flushSync方法（但react官方不建议这么做）

flushSync 允许你强制 React 在提供的回调函数内同步刷新任何更新，这将确保 DOM 立即更新。(大多数时候都不需要使用 flushSync，请将其作为最后的手段使用。)

```js
import { flushSync } from 'react-dom';

function handleClick() {
  flushSync(() => {
    // react has updated the DOM by now
    setCount((count) => count + 1);
  });
  flushSync(() => {
    // react has updated the DOM by now
    setCount((f) => !f);
  });
}
```

> [React v18.0](https://zh-hans.react.dev/blog/2022/03/29/react-v18)[React 18 新特性实战：自动批处理（Automatic Batching）怎么用？](https://blog.csdn.net/devr_ChangJin/article/details/151047445)

## 十三、react的渲染调度

渲染调度所有版本都有，但只有React 18实现了真正的并发可中断调度。

- React 16：引入了Fiber架构，将渲染拆分为**链表结构**的**可中断单元**，为并发调度准备好了数据结构，但默认还是同步渲染

- React 18：基于**Fiber**实现了真正的并发调度，通过时间切片（每5ms检查中断）和优先级车道，让渲染可以被高优先级任务（如用户输入）中断

<mark>这里我们只讲react18的渲染调度</mark>

"React的渲染调度是一个从触发更新到屏幕呈现的完整协调过程，主要包括三个阶段：

- 调度阶段：React接收更新请求，根据优先级（React 18的车道模型）将更新排入队列

- 协调阶段：通过Fiber架构的增量渲染，执行虚拟DOM的diff比较，这个阶段可以被中断（时间切片）

- 提交阶段：将确定的变更一次性同步到真实DOM，这个阶段不可中断

这种设计让React 18能实现并发渲染：在高优先级任务（如用户输入）到来时，中断低优先级渲染，保持界面响应性。

## 十四、Fiber架构

"Fiber是React16引入的新的**协调算法**，它重新实现了虚拟DOM的diff过程。核心是引入了**可中断渲染**的能力，为React18的**并发模式**打下了基础。"

我理解它主要做了三件事：

- 它把原本**递归不可中断**的渲染，改成了**链表可中断**的渲染。
- **引入优先级**：可以优先渲染高优先级的更新任务。
- **时间切片**：把渲染工作切成5ms的小块，每做完一块就检查有没有更高优先级任务。

实际开发中，React 18的`useTransitions()`能让界面保持流畅，底层就是Fiber在调度

### 链表结构的理解

每个组件对应一个Fiber节点，节点间通过三个指针连接：

- child指向**第一个子组件**

- sibling指向**下一个兄弟组件**

- return指向**父组件**

```bash
// Fiber是树转成的链表，有三条移动路径：
// 1. 向下：child（进入子树）
// 2. 向右：sibling（同层下一个）
// 3. 向上：return（回到父层）

// 结构示意（树形）：
//      A
//     / \
//    B   E
//   / \   \
//  C   D   F

// 链表连接方式：
A.child = B
B.return = A
B.sibling = E
B.child = C
C.return = B
C.sibling = D
D.return = B
E.return = A
E.child = F
F.return = E
```

这样整个组件树就变成了一个链表，遍历时就是沿着指针走。

关键优势是：遍历到一半时，我知道下一个该处理谁，也能轻松回到之前的位置。不像递归，中途暂停了很难恢复现场。

## 一、组件

`React`是`SPA`（`single page application`单页应用）

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

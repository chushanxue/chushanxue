### 一、概念

组件的函数写法必须是**纯函数**，不能包含**状态**，也不支持**生命周期方法**

纯函数是指在相同输入（参数）下，总是能产生相同输出（返回值）且不会有任何副作用的函数。它只依赖于传入的参数及其内部实现，不受外部环境影响。

```js
// 纯函数
function sum(a, b) {
  return a + b;
}

// 非纯函数
Math.random();
```

`React Hooks` 的意思是，组件尽量写成纯函数，如果需要外部功能和副作用，就用钩子把外部代码"钩"进来。`React Hooks` 就是那些钩子。

注：在使用它时需要遵循两条规则：

- 只在最顶层使用 Hook

  不要在循环，条件或嵌套函数中调用 Hook， 确保总是在你的 React 函数的最顶层以及任何 return 之前调用他们。遵守这条规则，你就能确保 Hook 在每一次渲染中都按照同样的顺序被调用。

- 只在 React 函数中调用 Hook

  不要在普通的 JavaScript 函数中调用 Hook。你可以：

  - ✅ 在 React 的函数组件中调用 Hook
  - ✅ 在自定义 Hook 中调用其他 Hook

  遵循此规则，确保组件的状态逻辑在代码中清晰可见。

### 二、常用内置 `hook`

#### 1、状态钩子

- useState

  - 第一个坑：同时执行多次【同一个setState】

    ```js
    const [state, setState] = useState(initialState);

    setState(state+1) ×  //循环时只会成功执行一次，state里的值变为initialState+1，但之后里面的state的值就一直不变，并不会继续累加

    （因为 setState的操作是异步的，且数据没有实现双向绑定，修改后的state不会同步生效，页面加载时，大家同时拿到state的值（你可以理解为拿到的不是state，而是表达式），也就是 initialState，同时计算好state+1的值，然后等着自己执行，执行时操作的值其实是一样的，所以效果就是只有一个执行成功了）

    setState(prev=>prev+1) √  //若要解决上述问题，请采用updater function去更新值，因为updater function始终能拿到最新的prev

    （因为你正在使用旧状态来计算新状态，所以这种方法可以确保每次更新都基于最新的状态。）
    ```

    当然了，如果你只需要执行一次，使用第一种是没有问题的，当你不确定能不能更新成功时，请始终使用updater function去更新值。

  - 第二个坑：更新对象时的覆盖问题

    ```js
    <!-- 失去其他属性值 -->
    setPagination({
      total: res.total,
      current: res.current,
      pageSize: res.size,
    });

    <!-- 保留其他属性值，只更新需要的属性值（如果新状态的更新需要依赖旧状态，此种写法不适用） -->
    setPagination({
      ...prevPagination,
      total: res.total,
      current: res.current,
      pageSize: res.size,
    });

    <!-- 同上，效果一样，更为推荐，基本不会出错 -->
    setPagination((prevPagination) => ({
      ...prevPagination,
      total: res.total,
      current: res.current,
      pageSize: res.size,
    }));
    ```

  - 第三个坑：组件重新渲染问题

    当更新useState变量时，实际上不用useEffect钩子就能在组件内部监听到变化，原因是useState的变化会导致组件重新渲染

    当更新useState变量时，如果是基本模型（number/string/boolean），只要值不变，就不会导致组件重新渲染

    但更新对象始终会导致重新渲染，这是因为对象是**通过引用去更新**的，基本类型是**通过值去更新**的

    > 在JavaScript中，当你创建一个新的对象或数组，即使它的内容与旧的对象或数组完全相同，它们也是不同的引用。这是因为对象和数组在JavaScript中是引用类型，每次创建都会生成一个新的引用。更新对象时，其实是创建了一个新的对象，重新赋值给原来的变量，所以对象具有相同的内容，但它们是不同的引用。以及，对于旧的引用来说，如果没有其他变量再使用它，那么JavaScript的垃圾回收机制会自动清理掉它。所以不需要担心旧引用会占用额外的内存。

- useReducer

  `useReducer` 是 `useState` 的升级版(实际上应该是原始版)，可以实现复杂逻辑修改，而不是像 `useState` 那样只是直接赋值修改

  **实际上，这个钩子不常用，因为复杂的操作完全可以写在外面，多用几次setState就可以了**

#### 2、上下文钩子

上下文让组件接收来自远方父级的信息，而无需将其作为 props 传递。**实际也不常用，props传递更为常用**

- `useContext()`

  ```js
  // 在组件外部创建Context对象，并导出（一个组件内可以有多个导出）
  export const MyContext = createContext({});

  // 数据对象放在value中，向下传递
  <MyContext.Provider value={{ username: 'superawesome' }}>
    //通信方组件之间共享状态
    <通信方组件 />
    <通信方组件 />
    ......
  </MyContext.Provider>;
  ```

  ```js
  // 子组件需要什么再引入什么
  const { username } = useContext(MyContext);
  ```

#### 3、 `useEffect()`副作用钩子

用于处理组件的**副作用**和**生命周期**方法。它可以在组件**挂载、更新和卸载**时执行一些操作，例如执行网络请求、订阅事件、清理操作等。

`useEffect` 接受一个回调函数和一个可选的依赖项数组`[deps]`。

- 如果依赖项为空数组，那么回调函数只会在组件挂载和卸载时执行一次。
- 如果依赖项中包含某个状态或属性，那么只有在这个状态或属性发生变化时才会执行回调函数。
- 如果依赖项缺省，则组件挂载、组件重新渲染、组件即将被卸载前，每一次都会触发该 useEffect

```js
useEffect(() => {
    //此处编写 组件挂载之后和组件重新渲染之后执行的代码
    ...

    return () => {
        //此处编写 组件即将被卸载前执行的代码
        ...
    }
},[deps])
```

<mark>react的函数式组件本身是没有状态，也没有生命周期的，是用useEffect模拟生命周期函数，所以我们在赋一些不确定的初始值时，最好放到生命周期里</mark>

- 第一个坑：调用时机

  注意useEffect是在**组件渲染成功后**再执行的，所以当我们组件上的值依赖于请求时，不能直接用这个值，我们需要使用可选链，否则会报错

- 第二个坑：闭包

  - 闭包的第一个影响，在定时器

    当setInterval首次运行时，它捕获了那一刻的count值（即0），并且在后续的每个间隔中都会使用这个捕获的值。

    当然了，解决方案：使用函数形式的 setState

    ```js
    const [count, setCount] = useState(0);

    useEffect(() => {
      setInterval(() => {
        console.log('Interval function running...');
        setCount(count + 1); // setCount(0 + 1) 只拿一次count的值，计算好之后就永远不会变
      }, 1000);
    }, []);
    ```

    这里也许不大好理解，用一个更为简单的例子解释闭包：

    ```js
    function printValue() {
      let value = 0;

      setTimeout(() => {
        console.log(value);
      }, 1000);
    }

    value = 1;

    printValue();
    ```

    你可能会期望看到控制台输出 1，因为我们在调用setTimeout之后更改了 value 的值。但实际上，控制台将输出 0。

    这是因为当我们创建setTimeout回调函数时，它形成了一个闭包，并捕获了那一刻的 value 值（即0）。即使后来我们更改了 value 的值，但由于闭包已 经捕获了旧的 value 值，所以当回调函数执行时，它仍然会打印出旧的值。

  - 闭包的另外一个影响，在事件监听，也是一个棘手的点

    ```js
      // 键盘事件与点击事件表现不一致
    useEffect(() => {
      const handleKeyDown = (event: { keyCode: any }) => {
        switch (event.keyCode) {
          case 37: // left arrow key
            pre();
            break;
          default:
            break;
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, []);

    ```

    当在 useEffect 中注册事件处理器时，它捕获了那时存在的 pre 函数。如果后来 pre中引用的变量 改变了，但是没有重新运行这个 useEffect（因为它的依赖数组是空的），那么事件处理器仍然引用着旧的 pre 函数，而这个旧的 pre 函数可能看到的是旧的变量

    解决这个问题的一种方式是将pre 函数以及它所依赖的所有变量都添加到 useEffect 的依赖数组中

    这样，每当pre, 或者它内部引用的变量改变时，都会**重新注册键盘事件处理器**，并使用最新版本的这些值。

#### 4、useRef

`useRef` 是勾住某些组件挂载完成或重新渲染完成后才拥有的某些对象，并返回该对象的引用。

**主动更新 `useRef` 变量的 `.current` 的值并不会触发组件重新渲染。**

改变 `ref` 不会触发重新渲染，所以 `ref` 不适合用于存储期望显示在屏幕上的信息。如有需要，使用 `state` 代替。

- 不触发渲染

  当你想要计算出组件渲染的次数，也许会写出以下的代码，但state一旦改变，就会导致组件重新渲染，也就是说，下面这段代码，实际上是一个死循环

  ```js
  function State() {
    const [rerenderCount, setRerenderCount] = useState(0);

    useEffect(() => {
      setRerenderCount((prevCount) => prevCount + 1);
    });

    return <div>{rerenderCount}</div>;
  }
  ```

  这个时候，useRef便派上用场了：

  ```js
  function Ref() {
    const rerenderCount = useRef(0);

    useEffect(() => {
      rerenderCount.current = rerenderCount.current + 1;
    });

    return <div>{rerenderCount.current}</div>;
  }
  ```

#### 5、useMemo

`useMemo`的目的是“**减少组件重新渲染时不必要的函数计算**”。（不是避免组件重新渲染）

`useMemo`可以将某些函数的计算结果(返回值)挂载到`react`底层原型链上，并返回该函数返回值的索引。当组件重新渲染时，如果`useMemo`依赖的数据变量未发生变化，那么直接使用原型链上保存的该函数计算结果，跳过本次无意义的重新计算，达到提高组件性能的目的。

> “不必要的函数计算”中的函数计算必须是有一定复杂度的，例如需要1000个for循环才能计算出的某个值。如果计算量本身很简单，例如1+2，那完全没有必要使用useMemo，就直接每次重新计算一遍也无所谓。

#### 6、useCallback

要理解这个钩子，首先要明白两个点：

- 组件什么时候会重新渲染

  - 当本身的 `props` 或 `state` 改变时。(部分有必要)
  - `Context value` 改变时，使用该值的组件会 re-render。(部分有必要)
  - 当**父组件重新渲染**时，它所有的子组件都会 re-render，形成一条 re-render 链。(没有必要)

- 什么叫修改
  - 1、用完全不一样的新值去替换之前的旧值 ——> 这会触发react重新渲染 ——> 例如{age:34}去替换{age:18} (部分有必要)
  - 2、用和旧值看似一模一样的新值去替换之前的旧值 ——> 这依然会触发react重新渲染，因为react底层对新旧值做对比时使用的是 Object.is判断，字面上看似一模一样没有用，react依然会认为这是2个对象，依然会触发react重新渲染 ——> 例如{age:18}去替换{age:18} (没有必要)
  - 3、用旧值的**引用**去替换旧值 ——> 这次就不会触发重新渲染 ——> 例如let obj={age:18}; let obj2=obj，用obj2去替换obj

> react的性能优化与memoization离不开，因为太多因素会导致react的重新渲染，这会加重浏览器的负担，影响软件性能

- 针对<mark>父组件重新渲染带动所有子组件重新渲染</mark>的情况，我们可以使用React.memo()（一个高阶组件）

  React.memo()的使用方法很简单，就是把要导出的函数组件包裹在React.memo中即可。

  原理是通过比较**props和state**中前后两次的值，如果完全相等则跳过本次渲染，改为直接使用上一次渲染结果，以此提高性能提升。

  此处有坑⚠️：React.memo()只会帮我们做浅层对比

- 针对<mark>用和旧值看似一模一样的新值去替换之前的旧值</mark>

  useCallback可以将组件的某些处理函数挂载到react底层原型链上，并返回该处理函数的引用，当组件每次即将要重新渲染时，确保props中该处理函数为同一函数(因为是同一对象引用，所以===运算结果一定为true)，跳过本次无意义的重新渲染，达到提高组件性能的目的。当然前提是该组件在导出时使用了React.memo()。

  ```js
  import Button from './button'; //引入我们自定义的一个组件<Button>，相当于子组件

  //组件内部声明一个age变量
  const [age, setAge] = useState(34);

  //通过useCallback，将鼠标点击处理函数保存到React底层原型链中，并获取该函数的引用，将引用赋值给clickHandler
  const clickHandler = useCallback(() => {
    setAge(age + 1);
  }, [age]);
  //由于该处理函数中使用到了age这个变量，因此useCallback的第2个参数中，需要将age添加进去

  //使用该处理函数，实为使用该处理函数的在React底层原型链上的引用
  return <Button clickHandler={clickHandler}></Button>;
  ```

  如果父组件中只有1个子组件，那其实完全没有必要使用`useCallback`。只有父组件同时有多个子组件时，才有必要去做性能优化，防止某一个子组件引发的重新渲染也导致其他子组件跟着重新渲染。

  实际用到的时候再做补充吧，说多了也是不太懂

### 三、封装自己的 hooks

封装前：

```js
// 直接把代码写在组件里
useEffect(() => {
  document.body.classList.remove('light');
  document.body.classList.remove('dark');
  if (useTheme === 'dark') {
    document.body.classList.add('dark');
  } else if (useTheme === 'light') {
    document.body.classList.add('light');
  }
}, [useTheme]);
```

封装后：

```js
export function useSwitchTheme() {
  const config = useAppConfig();
  useEffect(() => {
    document.body.classList.remove('light');
    document.body.classList.remove('dark');
    if (useTheme === 'dark') {
      document.body.classList.add('dark');
    } else if (useTheme === 'light') {
      document.body.classList.add('light');
    }

    // 拓展：当我们切换主题时，还可以顺便设置网页的元数据，比如<meta name="theme-color">，它通常用于定义网页的主题颜色。这个主题颜色可以影响浏览器工具栏、状态栏、导航栏等界面元素的颜色。通过设置不同主题颜色，可以为用户提供更加个性化和一致性的浏览体验。
    const metaDescriptionDark = document.querySelector(
      'meta[name="theme-color"][media*="dark"]',
    );
    const metaDescriptionLight = document.querySelector(
      'meta[name="theme-color"][media*="light"]',
    );

    if (config.theme === 'auto') {
      metaDescriptionDark?.setAttribute('content', '#151515');
      metaDescriptionLight?.setAttribute('content', '#fafafa');
    } else {
      const themeColor = getCSSVar('--theme-color');
      metaDescriptionDark?.setAttribute('content', themeColor);
      metaDescriptionLight?.setAttribute('content', themeColor);
    }
  }, [config.theme]);
}

// 直接把这段写在组件里
useSwitchTheme();
```

### 四、常用ahooks

#### 1、useRequest

#### 2、useMount

### 五、引用

> [React Hooks 入门教程--阮一峰](https://www.ruanyifeng.com/blog/2019/09/react-hooks.html) [React Hook 学习笔记](https://github.com/puxiao/react-hook-tutorial/blob/master/03%20useState%E9%AB%98%E7%BA%A7%E7%94%A8%E6%B3%95.md) [useRequest- 蚂蚁中台标准请求 Hooks](https://zhuanlan.zhihu.com/p/106796295) [Learn useState In 15 Minutes - React Hooks Explained](https://www.youtube.com/watch?v=O6P86uwfdR0&list=PLZlA0Gpn_vH8EtggFGERCwMY5u5hOjf-h)

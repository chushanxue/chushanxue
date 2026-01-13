### 一、概念

#### 1、纯函数

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

#### 2、React Hooks

`React Hooks` 的意思是，组件尽量写成纯函数，如果需要外部功能和副作用，就用钩子把外部代码"钩"进来。`React Hooks` 就是那些钩子。

注：在使用它时需要遵循两条规则：

- **只在最顶层使用 Hook**（不要在循环，条件或嵌套函数中调用 Hook）

  确保总是在你的 React 函数的最顶层以及任何 return 之前调用他们。遵守这条规则，你就能**确保 Hook 在每一次渲染中都按照同样的顺序被调用。**

- **只在 React 函数中调用 Hook**（不要在普通的 JavaScript 函数中调用 Hook）

  - ✅ 在 React 的函数组件中调用 Hook
  - ✅ 在自定义 Hook 中调用其他 Hook

  遵循此规则，确保组件的状态逻辑在代码中清晰可见。

- ⭐**为什么hook不能写在条件里**（面试常问）

  - 从规则上说，React 要求 Hooks 必须在函数组件的顶层以完全相同的顺序被调用，不能在条件、循环或嵌套函数中调用。否则，React 会在开发环境下直接抛出错误。

  - 从逻辑上要说，需要确保每次组件重新渲染时，React使用相同的顺序来调用 Hooks，从而确保正确地管理组件的状态。

    如果我们将 Hook 放在条件语句中，那么当条件不满足时，这个 Hook 就不会被调用，就会导致后续所有 Hook 的调用顺序整体错位，会引发难以追踪的bug。

  - 从设计目的来看，这条规则确保了只要输入相同，组件输出的行为就相同

#### 3、组件什么时候会重新渲染

- 当 `props`（属性） 、 `state`（状态）、`Context value`（上下文）改变时。
- 当**父组件重新渲染**时，它所有的子组件都会 re-render，形成一条 re-render 链。

#### 4、组件的生命周期

对于函数组件，生命周期包括三个主要阶段：

- 挂载：组件第一次被渲染到DOM中，hooks初始化

- 更新：由于props或state变化，组件函数被重新调用并更新UI

- 卸载：组件从DOM中移除

### 二、常用内置 `hook`

#### 1、useState（用于在函数组件中添加状态管理）

- 注意更新对象时的覆盖问题

  ```js
  <!-- 失去其他属性值 -->
  setPagination({
    total: res.total,
    current: res.current,
    pageSize: res.size,
  });

  <!-- 保留其他属性值，只更新需要的属性值（适用于如果新状态的更新需要依赖旧状态） -->
  setPagination((prevPagination) => ({
    ...prevPagination,
    total: res.total,
    current: res.current,
    pageSize: res.size,
  }));
  ```

- 为什么 state 更新是异步批量的

  首先，state的更新在React控制的事件处理中是异步的，在非React控制的环境（setTimeout、原生事件）中是同步的

  ①性能优化：批量更新减少重渲染次数（批处理可以将多个状态更新合并为一次渲染，大大减少了不必要的重渲染和DOM操作。）

  ②更好的用户体验：避免频繁的UI闪烁（异步批处理能确保在一次任务结束后，给出一个最终稳定的界面状态，视觉上更平滑。）

  在极少数需要基于最新状态立即进行下一步操作的场景（状态更新依赖于之前的状态），如何打破异步限制：可以使用 setState 的回调函数形式 setState(newState, callback)，确保基于最新状态更新，还能避免潜在的异步或闭包问题

- state 和 props有什么区别？

  - props 是外部传递给组件的，且在组件内部不可修改。
  - state 是在组件内被组件自己管理的，在组件内部可以进行修改。

#### 2、useContext（上下文钩子）

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

#### 3、 useEffect（副作用钩子）

用于处理组件的**副作用**和**生命周期**方法。它可以在组件**挂载、更新和卸载**时执行一些操作。

`useEffect` 接受一个回调函数和一个可选的依赖项数组`[deps]`。

- 当传递空数组 [] 时，挂载时执行回调，卸载时执行return里的清理函数
- 当传递依赖数组时，回调在组件挂载和依赖更新时执行，清理函数在组件卸载前执行，同时在每次依赖项变化、新回调执行前，也会先执行上一次的清理函数
- 当依赖项缺省时，回调在组件挂载和每次重新渲染时执行，清理函数在组件卸载和新回调执行前执行

> 注意**重新渲染**不需要挂载和卸载，它是组件已经在页面上，因为**状态**（组件内部管理的数据）或**属性**（父组件传递给子组件的数据）变化导致的更新

```js
useEffect(() => {
  // 在挂载时、重新渲染时执行（回调）

  return () => {
    // 在卸载时、新回调执行前执行（清理函数）
  };
});
```

```js
useEffect(() => {
  // 在挂载时执行（回调）

  return () => {
    // 在卸载时执行（清理函数）
  };
}, []);
```

```js
useEffect(() => {
  // 在挂载、依赖列表变化时执行（回调）

  return () => {
    // 在卸载时、下一次 useEffect 执行前执行（清理函数）
  };
}, [dep1, dep2]);
```

- <mark>空数组适合**初始化请求**，加依赖项适合监听变化触发操作，缺省很少用，容易导致性能问题。</mark>

  注意useEffect是在**组件渲染成功后**再执行的，所以当我们组件上的值依赖于请求时，不能直接用这个值，我们需要使用可选链，否则会报错

- <mark>react的函数式组件本身是没有状态，也没有生命周期的，是用useEffect模拟生命周期函数</mark>

- 闭包问题（例如事件监听器）

  ```js
  const [query, setQuery] = useState('');
  const pre() => {
    console.log(query);//用到了外部变量
  };
    // 键盘事件与点击事件表现不一致
  useEffect(() => {
    const handleKeyDown = (event: { keyCode: any }) => {
      switch (event.keyCode) {
        case 37:
          pre();//如果函数里有用到外部变量，这里获取的是初始的外部变量值
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

  当在 useEffect 中注册事件处理器时，它捕获了pre函数引用的变量，如果该引用变量改变了，但是没有重新运行这个 useEffect（因为它的依赖数组是空的），那么pre 函数看到的仍然是旧的变量

  解决这个问题的一种方式是将pre 函数所依赖的所有变量都添加到 useEffect 的依赖数组中，这样，每当pre内部引用的变量改变时，都会**重新注册键盘事件处理器**，并使用最新版本的这些值。

  另一种方式就是使用usecallback将pre函数包裹起来，再把pre函数本身加到useEffect 的依赖数组中，一旦函数的依赖项改变，useEffect 就会重新运行，从而重新注册键盘事件处理器。（传递pre函数本身这种方案相比起第一种需要添加的依赖项更少，不容易出错，但如果不包裹usecallback的话，容易造成性能问题，一旦组件重新渲染，函数引用就会改变，引发连锁反应）

#### 4、useRef

useRef 创建的是一个**持久化**的可变对象，它在组件的整个生命周期中保持**同一个引用**

**主动更新 `useRef` 变量的 `.current` 的值并不会触发组件重新渲染。**（所以不适合用于存储期望显示在屏幕上的信息。如有需要，使用 `state` 代替。）

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

- useRef和useState的区别

  `useRef` 和 `useState` 的主要区别有三个方面：

  - 渲染触发：`useState` 的值变化会触发组件重新渲染，而 `useRef` 修改 `.current`不会
  - 数据同步性：`useState` 更新是异步的(批处理)，不能立即获取新值；`useRef` 的 `.current` 是同步更新的
  - 存储机制：`useRef` 在组件整个生命周期中保持同一个引用

#### 5、useMemo（缓存计算结果）

`useMemo`的目的是“**减少组件重新渲染时不必要的函数计算**”，继而也可以避免依赖**计算结果**的子组件的重新渲染

`useMemo`可以将某些函数的计算结果(返回值)挂载到`react`底层原型链上，并返回该函数返回值的索引。当组件重新渲染时，如果`useMemo`依赖的数据变量未发生变化，那么直接使用原型链上保存的该函数计算结果，跳过本次无意义的重新计算，达到提高组件性能的目的。

```js
// 昂贵的计算：处理大量数据
const processedData = useMemo(() => {
  console.time('processSalesData');
  const result = salesData
    .filter(
      (sale) => sale.date >= dateRange.start && sale.date <= dateRange.end,
    )
    .map((sale) => ({
      ...sale,
      profit: sale.revenue - sale.cost,
      month: sale.date.getMonth(),
      dayOfWeek: sale.date.getDay(),
    }))
    .sort((a, b) => b.profit - a.profit);

  console.timeEnd('processSalesData');
  return result;
}, [salesData, dateRange]); // 数据或时间范围变化时才重新计算

// 子组件（也可以配合React.memo）
<SalesChart data={processedData} />;
```

#### 6、React.memo

React.memo()的使用方法很简单，就是把要导出的函数组件包裹在React.memo中即可。

原理是通过比较**props和state**中前后两次的值，如果完全相等则跳过本次渲染，改为直接使用上一次渲染结果，以此提高性能提升。

注意⚠️：React.memo()只会帮我们做浅层对比，所以面对以下情况需要useCallback组合拳

```js
function Parent() {
  const [count, setCount] = useState(0);

  // ❌ 没有 useCallback，每次 Parent 渲染都创建新函数
  const handleClick = () => {
    console.log('Clicked:', count);
  };

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>
      {/* Child 仍然会每次重新渲染，因为 onClick 总是新函数 */}
      <Child onClick={handleClick} />
    </div>
  );
}

const Child = React.memo(function Child({ onClick }) {
  console.log('Child rendered!');
  return <button onClick={onClick}>Child Button</button>;
});
```

#### 7、useCallback（缓存函数引用）

- 性能优化组合拳

  ```js
  // 复杂组件优化
  function Dashboard({ userId }) {
    const [data, setData] = useState(null);
    const [filters, setFilters] = useState({});

    // ✅ useCallback + React.memo 组合
    const fetchData = useCallback(async () => {
      const result = await api.fetchUserData(userId, filters);
      setData(result);
    }, [userId, filters]);

    const updateFilters = useCallback((newFilters) => {
      setFilters((prev) => ({ ...prev, ...newFilters }));
    }, []);

    return (
      <div>
        <Filters onUpdate={updateFilters} />
        <DataViewer data={data} onRefresh={fetchData} />
        <UserInfo userId={userId} />
      </div>
    );
  }

  // 每个子组件都使用 React.memo
  const Filters = React.memo(({ onUpdate }) => {
    // 只有 onUpdate 变化时才重渲染
    return <FilterComponent onChange={onUpdate} />;
  });

  const DataViewer = React.memo(({ data, onRefresh }) => {
    // 只有 data 或 onRefresh 变化时才重渲染
    return <div>...</div>;
  });
  ```

- 作为 useEffect 的依赖（useCallback 并不必须和 React.memo 一起使用）

  也就是前面提到的useEffect闭包问题，可以把整个函数放到依赖数组里，但是这样会造成性能问题，所以要包裹useCallback

### 三、封装自己的 hooks

#### 1、通用方法封装

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

#### 2、状态全局共享

组件间通信的方式，也包括**自定义Hook封装状态逻辑实现全局共享**（搭配umi的usemodel/ahooks的useLocalStorageState）

```js
const [id, setId] =
  (useLocalStorageState < string) |
  (undefined >
    ('id',
    {
      defaultValue: '',
    }));
```

```js
const useQA = () => {
  const [talkTime, setTalkTime] = (useState < string) | (null > null);

  return {
    talkTime,
    setTalkTime,
  };
};
// 另一个hook或组件中使用
const { talkTime, setTalkTime } = useModel('useQA');
```

### 四、React 18新hooks

React 18是在22年发布的，现有项目更新到18只需要一行命令`npm install react@18 react-dom@18`

新版本的react api几乎没有什么变化，功能和性能优化都不需要我们更改代码，如果我们什么都不改，应用也是可以照常跑起来的，只是在legacy模式下，console会显示一条警告提示旧的api已经被废弃了：

> Warning: ReactDOM.render() is no longer supported in React 18. Use createRoot() to create a root instead....

这样的状态是不能获取最新功能带来的性能提升的，如果需要应用跑在新架构之上，只需要变动react入口代码：

![ ](/md/react钩子入门/0.png)

> react在新版本没有直接废弃掉旧的render api，一是用户更新会更加丝滑，不会出现更新一款应用就crash的问题，二是为了更方便用户做ab测试。升级react，会自动带来很多性能提升，整体来说很建议升级

#### 1、automatic batching（自动批量state更新，减少渲染次数）

在 React 18 之前，“**状态更新批处理**” 仅在 React 自身触发的事件（如onClick、onChange）中生效，而在setTimeout、Promise.then或原生事件中，状态更新会触发多次渲染，导致性能浪费。

React 18 的自动批处理（Automatic Batching） 彻底解决了这个问题 —— 无论状态更新在什么场景触发，都能自动合并为一次渲染，大幅优化性能。

<mark>具体的代码案例见react文档查漏补缺</mark>

#### 2、flushsync

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

#### 3、⭐⭐⭐cocurrent mode（并发渲染模式）

![ ](/md/react钩子入门/1.png)

之前版本的渲染模型是线性的

### 五、引用

> [React Hooks 入门教程--阮一峰](https://www.ruanyifeng.com/blog/2019/09/react-hooks.html) [React Hook 学习笔记](https://github.com/puxiao/react-hook-tutorial/blob/master/03%20useState%E9%AB%98%E7%BA%A7%E7%94%A8%E6%B3%95.md) [useRequest- 蚂蚁中台标准请求 Hooks](https://zhuanlan.zhihu.com/p/106796295) [Learn useState In 15 Minutes - React Hooks Explained](https://www.youtube.com/watch?v=O6P86uwfdR0&list=PLZlA0Gpn_vH8EtggFGERCwMY5u5hOjf-h) [【骇客说】一次搞懂 React 18 到底更新了什么](https://www.bilibili.com/video/BV1US4y1P7CC/?spm_id_from=333.337.search-card.all.click&vd_source=c108fb8f6c838d5d891d1da802282ab5)[flushSync](https://zh-hans.react.dev/reference/react-dom/flushSync)

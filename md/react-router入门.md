### 一、前言

学习react以来，接触得最多的就是umi框架，umi已集成路由配置，只需要在配置文件中配置路由即可，那么使用最广泛的react-router反而知之甚少，所以系统入门一下react-router

### 二、特性

#### 1、声明式路由定义

`React Router` 并不使用路由表配置路由，而是使用 `React tag` 定义路由，它可以写在任何位置。

- Routes 是 Route 组件的容器组件。它负责检查当前URL位置，并将其与子 Route 组件中指定的路径进行比较，以找到匹配项。
- Route 定义了一个特定的URL路径，并指向在访问该URL路径时应该渲染的组件。
- 请始终将`<Route>`组件放在`<Routes>`组件内部以确保路由功能正常工作。

> 新版本的router 没有 Switch 组件，取而代之的是Routes ，但是在功能上 Routes 是核心的，起到了不可或缺的作用。 老版本的route 可以独立使用，新版本的route 必须配合Routes 使用。

```js
<Router>
  <Routes>
    <Route path={Path.Home} element={<Chat />} />
    <Route path={Path.NewChat} element={<NewChat />} />
    <Route path={Path.Masks} element={<MaskPage />} />
    <Route path={Path.Chat} element={<Chat />} />
    <Route path={Path.Settings} element={<Settings />} />
  </Routes>
</Router>
```

#### 2、动态路由

与动态路由对应的是静态路由，静态路由的路由表是不变的，在项目开始运行时，我们就知道了所有的路由关系

但是 React Router 是在页面 render 时才会被解析。`<Route>` 作为一个组件，没有被渲染时，是访问不到他的路由，所以，路由表是随着组件的渲染而变化增加的。

### 三、React-Router-dom

`react-router-dom`在`react-router`的基础上扩展了可操作`dom`的`api`。

所以安装的时候只要安装 `react-router-dom`

### 引用

> [React Router（上）：入门](https://juejin.cn/post/6976202791903559711)

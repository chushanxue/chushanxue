`global.less` 是一个用于定义全局样式的文件。

通过编写 `global.less` 文件，可以集中管理和定义网站或应用程序的全局样式，以便在整个项目中重复使用。

以下是 `global.less` 可以做的一些事情：

### 一、定义全局变量

可以在 `global.less` 文件中定义一些全局变量，例如颜色、字体、边距等。这样，在整个项目中使用这些变量时，只需修改一处即可实现全局样式的更改。

### 二、定义混合器（Mixins）

混合器是一种可重用的代码块，可以在需要时进行调用。通过在 `global.less` 文件中定义混合器，可以将常用的样式块封装起来，并在整个项目中进行重复使用。

混合就是类似于编程语言中的函数，<mark>拥有函数的特征。</mark>

例：

```less
//定义和使用less方法（如果不加()，那么会被直接编译，不存在“调用”）
.main() {
  height: 100px;
  width: 100px;
}

.box {
  .main; //调用（在调用方法时，在函数没有参数的情况下，带不带()都不影响调用。）
}
```

> 定义函数的时候，需要使用()，从而告诉编译器，这是个方法，那在编译成 css 的时候，main 是不会出现在 css 中，如果没有()，则编译器会把 main 当做是普通代码块，一起编译到 css 中。

使用混合器实现主题切换思路：使用混合器保存全局的颜色变量/其他样式，在切换的时候就是切换混合器

```less
// 亮色模式
.light() {
  --primary: #1890ff;
  --gray: #f9f9f9;
  --white: white;
  --black: rgb(48, 48, 48);
  --font-color: rgb(36, 41, 47);
  --message-max-width: 80%;
  --border-in-light: 1px solid rgb(222, 222, 222);
  --border-in-primary: 1px solid var(--primary);
}
.light {
  .light;
}
```

```js
useEffect(() => {
  document.body.classList.remove('light');
  document.body.classList.remove('dark');

  if (theme === 'dark') {
    document.body.classList.add('dark');
  } else if (theme === 'light') {
    document.body.classList.add('light');
  }
}, [theme]);
```

### 三、定义函数

可以在 `global.less` 文件中编写自己的函数来处理样式计算、转换等操作。

### 四、导入其他样式文件

可以用于导入其他样式文件，例如组件级别的样式文件或其他模块化的样式文件。这样可以实现更好的代码组织和模块化管理。

### 引用

> [Less 从 0 开始：一篇搞定 Less 混合](https://juejin.cn/post/7176058759033126972)

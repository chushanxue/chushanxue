### 一、前言

- 首先，`code review` 的对象不是整个项目，而是距离上一次 `code review` 的新的提交

  <mark>所以，以后每一次的提交一定要规范，一定要有明确的意义</mark>

- 一定、一定要避免过多地讨论业务细节（这是需求评审或需求反讲该干的活）

  `review` 的一般流程

  - 讲讲你的代码逻辑，有没有逻辑漏洞，有没有按照需求进行实现
  - 代码是不是符合规范，有没有非编译 bug 和可能的漏洞
  - 有没有更好的实现，代码是否易于理解、易于维护（技术交流）

  > **编译bug**通常是语法错误、类型错误或其他静态代码分析工具可以检测到的问题。而**非编译bug**可能涉及逻辑错误、运行时异常、并发问题等，这些问题只能在程序运行时才能被发现。**非编译bug**可能导致程序崩溃、产生错误的输出或不符合预期的行为。

- 常用术语
  - 健壮性
  - 兼容性
  - 可维护性

### 二、一般性评审

注意：我们评审别人代码的时候，也可以从以下几个方面去思考提问

- 文件名/变量是否符合团队整体规范

  命名规则：

  - 文件夹命名

    React 组件的文件夹命名都是 大驼峰 + 单数，其他文件夹都是 小驼峰 + **复数**。

  - 文件命名

    文件命名都是 小驼峰，单复数看情形。

  - 方法/变量命名

    - 方法名都是 小驼峰，单复数看情形。
    - 变量名除常量外都是 小驼峰，单复数看情形。
    - 常量名都是 全大写字母 + 下划线分隔，单复数看情形。

  - 样式变量命名
    - 样式变量都是 全小写字母 + 短横线分隔，单复数看情形。

  另：取名不能太过简单，无法表达清晰含义，如`flag` `for(f in files)`，如果命名一个变量还要去用一行注释去表示这个变量是什么，那么这个命名就不是一个很好的命名，

  ```bash
    - const [flag, setFlag] = useState(1); //标志展示哪个列表
    + const [tableType, setTableType] = useState('query');
  ```

  另：取名需要统一风格，如`isxxx` `checkxxx`

  ```bash
  isxxx开头的方法或者变量除了返回一个boolean值以外什么也不要做
  getxxx开头的方法除了返回一个value以外什么也不要做
  ```

  另：如果需要复杂的取名或者冗长的注释才能表达清楚代码含义，说明代码有待拆分

  ```js
  async function procureFreeMachineAndSetUpTheDockerWorkerThenStartExecutingTheJob (
  machineType, machineRegion,
  workerDockerImage, workerSetupCmd,
  jobDescription
  ) {
  ...
  }
  ```

  ```js
  async function procureFreeMachine (type, region) { ... }
  async function setUpDockerWorker (machineId, dockerImage, setupCmd) { ... }
  async function startExecutingJob (workerId, jobDescription) { ... }
  ```

- 代码是否容易调试

  <mark>Q:这段代码非常复杂，是否容易调试？</mark>

  ```bash
  一段console.log走天下（不是

  1、代码中调试：console/debugger命令
  Console 对象提供了浏览器控制台调试的接口。
  不仅仅提供了log、info、error等我们熟悉的接口，还提供了time、timeEnd、clear等24个丰富的接口。

  2、浏览器(Chrome)调试
  需要注意的是也可以给js打断点

  其实最重要的是思路需要清晰，如果说你连自己要做的功能，逻辑还没理清楚的话，编写的代码质量不会高，同时调试性能也会随着下降。

  ```

- 组件销毁是否删除了监听器

  ```bash
    事件监听器、定时器...（避免内存泄漏和其他未预期的问题）
  ```

- 代码是否容易理解（避免使用反直觉的编码）
- 函数/类/组件是否太长，函数或类是否有太多责任

  ```bash
    封装，注意入参与出参，捋顺逻辑

    一个方法只做一件事情，代码控制在最小单位内，这样不仅便于阅读、也便于测试
  ```

- 部分代码是否重复多次

  ```bash
  还是封装
  ```

- 无写死数据(hardcoded)，使用常量(const)

  ```js
  这种写法不推荐，因为一眼看不出10的含义
  if (code === 10) {
  }

  使用常量，修改更方便，且能通过常量的名字看出含义
  const status = 10;
  if (code === status) {
  }
  ```

- 一个页面中没有太多变量

  多用对象把变量整合起来

- 注释是否同步更新

  更新代码时有时会忘了更新注释，这样会导致理解出现偏差

  另：去除无意义注释/废弃代码注释

  另：注释风格也应统一

### 三、第三方库相关

- 是否从 npm 删除未使用的安装包？

- 代码是否与新技术同步？

- 是否存在幽灵依赖？

  解决方案：使用 `pnpm`

### 引用

> [前端 Code Review](https://juejin.cn/post/6844903913984884750) [某一线前端小组长的 Code Review 分享](https://juejin.cn/post/7052570403029385253#comment)[前端入门 7--代码调试](https://godbasin.github.io/2018/05/13/front-end-7-debug/) [Code Review - JavaScript Interactive Web Page](https://www.youtube.com/watch?v=UphEnjnoxSg) [On the Importance of Naming in Programming](https://wasp-lang.dev/blog/2023/10/12/on-importance-of-naming-in-programming)

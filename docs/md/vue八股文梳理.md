## 一、vue自身

### 1、vue是什么、核心特性

用于构建用户界面的**渐进式**JS 库

核心特性：MVVM、组件化、指令系统

- MVVM
  - Model：模型层，负责处理业务逻辑以及和服务器端进行交互
  - View：视图层：负责将数据模型转化为UI展示出来，可以简单的理解为HTML页面
  - ViewModel：视图模型层，用来连接Model和View，是Model和View之间的通信桥梁
- 组件化
  - 降低整个系统的耦合度
  - 调试方便
  - 提高可维护性
- 指令系统（指令 (Directives) 是带有 v- 前缀的特殊属性作用：当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM，不需要先获取DOM再进行操作）
  - 条件渲染指令 v-if
  - 列表渲染指令v-for
  - 属性绑定指令v-bind
  - 事件绑定指令v-on
  - 双向数据绑定指令v-model

### 2、如何理解渐进式

Vue 的设计非常注重**灵活性**和**可以被逐步集成**

用你想用或者能用的功能特性，你不想用的部分功能可以先不用。vue不强求你一次性接受并使用它的全部功能特性。

### 3、Vue3和Vue2的区别

首先，讲下升级后vue3的优点：

- 首次渲染更快
- diff 算法更快
- 内存占用更少
- 打包体积更小
- 更好的 Typescript 支持
- Composition API

更具体的不同点：

- 生命周期
- 组合式api
- setup函数
- 响应式原理
- reactive函数和ref函数
- hooks

### 4、vue和react的区别

- 相同点
  - 都有组件化思想
  - 都有虚拟dom
  - 都是数据驱动视图
- 区别

  - 数据流向的不同。react从诞生开始就推崇单向数据流，而Vue是双向数据流
  - 数据变化的实现原理不同。react使用的是不可变数据，而Vue使用的是可变的数据

    > 在 React 中，当组件的状态（state）需要更新时，我们通常会创建一个新的状态对象，而不是直接修改当前的状态对象。这样做可以提高应用性能。因为 React 可以通过简单地比较两个状态对象是否引用同一个对象来判断状态是否改变，从而决定是否需要重新渲染组件

    > 在 Vue 中，我们通常会直接修改组件的数据（data）。Vue 通过使用 "响应式系统" 跟踪每个数据对象的依赖关系，当数据改变时，Vue 会自动更新相关联的 DOM。虽然这种方式在某些情况下可能会导致性能问题，但它使得代码更加直观和易于理解。

  - 组件化通信的不同。react中我们通过使用回调函数来进行通信的，而Vue中子组件向父组件传递消息有两种方式：事件和回调函数

    > React 通过回调函数进行通信：在 React 中，父组件通过 props 将回调函数传递给子组件，子组件通过调用这个回调函数来向父组件传递数据或者触发某些操作。这种方式被称为 "向下数据流" 或 "单向数据流"，因为数据和操作只能从父组件流向子组件。

    > Vue 子组件向父组件传递消息有两种方式：事件和回调函数：在 Vue 中，子组件可以使用 $emit 方法来触发一个事件，并将数据作为事件的参数传递出去。父组件可以监听这个事件并在事件处理器中接收到这个数据。此外，Vue 也支持通过 props 传递回调函数的方式进行通信，类似于 React。

  - diff算法不同。react主要使用diff队列保存需要更新哪些DOM，得到patch树，再统一操作批量更新DOM。Vue 使用双向指针，边对比，边更新DOM

### 5、SPA单页应用

SPA通过**动态重写**当前页面来与用户交互，这种方法避免了页面之间切换打断用户体验

在单页应用中，所有必要的代码（HTML、JavaScript和CSS）都通过单个页面的加载而检索，或者根据需要（通常是为响应用户操作）动态装载适当的资源并添加到页面

页面在任何时间点都不会重新加载，也不会将控制转移到其他页面

举个例子来讲就是一个杯子，早上装的牛奶，中午装的是开水，晚上装的是茶，我们发现，变的始终是杯子里的内容，而杯子始终是那个杯子

> 如何给SPA做SEO？SSR服务端渲染（将组件或页面通过服务器生成html，再返回给浏览器，如nuxt.js）

## 二、vue核心

### 1、vue的双向绑定的原理是什么？

首先解释下vue的双向绑定：即**数据**与**视图**的**响应式设计**。具体表现为：View的改变能实时让Model发生变化，而Model的变化也能实时更新View。

双向绑定 = 单向绑定 + 事件监听

```js
<input v-model="xxx">

//上面的代码等价于

<input :value="xxx" @input="xxx = $event.target.value">
```

更底层一点：

- Vue2的响应式是用Object.defineProperty实现的，它会遍历data里的对象属性，给每个属性添加getter和setter，这样就能监听属性的读取和修改了。
- Vue3则改用Proxy代理整个对象，不再需要遍历每个属性。Proxy能直接监听对象的新增、删除属性，以及数组的索引、长度变化，天然解决了Vue2的那些局限。

### 2、为什么data属性是一个函数而不是一个对象？

先说结论：**防止数据在多个实例之间共享**

函数能够返回一个全新的data，使每个实例对象的数据不会受到其他实例对象数据的污染

如果data采用对象形式，多个实例对象之间的data会共用同一个内存地址，产生数据污染

### 3、vue的生命周期

Vue组件实例在创建时要经历一系列的初始化步骤，在此过程中Vue会在合适的时机，调用特定的函数，从而让开发者有机会在特定阶段运行自己的代码，这些特定的函数统称为：生命周期钩子（也会叫生命周期函数）

生命周期整体分为四个阶段，分别是：创建、挂载、更新、销毁，每个阶段都有两个钩子，一前一后。

- Vue2里的beforeCreate和created，在Vue3里被setup函数替代了，因为setup在实例创建前就执行，相当于把这两个钩子合并了。

- 然后是挂载阶段，Vue2的beforeMount对应Vue3的onBeforeMount，mounted对应onMounted，这是最常用的，像获取DOM、调用接口都可以放在这里。

- 更新阶段，Vue2的beforeUpdate和updated，在Vue3里就是onBeforeUpdate和onUpdated。

- 卸载阶段，Vue2的beforeDestroy和destroyed，Vue3改成了onBeforeUnmount和onUnmounted，主要用来清理定时器、取消接口请求这些操作。

```vue
<template>
  <div class="Vue3-demo">
    <h2>当前求和为：{{ sum }}</h2>
    <button @click="changeSum">sum+1</button>
  </div>
</template>

<!-- vue3写法 -->
<script lang="ts" setup name="Person">
import {
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from 'vue';

// 数据
let sum = ref(0);
// 方法
function changeSum() {
  sum.value += 1;
}
console.log('setup');

// 生命周期钩子
onBeforeMount(() => {
  console.log('挂载之前');
});
onMounted(() => {
  console.log('挂载完毕');
});
onBeforeUpdate(() => {
  console.log('更新之前');
});
onUpdated(() => {
  console.log('更新完毕');
});
onBeforeUnmount(() => {
  console.log('卸载之前');
});
onUnmounted(() => {
  console.log('卸载完毕');
});
</script>
```

```vue
<template>
  <div>{{ name }}</div>
</template>
<script>
<!-- vue2写法 -->
export default {
    data(){
        return {
            name:'Vue 2 生命周期'
        }
    },
    methods:{
        onChangeName(){
            this.name = "测试生命周期更新"
        }
    },
    beforeCreate(){
        console.log('创建前');
    },
    created(){
        console.log('创建完毕');
    },
    beforeMount(){
        console.log('挂载前');
    },
    mounted(){
        console.log('挂载完毕');
    },
    beforeUpdate(){
        console.log('更新前');
    },
    updated(){
        console.log('更新完毕');
    },
    beforeDestroy(){
        console.log('销毁前');
    },
    destroyed(){
        console.log('销毁完毕');
    }
}
</script>
```

### 4、this指向问题

vue2中的this指向当前组件的实例代理。vue3主要使用的是组合式API，但它也兼容vue2的选项式API，所以如果使用的是选项式API，那么vue3中的this指向的就是当前组件的实例代理；如果是组合式API，在setup()函数内部的this的值是undefined，所以不再使用this，而是用ref、reactive等函数定义响应式数据。

### 5、ref和reactive的区别

### 6、vue中的key原理

<mark>注意：主要是节点的识别和跟踪</mark>

在 Vue 中，key 是用于帮助 Vue**识别和跟踪**虚拟 DOM 的变化的特殊属性。当 Vue 更新渲染真实 DOM 时，它使用 key 属性来比较新旧节点，并尽可能地复用已存在的真实 DOM 节点，以提高性能。

Vue 在进行虚拟 DOM 的 diff 算法时，会使用 key 来匹配新旧节点，以确定节点的更新、移动或删除。它**通过 key 属性来判断两个节点是否代表相同的实体**，而不仅仅是根据它们的内容是否相同。这样可以保留节点的状态和避免不必要的 DOM 操作。

> 使用 key 可以提供更准确的节点识别和跟踪，避免出现一些常见的问题，比如在**列表中重新排序时导致的元素闪烁、输入框内容丢失**等。key 必须是唯一且稳定的，最好使用具有唯一标识的值，例如使用数据的唯一 ID。同时，不推荐使用随机数作为 key，因为在每次更新时都会生成新的 key，导致所有节点都重新渲染，无法复用已有的节点，降低性能。

## 三、vue应用

### 1、组件间通信的方法

- props，父组件向子组件传递数据

  父传子主要用props，子组件用defineProps来接收父组件传递的参数，可以指定参数类型和默认值，父组件在使用子组件时，通过属性绑定的方式把数据传过去。

- $emit，子组件触发父组件的事件

  子传父用自定义事件，子组件用defineEmits定义要触发的事件，然后通过emit触发事件并传递数据，父组件在使用子组件时，通过监听事件来接收数据并处理。

  ```js
  <!-- 子组件 -->
  <template>
    <button @click="sendMessage">发送消息给父组件</button>
  </template>

  <script setup>
  // 定义要触发的事件
  const emit = defineEmits(['message', 'update']);

  const sendMessage = () => {
    // 触发事件并传递数据
    emit('message', 'Hello from child!');
    emit('update', { count: 1, data: 'test' });
  };
  </script>
  ```

  ```js
  <!-- 父组件 -->
  <template>
    <Child
      @message="handleMessage"
      @update="handleUpdate"
    />

    <div>收到的消息: {{ receivedMsg }}</div>
    <div>数量: {{ count }}</div>
  </template>

  <script setup>
  import { ref } from 'vue'
  import Child from './Child.vue'

  const receivedMsg = ref('')
  const count = ref(0)

  // 监听子组件事件
  const handleMessage = (msg) => {
    receivedMsg.value = msg
  }

  const handleUpdate = (data) => {
    count.value = data.count
    console.log('收到数据:', data)
  }
  </script>
  ```

- ref 和 defineExpose，父组件使用子组件的事件和数据
- provide 和 inject，父组件向所有子组件传递方法
- pinia，状态管理库
- mitt，事件总线（注意全局用一个事件总线，不要多次定义，不然事件没有注册到同一个总线上，使用的时候会出错）

### 2、vue3中怎么设置全局变量

- 使用 provide 和 inject

  vue3新的 provide/inject 功能可以穿透多层组件，实现数据从父组件传递到子组件。

  可以将全局变量放在根组件的 provide 中，这样所有的组件都能使用到这个变量。

  如果需要变量是响应式的，就需要在 provide 的时候使用 ref 或者 reactive 包装变量。

- pinia，状态管理库
- config.globalProperties 全局属性

### 3、vue3中如何获取DOM

在 setup 函数里没有this，所以不能用this.$refs来获取DOM，需要用ref(null)的方式，先在模板里给DOM元素绑定ref，然后在setup里定义对应的ref变量，在onMounted钩子里面通过变量.value就能访问到DOM。

### 4、数据丢失响应式

关于响应式数据，有个小坑需要注意，用reactive定义的对象，如果直接给对象赋值一个新的对象，会丢失响应式，这时候可以用Object.assign来合并新对象，或者直接用ref来包裹对象。

```js
import { reactive, watch } from 'vue';

const state = reactive({
  user: {
    name: '张三',
    age: 25,
  },
});

// 添加一个监听器
watch(
  () => state.user,
  (newVal) => {
    console.log('用户信息变化:', newVal);
  },
  { deep: true },
);

// ✅ 正常修改属性 - 保持响应式
state.user.name = '李四'; // 触发 watch

// ❌ 直接赋值新对象 - 丢失响应式
state.user = {
  name: '王五',
  age: 30,
};
// 这里虽然赋值了，但 watch 不会触发！
// 因为 state.user 现在指向了一个普通的对象，不是响应式的

// -------------------------------------------
// ✅ 解决方案1：使用 Object.assign
Object.assign(state.user, {
  name: '赵六',
  age: 40,
});
// 或者
// Object.assign(state.user, { name: '赵六' });
// Object.assign(state.user, { age: 40 });

// -------------------------------------------
// ✅ 使用 ref 替代 reactive
const state = ref({
  user: { name: '张三', age: 25 },
});
// 可以重新赋值整个对象
state.value.user = {
  name: '李四',
  age: 30,
};
// 仍然保持响应式

// 访问时需要 .value
console.log(state.value.user.name);
```

### 5、第三方库的全量引入和按需引入

- 全量引入通过npm安装组件库后，在项目入口文件（比如main.ts）里，引入组件库的完整样式和核心模块，再用app.use()注册使用。这样一来，组件库里的所有组件都能直接用。
- 按需引入，只加载用到的组件，减少打包体积。又分两种情况，一种是手动按需引入，在需要用组件的地方，单独引入具体的组件和对应的样式，再注册使用。另一种是自动按需引入，需要借助unplugin-vue-components这类插件，在项目的vite或webpack配置文件里配置好插件，它会自动检测项目中用了哪些组件，自动引入对应的代码和样式。使用时直接在模板里写组件标签就行。

## 四、性能优化

- 使用 v-show 替代 v-if：v-show 仅切换 display 属性，而 v-if 会添加和删除 DOM 元素，适用于频繁切换的组件。
- 组件懒加载:利用 Vue 的异步组件加载功能来减少初始加载时间
- 使用 keep-alive 组件可以缓存不活动的组件，避免不必要的重新渲染。
- 避免不必要的重渲染：通过 computed 属性避免不必要的组件更新。（computed 具有缓存机制和依赖追踪，只有在其依赖的响应式数据发生变化时才会重新计算，否则直接返回缓存值。）
- 减少计算量：使用 computed 代替 methods：computed 是基于依赖的缓存计算结果，而 methods 每次调用都会重新计算。
- 使用 v-for 的 key：为 v-for 循环的元素提供唯一的 key，提升渲染性能。
- 在组件销毁时，确保清理所有事件监听器和定时器，避免内存泄漏。
- 精简依赖：仅引入必要的第三方库，减少包体积，提升加载速度。
- 优化图片和资源：使用合适的图片格式和大小，启用 gzip 压缩传输资源，减少带宽消耗。

## 引用

> [web前端面试 - 面试官系列](https://vue3js.cn/interview/vue/vue.html#%E4%B8%80%E3%80%81%E4%BB%8E%E5%8E%86%E5%8F%B2%E8%AF%B4%E8%B5%B7)[Vue3和Vue2的区别](https://juejin.cn/post/7260748045309837349?searchId=202403232132412975BD815EE0FCBD2D39)[Vue3组件通信的7种方法，值得收藏！](https://juejin.cn/post/7280430881965080630#heading-6)

![pinia](https://pinia.vuejs.org/logo.svg)

### 一、概念

[pinia 官方文档](https://pinia.vuejs.org/zh/)

`Pinia` 的目的是设计一个拥有**组合式 API** 的 Vue 状态管理库，允许跨组件或页面共享状态。

与 `Vuex` 相比，`Pinia` 不仅提供了一个更简单的 `API`，也提供了符合组合式 `API` 风格的 `API`，最重要的是，搭配 `TypeScript` 一起使用时有非常可靠的类型推断支持。

使用 `pinia` 之前，我们必须明确一点，即使没有 `pinia`，我们可以也通过一行简单的 `export const state = reactive({})`来共享一个全局状态。用`pinia`的原因是因为`pinia`封装得更完善，处理数据更方便

### 二、在vue3中使用

```js
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.mount('#app');
```

### 三、核心拆解

#### 1、store

`Store` 是用 `defineStore()` 定义的。（注意它是整体）

它的第一个参数要求是一个独一无二的名字（建议以 `use` 开头且以 `Store` 结尾。）

第二个参数可接受两类值：[Setup 函数](https://cn.vuejs.org/api/composition-api-setup.html#basic-usage)或 Option 对象。

可以定义任意多的 `store`，但应该在不同的文件中去定义 `store`

```js
import { defineStore } from 'pinia';

//  `defineStore()` 的返回值的命名是自由的
// 但最好含有 store 的名字，且以 `use` 开头，以 `Store` 结尾。
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useAlertsStore = defineStore('alerts', {
  // 其他配置...
});
```

- Option 对象

  与 Vue 的**选项式API**类似，我们也可以传入一个带有 state、actions 与 getters 属性的 Option 对象

  可以认为 state 是 store 的数据 (data)，getters 是 store 的计算属性 (computed)，而 actions 则是方法 (methods)。

  ```js
  export const useCounterStore = defineStore('counter', {
    state: () => ({ count: 0, name: 'Eduardo' }),
    getters: {
      doubleCount: (state) => state.count * 2,
    },
    actions: {
      increment() {
        this.count++;
      },
    },
  });
  ```

- Setup 函数

  与 Vue **组合式API**的 setup 函数 相似，我们可以传入一个函数，该函数定义了一些响应式属性和方法，并且返回一个带有我们想暴露出去的属性和方法的对象。

  ```js
  export const useCounterStore = defineStore('counter', () => {
    const count = ref(0);
    const name = ref('Eduardo');
    const doubleCount = computed(() => count.value * 2);
    function increment() {
      count.value++;
    }

    return { count, name, doubleCount, increment };
  });
  ```

#### 2、state

`state` 是 `store` 的核心。（使用 `Option` 对象时，`state` 被定义为一个返回初始状态的函数）

但使用`Setup` 函数时，只需使用 ref 定义。（想象一下你在写一个钩子方法，在这个钩子方法中定义了自己的变量）

在组件中，我们可以访问、变更、重置、监听`store`中的`state`

```js
import { defineStore } from 'pinia';

const useStore = defineStore('storeId', {
  // 为了完整类型推理，推荐使用箭头函数
  state: () => {
    return {
      // 所有这些属性都将自动推断出它们的类型
      count: 0,
      name: 'Eduardo',
      isAdmin: true,
      items: [],
      hasChanged: true,
      // 用于初始化空列表
      userList: [] as UserInfo[],
      // 用于尚未加载的数据
      user: null as UserInfo | null,
    };
  },
});
```

- 访问 state

  ```js
  const store = useStore();

  store.count++;
  ```

- 重置 state

  ```js
  const store = useStore();

  store.$reset();
  ```

#### 3、action

`action` 是`store`内的方法，与`state`一样，如果需要它被外界访问，需要写进`return`

在组件中，`action`的调用方法与`state`一样，可以传递参数，像通常意义上的方法一样调用即可。

> 类似 getter，action 也可通过 this 访问整个 store 实例，并支持完整的类型标注(以及自动补全✨)。不同的是，action 可以是异步的，你可以在它们里面 await 调用任何 API，以及其他 action

```js
export const useCounterStore = defineStore('main', {
  state: () => ({
    count: 0,
  }),
  actions: {
    increment() {
      this.count++;
    },
    randomizeCounter() {
      this.count = Math.round(100 * Math.random());
    },
  },
});
```

#### 4、getter

`state` 可以理解为 `store` 的一般属性；`getter` 可以理解为 `store` 的计算属性，不可以向它们传递任何参数

```js
// 在setup函数中定义
const doubleCount = computed(() => count * 2);

// getter在组件中的使用与state并没有什么不同，只是它不能被赋值
const store = useCounterStore();
store.count = 3;
store.doubleCount; // 6
```

> 大多数时候，getter 仅依赖 state。不过，有时它们也可能会使用其他 getter。因此，即使在使用常规函数定义 getter 时，我们也可以通过 this 访问到整个 store 实例，但(在 TypeScript 中)必须定义返回类型。这是为了避免 TypeScript 的已知缺陷，不过这不影响用箭头函数定义的 getter，也不会影响不使用 this 的 getter。

```js
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    // 自动推断出返回类型是一个 number
    doubleCount(state) {
      return state.count * 2
    },
    // 返回类型**必须**明确设置
    doublePlusOne(): number {
      // 整个 store 的 自动补全和类型标注 ✨
      return this.doubleCount + 1
    },
  },
})
```

> Getter 只是幕后的计算属性，所以不可以向它们传递任何参数。不过，你可以从 getter 返回一个函数，该函数可以接受任意参数。请注意，当你这样做时，getter 将不再被缓存。它们只是一个被你调用的函数。

```js
export const useUserListStore = defineStore('userList', {
  getters: {
    getUserById: (state) => {
      return (userId) => state.users.find((user) => user.id === userId);
    },
  },
});
```

并在组件中使用：

```vue
<script setup>
import { useUserListStore } from './store';
const userList = useUserListStore();
const { getUserById } = storeToRefs(userList);
// 请注意，你需要使用 `getUserById.value` 来访问 <script setup> 中的函数
</script>

<template>
  <p>User 2: {{ getUserById(2) }}</p>
</template>
```

#### 5、使用 Store

```vue
<script setup>
import { useCounterStore } from '@/stores/counter';
// 在组件内部的任何地方均可以访问变量 `store` ，此时store实例被创建
const store = useCounterStore();

// ❌ 下面这部分代码不会生效，因为它的响应式被破坏了
const { name, doubleCount } = store;
name; // 将会一直是 "Eduardo" //
doubleCount; // 将会一直是 0 //

// ✅ 而这一部分代码就会维持响应式
// 💡 在这里你也可以直接使用 `store.doubleCount`
const doubleValue = computed(() => store.doubleCount);

// `name` 和 `doubleCount` 都是响应式引用
// 下面的代码同样会提取那些来自插件的属性的响应式引用
// 但是会跳过所有的 action 或者非响应式（非 ref 或者 非 reactive）的属性
const { name, doubleCount } = storeToRefs(store);

// 名为 increment 的 action 可以被解构
const { increment } = store;
</script>
```

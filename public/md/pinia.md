![pinia](https://pinia.vuejs.org/logo.svg)

### 一、概念

[pinia 官方文档](https://pinia.vuejs.org/zh/)

`Pinia` 是 `Vue` 的专属状态管理库，允许跨组件或页面共享状态。

与 `Vuex` 相比，`Pinia` 不仅提供了一个更简单的 `API`，也提供了符合组合式 `API` 风格的 `API`，最重要的是，搭配 `TypeScript` 一起使用时有非常可靠的类型推断支持。

使用 `pinia` 之前，我们必须明确一点，即使没有 `pinia`，我们可以也通过一行简单的 `export const state = reactive({})`来共享一个全局状态。用`pinia`的原因是因为`pinia`封装得更完善，处理数据更方便

### 二、核心拆解

#### 1、store

`Store` 是用 `defineStore()` 定义的。

它的第一个参数要求是一个独一无二的名字（建议以 `use` 开头且以 `Store` 结尾。）

第二个参数可接受两类值：[Setup 函数](https://cn.vuejs.org/api/composition-api-setup.html#basic-usage)或 Option 对象。

```js
    因为setup语法糖的普及，已经对Setup 函数不太熟悉了

    实际上，Setup 函数是vue2升级为vue3最大的变化，大致回忆一下它的模样：

    <button @click="count++">{{ count }}</button>

    export default {
        setup() {
            const count = ref(0)

            // 返回值会暴露给模板和其他的选项式 API 钩子
            return {
                count
            }
        },
    }

    这也解释了为什么Setup Store的最后需要用到return

    在 Setup Store 中：
        ref() 就是 state 属性
        computed() 就是 getters
        function() 就是 actions

    Setup store 比 Option Store 带来了更多的灵活性，但会让 SSR 变得更加复杂


```

可以定义任意多的 `store`，但应该在不同的文件中去定义 `store`

`store` 是一个用 `reactive` 包装的对象，这意味着不需要在 `getters` 后面写 `.value`（就像 `setup` 中的 `props` 一样）

#### 2、state

`state` 是 `store` 的核心。（使用 `Option` 对象时，`state` 被定义为一个返回初始状态的函数）

但使用`Setup` 函数时，只需使用 ref 定义。（想象一下你在写一个钩子方法，在这个钩子方法中定义了自己的变量）

在组件中，我们可以访问、变更、重置、监听`store`中的`state`

```js
import { useTestStore } from '@/stores/test'; //注意文件的取名useTestStore---对应--->test
const store = useTestStore();

// 访问（官网表示这种访问是响应式的，但在实际使用的过程中，无法监听到state的变化）
console.log(store.xxx);

// 监听/响应式访问【推荐】
const xxx = computed(() => store.xxx);

watch(
  () => xxx.value,
  () => {
    console.log(xxx.value);
  },
);

// 其他的访问方法
const { xxx } = store; //破坏了响应式
const { xxx } = storeToRefs(store); //响应式（未尝试过）

// 变更（官网表示这种变更是响应式的，但在实际使用的过程中，并未实现）
store.xxx = 'xxx';

// 响应式变更【推荐】
store.$patch({ xxx: 'xxx' });
```

#### 3、action

`action` 是`store`内的方法，与`state`一样，如果需要它被外界访问，需要写进`return`

在组件中，`action`的调用方法与`state`一样，可以传递参数，像通常意义上的方法一样调用即可。

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

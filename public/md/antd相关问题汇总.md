### 1、父子组件同时修改全局样式

场景：在vue中，一般是把样式写在style标签里，父组件写了:deep(xxx)，同时子组件里也写了:deep(xxx)，这个时候子组件的样式会被父组件覆盖

解决方案：给父组件加一个样式类，:deep(xxx)写在样式类的层级里，而不是直接写在style标签里，就不会影响到子组件了

### 2、table列表多选时，勾选一个全选中了（展开一个父级，所有都展开了）

这是因为所有的元素没有用key或者id区分开，有时候元数据有id或key，但组件中还需要用`rowRey`字段指明是用哪个字段来区分的

参考：https://juejin.cn/post/7090071929247236110

### 3、modal样式修改不成功

解决方法在于理解Modal的挂载位置，并通过在外层包裹自定义div并设置样式来实现

```js
<div ref="addModal" class="add-modal">
    <AModal
      :get-container="() => $refs.addModal as any"
    >
    </AModal>
</div>
```

<mark>注意这里使用的as any会让整个组件高亮失效，之前一直没找到原因，后面大佬说了才恍然大悟，类型也是会影响高亮的,解决方案是不要在html里面定义类型，放到js中</mark>

```css
.add-modal {
  :deep(.ant-modal-body) {
    height: 60vh !important;
    overflow: hidden !important;
    overflow-y: scroll !important;
  }
}
```

参考：https://blog.csdn.net/estrusKing/article/details/121203429

### 4、针对组件禁用键盘事件

不同的组件方案不一样，有的组件提供了keyboard属性,可以直接禁用

```html
<!-- 禁用了esc关闭弹窗事件 -->
<AModal :keyboard="false"> </AModal>
```

有的组件只能通过点击事件禁用，手动让其失去焦点，才不会被键盘控制

```html
<ASwitch
  v-model:checked="checked"
  :autofocus="false"
  @click="
    (_checked, e: any) => {
      console.log('e', e);
      e.target.blur();
      if (e.target.nodeName === 'SPAN') {
        e.target.parentNode.blur();
      }
    }
  "
/>
```

### 5、列表滚动样式

```js
const wrapperEl = (shallowRef < HTMLElement) | (null > null);
const { height: wrapperElHeight } = useElementSize(wrapperEl);
const scrollConfig = computed(() => {
  return {
    y: wrapperElHeight.value - 150,
    x: 1500,
  };
});
```

```html
<ATable :scroll="scrollConfig" />
```

x设置的值适中即可，对于没有长度突出的数据，基本设置好x的值就能完美展示了，针对长度突出的数据，需要单独调整：

```jsx
[
  ...
 {
    title: '数据集名称1',
    dataIndex: 'title',
    // key: 'title',
    customRender: ({ record }: any) => {
      if (record.title) {
        return (
          <a-tooltip title={record.title}>
              {record.title.slice(0, 15)}
              {record.title.length > 15 ? '...' : ''}
          </a-tooltip>
        );
      }
      return EMPTY_TEXT;
    }
  },
  ...]
```

max-content方案其实也可以，（给每个列设置最小宽度，最终宽度会由内容自动撑开）,但是调整起来太费时间了，而且会展示所有的数据，设置的省略也会失效（当然也可以结合上一种方法）

```js
const scrollConfig = computed(() => {
  return {
    y: wrapperElHeight.value - 150,
    x: 'max-content',
  };
});
```

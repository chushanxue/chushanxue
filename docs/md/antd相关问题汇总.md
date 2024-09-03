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

### 一、flex布局

#### 1、最后一个元素贴边

有时候我们需要实现其他元素正常布局，最后一个元素紧靠右侧，此时我们可以利用flex布局，并将最后一个元素设置为`marginLeft: 'auto'`即可

> 在 flex 布局的父元素内，给子元素的 margin 设置为 auto 会让这个子元素被 "推到" 对应的另一边，这在有些应用场景下是非常有用的。比如， 如果一个 flex 布局的元素设置成 margin-left: auto， 那么它就会被 “推到” 最右边。

> 特别的，如果容器内只有一个子元素，我们可以用 margin: auto 来将其水平以及垂直居中。(注意前提是flex)

#### 2、确定了某些元素的宽度，希望余下某一个元素能够撑满剩余的空间

`flex:1 1`

实际上对它已经不陌生了，但每次见到还是不知其含义

<mark>设置了flex: 1 1;的子元素将会灵活地扩大或缩小以适应容器空间</mark>

在Flex布局中，flex属性是flex-grow, flex-shrink和flex-basis的简写。当你设置一个元素的flex: 1 1;，这意味着：

- flex-grow: 这个值设为1，表示当有多余空间时，该元素会根据其值与其他元素的比例来**分配剩余空间**。
- flex-shrink: 这个值设为1，表示当空间不足时，该元素会根据其值与其他元素的比例来**缩小自己的尺寸**。
- flex-basis: 当省略这个值时，默认为0。

### 二、固定布局

#### 1、元素滚动到一定位置后吸顶

这个需求也很常见，某些信息需要长留在页面上

思路：使用absolute+滚动事件监听，当滚动到一定高度时（这个高度需要自己调试，是这个元素离顶部的距离），改变top的值（这个值也需要自己调试）

```js
useEffect(() => {
  const rightCard = document.querySelector('.right-card');
  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (scrollTop > 170) {
      rightCard.style.top = `${scrollTop - 20}px`;
    } else {
      rightCard.style.top = '158px';
    }
  };
  window.addEventListener('scroll', handleScroll);
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []); //注意避免闭包
```

```jsx
<Card
  bordered={false}
  style={{
    width: '29%',
    position: 'absolute',
    right: '10px',
    top: '158px',
  }}
  className="right-card"
>
  .....
</Card>
```

#### 2、元素水平居中

```less
position: absolute;
left: 50%;
transform: translateX(-50%);
```

#### 3、强制英文单词断行

遇到英文字符溢出的情况，大概率是因为英文单词不会按照设定的宽度换行，而遵循一个单词的所有字符必须在一行的原则，这个时候我们就需要强制英文单词断行

```less
word-break: break-all;
```

### 三、监听

```js
const [windowHeight, setWindowHeight] = useState();

useEffect(() => {
  const handleResize = () => {
    setWindowHeight(window.innerHeight);
  };
  window.addEventListener('resize', handleResize);
  // 在组件卸载时移除事件监听器
  return () => window.removeEventListener('resize', handleResize);
}, []); // 空依赖数组表示这个effect只会在组件挂载和卸载时运行

useEffect(() => {

  ....//这里就能写相关业务了

}, [windowHeight]); // window.innerHeight是只读属性，不能直接监听

useMount(() => {
  // 注意赋值时机
  setWindowHeight(window.innerHeight);
});
```

### 引用

> [Everything About Auto in CSS](https://ishadeed.com/article/auto-css/)

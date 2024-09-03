## 一、企业微信反馈页

### 1.参阅

[企业微信开发者文档](https://developer.work.weixin.qq.com/document/path/92455)

[企业微信网页授权登录](https://juejin.cn/post/6968738148226433038#comment)

### 2.需求反讲

需求背景：企微应用**GPT**需要针对每一句回答增加反馈机制，而企微无法在对话框附近增加点赞/点踩按钮，所以采取的方案是在每句回答的后面附上外链（用`<a>`这种标签的文本，会调用企微自己的浏览器）

前端需要做的就是将这个页面写出来，跳转时拿到参数，在用户反馈后调用接口，为方便部署，直接将此页面嵌入原项目，使用**路由**隔离开

### 3.拓展

**GPT**的搭建由企微的管理员添加应用，每次用户输入问题后会去产生一个回调去**调用后端的接口**，接口将 `gpt` 的回答返回给企业微信，仅此而已。

### 4.开发实录

①、后端给的链接格式为`https://xxxxxxxxx?id=xxxxx&requestId=xxxxx`

②、在 `nuxt` 项目中写一个 `feedback` 路由页面，通过`router`拿到参数，并在挂载时请求接口拿到对话内容

③、`fetch` 原生请求拿到的 `body` 为 `ReadableStream`：[解决方案](https://www.jianshu.com/p/2cf7070a2146)

```js
await fetch(url, {
  method: 'get',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((res) => {
    return res.json(); //重点在这里
  })
  .then((res) => {
    talk.query = res.data.query;
    talk.answer = res.data.answer;
    talk.answerId = res.data.answerId;
  });
```

④、`v-html` 里的样式不受控制：[解决方案](https://juejin.cn/post/6844903569334747150)

补充知识：vue组件中的 `style` 如果设置为 `scoped`，那么 `style` 不会应用到 `v-html` 中

```js
<div v-html="md.render(test)" class="md" />

// 使用 deep scoped 来实现对v-html的样式应用
.md >>> a {
  color: #1890ff;
}
```

⑤、部分外部图片具有防盗链，放到浏览器能打开，但渲染不出来：[解决方案](https://blog.csdn.net/tiantang_1986/article/details/83748782)

```js
由于这里是nuxt，没有html文件，meta统一在配置文件中配置
  app: {
    head: {
      title: "OnewoSLM",
      meta: [
        {
          name: "description",
          content: "OnewoSLM",
        },
        // 解决图片防盗链
        {
          name: "referrer",
          content: "no-referrer",
        },
      ],
    },
  },

  ...
```

⑥、拓展：消息中的 a 标签在 PC 端的企微中可以展示，但在手机端就会把整个标签和链接都展示出来

解决方案：href 里面的地址要加引号，并且是转义的。

`href = \'地址'\`

## 二、PC 端页面输入框联想词

### 1.需求反讲

当用户输入一段问题时，如触发联想词，页面出现联想词列表，用户点击某联想词立即发送

### 2.开发实录

antd 组件库有现成的组件，但本项目比较轻量，暂时不需要引入外部组件库，所以直接用[原生标签实现](https://juejin.cn/post/6844903848662794253)，重点在于**高亮词的替换**

DOM 结构

```js
输入框内有内容且能够触发联想词才出现
<ul v-show="messageContent.length > 0 && wsData.associateWords.length > 0">
  <li
    v-for="(item, index) of wsData.newWords"
    :key="index"
    v-html="item"
    @click="sendAssociate(index)"
  />
</ul>
```

```css
ul {
  padding-left: 5px;
  padding-bottom: 5px;
  padding-top: 5px;
  background: #fff;
  border: 1px solid #f2f2f8;
  border-radius: 8px;
}
li {
  padding: 5px;
  color: #868686;
  font-size: 14px;
  cursor: pointer;
}
```

```js
// 高亮词替换
const handleSearch = () => {
  if (wsData.associateWords.length > 0) {
    const regExp = new RegExp(messageContent.value, 'g');
    wsData.newWords = wsData.associateWords.map((word) => {
      return word.replace(
        regExp,
        `<span style="color: #1890FF;">${messageContent.value}</span>`,
      );
    });
  }
};
```

### 3、react的改造

```jsx
<div className={styles['chat-clues-panel-header']}>
  {userInput?.length > 0 && inputClues?.length > 0 ? (
    <List
      size="small"
      dataSource={inputClues}
      renderItem={(item) => (
        <List.Item onClick={() => sendAssociate(item)}>
          <div
            dangerouslySetInnerHTML={{
              __html: item.replace(
                userInput,
                `<span style=" color: #1890ff ">${userInput}</span>`,
              ),
            }}
          />
        </List.Item>
      )}
    />
  ) : (
    ''
  )}
</div>
```

```less
.chat-clues-panel-header {
  :global {
    .ant-list-item {
      padding: 5px;
      cursor: pointer;
    }
  }
}
```

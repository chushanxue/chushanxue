### 一、前言

参照项目：<https://github.com/Yidadaa/ChatGPT-Next-Web>

### 二、记录

#### 1、样式

- 类名采用短横线连接

  对象.类名的另一种写法，这种思想又一次得到了实际应用

  ```html
  <span className={styles['chat-item-count']}>
    12条对话
  </span>
  ```

- 多类名采用模板字符串拼接

- 颜色统一写进全局变量(`global.less`)

  ```css
  定义
  :root {
    --primary: #1890ff;
  }

  使用
   color: var(--primary);
  ```

- 宽度、阴影、与 `border` 都可以写进全局变量
- <mark>css 中，任何属性的命名都应该符合 kebab-case 命名规范<mark>

#### 2、`md` 渲染

- 模拟 `md` 数据时，所有的 `md` 内容都由一个字符串表示，所以要格外注意`\n` 的使用

  ````js

  `这是一段`md`\n```js\n const a=1 \n ``` `

  ````

#### 3、实现滚动到容器底部

- 定义钩子：

  ```js
  import { useCallback, useEffect, useRef } from 'react';

  export function useScrollToBottom() {
    // for auto-scroll
    const scrollRef = useRef < HTMLDivElement > null;
    const scrollToBottom = useCallback(() => {
      const dom = scrollRef.current;
      if (dom) {
        requestAnimationFrame(() => dom.scrollTo(0, dom.scrollHeight));
      }
    }, []);

    // auto scroll
    useEffect(() => {
      scrollToBottom();
    });

    return {
      scrollRef,
      scrollToBottom,
    };
  }
  ```

- 在组件中使用只需将容器标签加上`ref={scrollRef}`即可（原理还未深究）

  ```js
  const { scrollRef } = useScrollToBottom();

  <div className={styles.chat} ref={scrollRef}>
    ...
  </div>;
  ```

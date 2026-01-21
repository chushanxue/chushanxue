### 一、概念

`umi`——可扩展的**企业级**前端应用框架

[umi@max](https://umijs.org/docs/max/introduce)

理想状态：让所有组件降级为`无状态组件`，仅仅依赖 `props`或者`hooks` 渲染。这样 `UI` 层面就不需关心渲染无关的逻辑，专注做 `UI` 渲染。

### 二、目录结构

#### 1、`package.json`

`Umi 4` 不会自动注册 `package.json` 中以 `@umijs/preset-`、`@umijs/plugin-`、`umi-preset-` 和 `umi-plugin-` 开头的插件、预设，若你需要自定义额外的插件、预设，需要手动配置到 `plugins`

#### 2、`.umirc.ts`

配置文件，包含 `Umi` 所有**非运行时配置**（这也是为什么动这个文件会导致项目启动关闭）

> 非运行时配置是在构建时确定的，无法在运行时修改（这些配置项在构建过程中被编译成**静态文件**，因此无法在运行时进行修改。例如，路由配置、主题配置、打包配置等都属于非运行时配置。）

若需要在不同环境中加载不同配置，这在 Umi 中是根据 `UMI_ENV` 来实现的（注：发布到生产时，会自动加载生产环境配置，但要在本地加载生产环境配置就要用到 `UMI_ENV`）

如：事先准备好`.umirc.prod.ts`文件

```js
  "dev": "max dev",
  "start": "npm run dev",
  "start:pre": "cross-env  UMI_ENV=prod max dev"//（这里的prod和文件名中的prod要对应）
```

`config.ts` 文件与 `.umirc.ts` 文件功能相同，区别是你可以单独在一个 config 文件夹下集中管理所有的配置，保持项目根目录整洁。2 选 1 。`.umirc.ts` 文件优先级较高

#### 3、`app.[ts｜tsx]`

**运行时**配置文件，可以在这里扩展运行时的能力，比如修改路由、修改 render 方法等。

注意`umi@max`中`layout`的配置也在这里，比如修改`logo`，删除底部`slogan`

> 运行时配置带来的逻辑会在浏览器中运行，因此当有远程配置、动态内容时，这些我们在本地开发时还不确定，不能写死，所以需要在浏览器实际运行项目时动态获取他们。

#### 4、`public` 目录

- 直接使用

  ```html
  <img src="/img/logo.svg" />
  ```

- svg 资源使用

  ```js
  import { ReactComponent as SvgLogo } from '@public/img/logo.svg';
  <SvgLogo />;

  不知为何，此处引入时无法像直接使用那样用约定路径'/img/logo.svg'，会报错，所以在.umirc.ts下手动添加别名

  const path = require('path');

  alias: {
    '@public': path.resolve(__dirname, 'public'),
  },
  ```

- 图片资源使用

  ```js
  import LogoUrl from '@public/img/logo.svg';

  <img src={LogoUrl} />;
  ```

#### 5、`types`目录

新建`types`目录，在其中新建`global.d.ts`文件，便可绕过某些依赖的类型检查

❓ 此目录非官方目录，具体生效原理暂时未知

```js
declare module 'react-syntax-highlighter';
declare module 'react-syntax-highlighter/dist/esm/styles/prism/night-owl';
```

#### 6、`.env` 目录

Umi 可以通过**环境变量**来完成一些特殊的配置和功能。

有很多环境变量可以设置：如端口号PORT、指定环境UMI_ENV等

- 端口号

  ```js
  // 一般为了适配多种系统，建议两句都写上
  # OS X, Linux
  $ PORT=4567 umi dev // 注意写法不是PORT=4567

  # Windows (cmd.exe)
  $ set PORT=4567&&umi dev

  //如果需要同时在不同的操作系统中使用环境变量，推荐使用工具 cross-env
  $ pnpm install cross-env -D
  $ cross-env PORT=3000 umi dev
  ```

- UMI_ENV

  当指定 UMI_ENV 时，会额外加载指定值的配置文件，优先级为：

  - config.ts

  - config.${UMI_ENV}.ts

  - config.${dev | prod | test}.ts

  - config.${dev | prod | test}.${UMI_ENV}.ts

  - config.local.ts

若不指定 UMI_ENV ，则只会加载当前环境对应的配置文件，越向下的越具体，优先级更高，高优的配置可以往下移动。

注：根据当前环境的不同，dev, prod, test 配置文件会自动加载，<mark>不能在环境变量文件中将 UMI_ENV 的值设定成他们</mark>

### 三、配置文件

即.umirc.ts文件里的配置项

- esbuildMinifyIIFE

  修复 esbuild 压缩器自动引入的全局变量导致的命名冲突问题（这个问题一般影响到打包出错，会提示打开这个配置）。`esbuildMinifyIIFE: true`

### 四、数据管理

#### 1、普通用法

类似`pinia`这种数据存储方案

`@umi/max` 内置了数据流管理插件，它是一种基于 `hooks` 范式的轻量级数据管理方案，可以在 `Umi` 项目中管理全局的共享数据。

数据统一在 `src/models` 中的 `model` 管理，组件内尽可能的不去维护数据

可以配合`ahooks`的`useLocalStorageState`实现**数据持久化**

```js
// 普通用法
import { useState } from 'react';

const useMessages = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [userMessage, setUserMessage] = useState<Array<any>>([]);

  return {
    userInput,
    setUserInput,
    userMessage,
    setUserMessage,
  };
};

export default useMessages;

// 持久化用法（当然持久化可以直接用localStorage方法，这种方法方便统一管理）
import { useLocalStorageState } from 'ahooks';

const useUser = () => {
  // 此处的第一个参数必须保持唯一性，否则会出错
  const [name, setName] = useLocalStorageState<string | undefined>('name', {
    defaultValue: ' ',
  });

  const [avatar, setaAvatar] = useLocalStorageState<string | undefined>(
    'avatar',
    {
      defaultValue: ' ',
    },
  );

  return {
    name,
    setName,
    avatar,
    setaAvatar,
  };
};

export default useUser;
```

<mark>使用时注意有专门的使用方法，不要依照一般 hooks 使用，否则无法实现全局共享（因为原始状态下每个组件独立的状态不共享）</mark>

```js
import { useModel } from '@umijs/max';

const { setUserMessage } = useModel('useMessages');
```

#### 2、全局初始状态管理插件

全局初始状态是一种特殊的 `Model`。

全局初始状态在整个 `Umi` 项目的最开始创建。编写 `src/app.ts` 的导出方法 `getInitialState()`，其返回值将成为全局初始状态。例如：

```js
// src/app.ts
import { fetchInitialData } from '@/services/initial';

export async function getInitialState() {
  const initialData = await fetchInitialData();
  return initialData;
}
```

各种插件和定义的组件都可以通过 `useModel('@@initialState')` 直接获取到这份全局的初始状态，如下所示：

```js
import { useModel } from 'umi';

export default function Page() {
  const { initialState, loading, error, refresh, setInitialState } =
    useModel('@@initialState');
  return <>{initialState}</>;
}
```

可以将 `initialState` 理解为一个默认的 `model`，里面可以将项目中需要的不频繁修改的数据注入。

如`src/models/global.ts`,`src/models/login.ts`,`src/models/setting.ts`中的数据

### 五、国际化

`@umi/max` 内置了国际化插件

**不使用国际化插件时，就需自己整理好目录结构，然后统一暴露一个接口，而且切换语言时也不太方便**

所以我们直接使用插件：

- 国际化插件采用约定式目录结构，约定在 `src/locales` 目录下引入多语言文件。

  多语言文件的命名需遵循此规范：`<lang><separator><COUNTRY>.(js|json|ts)`。其中，`<separator>` 为分隔符，默认为 `-`，可以通过 `baseSeparator` 项配置。

  ```bash
  src
    locales
      zh-CN.ts
      en-US.ts
    pages
  ```

  ```js
  // zh-CN.ts
  export default {
    welcome: '欢迎光临 Umi 的世界！',
  };
  ```

- 在 `.umirc.ts` 中配置国际化插件

  ```js
  export default {
    locale: {
      // 默认使用 src/locales/zh-CN.ts 作为多语言文件
      default: 'zh-CN',
      baseSeparator: '-',
    },
  };
  ```

- 在 `Umi` 中使用多语言内容。需借助 `<FormattedMessage />` 组件

  只需要将`zh-CN.ts`中的 `key`值（如`welcome`） 作为参数 `id` 的值传入即可

  ```js
  import { FormattedMessage } from 'umi';

  export default function Page() {
    return (
      <div>
        //渲染结果：欢迎光临 Umi 的世界！
        <FormattedMessage id="welcome" />
      </div>
    );
  }
  ```

- 特殊用法：将多语言内容作为参数传递给某个组件

  通过 `intl` 对象来实现

  ```js
  import { Alert } from 'antd';
  import { useIntl } from 'umi';

  export default function Page() {
    //使用useIntl() 接口来初始化 intl 对象，并调用此对象的 formatMessage() 方法来格式化字符串。
    const intl = useIntl();
    const msg = intl.formatMessage({
      id: 'welcome',
    });

    return <Alert message={msg} type="success" />;
  }
  ```

- 特殊用法：在多语言翻译中动态插值

  ```js
  // src/locales/zh-CN.ts
  export default {
    user: {
      welcome: '{name}，今天也是美好的一天！',
    },
  };
  ```

  ```js
  import { FormattedMessage } from 'umi';

  export default function Page() {
    return (
      <p>
        <FormattedMessage id="user.welcome" values={{ name: '张三' }} />
      </p>
    );
  }
  ```

  ```js
  // 也可以通过 intl 对象来实现
  import { useIntl } from 'umi';

  export default function Page() {
    const intl = useIntl();
    const msg = intl.formatMessage(
      {
        id: 'user.welcome',
      },
      {
        name: '张三',
      },
    );

    return <p>{msg}</p>;
  }
  ```

- 切换语言

  通过预设的 <SelectLang /> 组件可以快速地向项目中添加切换语言的功能，只需要像这样编写：

  ```js
  import { SelectLang } from 'umi';

  export default function Page() {
    //虽然还没用过，但估计是一个封装好的UI，直接点击就能切换
    return <SelectLang />;
  }
  ```

  当然了，这个UI可以我们自己来写，那我们只需要用到API

  ```js
  import { setLocale } from 'umi';

  // 切换时刷新页面
  setLocale('en-US');

  // 切换时不刷新页面
  setLocale('en-US', false);

  // 如果您的默认语言为 zh-CN
  // 那么以下调用具有与 setLocale('zh-CN') 同样的效果
  setLocale();
  ```

- 注意：为了页面的一致性，当 Umi 没有在当前的多语言文件中找到 id 对应的内容时，它会直接将 id 渲染为页面上的内容。

  特别的，如果需要在没有完成国际化适配的情况下，给出一个默认的值，可以使用 defaultMessage 参数：

  ```js
  import { Button } from 'antd';
  import { FormattedMessage } from 'umi';

  export default function Page() {
    return (
      <Button type="primary">
        <FormattedMessage id="table.submit" defaultMessage="SUBMIT TABLE" />
      </Button>
    );
  }
  ```

  ```js
  import { Button } from 'antd';
  import { useIntl } from 'umi';

  export default function Page() {
    const intl = useIntl();
    const msg = intl.formatMessage({
      id: 'table.submit',
      defaultMessage: 'SUBMIT TABLE',
    });

    return <Button type="primary">{msg}</Button>;
  }
  ```

  当然了，不推荐使用 defaultMessage 配置默认值，因为这会编写大量重复的国际化内容。所以，在进行国际化适配时，确保每个多语言文件中都包含所有用到的键。

### 六、请求

### 七、微生成器介绍

#### 1、官方文档

- [umi 微生成器](https://umijs.org/docs/guides/generator#%E5%BE%AE%E7%94%9F%E6%88%90%E5%99%A8)

#### 2、常用微生成器

- `umi g page xxx --dir`

  ![ ](/md/umi微生成器介绍/page.png)

  在 pages 目录下生成一个名为 xxx 的文件夹，文件夹内包含 index.tsx 和 index.less 文件，这两个文件的内容可以定制（详见 `umi g page --eject`）

  ![ ](/md/umi微生成器介绍/定制.png)

#### 3、存在问题

- [ ] 目前只能自定义生成的文件内容，不能自定义生成什么文件，以及生成到哪个文件夹
- [ ] 待实现`hexo`博客文章生成方案

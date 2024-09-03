### 前言：如何快速写一个node项目

- 创建目录
- npm init 初始化工程

### 一、初识 node

`Node.js` 是一个基于 `Chrome V8` 引擎 的 `JavaScript` 运行时环境

[可借鉴笔记](https://brucecai55520.gitee.io/bruceblog/notes/nodejs/node.html#%E5%86%99%E5%85%A5%E6%96%87%E4%BB%B6)

### 二、nodejs 模块

1、nodejs 中模块分为**内置模块、用户自定义模块、第三方模块（又称包）**

（使用 require 方法加载，立即执行模块内的代码） --> 方便我们用别人写好的功能，提高效率

> 在 ES6 当中，用 export 导出接口，用 import 引入模块。但是在 node 模块中，使用 module.exports 导出接口，使用 require 引入模块。注意两者区别

**内置模块的加载优先级最高**，例如 require('fs')始终返回内置的 fs 模块，即使在 node_nodules 下有同名的包加载自定义模块，一定要`./`或`../` 不然就报错，会当成内置模块或第三方模块加载

2、require 方法接收到的是 `module.exports` 所指向的对象（默认不导出的时候是空对象）

3、和函数作用域类似，在自定义模块中定义的变量、方法等成员，只能在当前模块内被访问，这种模块级别的访问限制，叫做模块作用域（防止全局变量污染）

4、自定义模块中都有一个 `module` 对象，存储了和当前模块有关的信息； 在自定义模块中，可以使用 `module.exports` 对象，将模块内的成员共享出去，供外界使用。导入自定义模块时，得到的就是 `module.exports` 指向的对象

默认情况下，`exports` 和 `module.exports` 指向同一个对象。最终共享的结果，以 `module.exports` 指向的对象为准。

**为了防止混乱，不要在同一个模块中同时使用 `exports` 和 `module.exports`**

5、模块第一次加载后会被缓存，即多次调用 `require()` 不会导致模块的代码被执行多次，提高模块加载效率。

### 三、fs 文件系统模块

语法格式：`fs.readFile(path[, options], callback)`

```js
const fs = require('fs');

fs.readFile('./fs/1.txt', 'utf8', (err, dataStr) => {
  if (err) {
    console.log('读取文件失败', err.message);
  } else {
    console.log('读取文件成功', dataStr);
  }
});
```

```js
const fs = require('fs');

fs.writeFile('./fs/2.txt', '梅开二度', 'utf8', (err) => {
  if (err) {
    // 文件夹没有会报错、文件没有会自动新建
    console.log('写入文件失败', err.message);
  } else {
    console.log('写入文件成功');
  }
});
```

在使用 `fs` 模块操作文件时，如果提供的操作路径时以`./`或`../`开头的相对路径时，很容易出现路径动态拼接错误的问题。原因：代码在运行的时候，会以 `node` 命令执行时所处的目录（注意不是代码所处目录），动态拼接出被操作文件的完整路径

解决方案：1、提供完整的文件存放路径（从盘符开始）-->移植性差，不利于维护 2、\_\_dirname 代表【当前文件 代码所写文件】所处目录

```js
console.log(__dirname); //__dirname 获取文件所处的绝对路径

const fs = require('fs');

fs.readFile(__dirname + '/1.txt', 'utf8', (err, dataStr) => {
  if (err) {
    console.log('读取文件失败', err.message);
  } else {
    console.log('读取文件成功', dataStr);
  }
});

// 路径拼接用+不太好，使用path.join（.不影响）   注意这个方法中遇到../会抵消掉上一个路径
const path = require('path');
fs.readFile(path.join(__dirname, '/1.txt'), 'utf8', (err, dataStr) => {
  if (err) {
    console.log('读取文件失败', err.message);
  } else {
    console.log('读取文件成功', dataStr);
  }
});

// path.basename在路径中获取文件名
const fpath = 'a/b/c/index.html';
console.log(path.basename(fpath));
console.log(path.basename(fpath, '.html')); //移除扩展名（正则表达式）
console.log(path.extname(fpath));
```

### 四、npm

1、`node_modules` 文件夹用来存放所有已安装到项目中的包。`require()`导入第三方包时，就是从这个目录中查找并加载包

2、`package-lock.json` 配置文件用来记录 `node_modules` 目录下的每一个包的下载信息，例如包的名字、版本号、下载地址等，其中 `dependencies` 节点指向一个对象，记录了装了哪些包

3、不要尝试去修改以上提到的文件夹或文件中的任何代码，npm 会自动维护它们（下载包的时候会自动生成）

点分十进制版本号 `2.24.0`

- 第一位：大版本
- 第二位：功能版本
- 第三位：`bug` 修复版本

只要前面的版本号提升了，后面的版本号归零

4、npm 规定，在项目根目录中，必须提供 `package.json` 包管理配置文件，用来记录与项目有关的一些配置（`npm init -y`快速创建该文件 只能在英文的目录下成功运行，所以项目文件夹的一定要使用英文，且不能出现空格）如：项目本身的名称、版本号、描述等；项目中都用到了哪些包，那些包只在开发期间会用到，哪些包在开发和部署时都需要用到

5、`package.json` 文件中，`dependencies` 节点记录了使用 `npm i` 命令安装了哪些包（开发和上线时都需要用到） `npm i` 安装多个包使用空格间隔

`devDependencies` 只在开发期间会用到（注意这里的开发期间不是指在本地环境，与环境无关，而是与阶段有关，比如有的依赖作用于打包阶段，那么它也是devDependencies，因为它在项目上线后不会用到）， 命令：`webpack npm i xxx -D`（是`--save-dev`的简写形式）

<mark>注意同一个包不能同时安装到两个节点下</mark>

`node_modules` 文件夹中的包都是项目包（又分开发依赖包和核心依赖包）

卸载全局包也是加`-g`

6、`nrm` 切换镜像源工具 `npm i nrm -g / nrm -ls / nrm use taobao`

### 五、http 模块

```js
// http模块是node.js提供的、用来创建web服务器的模块
const http = require('http');

//通过http.createServer()方法，就能很方便的把一台电脑变成一台web服务器，从而对外提供web资源服务
const server = http.createServer();

// 使用服务器实例的.on()方法，为服务器绑定一个request事件
server.on('request', (req, res) => {
  // 只要有客户端来请求我们自己的服务器，就会触发request事件，从而调用这个事件处理函数
  console.log('Someone visit our web serve.');
  console.log(req.url);
  console.log(req.method);

  const str = '我已接收到你的请求';
  //   为了防止中文乱码问题
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  //   res.end()方法向客户端发送指定的内容，并结束这次请求
  res.end(str);
});

// 使用服务器实例的.listen()方法，即可启用web服务器（80端口可省略）
server.listen(8080, () => {
  console.log('http serve running at http://127.0.0.1:8080');
});
```

文件的实际存放路径，就是每个资源的请求 url 地址（要注意启动服务器的文件路径）

```js
server.on('request', (req, res) => {
  // 获取到客户端请求的url地址
  const url = req.url; //相对路径（这个url直接放在ip后面，如：http://127.0.0.1:8080/1.txt）
  // 把请求的url地址，映射为本地文件的存放路径
  const fpath = path.join(__dirname, url);

  fs.readFile(fpath, 'utf8', (err, dataStr) => {
    if (err) {
      console.log('读取文件失败', err.message);
      res.end('404 not found');
    } else {
      console.log('读取文件成功', dataStr);
      res.end(dataStr);
    }
  });
});

server.listen(8080, () => {
  console.log('http serve running at http://127.0.0.1:8080');
});
```

### 六、express 模块

Express 是用于快速创建服务器的第三方模块。

```js
const express = require('express');
// 创建web服务器
const app = express();

// 监听客户端的 GET 和 POST 请求，并向客户端响应具体的内容
app.get('/user', (req, res) => {
  res.send({ name: 'zs', age: 20, gender: '男' });
});
app.post('/user', (req, res) => {
  res.send('请求成功');
});

app.get('/', (req, res) => {
  // 通过 req.query 可以获取到客户端通过【查询字符串】的形式发送过来的查询参数，默认是一个空对象
  console.log(req.query);
  res.send(req.query);
});

// 这里的 :id 是一个动态的参数    如http://127.0.0.1:8080/1/2
app.get('/user/:id/:username', (req, res) => {
  // req.params 是动态匹配到的 URL 参数，默认是一个空对象
  console.log(req.params);
  res.send(req.params);
});

// 启动服务器（必须写在最后）
app.listen(8080, () => {
  console.log('express server running at http://127.0.0.1:8080');
});
```

**中间件**：当一个请求到达 `Express` 的服务器之后，可以连续调用多个【中间件】，从而对这次请求进行预处理

`Express` 的中间件，本质上就是一个函数，包含 `req, res, next` 三个参数，`next()` 参数把流转关系交给下一个中间件或路由 `next()` 函数后别写代码

中间件的形参列表中，必须包含 `next` 参数，而路由处理函数中只包含 `req` 和 `res`【区分中间件函数还是路由处理函数】

注意事项：一定要在路由匹配之前定义中间件

中间件看起来都跟请求有关

- 1、应用级别的中间件：通过 `app.use()` 或 `app.get()` 或 `app.post()` ，绑定到 app 实例上的中间件
- 2、路由级别的中间件：绑定到 `express.Router()` 实例上的中间件，叫做路由级别的中间件。（用法和应用级别中间件没有区别。）
- 3、错误级别的中间件：用来捕获整个项目中发生的异常错误，从而防止项目异常崩溃的问题 错误级别中间件的处理函数中，必须有 4 个形参，形参顺序从前到后分别是 `(err, req, res, next)` 。 错误级别的中间件必须注册在所有路由之后
- 4、`Express` 内置中间件

  ```js
  const express = require('express');
  const app = express();
  // 通过express.json()这个中间件，解析表单中JSON格式的数据
  app.use(express.json());
  // 通过express.urlencoded 解析 URL-encoded（x-www-form-urlencoded） 格式的请求体数据
  app.use(express.urlencoded({ extended: false }));

  //通过 express.static() 方法可创建静态资源服务器，向外开放访问静态资源。
  /*
  
  可直接访问 public 目录下的静态资源（存放静态文件的目录名不会出现在 URL 中）
  http://localhost:8080/txt/2.txt
  http://localhost:8080/1.txt
  
  */
  app.use(express.static('public')); //这里的路径是相对于项目根目录
  // 要托管多个，就多次调用，同名文件会按顺序查找
  app.use(express.static('files'));

  /*
  
  通过带有 /public 前缀的地址访问 public 目录下的文件（可为静态资源访问路径添加前缀）
  http://localhost:8080/public/txt/2.txt
  http://localhost:8080/public/1.txt
  
  */
  app.use('/public', express.static('public'));
  ```

- 5、第三方中间件

  cors 中间件解决跨域

  ```js
  // CORS主要在服务器端进行配置，客户端无需做任何额外的配置，即可请求开启了CORS的接口
  const cors = require('cors');
  app.use(cors());
  ```

### 七、路由

路由的作用是为每一个接口路径统一加一个请求前缀，这样请求的时候就要注意了，没加前缀访问不到

```js
/*

为了方便对路由进行模块化的管理，不建议将路由直接挂载到app上，而是将路由抽离为单独的模块

 */

const express = require('express');
// 创建路由对象
const router = express.Router();

// 挂载具体路由（必须同时满足url和请求方式）
router.get('/user/list', (req, res) => {
  res.send('Get user list.');
});
router.post('/user/add', (req, res) => {
  res.send('Add new user.');
});

// 向外导出路由对象
module.exports = router;
```

```js
//使用上面的路由对象
const express = require('express');
const router = require('./router');

const app = express();

// 使用app.use注册路由模块，添加访问前缀
// app.use()用于注册全局中间件
app.use('/api', router);

app.listen(8080, () => {
  console.log('http://127.0.0.1:8080');
});
```

### 八、nodemon

用于`js` 代码热更新

全局安装后，找到 `code runner` 插件，在设置里把 `js` 的启动从 `node` 改为 `nodemon`

或者直接 `nodemon ***(js 文件)`

### 九、第一个接口

安装 `vs` 插件 `postcode` 即可调试

```js
const express = require('express');
// 创建路由对象
const router = express.Router();

// 挂载具体路由（必须同时满足url和请求方式）
router.get('/user/list', (req, res) => {
  const query = req.query;
  // res.send("Get user list.");
  res.send({
    status: 0, //0表示处理成功
    msg: 'GET请求成功',
    data: query,
  });
});
router.post('/user/add', (req, res) => {
  const body = req.body;
  res.send({
    status: 0, //0表示处理成功
    msg: 'POST请求成功',
    data: body,
  });
});

// 向外导出路由对象
module.exports = router;
```

```js
const express = require('express');

// 创建web服务器
const app = express();
// 在导入路由模块之前配置中间件（解决body参数格式问题）
app.use(express.urlencoded({ extended: false }));
// 在导入路由模块之前配置中间件（解决跨域问题-->配置cors相关的响应头，解除浏览器端的跨域访问限制）
// 1、CORS主要在服务器端进行配置，客户端无需做任何额外的配置，即可请求开启了CORS的接口
const cors = require('cors');
app.use(cors());

const router = require('./router');
app.use('/api', router);

// 启动服务器（必须写在最后）
app.listen(8080, () => {
  console.log('express server running at http://127.0.0.1:8080');
});
```

### 十、数据库

使用数据库必须安装 mysql 模块，mysql 无非是数据的增删改查，之前复习了一遍，目前无需深入

随便安装一个 vs 数据库的插件，之前用的是 Database，但是试用期过了需要收费，再看吧。。

![ ](/md/nodejs总结复盘/1.png)

```js
// 导入mysql
const mysql = require('mysql');

// 建立与mysql数据库的连接
const db = mysql.createPool({
  host: '127.0.0.1', //本机数据库的IP地址
  user: 'root',
  password: 'xxxx',
  database: 'my_db_01', //指定要操作哪个数据库
});
```

- 查询数据

  第一个参数是 SQL 语句 如果执行的是 SELECT 语句，则执行的结果是数组

  ```js
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.log('查询失败！', err.message);
    } else {
      console.log('SQL语句打印结果', results);
    }
  });
  ```

- 插入数据

  如果执行的是 insert into 插入语句，则 results 是一个对象，可以通过 affectedRows 属性来判断是否插入成功

  ```js
  //  ? 表示占位符  类似于形参
  const sqlStr = 'insert into users (name, password) values(?, ?)';
  const user = { username: 'test', password: '12345' };

  // 使用数组的形式为占位符指定具体的值
  db.query(sqlStr, [user.username, user.password], (err, results) => {
    if (err) {
      console.log('执行失败！', err.message);
    }
    if (results.affectedRows === 1) {
      console.log('插入成功');
    }
  });
  ```

- 更新用户信息

  ```js
  const user3 = { id: 14, name: 'test', password: '123456' };
  const sqlStr3 = 'update users set name=?, password=? where id=?'; //不加 where 会更新整张表

  //这个地方可以简写 db.query(sqlStr4, [user4, user4.id]，注意属性和数据库表的字段要一一对应
  db.query(sqlStr3, [user3.name, user3.password, user3.id], (err, results) => {
    if (err) {
      console.log('执行失败！', err.message);
    }
    if (results.affectedRows === 1) {
      console.log('更新成功');
    }
  });
  ```

- 删除

  id 是唯一的，就算把那条数据删除了，id 也被占用过了，不会重复使用 原因：mysql 数据可以回滚

  推荐根据 id 这一唯一标识， 如果执行的是 delete 删除语句，则 results 是一个对象，可以通过 affectedRows 属性来判断是否删除成功

  ```js
  const sqlStr5 = 'delete from users where id=?';

  // 如果sql语句中只有一个占位符，可以省略数组
  db.query(sqlStr5, 14, (err, results) => {
    if (err) {
      console.log('执行失败！', err.message);
    }
    if (results.affectedRows === 1) {
      console.log('删除成功');
    }
  });
  ```

- 标记删除

  使用 delete 语句会真正的把数据从表中删除掉，为了保险起见，推荐使用标记删除的形式，来模拟删除的动作

  即在表中设置状态字段，标记当前的数据是否被删除。（使用 update 语句）

  ```js
  const sqlStr6 = 'update users set status=? where id=?';
  db.query(sqlStr6, [1, 1], (err, results) => {
    if (err) {
      console.log('执行失败！', err.message);
    }
    if (results.affectedRows === 1) {
      console.log('标记删除成功');
    }
  });
  ```

### 十一、身份验证

`jwt（json web token）`是目前最流行的跨域认证解决方案

用户的信息通过 Token 字符串的形式，保存在客户端浏览器中。服务器通过还原 Token 字符串的形式来认证用户的身份。（一般不会被破解）

安装依赖：

- `jsonwebtoken` 用于生成 JWT 字符串
- `express-jwt` 用于将 JWT 字符串解析还原成 JSON 对象

```js
const express = require('express');
// 创建web服务器（一套组合拳）
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const cors = require('cors');
app.use(cors());

const jwt = require('jsonwebtoken');
const { expressjwt } = require('express-jwt');

// 密钥为任意字符串（用于jwt字符串的加密和解密，越复杂越好）
const secretKey = 'wumi';
// 注册解密的中间件，.unless方法同时指定哪些接口不需要访问权限
app.use(
  expressjwt({
    secret: secretKey,
    algorithms: ['HS256'],
  }).unless({
    path: [/^\/api\//],
  }),
);

app.post('/api/login', (req, res) => {
  if (req.body.username != 'admin' || req.body.password != '12345') {
    console.log(req.body.username, req.body.password);
    return res.send({ status: 1, msg: '登陆失败' }); //return的作用就是少写一层else
  }
  const userInfo = req;
  // jwt.sign() 生成 JWT 字符串
  // 参数：用户信息对象、加密密钥、配置对象-token有效期
  // 尽量不保存敏感信息，因此只有用户名，没有密码
  const tokenStr = jwt.sign({ username: userInfo.username }, secretKey, {
    expiresIn: '10h',
  });

  res.send({
    status: 200,
    message: '登录成功',
    token: tokenStr,
  });
});

// expressjwt配置成功后，可在有权限的接口中，使用req.auth对象访问从JWT字符串中解析出来的用户信息
// 获取用户名的接口
app.get('/admin/getinfo', (req, res) => {
  console.log(req.auth);
  res.send({
    status: 200,
    message: '获取信息成功',
    data: req.auth,
  });
});

// 捕获解析 JWT 失败后产生的错误
// 当使用 express-jwt 解析 Token 字符串时，如果客户端发送过来的 Token 字符串过期或不合法，会产生一个解析失败的错误，影响项目的正常运行
// 通过 Express 的错误中间件，捕获这个错误并进行相关的处理
// 错误被捕获后就不会在前端报错了，而是会返回一个错误的对象
app.use((err, req, res, next) => {
  // token解析失败的错误
  if (err.name === 'UnauthorizedError') {
    return res.send({ status: 401, message: 'Invalid token' });
  }
  //   未知的错误
  res.send({ status: 500, message: 'Unknown error' });
});
```

### 十二、实践应用

#### 1、`json`转`excel`

```js
const xlsx = require('xlsx');

// 准备好待转换的json数据
let jsonData = [];

// 将数据转成workSheet
let jsonWorkSheet = xlsx.utils.json_to_sheet(jsonData);

// 构造workBook
let workBook = {
  SheetNames: ['jsonWorkSheet'],
  Sheets: {
    jsonWorkSheet: jsonWorkSheet,
  },
};

// 将workBook写入文件
xlsx.writeFile(workBook, './JsonToExcel/0828.xlsx');
```

#### 2、`excel`转`json`

```js
const xlsx = require('xlsx');
const fs = require('fs');

// 使用readFileSync()方法读取Excel文件
const workbook = xlsx.readFile('./JsonToExcel/0828.xlsx');

//使用sheet_to_json()方法将Excel表格数据转换为JSON格式
const worksheet = workbook.Sheets['Sheet1']; // Sheet1是Excel文件的表格名称
const jsonData = xlsx.utils.sheet_to_json(worksheet);

// 将JSON数据写入文件
fs.writeFileSync('./JsonToExcel/0828.json', JSON.stringify(jsonData));
```

#### 3、`json`文件转格式

之所以要有这一步是因为目前`python`需要的格式不是寻常的`json`格式

```js
const fs = require('fs');
// 这一块是python要求的格式
function convertJson(jsonArray) {
  // 将JSON对象转换为字符串
  let jsonString = JSON.stringify(jsonArray);

  // 去除方括号、换行符和末尾的逗号
  jsonString = jsonString.replace(/\[|\]|\n/g, '').replace(/,\s*$/, '');

  // 在每个元素的后面添加换行符
  jsonString = jsonString.replace(/},/g, '}\n');

  return jsonString;
}

// 读取文件内容（node无法直接把数据import或者require进来）
fs.readFile('./JsonToExcel/0828.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  try {
    const jsonArray = JSON.parse(data);
    const convertedJson = convertJson(jsonArray);
    // 将JSON数据写入文件（这种写法比fs.writeFileSync("./JsonToExcel/text.json", JSON.stringify(convertedJson))更能还原格式）
    fs.writeFile('./JsonToExcel/text.json', convertedJson, 'utf8', (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('JSON写入成功！');
    });
  } catch (error) {
    console.error('Invalid JSON format:', error.message);
  }
});
```

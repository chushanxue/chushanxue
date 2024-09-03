## 一、前言

- 依赖注入

  一种消除类之间依赖关系的**设计模式**，使代码更易于维护

- 发布者-订阅者模式

  发布者负责产生消息或事件，并将其发送给所有订阅了该消息或事件的订阅者。发布者通常不知道有哪些具体的订阅者存在，它只负责将消息广播出去。

  订阅者则负责接收并处理发布者发送的消息或事件。它们通过向发布者注册自己来表明自己对特定类型的消息感兴趣，并在有新消息时被通知到。

  通过使用发布-订阅模式，组件之间可以实现松耦合，并且可以方便地添加、删除或替换不同类型的订阅器和发布器

- IoC

  inversion of Control，控制反转，是一种软件设计原则，用于解耦组件之间的依赖关系。

  一个组件不再负责直接创建或管理它所依赖的其他组件。相反，这些依赖关系由外部容器或框架来创建和管理。这样做的好处是，组件不再与具体的实现细节紧密耦合，而是只关注自身的功能。

  IoC有多种实现方式，其中最常见的是依赖注入

## 二、使用

### 1、常用命令

- 项目起步

  ```bash
  npm i -g @nestjs/cli
  nest new project-name
  ```

- 启动命令：

  ```bash
  npm run start //启动应用程序，但不会监视源代码的变化
  npm run start:dev //启用文件监视和自动重新启动功能（基于nodemon实现）
  ```

- 创建 Module

  ```bash
  nest g module <module-name> <file-path> // 注意<module-name>在前面
  ```

  - 脚手架工具会自动在 `src/<file-path>/<module-name>`文件夹 下创建一个 `<module-name>.module.ts`，同时还会在根模块 `app.module.ts` 中引入

  - 一个模块（Module）中包装了某一类特定功能

    > Nest 提供了**模块机制**，通过在**模块装饰器**中定义controller、provider等构造函数便完成了依赖注入，通过模块树组织整个应用程序的开发。**模块机制的主要目的是降低耦合度**

- 创建Controller

  ```bash
  nest g controller <controller-name> <file-path> // 注意<controller-name>在前面
  ```

  - 脚手架工具会自动在 `src/server<module-name>` 文件夹下创建一个 `<module-name>.controller.ts`，同时还会在模块 `<controller-name>.module.ts` 中引入
  - 在 Nest 中，controller 就类似前端的路由，负责处理客户端传入的请求和服务端返回的响应。

- 创建 Provider

  ```bash
    nest g service <provider-name> <file-path>
  ```

  Provider用来提供**数据库操作服务**以及所有的**业务逻辑**

### 2、文件内容

- module文件

  `module`文件中的`@Module`装饰器接受一个对象参数，在`Nest`源码中是`ModuleMetadata`接口，它有四个字段，且均是数组类型，分别是：

  ```js
  imports ：导入其他模块中导出的Providers，以实现共享
  providers ：模块中所有用到的功能类，模块内共享实用；
  controllers：控制器
  exports：导出其他模块需要共享的Providers
  ```

  通过以上四种类型的设定，Nest的IoC才能够准确识别需要组装（注入和被注入）各种依赖关系，同时实现一定程度的共享。

- controller文件

  这里接收各类请求（GET、POST...）并返回数据

- service文件

  这里实现各种业务逻辑

### 3、方法类

- 管道`pipe`

  管道是具有 `@Injectable()` 装饰器的类。

  管道有两个典型的应用场景:

  - **转换**：管道将输入数据转换为所需的数据输出(例如，将字符串转换为整数)
  - **验证**：对输入数据进行验证，如果验证成功继续传递; 验证失败则抛出异常

  <mark>Nest自带很多开箱即用的内置管道。还可以构建自定义管道。</mark>

- DTO

  DTO（数据传输对象）是一个对象，它定义了如何通过网络发送数据。（其实就是ts类型定义，但是这里建议用class来进行类型定义）

  注意，DTO定义的是**接收**的对象类型

- 类验证器

  `$ npm i --save class-validator class-transformer`

  类验证器用来对类中的属性进行验证，如果验证通过则继续执行，否则抛出异常。

  常用于辅助DTO

- 基础异常类

  `Nest`提供了一个内置的 `HttpException` 类，它从 `@nestjs/common` 包中导入。对于典型的基于`HTTP REST/GraphQL API`的应用程序，最佳实践是在发生某些错误情况时发送标准`HTTP`响应对象。

  例如，当用户尝试访问一个不存在的资源时，`HttpException`类会抛出一个`404`错误。（原本是返回空，状态为200）

## 三、数据库相关

### 1、安装mysql

对MySQL还算比较熟，所以依然使用mysql作为日常开发用的数据库

首先去官网安装mysql：<https://dev.mysql.com/downloads/mysql/>（下载第一个macOS 13 (ARM, 64-bit), DMG Archive）

然后就是每一步默认安装，直到设置密码，这个密码需要记住

终端配置：

```bash
# 注意虽然文件是只读状态，但是我们可以用q!来强制覆盖保存
vim ~/.bash_profile

# 添加这一句即可
PATH=$PATH:/usr/local/mysql/bin

source ~/.bash_profile
```

在终端输入`mysql -u root -p`，之后输入密码即可登录，如果登录成功，说明一切顺利

### 2、vscode插件

安装`MySQL（weijan chen)`和`My SQL Syntax`

新增`mysql`实例时，`mysql`实例名称任取，注意**用户**是`root`，**密码**就是刚刚记住的那个密码

注意在**mysql实例**下必须新建**数据库**，否则`nestjs`将无法连接到数据库（<mark>实例名和数据库名是两个东西，不要混淆</mark>）

### 3、nest相关操作

- 在`app.module.ts`中添加`mysql`配置

  ```js
  import { Module } from '@nestjs/common';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { User } from './user.entity';
  @Module({
    imports: [
      ...,
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: '', // 服务器地址
        port: 3306, // 端口号（一般不用去动）
        username: '', // 数据库用户名
        password: '', // 数据库密码
        database: '', // 数据库名 【注意这里是数据库名，不是mysql实例名】
         entities: [__dirname + '/models/*.entity.ts'], //加载目录中所有实体
        synchronize: true, // 自动同步数据库结构
      }),
    ],
    ...
  })
  export class AppModule {}
  ```

- 在`model`文件夹下添加所有的实体

  ```js
  // 以user.entity.ts为例
  import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  } from 'typeorm';

  // 创建一个实体并添加表列
  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    email: string;

    @Column({ default: 'user' })
    role: 'admin' | 'user';

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
  }
  ```

- 开始使用

  - 在 `UserModule` 中导入 `UserRepository`，并将其添加到 `providers` 数组中
  - 然后就可以在`service`文件中使用了

## 四、引用

> [参考项目](https://github.com/lujakob/nestjs-realworld-example-app) [youtube教程](https://www.youtube.com/watch?v=6He5Gyuuvxk&list=PL0Zuz27SZ-6MexSAh5x1R3rU6Mg2zYBVr&index=7) [TypeORM 中文文档](https://typeorm.bootcss.com/)

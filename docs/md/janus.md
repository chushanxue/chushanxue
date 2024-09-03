![ ](/md/janus/1.png)

### 一、前言

单纯使用 `webrtc` 实现视频通话请查阅上一篇文章。

demo 中提到的【信令服务器/webrtc 服务器】便是 janus 。

janus 将我们从与浏览器交互的 PeerConnection 建立的过程中解脱出来，更专注于音视频业务逻辑。

`janus` 是一套完整的音视频会议系统，包括了 `WebRTC` 流媒体服务器和客户端（包括 `Android`、`iOS` 以及浏览器端） `API` 两大部分。

### 二、对比

- 单纯使用 webrtc 的缺点

  每次建立通信，代码虽然很容易写出来，但是需要很繁琐

- 使用 webrtc 服务器之后（这里以 janus 为例）

  回声测试、会议桥、媒体记录器、SIP 网关等基本功能

  可插拔的，按需引入所需的功能，比如会议功能,p2p 通信功能,录制功能,播放第三方媒体流 rtmp,屏幕共享等每个小功能可单独引入，只需要引入对应的插件即可

  使用 json 作为向服务器请求服务的参数，简洁

  自带用户统计，只需要按照特定的格式去请求即可，相当于给你提供了 websockte 服务器

### 二、使用 webrtc 服务器 janus

[janus 官网](https://janus.conf.meetecho.com/)

[官网中有用的 js 部分](https://janus.conf.meetecho.com/docs/JS.html)

1、从官网 git 下载最新的 js 复制到本地文件，最后一行加入 export default Janus

[下载地址](https://github.com/meetecho/janus-gateway/blob/master/html/janus.js)

2、常用 api

- Janus.init({...})（初始化 janus 对象）

  该方法接受以下选项：

```js

debug：是否在控制台启用调试，以及在什么级别上进行调试
        true或"all"：启用所有调试器（Janus.trace，Janus.debug，Janus.log，Janus.warn，Janus.error）
        数组（例如["trace", "warn"]）：仅启用选定的调试器（允许的令牌：跟踪，调试，日志，警告，错误）
        false: 禁用所有调试器

callback()：初始化完成时调用的用户提供的函数

dependencies：用户提供的janus依赖库


```

- new Janus({...}) （创建 janus 对象）

  该方法接受以下选项：

  ```js

  server：Janus服务器地址
  success：【连接成功后执行的回调函数】（重中之重）
  error：连接失败后执行的回调函数
  destroyed：连接销毁时的回调函数

  ```

  身为重中之重，我们来分析下 `success` 回调函数做了什么

  **调用了 `janus.attach` 方法绑定媒体流（没错只有这件事）**

  `janus.attach ({...})`方法可以让浏览器与服务端的 `videoroom` 插件绑定，以便获取媒体流。（这里绑定的真实含义是建立 `webrtc` 连接。）

  该方法接受以下选项：

```js

    【plugin: 要绑定的janus插件】
    opaqueId: 一个随机值，插件的唯一ID。
    【success: function(pluginHandle) { ... } attach方法执行成功后的回调函数】
                1、将janus.js层创建的pluginHanle保存起来以备后用
                2、业务相关
    error: function(error) { ... } attach方法执行失败后的回调函数
    consentDialog: function(on) { ... },
    iceState: function(state) { ... },
    mediaState: function(medium, on) { ... }
    【webrtcState: function(on) { ... } WebRTC状态更改后执行的回调函数】
    【onmessage: function(msg, jsep) { ... } 根据从janus服务端收到的不同消息类型做不同的逻辑处理】
    【onlocaltrack: function(stream) { ... } 收到本地流时的回调函数】
                1、让本地流的视频在浏览器里显示出来
    【onremotetrack: function(stream) { ... } 收到远端流时的回调函数】
                2、让远端视频流在浏览器里显示出来
    oncleanup: function() { ... } 销毁时的回调函数

```

3、开启通话

通话的核心在于`pluginHanle` 对象的`createOffer`方法，也只有这一个方法

在`janus.attach ({...})`方法中，我们接收了`pluginHanle` 对象，将之存为`sipcall`

```js
sipcall.createOffer({
  // capture表示是否发送轨道   recv表示是否接收轨道
  tracks: [
    { type: 'audio', capture: true, recv: false },
    { type: 'video', capture: true, recv: false },
  ],
  // 修改sdp（字符串替换）
  customizeSdp: function (jsep) {},
  // 创建成功后的回调就是向janus服务器发送sdp，在此处可以修改sdp（非字符串替换）
  success: function (jsep) {},
  error: function (error) {
    console.error('WebRTC error...', error);
  },
});
```

### 三、janus 插件

`janus` 支持插件式开发，目前 `janus` 官方给出的插件案例：

- `Echo Test`： 回声测试，⽀持通过按钮控制码率，从这⾥我们也可以学习到如何控制码率.
- `Streaming`：播放视频或⾳频流，可⽤于⽹络直播或转播。
- `Video Call`：⾳视频⼀对⼀通话，类似 `AppRTC` 的通话，但是⾳视频数据经过 `Janus` 进⾏传输。
- `SIP Gateway`：`SIP` ⽹关演示，允许您在 `SIP` 服务器上注册并启动/接收呼叫。
- `Video Room`：视频会议演示，允许您加⼊最多有六个⽤户的视频会议室。.
- `Audio Room`： ⾳频会议演示，不同⽤户之间的⾳频将进⾏混⾳。
- `Text Room`：⽂字聊天室，通过 `DataChannels` 进⾏传输。
- `Voice Mail`：演示语⾳邮件功能，可以录制⼗秒的⾳频，然后可以进⾏回放。
- `Recorder/Playout`：演示录制⾳频、视频，然后通过 `WebRTC` 进⾏回放.
- `Screen Sharing`：基于视频会议(`Video Room` )插件实现的屏幕分享功能。

### 六、引用

> [企业级音视频会议实战之 webrtc 服务器 janus 品尝实战](https://springboot.io/t/topic/3816) > [janus 前端核心库源码分析](https://blog.avdancedu.com/d7281c13/)

![ ](https://webrtc.org.cn/wp-content/uploads/2019/01/logo-1.png)

### 一、概念

[官方文档](https://w3c.github.io/webrtc-pc/#abstract)

[中文官网](https://webrtc.org.cn/)

[MDN 教程](https://developer.mozilla.org/zh-CN/docs/Web/API/WebRTC_API)

1、`WebRTC`（`Web Real-Time Communications`）是一项实时通讯技术，它允许网络应用或者站点，在不借助中间媒介的情况下，建立浏览器之间点对点（`Peer-to-Peer`）的连接，实现视频流和（或）音频流或者其他任意数据的传输。

2、`WebRTC`是一个由 `Google` 发起的实时通讯解决方案，其中包含视频音频采集，编解码，数据传输，音视频展示等功能，通过它，我们可以非常方便且快速地构建出一个音视频通讯应用。

3、`WebRTC`的应用场景：

- 直播
- 游戏
- 视频会议/在线教育
- 屏幕共享/远程控制
- ...

### 二、注意点

1、`WebRTC` 只能在 `HTTPS` 协议或者 `localhost` 下使用，如果是 `HTTP` 协议，会报错。

2、`Google` 是 `WebRTC` 的主要支持者和开发者。

3、为了让 `WebRTC` 的相关 `api` 在各个浏览器中都能够正常的运行，需要使用`adapter.js`（用于将应用程序与 `WebRTC` 中的规范更改和前缀差异隔离开来）

```bash
安装它
npm install webrtc-adapter

你只需要引入它即可，不需要做任何配置和多余的操作。
import 'webrtc-adapter'
```

### 三、核心拆解

#### 1、SDP

[RFC(2006)](https://webrtchacks.com/sdp-anatomy/?spm=a2c6h.12873639.article-detail.9.660918basstbCv)

`SDP (Session Description Protocol)`是一个描述 `peer-to-peer (en-US)` 连接的标准。`SDP` 包含音视频的：编解码 (`codec`)、源地址、和时间信息。

`WebRTC` 通过 `SDP` 来交换端与端之间的网络和媒体信息。

`SDP` 作为 `WebRTC` 的组件之一，用于描述一个 `session` 会话。（`WebRTC` 使用 `Offer-Answer` 模型交换 `SDP`，`Offer` 中有 `SDP`，`Answer` 中也有）

下面是一个典型的 `SDP` 信息示例：

```bash
会话级别描述
v=0 # SDP版本号
o=- 0 0 IN IP4 120.24.99.xx # 会话标识信息
s=- # 会话名称（不常使用）
t=0 0 # 会话的有效时间（此处开始和结束都设置为0，表示会话不受特定时间的限制，在任何时候都是永久有效的。）


网络描述
c=<网络类型><地址选型><地址>
c=IN IP4 120.24.99.xx # 连接信息

媒体级别的描述
m=<媒体类型><媒体端口><传输协议><编码pt值的集合> #音频m行/视频m行
m=audio 9 UDP/TLS/RTP/SAVPF 111 103 104 9 0 8 106 105 13 126 # 音频媒体流
a=group:BUNDLE audio video # 媒体流类型
a=msid-semantic: WMS * # 媒体流标识符
a=mid:0 #媒体标识符
a=rtcp:9 IN IP4 0.0.0.0 # RTCP 的 IP 地址
a=candidate:0 1 UDP 2122252543 120.24.99.xx 9 typ host # 候选 IP 地址
...等等等
```

SDP 信息过长时，需要去除一部分内容（媒体级别的描述），可以去除的原因是不是每种编码都会被用到，我们只需保留需要用到的编码

```js

【一个删减冗余SDP信息的示例代码】

const removePayloadType = (sdp) => {

    if (!sdp) return

    let templateAry = <any>[]
    let flag = true
    let vn1, vn2, an1, an2, an3, aname, vname

    //找到需要保留的编码pt值（包括音频和视频）
    for (let index = 0; index < sdp.length; index++) {
      const a = sdp[index]

      if (a.name == 'rtpmap' || a.name == 'rtcp-fb' || a.name == 'fmtp') {
        const n = parseInt(a.value)
        if (a.value.includes('packetization-mode=1;profile-level-id=42e01f')) {
          vn1 = n
        }
        if (a.value.includes('opus/48000/2')) {
          an1 = n
        }
        if (a.value.includes('PCMA/800')) {
          an2 = n
        }
        if (a.value.includes('telephone-event/8000')) {
          an3 = n
        }
        if (vn1 && a.value.includes('apt=' + vn1) && flag) {
          flag = false
          vn2 = n
        }
      }
    }

    //根据推演的编码pt值拼接出m行的字符串
    aname = 'audio 9 UDP/TLS/RTP/SAVPF ' + an1 + ' ' + an2 + ' ' + an3
    vname = 'video 9 UDP/TLS/RTP/SAVPF ' + vn1 + ' ' + vn2

    //将有效的值重新推回SDP
    for (let index = 0; index < sdp.length; index++) {
      const a = sdp[index]

      if (a.type == 'm') {
        if (a.name.indexOf('audio') != -1) {
          templateAry.push({
            name: aname,
            type: 'm',
            value: ''
          })
        } else if (a.name.indexOf('video') != -1) {
          templateAry.push({
            name: vname,
            type: 'm',
            value: ''
          })
        }
      } else {
        if (a.type !== 'a') {
          templateAry.push(a)
        } else {
          if (a.name == 'rtpmap' || a.name == 'rtcp-fb' || a.name == 'fmtp') {
            const n = parseInt(a.value)
            // 有效载荷类型  payload type
            if (n == an1 || n == an2 || n == an3 || n == vn1 || n == vn2) {
              templateAry.push(a)
            }
          } else {
            templateAry.push(a)
          }
        }
      }
    }
    console.log('sdp新', templateAry)

    return templateAry
  }

  需要配合以下两个辅助方法

  // 解析sdp字符串为数组

  const parseSdp = (text) => {
    if (!text) return null
    const lines = text.split('\r\n')
    const sdp = <any>[]
    for (const index in lines) {
      const line = lines[index] //单条SDP字符串
      const t = line.substring(0, 1) //【行开头字母】
      const ll = line.substring(2) //行剩余部分（去除'='）
      const sc = ll.indexOf(':') //在行剩余部分中':'对应的下标
      let n, v
      if (sc < 0) {
        //如果行剩余部分不存在:
        n = ll
      } else {
        n = ll.substring(0, sc) // 【":" 之前的字符串，表示信息名称。】
        v = ll.substring(sc + 1) // 【':' 后面的字符串，表示信息值。】
      }

      if (v) {
        //如果v存在
        sdp.push({
          type: t,
          name: n,
          value: v
        })
      } else {
        sdp.push({
          type: t,
          name: n
        })
      }
    }
    return sdp
  }

  // 解析sdp数组为字符串
  const renderSdp = (sdp) => {
    if (!sdp) return null
    let sdpString = ''
    for (const index in sdp) {
      const a = sdp[index]
      if (!a.value) {
        sdpString += a.type + '=' + a.name + '\r\n'
      } else {
        sdpString += a.type + '=' + a.name + ':' + a.value + '\r\n'
      }
    }
    return sdpString
  }

```

#### 2、ICE

交互式连接建立（ICE）是允许您的 Web 浏览器与对等方连接的框架。A 到 B 两个客户端能够点对点通信的基础就是建立通信，但是很多情况下两个设备之间并没有公网 IP，而且还有防火墙这些阻断数据传输，这个时候就需要 STUN 来为你提供一个独一无二的地址和 TURN 服务器中继数据。

`ICE（Interactive Connectivity Establishment）` 是一种用于建立对等连接的网络协议。它通过在两个设备之间传输网络地址信息，帮助设备在存在防火墙、`NAT（Network Address Translation）`或代理服务器等网络障碍的情况下建立直接连接。<mark>ICE 使用 STUN 和 TURN 协议来实现这一目标。</mark>

> NAT 是将私有 IP 地址通过边界路由转换成外网 IP 地址，在边界路由的 NAT 地址转换表记录下这个转换映射记录，当外部数据返回时，路由使用 NAT 技术查询 NAT 转换表，再将目标地址替换成内网用户 IP 地址。（简单理解就是 IPV4 地址不够用了，所以某一个公司或组织共用一个地址，形成一个局域网，这个局域网里面又有很多二级 IP，二级 IP 与外部通信要经过边界路由）

> NAT 是一种网络技术，用于将私有 IP 地址转换为公共 IP 地址，并允许多个设备通过共享一个公共 IP 地址来访问 Internet。NAT 会在数据包进入或离开私有网络时修改数据包中的源 IP 地址和端口以及目标 IP 地址和端口。这种转换可能会导致对等通信受阻，因为外部设备无法直接访问内部私有网络中的设备。

<mark>如果仅是公司内网中进行通信，不需要考虑这个问题</mark>

以下是 `gpt` 给的一个使用示例：

```js
// 创建RTCPeerConnection对象
const peerConnection = new RTCPeerConnection();

// 添加STUN服务器
const stunServer = {
  urls: 'stun:stun.l.google.com:19302',
};
peerConnection.addIceServer(stunServer);

// 添加TURN服务器
const turnServer = {
  urls: 'turn:your-turn-server.com',
  username: 'your-username',
  credential: 'your-password',
};
peerConnection.addIceServer(turnServer);

【请注意，在实际应用中，你需要根据自己的需求和网络环境来选择合适的STUN和TURN服务器，并进行相应配置。同时，请确保在实际部署时遵循安全最佳实践，并考虑网络延迟、带宽等因素。】
```

### 四、WebRTC API

1、[MediaStream](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaStream)

媒体流。一个流包含几个轨道，比如视频和音频轨道。

```js

属性：

MediaStream.active  如果这个流处于活动状态值为 true，反之为 false

MediaStream.id  这个对象的唯一标识符 (GUID)

事件：

MediaStream.onaddtrack  addtrack 事件在这个对象上触发时调用的事件处理器，这时一个MediaStreamTrack对象被添加到这个流。

MediaStream.onremovetrack   removetrack 事件在这个对象上触发事调用的事件处理器，这时一个对象从流上移除。

MediaStream.onended 这是当流终止 ended 时触发的事件。

方法：

MediaStream.addTrack()

MediaStream.clone() 返回这个 MediaStream 对象的克隆版本。返回的版本会有一个新的 ID。

MediaStream.getTracks() 返回流中所有的MediaStreamTrack列表。

MediaStream.getAudioTracks()

MediaStream.getTrackById()

MediaStream.getVideoTracks()

MediaStream.removeTrack()

```

2、[MediaStreamTrack](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaStreamTrack)

表示一段媒体源，比如音轨或视频

```js

属性：

MediaStreamTrack.enabled   布尔值，为 true 时表示轨道有效，并且可以被渲染。为 false 时表示轨道失效，只能被渲染为静音或黑屏。

MediaStreamTrack.id   返回一个由浏览器产生的DOMString类型的 GUID 值，作为这个轨道的唯一标识值。

MediaStreamTrack.kind   如果为“audio”表示轨道为音频轨道，为“video”则为视频轨道。

MediaStreamTrack.label  标识该轨道的来源，如“internal microphone”（内部麦克风）

MediaStreamTrack.muted  为 true 时表示轨道是静音，其他为 false。

MediaStreamTrack.readyState 表示轨道的当前状态，"live"表示当前输入已经连接并且在尽力提供实时数据。
                            “ended”表示这个输出连接没有更多的数据了，而且也不会提供更多的数据了。


事件：

MediaStreamTrack.onstarted

MediaStreamTrack.onmute

MediaStreamTrack.onunmut

MediaStreamTrack.onoverconstrained

MediaStreamTrack.oneended

方法：

MediaStreamTrack.getConstraints()

MediaStreamTrack.applyConstraints()

MediaStreamTrack.getSettings()

MediaStreamTrack.getCapabilities()

MediaStreamTrack.clone()

MediaStreamTrack.stop()
```

3、[RTCPeerConnection](https://developer.mozilla.org/zh-CN/docs/Web/API/RTCPeerConnection)

`RTCPeerConnection` 接口代表一个由本地计算机到远端的 WebRTC 连接。该接口提供了创建，保持，监控，关闭连接的方法的实现。

一个基本的 `RTCPeerConnection` 使用需要协调本地机器以及远端机器的连接，它可以通过在两台机器间生成 `Session Description` 的数据交换协议来实现。呼叫方发送一个 `offer`(请求)，被呼叫方发出一个 `answer`（应答）来回答请求。

只有轨道从一个点发送到另一个点，而不是一个媒体流。

```js

构造函数：

RTCPeerConnection.RTCPeerConnection()   创建一个新的 RTCPeerConnection 对象。

事件：

RTCPeerConnection.ontrack   传入媒体流事件，常用于监听远程流。

RTCPeerConnection.onicecandidate   当RTCPeerConnection.setLocalDescription() 方法更改本地描述之后，会抛出 icecandidate 事件。
                                   该事件的监听器需要将更改后的描述信息传送给远端 RTCPeerConnection，以更新远端的备选源。

方法：

RTCPeerConnection.addTrack()    将一个新的媒体音轨添加到一组音轨中，这些音轨将被传输给另一个对等点。
                                参数：
                                    track：一个MediaStreamTrack对象，表示要添加到对等连接的媒体轨道。
                                    stream...(可选)：一个或多个本地的MediaStream对象，将track与特定的 stream 相关联

RTCPeerConnection.createOffer() 启动创建一个SDP offer，目的是启动一个新的 WebRTC 去连接远程端点。

                                返回的结果是一个RTCSessionDescription对象{type:offer,sdp:'xxx'}

RTCPeerConnection.setLocalDescription() 设置本地的 SDP 描述，参数是上一个方法返回的RTCSessionDescription对象

```

### 五、demo

> 当用户向另一个用户发起 WebRTC 呼叫时，会创建一个特殊的描述，称为 offer。此描述包括有关呼叫者为呼叫建议的配置的所有信息。然后，接收者用一个答案来回应，这是他们通话结束的描述。以此方式，两个设备彼此共享为了交换媒体数据所需的信息。这种交换是使用交互式连接建立（ICE）处理的，该协议允许两个设备使用中介程序交换要约和答复，即使两个设备之间都被网络地址转换（NAT）隔开。然后，每个对等方都保留两个描述：本地描述（描述自己）和远程描述（描述呼叫的另一端）

![ ](https://mmbiz.qpic.cn/mmbiz_png/6zHE5SI9ZzzXLB9YayRO9atG0woyymcOZ9ib24WOOdTNqsSz5hlgRRria9icNlyS9aH5QibNYLxFq82uiaricFztqgzw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

**注意图片右上有一句【设置为本地描述】，应当是【设置为远程描述】**

```js

<template>
  <div class="page-container">
    <div class="video-container">
      <div class="video-box">
        <!-- 给自己本地的视频播放设置静音，防止产生回音 -->
        <video id="local" autoplay playsinline muted></video>
        <div class="video-title">local</div>
      </div>
      <div class="video-box">
        <video id="remote" autoplay playsinline></video>
        <div class="video-title">remote</div>
      </div>
    </div>
    <div class="operation">
      <!-- step1 -->
      <div class="step">
        <p>作为拨号方step1</p>
        <p class="desc">
          <button id="create-offer" @click="createOffer">生成 SDP Offer</button>
        </p>
        <p>
          <sapn>SDP offer:</sapn>
          <input v-model="offerSdp" />
          <button @click="copyToClipboard(offerSdp)">点击复制</button>
        </p>
      </div>

      <!-- step2 -->
      <div class="step">
        <p>作为接听方</p>
        <input v-model="offerSdp2" />
        <button @click="createAnswer">创建 Answer</button>
        <p>
          <span>SDP Answer:</span>
          <input v-model="answerSdp" />
          <button @click="copyToClipboard(answerSdp)">点击复制</button>
        </p>
      </div>

      <!-- step3 -->
      <div class="step">
        <p>作为拨号方step2</p>
        <p>
          <span>SDP Answer:</span>
          <input v-model="answerSdp2" />
          <button @click="addAnswer">Add Answer</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import 'webrtc-adapter'
/* 本例既实现了拨号，也实现了接听，新开一个浏览器窗口就能分别作为拨号方与接听方测试两个功能*/

// 创建一条由本地计算机到远端的 WebRTC 连接
const pc = new RTCPeerConnection({})

// 创建本地和远端的空媒体流
let localStream: MediaStream
let remoteStream: MediaStream

const offerSdp = ref('')
const answerSdp = ref('')

// 初始化
const init = async () => {
  // 获取本地端视频标签
  const localVideo = document.getElementById('local') as HTMLVideoElement
  // 获取远程端视频标签
  const remoteVideo = document.getElementById('remote') as HTMLVideoElement
  // 获取本地媒体流
  localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
  })
  // 设置本地视频流
  localVideo.srcObject = localStream
  // 【添加本地流到 pc】①
  localStream.getTracks().forEach((track) => {
    pc.addTrack(track, localStream)
  })
  // 【监听远程流】：②
  pc.ontrack = (event) => {
    remoteStream = event.streams[0] //一般只有第一个元素有值
    remoteVideo.srcObject = remoteStream
  }
}

// 【创建 offer IDP（拨号）】③
const createOffer = async () => {
  const offer = await pc.createOffer()

  await pc.setLocalDescription(offer)

  pc.onicecandidate = async (event) => {
    if (event.candidate) {
      /*
        通过人工拷贝黏贴的形式，模拟信令服务器帮助用户传递关键信息的过程。
      */
      offerSdp.value = JSON.stringify(pc.localDescription)
    }
  }
}

// 创建 answer（应答）
const offerSdp2 = ref('')
const createAnswer = async () => {
  /*
    通过人工拷贝黏贴的形式，模拟信令服务器帮助用户传递关键信息的过程。
  */
  const offer = JSON.parse(offerSdp2.value) //需要把手动复制的字符串还原成RTCSessionDescription对象

  await pc.setRemoteDescription(offer)

  const answer = await pc.createAnswer()

  await pc.setLocalDescription(answer)
  pc.onicecandidate = async (event) => {
    if (event.candidate) {
      /*
        通过人工拷贝黏贴的形式，模拟信令服务器帮助用户传递关键信息的过程。
      */
      answerSdp.value = JSON.stringify(pc.localDescription)
    }
  }
}

// 【添加 answer(应答)】
const answerSdp2 = ref('')
const addAnswer = async () => {
  /*
    通过人工拷贝黏贴的形式，模拟信令服务器帮助用户传递关键信息的过程。
  */
  const answer = JSON.parse(answerSdp2.value) //需要把手动复制的字符串还原成RTCSessionDescription对象
  if (!pc.currentRemoteDescription) {
    pc.setRemoteDescription(answer)
  }
}

// 复制内容到剪贴板
const copyToClipboard = (val: string) => {
  navigator.clipboard.writeText(val)
}

onMounted(() => {
  init()
})
</script>

<style lang="less" scoped>
.page-container {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;

  .video-container {
    display: flex;
    justify-content: space-around;

    .video-box {
      position: relative;
      width: 45%;

      .video-title {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: rgb(0 0 0 / 50%);
        color: #fff;
        text-align: center;
        padding: 5px 0;
      }
    }

    video {
      width: 100%;
      height: 100%;
      transform: rotateY(180deg); //将视频镜像
      background-color: #e3ffeb;
    }
  }

  .operation {
    width: 520px;

    .step {
      padding: 30px;
      margin: 10px 0;
      border-radius: 20px;

      .user {
        width: 200px;
        text-align: center;

        padding: 10px;
        font-weight: bold;
        border-radius: 20px;
      }

      .desc {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 10px 0;
        gap: 20px;
      }
    }
  }
}
</style>


```

如果需要屏幕共享，只需要做一点小小的改动：

```js
// 获取本地媒体流
// localStream = await navigator.mediaDevices.getUserMedia({
//   video: true,
//   audio: true
// })
// 获取屏幕共享
localStream = await navigator.mediaDevices.getDisplayMedia();
```

### 六、引用

> [WebRTC 从实战到未来！前端如何实现一个最简单的音视频通话？🔥](https://juejin.cn/post/7165539003465531399#comment)

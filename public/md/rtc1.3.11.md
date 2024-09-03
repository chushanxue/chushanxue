## 一、音频波形图带播放

找了个插件：[wavesurfer.js](https://github.com/katspaugh/wavesurfer.js)

`npm install wavesurfer.js`

```html
v-if="showWave"这句不能加到waveform容器上，否则会报错，无法渲染

<h6
  style="font-size: 14px;color: rgba(0, 0, 0, 0.8);margin: 10px 0;"
  v-if="showWave"
>
  音频波形图
</h6>
<div id="waveform" ref="waveform"></div>
<el-button
  type="primary"
  @click="playMusic"
  style="background:#409EFF;text-align: center;"
  v-if="showWave"
>
  <i class="el-icon-video-play"></i>
  播放 /
  <i class="el-icon-video-pausee"></i>
  暂停
</el-button>
```

```js
import WaveSurfer from 'wavesurfer.js'

data() {
    return{
    wavesurfer: null
    }
}

mounted() {
    this.drawWave();
  },

    methods: {
    playMusic() {
      //"播放/暂停"按钮的单击触发事件，暂停的话单击则播放，正在播放的话单击则暂停播放
      this.wavesurfer.playPause.bind(this.wavesurfer)();
    },
    drawWave() {

            ------------------------------------------
            this.wavesurfer = WaveSurfer.create({
              container: document.getElementById("waveform"),
              barWidth: 1,
              cursorColor: "#303133",
              progressColor: '#409EFF',
              backend: "MediaElement",
              audioRate: "1",
            });
            // 特别提醒：如果是本地音频文件，则此处需要使用require(相对路径)，否则会报错
            this.wavesurfer.load(v); //这里的v是后端给的音频文件的服务器地址（浏览器打开能直接下载的那种）
            --------------------------------------------

            this.showWave =true;


    },
    }
```

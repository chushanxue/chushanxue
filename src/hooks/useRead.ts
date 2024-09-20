/**
 * 调用Web Speech API实现语音播报功能
 */

import { message } from 'antd';

//语音合成服务的控制器接口，可用于获取设备上可用的合成语音，开始、暂停以及其他相关命令的信息。
// https://developer.mozilla.org/zh-CN/docs/Web/API/SpeechSynthesis

const synth = window.speechSynthesis;

// 获取设备上可用的合成语音列表，并选择想要的声音
const getWindowVoice = () => {
  return synth
    .getVoices()
    .find((item) => item.localService && item.lang === 'zh-CN');
};

// 开始语音播报
export const handleSpeak = (text: string) => {
  synth.cancel();
  if (synth) {
    // 新建语音请求：包含语音服务应读取的内容以及有关如何读取它的信息（例如语言、音调和音量）
    const msg = new SpeechSynthesisUtterance();
    msg.text = text; // 文字内容
    msg.lang = 'zh-CN'; // 使用的语言:中文
    msg.volume = 1; // 声音音量：1
    msg.rate = 1; // 语速：1
    msg.pitch = 1; // 音高：1
    msg.voice = getWindowVoice() ?? null; // 使用本地服务合成语音(若是获取不到，请异步获取, 加一个setTimeout)

    // 朗读完毕回调
    msg.onend = () => {};

    synth.speak(msg); // 播放
  } else {
    message.info(
      '很抱歉，您使用的浏览器不支持 Web Speech API，请更换为chrome内核的浏览器',
    );
  }
};

export const endSpeak = () => {
  synth.cancel();
};

// 语音播报前，建议先进行特殊字符转换
export const trans = (content: string) => {
  let reg = /[<>-]/g;
  let newStr = content.replace(reg, function (match) {
    if (match === '<') {
      return '小于';
    } else if (match === '>') {
      return '大于';
    } else {
      return '减';
    }
  });
  return newStr;
};

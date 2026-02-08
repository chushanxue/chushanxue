### 引言

[官方文档](https://docs.trae.cn/ide/what-is-trae?_lang=zh)

- 如何理解TRAE

  TRAE 深度融合 AI 能力，是一名能够理解需求、调用工具并独立完成各类开发任务的“AI开发工程师”。能够帮助我们高效地推进项目进度

- TRAE可以做什么

  - 代码生成
  - 项目构建
  - 对话式编程

- IDE模式和SOLO模式

  - IDE模式侧重人机协作（保留传统开发流程，支持智能问答、代码补全等辅助功能，用户对开发过程有更强掌控感，适合需要精细控制代码或逐步验证逻辑的开发者。）
  - SOLO模式侧重AI自主开发（AI主导全流程(需求理解、编码、测试、部署)，通过自然语言输入即可自主完成开发任务，自动化程度高）
    - SOLO Builder：聚焦快速原型开发，通过自然语言描述生成完整Web应用(含前后端)，适合从零到一的场景、个人与小团队高效落地项目。
    - SOLO Coder：面向专业开发者，处理复杂项目迭代、代码重构、Bug修复等工程化任务，支持多任务并行和智能体协同，提供"plan"模式辅助开发计划。（plan模式：为完成任务制定详细的计划，先和用户沟通制定计划，确认后再执行）

### 上手

- 在`trae`中打开`ai_coding`父文件夹，在终端输入命令`pnpm dlx create-umi@latest`即可创建子文件夹，且具备umi模板内容
- 直接将新文件夹拖动至`trae`图表，即可在`trae`中打开新窗口
- `command + u` 打开chat面板，使用内置智能体build，输入提示词

### 搭配claude code

#### 安装

我们可以直接把claude code的官方文档粘贴到对话框，让trae帮忙安装好（小红书看到的操作，自己之前没有想到，只想到手动安装，其实有trae或者cursor帮忙事半功倍）

安装时记得切换端口为7891（可以直接告诉模型你的vpn端口是7891，模型会帮忙切换）

这里有一个问题，ds处理起来不太可靠，但是切换到gpt模型，安装就成功了，模型之间的差别还是非常大的，所以这一块记得分析对比清楚

#### api key

最便宜的方案就是deepseek

[https://api-docs.deepseek.com/zh-cn/guides/anthropic_api](https://api-docs.deepseek.com/zh-cn/guides/anthropic_api)

按照命令进行配置api keys，一开始提示欠费，因为没充钱，复制`https://platform.deepseek.com/top_up`到文件传输助手，在微信打开链接，可以直接微信支付，充完立马可以用了，别的什么都不用改

另：可以借助brew安装cc switch [https://github.com/farion1231/cc-switch/releases](https://github.com/farion1231/cc-switch/releases)（注意打开任何安装来源）但是暂未知道有何用处

### 引用

> [Trae 保姆级教程｜AI 编程工具完整入门，实战项目手把手教学](https://www.bilibili.com/video/BV1PwBuBtEZo/?spm_id_from=333.788.recommend_more_video.3&trackid=web_related_0.router-related-2206146-6xwrg.1769329655937.151&vd_source=c108fb8f6c838d5d891d1da802282ab5)

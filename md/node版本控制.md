## 一、前言

node官网：<https://nodejs.org/en>

> 如要查看`windows`相关环境变量配置，可以通过`git`查看本文历史版本，最新版本仅保留`nvm`相关操作

## 二、nvm 命令

```bash

安装最新稳定版node
nvm install stable

安装指定版本，可模糊安装
nvm install <version>
nvm install v16.17.0 / nvm install 16.17.0

删除已安装的指定版本，语法与 install 用法一致
nvm uninstall <version>
nvm uninstall  v16.17.0 / nvm uninstall  16.17.0

切换使用指定的版本 node
nvm use <version>   临时版本 - 只在当前窗口生效指定版本
nvm alias default <version>  永久版本 - 所有窗口生效指定版本（这个命令非常重要）

列出所有安装的版本
nvm ls

显示当前的版本
nvm current / node -v

```

## 三、注意

切换`node`版本后需要彻底重启所要用到 `node` 的窗口

## 四、node版本相关

LTS ： `Long Term Support`：长期支持版本，维护更新周期一般为3-5年，即稳定版（建议使用这个版本）

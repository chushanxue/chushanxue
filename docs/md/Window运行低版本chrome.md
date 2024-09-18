`chrome` 升级到最高版本以后，想降低版本是十分麻烦的，因为`chrome` 没有官方的版本控制管理，若想同时在电脑上运行多个版本的浏览器，除虚拟机方案及付费网站方案外，以下是我认为的最佳实践：

### 1、下载需要的浏览器版本

指路：https://www.chromedownloads.net/chrome64win/

下载完不要安装，修改后缀名 `exe` 为 `zip`

需要解压两次，依次为`chrome.7z`--->`Chrome-bin`

### 2、手动创建文件夹

![ ](/md/Window运行低版本chrome/1.png)

在合适的目录下新建 `chrome` 文件夹，以版本名命名为子文件夹，如 104，将刚才的`Chrome-bin`文件夹复制进 104

### 3、下载启动器

指路：https://portableapps.com/apps/internet/google_chrome_portable

将启动器粘贴到刚才的 104 文件夹

点击启动器，即可运行 104 版本的浏览器，注意需要先关闭当前运行的高版本浏览器，如果启动器运行完并没有回退到指定版本，就多试几次，在 104 文件夹里尝试其他入口

另，如果想用回最新版本的浏览器，就将刚刚的`Chrome-bin`文件夹压缩（删除同理），再次打开浏览器即可

![ ](/md/Window运行低版本chrome/2.png)

> [Window 同时兼容运行多版本谷歌浏览器 chrome](https://blog.csdn.net/qq_41914120/article/details/121395369)

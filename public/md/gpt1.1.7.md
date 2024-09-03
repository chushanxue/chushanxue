## 一、实现聊天记录分享

### 1、总体设计

- 点击分享按钮

  - 页面隐藏输入框
  - 会话内容变为可勾选状态（每一轮对话为一个勾选单位，不可只勾问题或者答案）
  - 输入框位置展示导出操作banner

- 勾选会话内容

  - 记录勾选id（以便筛选）

- 点击预览

  - 通过筛选后的数据形成一个新的UI页，并以弹窗形式展现

- 点击导出

  - 将新的UI页转为图片（html-to-image）
  - 直接下载到本地（blob）

- 切换会话窗口
  - 关闭分享状态
  - 清空已选id

### 2、详细设计

```js
import { toPng } from 'html-to-image';

const download = () => {
  const dom = previewRef.current;

  if (!dom || selectedMessages.length === 0) {
    message.info('请先选择需要导出的聊天记录');
    return;
  }
  toPng(dom)
    .then((blob) => {
      if (!blob) return;
      const link = document.createElement('a');
      link.download = '聊天记录分享.png';
      link.href = blob;
      link.click();
    })
    .catch((e) => console.log('[Export Image] ', e));
};

<div ref={previewRef}>
  <Preview selectedMessages={selectedMessages} />
</div>;
```

## 二、实现知识库管理

包括**数据集列表**和**数据集明细列表**，本质上是表单及列表的组合，属于最基础的前端开发任务

### 1、总体设计

- 查询条件使用`space`组件包裹，节省样式调整时间
- 列表使用固定表头，固定高度滚动
  - antd 的 Table 组件，其中scroll属性中的y不能赋值百分数，只能为固定值，且无法像x一样自适应，导致不同高度的浏览器视口无法统一滚动高度，所以在检测到视口高度变化时，需要手动赋值
- 数据集名称列使用`<a>`标签包裹，既添加了样式，又能添加点击事件，跳转到明细列表
  - 以后这种需要添加点击事件的，都可以用`<a>`标签包裹
- 导入数据操作
  - 点击导入按钮，弹出导入弹窗
  - 文件上传成功后（假性成功，此时还未调用接口），禁用导入组件（接口限制，每次只允许上传一个文件，前端也同步限制）
  - 点击弹窗确定按钮，上传文件，成功后自动关闭弹窗，刷新列表
- 列表列数据省略配置
  - 如果只是简单的省略，我们可以使用antd自带的省略配置
  - 但antd默认省略右侧数据，如果我们又要省略原始数据，又需要在右侧添加一些图标操作，那么这些图标操作也会被省略，所以就要自己实现一个省略（截取原始数据前n个字符，手动添加上省略号即可）

### 2、详细设计

#### ①自使应高度滚动

```js
const [windowHeight, setWindowHeight] = useState();

useEffect(() => {
  const handleResize = () => {
    setWindowHeight(window.innerHeight);
  };
  window.addEventListener('resize', handleResize);
  // 在组件卸载时移除事件监听器
  return () => window.removeEventListener('resize', handleResize);
}, []); // 空依赖数组表示这个effect只会在组件挂载和卸载时运行

useEffect(() => {
  setScrollY(document.querySelector('.ant-card')?.clientHeight - 250);
}, [windowHeight]); // window.innerHeight是只读属性，不能直接监听

useMount(() => {
  getData(pagination.current || 1, pagination.pageSize || 10);
  // 注意赋值时机
  setWindowHeight(window.innerHeight);
});

<Table scroll={{ y: scrollY }} />;
```

一套操作猛如虎，然后发现官方提供了写法。。。。

```js
scroll={{ y: 'calc(100vh - 350px)' }}
```

#### ②导入数据操作

```js
  // 赋值操作放在弹窗里面，就不会存在打开弹窗和赋值操作谁先谁后的问题了
   useEffect(() => {
    setId(record?.id);
  }, [record, isUploadModalOpen]);//仅用record无法触发打开同一个弹窗时的赋值


  const props: UploadProps = {
    showUploadList: {
      showRemoveIcon: false,
    },
    onChange(info) {
      const fileType = info.file.name.split('.').pop();
      if (fileType === 'xlsx') {
        setFileList(() => info.fileList);
        info.file.status = 'done'; //手动更改文件状态（假性上传成功）
      } else {
        message.info('仅支持上传excel文件');
      }
    },
    fileList, //上传列表可控化
    customRequest: () => {
      console.log('捕获默认上传事件，不作处理');
    },
  };

    // 真正的上传操作
    const handleOk = () => {
    //检验是否有上传文件
    if (fileList && fileList.length) {
      const formData = new FormData();
      formData.append('file', fileList[0].originFileObj);
      //调用上传接口
      uploadData({ id, formData }).then((res) => {
        if (res.code === 200) {
          message.success('上传成功');
          getData(1, 10);
          setIsUploadModalOpen(false);
          // 关闭弹窗前记得清除数据
          setFileList(() => []);
        }
      });
    } else {
      message.error('请上传文件后再提交!');
    }
  };
```

```js
<Modal
  title="数据导入"
  open={isUploadModalOpen}
  onOk={handleOk}
  onCancel={handleCancel}
>
  <Dragger {...props} disabled={fileList.length > 0}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">请上传导入数据</p>
    <p className="ant-upload-hint">点击上传，或将文件拖拽到此处</p>
  </Dragger>
</Modal>
```

#### ③列表列数据省略配置

```js
{
    title: 'embeddingValue',
    dataIndex: 'embeddingValue',
    key: 'embeddingValue',
    render: (embeddingValue: any) => (
      <>
        <span>{JSON.stringify(embeddingValue).slice(0, 15) + '....'}</span>
        <a
          onClick={() => {
            copyToClipboard(JSON.stringify(embeddingValue));
          }}
        >
          <CopyOutlined />
        </a>
      </>
    ),
  },
```

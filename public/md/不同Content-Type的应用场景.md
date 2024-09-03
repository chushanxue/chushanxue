## 一、前言

在HTTP协议消息头中，使用`Content-Type`来表示媒体类型信息。它被用来告诉服务端如何处理请求的数据，以及告诉客户端（一般是浏览器）如何解析响应的数据，比如显示图片，解析html或仅仅展示一个文本等。

## 二、分类

### 1、application/json

最常用，axios默认方式，以“键-值”对的方式组织数据，直接拼在`url`后面

浏览器载荷处显示：查询字符串参数

```js
/** 退出登录接口 */
export async function outLogin(options?: { [key: string]: any }) {
  return request('xxxx', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}
```

### 2、application/x-www-form-urlencoded

不支持文件，一般用于表单提交

浏览器载荷处显示：表单数据

```js
/** 登录接口 POST*/
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  const formData = new URLSearchParams({
    grant_type: 'password',
    username: body.username,
    password: passwordEncryption(body.password) || '',
    scope: 'all',
  });
  return request<API.LoginResult>('xxxx', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'xxx',
    },
    data: formData,
    ...(options || {}),
  });
}
```

### 3、multipart/form-data

仅支持post请求，主要用于上传文件，**也可携带文件以外的其他参数**

浏览器载荷处显示：表单数据

```js
/** 上传数据 POST */
export async function uploadData(
  data: {
    formData?: any;
  },
  options?: { [key: string]: any },
) {
  return request('xxxx', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: data.formData,
    ...(options || {}),
  });
}


 const formData = new FormData();
 formData.append('file', fileList[0].originFileObj);
 formData.append('title', values.title);
 formData.append('modelName', values.modelName);
 uploadData({
    formData,
 });
```

补充一下File 的知识：

File 对象代表一个文件，用来读写文件信息。它继承了 Blob 对象，或者说是一种特殊的 Blob 对象，所有可以使用 Blob 对象的场合都可以使用它。

最常见的使用场合是表单的文件上传控件（`<input type="file">`），用户选中文件以后，浏览器就会生成一个数组，里面是每一个用户选中的文件，它们都是 File 实例对象。

File 对象有以下实例属性：

- File.lastModified：最后修改时间
- File.name：文件名或文件路径
- File.size：文件大小（单位字节）
- File.type：文件的 MIME 类型

### 4、application/vnd.ms-excel

用于下载excel文件

```js
/** 导出查询结果 GET  */
export async function exportData(
  params: {
   ....
  },
  options?: { [key: string]: any },
) {
  return request('/chatbot-manage/api/chatbot/exportData', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/vnd.ms-excel',
    },
    responseType: 'blob', // 必填，否则不会生效
    params, // 支持带查询参数
    ...(options || {}),
  });
}

  const { run: download } = useRequest(exportData, {
    manual: true,
    onSuccess(data) {
      const blob = new Blob([data], { type: 'text/xlsx,charset=UTF-8' });
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.setAttribute(
        'download',
        '自定义标题' + '.xlsx',
      );
      link.click();
    },
  });
```

#### Blob

补充一下Blob的知识：

Blob 对象表示一个二进制文件的数据内容，比如一个图片文件的内容就可以通过 Blob 对象读写。它通常用来读写文件，它的名字是 Binary Large Object （二进制大型对象）的缩写。**属于浏览器提供的接口**

浏览器原生提供Blob()构造函数，用来生成实例对象。:`new Blob(array [, options])`

Blob构造函数接受两个参数。第一个参数是数组，成员是字符串或二进制对象，表示新生成的Blob实例对象的内容；第二个参数是可选的，是一个配置对象，目前只有一个属性type，它的值是一个字符串，表示数据的 MIME 类型，默认是空字符串。

- `Blob`具有两个实例属性`size`和`type`，分别返回数据的大小和类型。
- `AJAX` 请求时，如果指定`responseType`属性为`blob`，`xhr.response`拿到的就是一个 `Blob` 对象。
- 浏览器允许使用`URL.createObjectURL()`方法，针对 `Blob` 对象生成一个临时 URL，以便于某些 `API` 使用。
  > 浏览器处理 Blob URL 就跟普通的 URL 一样，如果 Blob 对象不存在，返回404状态码；如果跨域请求，返回403状态码。Blob URL 只对 GET 请求有效，如果请求成功，返回200状态码。**由于 Blob URL 就是普通 URL，因此可以下载**。

#### 错误处理

当接口出错时，且非请求层面的报错，而是业务层面的报错，此时http还是200,但不会再返回Blob，而是返回一个错误对象，里面包含了需要展示的错误信息

那么，就遇到一个问题，既然请求时已经声明了`responseType: 'blob'`，那么只要请求成功了，都会返回一个Blob，到这一步就有点束手无策了，实际上，这个Blob是可以转换回原来的数据结构的，我们只需要改造一下处理代码

```js
const { run: download } = useRequest(exportData, {
  manual: true,
  onSuccess(data) {
    // 这部分属于另一种下载方式
    const file = new FileReader();
    file.readAsText(data, 'utf-8');
    file.onload = function () {
      if (isJSON(file.result)) {
        const obj = JSON.parse(file.result);
        message.error(obj.msg);
      } else {
        // 正常下载
        const blob = new Blob([data], { type: 'text/xlsx,charset=UTF-8' });
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.setAttribute('download', '对话记录' + '.xlsx');
        link.click();
      }
    };
  },
});
```

如果不喜欢两种处理方式混用，那么就用原来那一种也是可以处理的，原理一样，参考：<https://blog.csdn.net/qq_38417282/article/details/116148110>

```js
const blob = new Blob([res]);
// 不要直接转成excel文件，先转成json看看
blob.text().then((result) => {
  try {
    const jsonData = JSON.parse(result);
    if (jsonData.code && jsonData.msg) {
      alert(jsonData.msg);
    } else {
      alert('返回失败');
    }
  } catch (e) {
    const blob = new Blob([data], { type: 'text/xlsx,charset=UTF-8' });
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.setAttribute('download', '对话记录' + '.xlsx');
    link.click();
  }
});
```

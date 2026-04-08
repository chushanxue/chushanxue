## 一、概念

### 1、DOM

`DOM`是`JavaScript`操作网页的接口，全称为**文档对象模型**（`Document Object Model`）。它的作用是将网页转为一个JavaScript对象，从而可以用脚本进行各种操作（比如增删内容）。

### 2、节点与节点树

`DOM`的最小组成单位叫做节点（`node`）。文档的树形结构（`DOM`树），就是由各种不同类型的节点组成。

节点的类型有七种，其中`Document`和`Element`节点尤为重要，`Document`节点对象代表整个文档，`Element`节点对象对应网页的`HTML`元素。

以下是一些常用api：

```js
  //节点操作：
  document.getElementById()：通过元素的ID获取元素节点。
  document.getElementsByTagName()：通过标签名获取元素节点列表。
  document.getElementsByClassName()：通过类名获取元素节点列表。
  document.createElement()：创建一个新的元素节点。
  //属性操作：
  element.getAttribute()：获取指定属性的值。
  element.setAttribute()：设置指定属性的值。
  element.classList：用于添加、删除和切换元素的类名。
  //样式操作：
  element.style.property：设置或获取元素的样式属性值。
  //事件处理：
  element.addEventListener()：为指定事件添加事件处理程序。
  element.removeEventListener()：移除指定事件的事件处理程序。
```

`DOM`树类似于这样：

```html
<html lang="en">
  <head>
    <title>My Document</title>
  </head>
  <body>
    <h1>Header</h1>
    <p>Paragraph</p>
  </body>
</html>
```

### 3、Node 接口

浏览器提供一个原生的节点对象 Node，所有节点都继承了 Node，因此具有一些共同的属性和方法。这是`DOM`操作的基础。

- 常用属性

  - nodeType 属性返回一个整数值，表示节点的类型。
  - nodeName 属性返回节点的名称。
  - nodeValue 属性返回一个字符串，表示当前节点本身的文本值，该属性可读写。
  - textContent 属性返回当前节点和它的所有后代节点的文本内容。
  - baseURI 属性返回一个字符串，表示当前网页的绝对路径。
  - Node.ownerDocument 属性返回当前节点所在的顶层文档对象，即 document 对象。
  - Node.nextSibling 属性返回紧跟在当前节点后面的第一个同级节点。如果当前节点后面没有同级节点，则返回 null。
  - previousSibling 属性返回当前节点前面的、距离最近的一个同级节点。如果当前节点前面没有同级节点，则返回 null。
  - parentNode 属性返回当前节点的父节点。
  - parentElement 属性返回当前节点的父元素节点。
  - firstChild 属性返回当前节点的第一个子节点
  - childNodes 属性返回一个类似数组的对象（NodeList 集合），成员包括当前节点的所有子节点。
  - isConnected 属性返回一个布尔值，表示当前节点是否在文档之中。

- 常用方法

  - appendChild()方法接受一个节点对象作为参数，将其作为最后一个子节点，插入当前节点。该方法的返回值就是插入文档的子节点。
  - hasChildNodes 方法返回一个布尔值，表示当前节点是否有子节点。
  - cloneNode 方法用于克隆一个节点。它接受一个布尔值作为参数，表示是否同时克隆子节点。它的返回值是一个克隆出来的新节点。
  - insertBefore 方法用于将某个节点插入父节点内部的指定位置。
  - removeChild 方法接受一个子节点作为参数，用于从当前节点移除该子节点。返回值是移除的子节点。
  - replaceChild 方法用于将一个新的节点，替换当前节点的某一个子节点。
  - isEqualNode 方法返回一个布尔值，用于检查两个节点是否相等。所谓相等的节点，指的是两个节点的类型相同、属性相同、子节点相同。

## 三、引用

> [mdn 教程](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model) [阮一峰教程](https://wangdoc.com/javascript/dom/general)

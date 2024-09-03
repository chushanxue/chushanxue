## 一、概念

### 1、DOM

**DOM 是 JavaScript 操作网页的接口，全称为“文档对象模型”（Document Object Model）。它的作用是将网页转为一个 JavaScript 对象，从而可以用脚本进行各种操作（比如增删内容）。**

浏览器会根据 DOM 模型，将结构化文档（比如 HTML 和 XML）解析成一系列的节点，再由这些节点组成一个树状结构（DOM Tree）。所有的节点和最终的树状结构，都有规范的对外接口。

DOM 只是一个接口规范，可以用各种语言实现。所以严格地说，DOM 不是 JavaScript 语法的一部分，但是 DOM 操作是 JavaScript 最常见的任务，**离开了 DOM，JavaScript 就无法控制网页**。另一方面，JavaScript 也是最常用于 DOM 操作的语言。后面介绍的就是 JavaScript 对 DOM 标准的实现和用法。

<mark>DOM 是 web 上构成文档结构和内容的对象的数据表示。（DOM不是网页本身，而是网页的抽象表示）</mark>

### 2、DOM 树与节点

DOM 的最小组成单位叫做节点（node）。文档的树形结构（DOM 树），就是由各种不同类型的节点组成。每个节点可以看作是文档树的一片叶子。

一个文档的所有节点，按照所在的层级，可以抽象成一种树状结构。这种树状结构就是 DOM 树。它有一个顶层节点，下一层都是顶层节点的子节点，然后子节点又有自己的子节点，就这样层层衍生出一个金字塔结构，倒过来就像一棵树。

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

其 DOM 树类似于这样：

![ ](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_object_model/Using_the_Document_Object_Model/using_the_w3c_dom_level_1_core-doctree.jpg)

节点的类型有七种：

- Document：整个文档树的顶层节点
- DocumentType：doctype 标签（比如<!DOCTYPE html>）
- Element：网页的各种 HTML 标签（比如`<body>`、`<a>`等）
- Attr：网页元素的属性（比如 class="right"）
- Text：标签之间或标签包含的文本
- Comment：注释
- DocumentFragment：文档的片段

浏览器提供一个原生的节点对象 Node，上面这七种节点都继承了 Node，因此具有一些共同的属性和方法。

### 3、Node 接口

所有 DOM 节点对象都继承了 Node 接口，拥有一些共同的属性和方法。这是 DOM 操作的基础。

- 属性

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

- 方法

  - appendChild()方法接受一个节点对象作为参数，将其作为最后一个子节点，插入当前节点。该方法的返回值就是插入文档的子节点。
  - hasChildNodes 方法返回一个布尔值，表示当前节点是否有子节点。
  - cloneNode 方法用于克隆一个节点。它接受一个布尔值作为参数，表示是否同时克隆子节点。它的返回值是一个克隆出来的新节点。
  - insertBefore 方法用于将某个节点插入父节点内部的指定位置。
  - removeChild 方法接受一个子节点作为参数，用于从当前节点移除该子节点。返回值是移除的子节点。
  - replaceChild 方法用于将一个新的节点，替换当前节点的某一个子节点。
  - isEqualNode 方法返回一个布尔值，用于检查两个节点是否相等。所谓相等的节点，指的是两个节点的类型相同、属性相同、子节点相同。

### 4、document 节点

浏览器原生提供 document 节点，document 节点对象代表整个文档，每张网页都有自己的 document 对象。`window.document` 属性就指向这个对象。只要浏览器开始载入 HTML 文档，该对象就存在了，可以直接使用。

```html
document // 整个文档树
```

文档的第一层有两个节点，第一个是文档类型节点（`<!doctype html>`），第二个是 HTML 网页的顶层容器标签`<html>`。后者构成了树结构的根节点（root node），其他 HTML 标签节点都是它的下级节点。

除了根节点，其他节点都有三种层级关系。

- 父节点关系（parentNode）：直接的那个上级节点
- 子节点关系（childNodes）：直接的下级节点
- 同级节点关系（sibling）：拥有同一个父节点的节点

DOM 提供操作接口，用来获取这三种关系的节点。（节点操作）

<mark>一些常用的 document 属性：</mark>

- document.images 属性返回页面所有<img>图片节点。
- document.body 属性指向<body>节点

### 5、Element 节点

#### ① 相关属性

Element 节点对象对应网页的 HTML 元素。每一个 HTML 元素，在 DOM 树上都会转化成一个 Element 节点对象（简称元素节点）。

- 元素特性的相关属性

  - <mark>Element.id 属性返回指定元素的 id 属性，该属性可读写。</mark>
  - Element.tagName 属性返回指定元素的大写标签名，与 nodeName 属性的值相等。
  - Element.dir 属性用于读写当前元素的文字方向，可能是从左到右（"ltr"），也可能是从右到左（"rtl"）。
  - Element.accessKey 属性用于读写分配给当前元素的快捷键。
  - Element.draggable 属性返回一个布尔值，表示当前元素是否可拖动。该属性可读写。
  - Element.lang 属性返回当前元素的语言设置。该属性可读写。
  - Element.title 属性用来读写当前元素的 HTML 属性 title。该属性通常用来指定，鼠标悬浮时弹出的文字提示框。
  - Element.tabIndex 属性返回一个整数，表示当前元素在 Tab 键遍历时的顺序。该属性可读写。

- 元素状态的相关属性

  - Element.hidden 属性返回一个布尔值，表示当前 HTML 元素的 hidden 属性的值。该属性可读写，用来控制当前元素是否可见。(该属性与 CSS 设置是互相独立的。)
  - HTML 元素可以设置 contentEditable 属性，使得元素的内容可以编辑。
  - <mark>Element.attributes 属性返回一个类似数组的对象，成员是当前元素节点的所有属性节点</mark>
  - className 属性用来读写当前元素节点的 class 属性。它的值是一个字符串，每个 class 之间用空格分割。
  - <mark>classList 属性返回一个类似数组的对象，当前元素节点的每个 class 就是这个对象的一个成员。</mark>

    ```js

    classList对象有下列方法。

    add()：增加一个 class。
    remove()：移除一个 class。
    contains()：检查当前元素是否包含某个 class。
    toggle()：将某个 class 移入或移出当前元素。
    item()：返回指定索引位置的 class。
    toString()：将 class 的列表转为字符串。

    ```

  - <mark>Element.innerHTML 属性返回一个字符串，等同于该元素包含的所有 HTML 代码。该属性可读写，常用来设置某个节点的内容。</mark>
  - Element.outerHTML 属性返回一个字符串，表示当前元素节点的所有 HTML 代码，包括该元素本身和所有子元素。
  - <mark>Element.clientHeight 属性返回一个整数值，表示元素节点的 CSS 高度（单位像素），只对块级元素生效，对于行内元素返回 0。如果块级元素没有设置 CSS 高度，则返回实际高度。只包括元素本身的宽度和 padding，如果有水平滚动条，还要减去水平滚动条的宽度。</mark>
  - <mark>Element.clientWidth 属性返回元素节点的 CSS 宽度，同样只对块级元素有效，也是只包括元素本身的宽度和 padding，如果有垂直滚动条，还要减去垂直滚动条的宽度。</mark>
  - Element.clientLeft 属性等于元素节点左边框（left border）的宽度（单位像素），不包括左侧的 padding 和 margin。如果没有设置左边框，或者是行内元素（display: inline），该属性返回 0。该属性总是返回整数值，如果是小数，会四舍五入。
  - Element.clientTop 属性等于网页元素顶部边框的宽度（单位像素），其他特点都与 clientLeft 相同。
  - Element.scrollHeight 属性返回一个整数值（小数会四舍五入），表示当前元素的总高度（单位像素），包括溢出容器、当前不可见的部分。它包括 padding，但是不包括 border、margin 以及水平滚动条的高度（如果有水平滚动条的话），还包括伪元素（::before 或::after）的高度。
  - Element.scrollWidth 属性表示当前元素的总宽度（单位像素），其他地方都与 scrollHeight 属性类似。这两个属性只读。

    ```js
    // 整张网页的总高度可以从 document.documentElement 或 document.body 上读取。
    // 返回网页的总高度
    document.documentElement.scrollHeight;
    document.body.scrollHeight;
    ```

  - Element.scrollLeft 属性表示当前元素的水平滚动条向右侧滚动的像素数量
  - Element.scrollTop 属性表示当前元素的垂直滚动条向下滚动的像素数量。对于那些没有滚动条的网页元素，这两个属性总是等于 0。

    ```js

    //如果要查看整张网页的水平的和垂直的滚动距离，要从document.documentElement元素上读取。
    document.documentElement.scrollLeft
    document.documentElement.scrollTop
    这两个属性都可读写，设置该属性的值，会导致浏览器将当前元素自动滚动到相应的位置。

    ```

  - Element.offsetHeight 属性返回一个整数，表示元素的 CSS 垂直高度（单位像素），包括元素本身的高度、padding 和 border，以及水平滚动条的高度（如果存在滚动条）。
  - Element.offsetWidth 属性表示元素的 CSS 水平宽度（单位像素），其他都与 Element.offsetHeight 一致。

    ```js
    这两个属性都是只读属性，只比Element.clientHeight和Element.clientWidth多了边框的高度或宽度。如果元素的 CSS 设为不可见（比如display: none;），则返回0。
    ```

  - Element.offsetLeft 返回当前元素左上角相对于 Element.offsetParent 节点的水平位移
  - Element.offsetTop 返回垂直位移，单位为像素。通常，这两个值是指相对于父节点的位移。

    ```js
    //下面的代码可以算出元素左上角相对于整张网页的坐标。
    function getElementPosition(e) {
      var x = 0;
      var y = 0;
      while (e !== null) {
        x += e.offsetLeft;
        y += e.offsetTop;
        e = e.offsetParent;
      }
      return { x: x, y: y };
    }
    ```

  - Element.style 读写该元素的行内样式信息
  - Element.children 属性返回一个类似数组的对象,包括当前元素节点的所有子元素。(这个属性与 Node.childNodes 属性的区别是，它只包括元素类型的子节点，不包括其他类型的子节点。)
  - Element.firstElementChild 属性返回当前元素的第一个元素子节点
  - Element.lastElementChild 返回最后一个元素子节点

#### ② 相关事件

#### ③ 相关方法

## 二、DOM API

文档 API，有时也称为 DOM API，允许你以任何你想要的方式修改 DOM 树。它使你能够从头开始创建任何 HTML 或 XML 文档，或者改变一个给定的 HTML 或 XML 文档的任何内容。网页作者可以使用 JavaScript 来编辑文档的 DOM，访问全局对象的 document 属性。

<mark>以下分类其实跟上面有重复，且每种分类下的 api 不太全面，但能从另一种的角度了解 api 的类别</mark>

- 节点操作：

  ```js
  document.getElementById()：通过元素的ID获取元素节点。
  document.getElementsByTagName()：通过标签名获取元素节点列表。
  document.getElementsByClassName()：通过类名获取元素节点列表。
  document.createElement()：创建一个新的元素节点。
  parentNode.appendChild()：将一个节点添加到指定父节点的子节点列表末尾。
  ```

- 属性操作：

  ```js
  element.getAttribute()：获取指定属性的值。
  element.setAttribute()：设置指定属性的值。
  element.classList：用于添加、删除和切换元素的类名。
  ```

- 样式操作：

  ```js
  element.style.property：设置或获取元素的样式属性值。
  getComputedStyle(element)：获取计算后的样式属性值。
  ```

- 事件处理：

  ```js
  element.addEventListener()：为指定事件添加事件处理程序。
  element.removeEventListener()：移除指定事件的事件处理程序。
  ```

- 文档遍历：

  ```js
  parentNode.childNodes：返回一个包含所有子节点的集合。
  parentNode.firstChild：返回第一个子节点。
  parentNode.lastChild：返回最后一个子节点。
  ```

- 文档修改：

  ```js
  parentNode.insertBefore(newNode, referenceNode)：在参考节点之前插入新节点。
  parentNode.removeChild(node)：从父节点中移除指定子节点。
  ```

## 三、引用

> [mdn 教程](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model) [阮一峰教程](https://wangdoc.com/javascript/dom/general)

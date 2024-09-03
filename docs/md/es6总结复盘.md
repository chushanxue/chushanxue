### 数组的拓展

#### 1、数组解构

曾经我们要获取数组中的元素，会写这样的代码：

```js
let introduction = ['Hello', 'I', 'am', 'Sarah'];
let greeting = introduction[0];
let name = introduction[3];

console.log(greeting); //"Hello"
console.log(name); //"Sarah"
```

ES6 的解构赋值使提取数据变得更加容易：

```js
let introduction = ['Hello', 'I', 'am', 'Sarah'];
// 请注意这里是按顺序拿的，以及这里的符号是[]中括号，与数组对应
let [greeting, pronoun] = introduction;

console.log(greeting); //"Hello"
console.log(pronoun); //"I"
```

如果要跳过数组中的项目，只需使用逗号即可：

```js
let [greeting, , , name] = ['Hello', 'I', 'am', 'Sarah'];

console.log(greeting); //"Hello"
console.log(name); //"Sarah"
```

#### 2、扩展运算符（spread）

将一个数组转为用逗号分隔的参数序列。

```js
console.log(...[1, 2, 3]);
// 1 2 3
```

注意扩展运算符还有一个妙用，能够去掉不想要的参数：

```js
const response = await getUsers({
  ...params,
  size: pageSize,
});

上面的写法虽然重命名了pageSize，但是原始的pageSize也还存在，请求时就可能导致出错

const { pageSize, ...restParams } = params;
const response = await getUsers({
  ...restParams, //去掉了不想要的字段
  size: pageSize,
});
```

#### 3、数组的复制

数组是复合的数据类型，直接复制的话，只是复制了指向底层数据结构的指针，而不是克隆一个全新的数组。(浅拷贝)

```js
const a1 = [1, 2];
const a2 = a1;

a2[0] = 2;
a1; // [2, 2]
```

> 深拷贝主要是将另一个对象的属性值拷贝过来之后，另一个对象的属性值并不受到影响，因为此时它自己在堆中开辟了自己的内存区域，不受外界干扰。

扩展运算符提供了复制数组的简便写法。下面的两种写法，a2都是a1的克隆。（**针对于基本类型数组的深拷贝**）

```js
const a1 = [1, 2];
// 写法一
const a2 = [...a1];
// 写法二
const [...a2] = a1;
```

注意：如果是对象数组，扩展运算符就不是深拷贝，而是浅拷贝

针对对象数组，使用`JSON.stringify()`将原始对象数组转换为字符串，然后再使用`JSON.parse()`将字符串转换回对象数组。这样做会创建一个新的对象数组，并且所有嵌套的对象也会被复制，从而实现了深拷贝。

```js
// 定义一个对象数组
const originalArray = [
  { name: 'John', age: 25 },
  { name: 'Jane', age: 30 },
];

// 使用扩展运算符和递归进行深拷贝
const deepCopyArray = JSON.parse(JSON.stringify(originalArray));

// 修改深拷贝后的数组中的对象属性
deepCopyArray[0].name = 'Mike';

console.log(originalArray); // 输出: [ { name: 'John', age: 25 }, { name: 'Jane', age: 30 } ]
console.log(deepCopyArray); // 输出: [ { name: 'Mike', age: 25 }, { name: 'Jane', age: 30 } ]
```

> JSON.parse(JSON.stringify(originalArray))方法在处理包含函数、正则表达式等特殊类型值的对象数组时会出现问题。因为这些特殊类型的值在转换为 JSON 字符串时会被忽略或转换为其他类型。考虑使用递归和自定义的深拷贝函数来处理

### 引用

> [JavaScript 数组解构和对象解构](https://www.freecodecamp.org/chinese/news/array-and-object-destructuring-in-javascript/)

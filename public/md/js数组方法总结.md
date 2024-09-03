### 一.数组查操作（遍历、不改变原数组）

#### 1、find()，findIndex()，findLast()，findLastIndex()

```js
let a = [1, 4, -5, 10];
// find()用于找出第一个符合条件的数组成员。
a.find((n) => n < 0); // -5

//find()方法的回调函数实际可以接受三个参数，依次为当前的值、当前的位置和原数组。
a.find((n, index, arr) => n < 0); // -5

//findIndex()方法的用法与find()方法非常类似，返回第一个符合条件的数组成员的索引，如果所有成员都不符合条件，则返回-1。
a.findIndex((n, index, arr) => n < 0) // 2

  //以上两个方法都可以发现NaN，弥补了数组的indexOf()方法的不足。
  [NaN].indexOf(NaN); // -1
[NaN].findIndex((n) => Object.is(NaN, n)); // 0

//find()和findIndex()都是从数组的0号位，依次向后检查。
//ES2022 新增了两个方法findLast()和findLastIndex()，从数组的最后一个成员开始，依次向前检查，其他都保持不变。
const array = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }];

array.findLast((n) => n.value % 2 === 1); // { value: 3 }
array.findLastIndex((n) => n.value % 2 === 1); // 2【索引依然是正整数】
```

#### 2、indexOf，lastIndexOf

```js
//indexOf(value)从索引为0开始，检查数组是否包含value，有则返回匹配到的第一个索引，没有返回-1(不改变原数组)

let a = [1, 2, 3, 2, 5];
let result = a.indexOf(2);
console.log(result); // 1
console.log(a); // [1, 2, 3, 2, 5]

result = a.indexOf(6);
console.log(result); // -1
console.log(a); // [1, 2, 3, 2, 5]

//lastIndexOf(value)从最后的索引开始，检查数组是否包含value，有则返回匹配到的第一个索引，没有返回-1(不改变原数组)
let a = [1, 2, 3, 2, 5];
let result = a.lastIndexOf(2);
console.log(result); // 3
console.log(a); // [1, 2, 3, 2, 5]

result = a.lastIndexOf(6);
console.log(result); // -1
console.log(a); // [1, 2, 3, 2, 5]
```

#### 4、forEach

```js
//forEach()遍历数组(不改变原数组)
let a = [1, 2, 3, 4, 5];
let result = a.forEach((v, i) => {
  console.log(v, i);
  // 1 0
  // 2 1
  // 3 2
  // 4 3
  // 5 4
});
console.log(result); // undefined
console.log(a); // [1, 2, 3, 4, 5]

let array = [1, 2, 3, 4];
array.forEach((item) => {
  item = item * 2;
});
console.log(array); // [1,2,3,4]

let array = [
  { name: '张三', age: 10 },
  { name: '李四', age: 20 },
];

array.forEach((item) => {
  item = {
    name: '王五',
    age: '29',
  };
});
console.log(array);

// 打印结果：[{"name": "张三","age": 10},{"name": "李四","age": 10}]
```

注意forEach不改变原数组是有条件的，如果借助index或者delete方法，是完全可以改变原数组的，基本类型的数组或者直接改变对象数组的整个对象才动不了

```js
let arr = [
  { name: '张三', age: 10 },
  { name: '李四', age: 20 },
];

arr.forEach((item) => {
  item.name = '王五';
});
console.log(arr);
// 打印结果：[{"name":"王五","age":18},{"name":"王五","age":20}]

const a = [{ x: 1, y: 2 }];

a.forEach((item) => {
  (item.x1 = item.x), (item.y1 = item.y);
  delete item.x;
  delete item.y; // 注意这个delete方法
});
console.log(a); //  [{ x1: 1, y2: 2 }]
```

#### 5、every

```js
//every(fn)判断数组中是否所有元素都满足fn函数中的条件(不改变原数组)

let a = [1, 2, 3, 4, 5];
let result = a.every((currentValue) => {
  return currentValue > 0;
});
console.log(result); // true  显然所有元素都大于0
```

#### 6、filter

```js
//filter(fn)返回数组中满足fn函数中条件的集合(不改变原数组)

let a = [1, 2, 3, 4, 5];
let result = a.filter((currentValue) => {
  return currentValue > 4;
});
console.log(result); // [5] 只有5满足条件
console.log(a); // [1, 2, 3, 4, 5]
```

#### 7、incluedes

```js
//includes()返回一个布尔值，表示某个数组是否包含给定的值(不改变原数组)
let a = [1, 2, 3, 4, 5];
let result = a.includes(2);
console.log(result); // true
console.log(a); // [1, 2, 3, 4, 5]
```

#### 8、map

```js
//map(fn)以fn函数中返回值组成新的数组返回(不改变原数组)【对数组中的每一项进行加工后返回新的数组】
let a = [1, 2, 3, 4, 5];
let result = a.map((val, i) => {
  return 9;
});
console.log(result); // [9, 9, 9, 9, 9]
console.log(a); // [1, 2, 3, 4, 5]
```

#### 9、some

```js
//some(fn)检查数组中是否含有满足fn函数条件的值(不改变原数组)

let a = [1, 2, 3, 4, 5];
let result = a.some((item) => {
  return item > 2;
});
console.log(result); // true
console.log(a); // [1, 2, 3, 4, 5]
```

#### 10、for(let i in arr)

```js
let arr = [1, 5, 6];
//注意这个i是索引不是值，知道索引就知道值，但是知道值不一定知道索引
for (let i in arr) {
  console.log(i);
  console.log(arr[i]);
}
```

```js
// 最原始的for循环遍历
let arr = [1, 5, 6];
for (let i = 0; i < arr.length; i++) {
  console.log(i);
  console.log(arr[i]);
}
```

### 二、数组增删改操作

#### 1、改变原数组

注意返回值可被接收，但如果只是想对原数组进行操作，完全没有必要去接收

- push

  ```js
  //push(value)将value添加到数组的最后，返回数组长度(改变原数组)

  let a = [1, 2, 3, 4, 5];
  a.push(1); //可一次添加多个值
  console.log(a.push(1)); // 6
  console.log(a); // [1, 2, 3, 4, 5, 1] 原数组被改变
  ```

- unshift

  ```js
  //unshift()添加元素到数组的开头，返回数组的长度(改变原数组)

  let a = [1, 2, 3, 4, 5];
  a.unshift(1); //可一次添加多个值
  console.log(a.unshift(1)); // 6
  console.log(a); // [1, 1, 2, 3, 4, 5]
  ```

- pop

  ```js
  //pop()删除数组中最后一个元素，返回被删除元素(改变原数组)

  let a = [5];
  a.pop();
  console.log(a.pop()); // 5  数组元素为空后会返回undefined
  console.log(a); // []
  ```

- shift

  ```js
  //shift()删除数组第一个元素，返回删除的元素(改变原数组)

  let a = [5];
  a.shift();
  console.log(a.shift()); // 5  数组元素为空后会返回undefined
  console.log(a); // []
  ```

- reverse

  ```js
  //reverse()反转数组(改变原数组)

  let a = [1, 2, 3, 4, 5];
  a.reverse(); //反转只是基于数组的第一层，属于浅反转。
  console.log(a.reverse()); // [5, 4, 3, 2, 1]
  console.log(a); // [5, 4, 3, 2, 1]

  // 一个简单的深反转，使用递归实现
  const deepReverse = (array) => {
    let temp = array.reverse();
    temp.forEach((v) => {
      if (Object.prototype.toString.call(v) === '[object Array]') {
        deepReverse(v);
      }
    });
    return temp;
  };
  a = [1, [2, 3], [4, 5]];
  result = deepReverse(a);
  console.log(result); // [[5, 4], [3, 2], 1]
  ```

- splice（这个不太容易记住）

  ```js
  //splice(index, count, value)从索引为index处删除count个元素（包含索引），插入value(改变原数组)

  let a = [1, 2, 3, 4, 5];
  let result = a.splice(1, 2, 0);
  console.log(result); // [2, 3]
  console.log(a); // [1, 0, 4, 5]

  //当参数为单个且小于0时，将从数组的倒数|index|位开始【向后，注意不是往前数】截取到数组的末位【截取是指截取走，不留在原数组】
  a = [1, 2, 3, 4, 5];
  console.log(a.splice(-1)); // [5] 返回的是截取走的元素
  console.log(a); // [1, 2, 3, 4]

  //当参数为单个且不小于0时，将从当前数代表的索引位开始截取到数组的末位
  a = [1, 2, 3, 4, 5];
  console.log(a.splice(1)); // [2, 3, 4, 5]
  console.log(a); // [1]

  //从倒数第一位开始截取两个元素，元素不够，只返回存在的元素
  a = [1, 2, 3, 4, 5];
  console.log(a.splice(-1, 2)); // [5]
  console.log(a); // [1, 2, 3, 4]
  ```

- sort

  ```js
  //sort()对数组元素进行排序(改变原数组)

  let a = [31, 22, 27, 1, 9];
  let result = a.sort();
  console.log(result); // [1, 22, 27, 31, 9]  sort排序是根据位来进行排序，而非值的大小
  console.log(a); // [1, 22, 27, 31, 9]

  a = [31, 22, 27, 1, 9];
  a.sort((a, b) => {
    return a - b;
  });
  console.log(a); // [1, 9, 22, 27, 31]  按数值大小正序排列

  a = [31, 22, 27, 1, 9];
  a.sort((a, b) => {
    return b - a;
  });
  console.log(a); // [31, 27, 22, 9, 1]  按数值大小倒序排列
  ```

#### 2、不改变原数组

- concat

  ```js
  //concat(value)将数组和数组或值连接成新数组(不改变原数组)

  let a = [1, 2],
    b = [3, 4],
    c = 5;
  let result = a.concat(b, c);
  console.log(result); // [1, 2, 3, 4, 5]
  console.log(a); // [1, 2]

  b = [3, [4]];
  result = a.concat(b, c);
  console.log(result); // [1, 2, 3, [4], 5] concat对于嵌套数组无法拉平
  console.log(a); // [1, 2]
  ```

- join

  ```js
  //join(value)将数组用value连接为字符串(不改变原数组)

  let a = [1, 2, 3, 4, 5];
  let result = a.join(',');
  console.log(result); // '1,2,3,4,5'
  console.log(a); // [1, 2, 3, 4, 5]

  //join的一个相对的方法是字符串的split方法
  console.log('1a2a3a4a5'.split('a')); // [1, 2, 3, 4, 5]
  ```

- slice（这个不太容易记住）

  ```js
  //slice(start, end)返回新数组，包含原数组索引start的值到索引end的值，不包含end(不改变原数组)

  let a = [1, 2, 3, 4, 5];
  let result = a.slice(2, 4);
  console.log(result); // [3, 4]
  console.log(a); // [1, 2, 3, 4, 5]

  //负数是指位置（不含0），正数指索引（含0）
  console.log(a.slice(1)); // [2, 3, 4, 5]   只有一个参数且不小于0，则从此索引开始截取到数组的末位
  console.log(a.slice(-1)); // [5]            只有一个参数且小于0，则从倒数|start|位截取到数组的末位
  console.log(a.slice(-1, 1)); // []             反向截取，不合法返回空数组
  console.log(a.slice(1, -1)); // [2, 3, 4]      从第一位截取到倒数第一位，不包含倒数第一位
  console.log(a.slice(-1, -2)); // []             反向截取，不合法返回空数组
  console.log(a.slice(-2, -1)); // [4]            倒数第二位截取到倒数第一位
  ```

- toString

  ```js
  //toString()将数组中的元素用逗号拼接成字符串(不改变原数组)

  let a = [1, 2, 3, 4, 5];
  let result = a.toString();
  console.log(result); // 1,2,3,4,5
  console.log(a); // [1, 2, 3, 4, 5]
  ```

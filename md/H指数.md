### 一、题目

```bash
给你一个整数数组 citations ，其中 citations[i] 表示研究者的第 i 篇论文被引用的次数。计算并返回该研究者的 h 指数。

根据维基百科上 h 指数的定义：h 代表“高引用次数” ，一名科研人员的 h 指数 是指他（她）至少发表了 h 篇论文，并且每篇论文 至少 被引用 h 次。如果 h 有多种可能的值，h 指数 是其中最大的那个。
```

示例：

```bash
输入：citations = [3,0,6,1,5]
输出：3
解释：给定数组表示研究者总共有 5 篇论文，每篇论文相应的被引用了 3, 0, 6, 1, 5 次。
     由于研究者有 3 篇论文每篇 至少 被引用了 3 次，其余两篇论文每篇被引用 不多于 3 次，所以她的 h 指数是 3。


```

### 二、解题思路

题目的意思是，一个【数组】中，【大于等于h】的如果【有h个及以上的元素】，那么这个h就是答案

首先，这个h一定小于等于数组长度，那么我们可以直接贪心求解，假定h为0~n，遍历数组发现大于h的数组元素大于h个，那么h就往后+1，再重新去遍历判断

这样算下来遍历的次数为n\*n

### 三、正确答案

```js
var hIndex = function (citations) {
  const n = citations.length;
  // 假定h为多少
  let h = 0;
  let num = 0; //符合条件的元素数量
  let count = -1; // 遍历次数
  while (count < n) {
    num = 0;
    for (let i = 0; i < n; i++) {
      // 这里不能加上条件 || citations[i] === h  因为相等不能说明h可以往后加，而大于一定可以
      if (citations[i] > h) {
        num++;
      }
    }
    count++;
    if (num > h) {
      h++;
    }
  }

  return h;
};
```

### 四、拓展解法

我们可以把数组倒序排序，设置h为0，然后遍历，在遍历的过程中，只要当前的元素大于h，那么h就可以+1

JavaScript 比较 和 逻辑运算符：<https://www.runoob.com/js/js-comparisons.html>

```js
var hIndex = function (citations) {
  const n = citations.length;
  citations.sort((a, b) => a - b);
  // 假定h为多少
  let h = 0;
  let i = n - 1;

  // 才发现js有>=这种符号。。。。
  while (i >= 0 && citations[i] > h) {
    h++;
    i--;
  }

  return h;
};
```

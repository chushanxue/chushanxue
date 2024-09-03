### 一、前言

文档：<https://g2plot.antv.antgroup.com/examples>

这类图表文档总有一个通病：就是很难找到想修改的属性，不知道是我的问题还是文档本身就写得很烂

另外使用框架时和官网给的示例就对不上了，需要额外的思考

### 二、记录

#### 1、在react中的使用

以基础折线图为例

- 官网示例

  ```js
  import { Line } from '@antv/g2plot';

  const line = new Line('container', {
    data,
    ...
  });

  line.render();
  ```

- react用法

  保证每次**刷新**拿到最新的数据并渲染

  ```js
    import React, { useEffect } from 'react';
    import { Line } from '@antv/g2plot';

    const LineChart: React.FC<{ data: [] }> = ({ data }) => {
    // 提前渲染会导致图表最常见的崩溃现象：页面无限拉长直到崩溃
    // 因为拿到data和组件渲染的时机无法确定，所以写在useEffect中避免提前渲染
    useEffect(() => {
        // 这句也是避免提前渲染必不可少的，少了就跟不写useEffect没有区别
        if (data.length === 0) return;
        const line = new Line('container1', {
            data,
            ...
        });
        line.render();
    }, [data]);

    return <div id="container1"></div>;
    };

    export default LineChart;
  ```

  保证**不刷新**也能拿到最新的数据并渲染

  ```js
    import React, { useEffect, useRef } from 'react';
    import { Column } from '@antv/g2plot';
    import { useMount } from 'ahooks';

    const LabelColumn: React.FC<{ data: [] }> = ({ data }) => {
    // 需要使用useRef定义元素
    const columnPlotRef = useRef<Column>();

    // 避免提前渲染
    useMount(() => {
        columnPlotRef.current = new Column('container4', {
            data,
            ...
        });
        // render只在初始时调用
        columnPlotRef.current.render();
    });

    useEffect(() => {
        if (columnPlotRef.current) {
            // data变动时只调用changeData
            columnPlotRef.current.changeData(data);
        }
    }, [data]);

    return <div id="container4"></div>;
    };

    export default LabelColumn;
  ```

#### 2、渲染问题

- 多个图表的id不可重复🙅🏻‍♀️

#### 3、详细配置问题

- 标签换行

  ![ ](/md/g2plot踩坑记录/1.png)

  ```js
   legend: {
        flipPage: false, //关闭翻页
    },
  ```

- 标签重叠

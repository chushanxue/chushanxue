### 一、前言

### 二、上手

首先，从官网复现出一个简易的demo：[Overview](https://reactflow.dev/examples)

这里没什么套路

### 三、api

其实工作流只有两个重点：**节点**和**连线**

```js
// 定义type才能把自定义节点组件引进来
const nodeTypes = {
  'coze-start': CozeNodeStart,
  'coze-end': CozeNodeEnd,
};
// 初始化节点与连线
const initialNodes: any = [
  // 模拟扣子的初始节点
  {
    id: 'start',
    type: 'coze-start',
    position: { x: -300, y: 200 },
  },
  // 模拟扣子的结束节点
  {
    id: 'end',
    type: 'coze-end',
    position: { x: 300, y: 200 },
  },
];

const initialEdges: Edge<any>[] = [
  // 注意source和target，这就是连线的关键
  { id: 'xxx', source: 'start', target: 'end', animated: true },
];
```

```js
// 注意这里的useNodesState和useEdgesState都是react-flow封装好的api，其中initialNodes和initialEdges就是由自己定义的
const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
```

```js
<ReactFlow
  // 节点列表
  nodes={nodes}
  // 节点连线列表
  edges={edgesWithUpdatedTypes}
  onNodesChange={onNodesChange}
  onEdgesChange={onEdgesChange}
  onConnect={onConnect}
  onInit={onInit}
  fitView
  nodeTypes={nodeTypes}
  minZoom={0.1}
  maxZoom={1.5}
  proOptions={proOptions}
>
  <Controls />
  <Background color="#aaa" gap={16} />
</ReactFlow>
```

```js
// 自定义节点就是正常组件的写法，注意Handle这个react-flow提供的组件，它就是用于连线的控件
const CozeNodeEnd: React.FC = () => {
  return (
    <>
      <div className={styles.contianer}>
        <div className={styles.header}>
          <strong>结束</strong>
          <p>工作流的最终节点，用于返回工作流运行后的结果信息</p>
        </div>
        <div className={styles.body}>自定义表单内容</div>
        {/* 注意type的类型，是开始还是结束，这影响到本节点能否去连接别人和能否被别人连接 */}
        <Handle type="target" position={Position.Left} isConnectableStart={false} />
      </div>
    </>
  );
};
```

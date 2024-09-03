import { ConfigProvider, FloatButton } from 'antd';
import Content from './components/content';
import Footer from './components/footer';
import Header from './components/header';
// CSS Modules  避免引入的样式在整个页面中生效
import styles from './index.less';

export default function Layouts() {
  return (
    // 定制主题
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#52c41a', //品牌色
        },
      }}
    >
      <div className={styles.container}>
        <Header />
        <Content />
        <Footer />
        <FloatButton.Group shape="circle" style={{ right: 24 }}>
          {/* <FloatButton icon={<StarOutlined />} tooltip={<div>我的收藏</div>} /> */}
          {/* visibilityHeight使回顶按钮一直可见 */}
          <FloatButton.BackTop visibilityHeight={0} />
        </FloatButton.Group>
      </div>
    </ConfigProvider>
  );
}

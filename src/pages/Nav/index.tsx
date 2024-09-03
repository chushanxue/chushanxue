import { Col, Row } from 'antd';
import React from 'react';
import {
  common,
  // directory,
  docs,
  heart,
  hero,
  tool,
  UI,
  week,
} from './content';
import styles from './index.less';
import Line from './line';

const Nav: React.FC = () => {
  return (
    <div className={styles.containerMax}>
      <Row gutter={20}>
        <Col span={24}>
          <div id="week" className={styles.container}>
            <Line arr={week} title="周刊" />
          </div>
          <div id="common" className={styles.container}>
            <Line arr={common} title="置顶" />
          </div>
          <div id="docs" className={styles.container}>
            <Line arr={docs} title="文档" />
          </div>
          <div id="heart" className={styles.container}>
            <Line arr={heart} title="修身" />
          </div>
          <div id="UI" className={styles.container}>
            <Line arr={UI} title="UI" />
          </div>
          <div id="tool" className={styles.container}>
            <Line arr={tool} title="工具" />
          </div>
          <div id="hero" className={styles.container}>
            <Line arr={hero} title="大神" />
          </div>
        </Col>
        {/* <Col span={2}>
          <Anchor items={directory} />
        </Col> */}
      </Row>
    </div>
  );
};

export default Nav;

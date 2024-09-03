import { Col, Row, Space } from 'antd';
import React from 'react';
import styles from './index.less';
interface ILineProps {
  arr: {
    url: string;
    title: string;
  }[];
  title: string;
}

const Line: React.FC<ILineProps> = ({ arr, title }) => {
  return (
    <>
      <p
        style={{ fontFamily: 'GEORGIA', fontWeight: 'bold', fontSize: '16px' }}
      >
        {title}
      </p>
      <Row gutter={[48, 16]}>
        {arr.map(
          (
            item: {
              url: string;
              title: string;
            },
            index: number,
          ) => {
            return (
              <Col span={6} key={index}>
                <a
                  className={styles.wrapper}
                  target="_blank"
                  rel="noreferrer"
                  href={item.url}
                >
                  <Space>
                    <div className={styles.ico}>
                      <img
                        src={
                          'https://www.google.com/s2/favicons?domain=' +
                          item.url
                        }
                        alt=""
                      />
                    </div>
                    <span>{item.title}</span>
                  </Space>
                  <p>{item.desc}</p>
                </a>
              </Col>
            );
          },
        )}
      </Row>
    </>
  );
};

export default Line;

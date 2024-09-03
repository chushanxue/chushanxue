import posts from '@/models/data/posts.json';
import { history } from '@umijs/max';
import { Card, Col, Row, Statistic } from 'antd';
import { Formatter } from 'antd/es/statistic/utils';
import CountUp from 'react-countup';
import styles from './index.less';

const formatter = (value: number) => <CountUp end={value} separator="," />;
const About = () => {
  return (
    <>
      <div className={styles.about}>
        <img src="@/assets/img/banner/about.svg" />
      </div>
      <Row gutter={24}>
        <Col span={6}>
          <Card bordered={false}>
            {/* 2023目标：100 */}
            <Statistic
              title="文章统计"
              value={posts.length}
              formatter={formatter as Formatter}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card bordered={false}>
            {/* 2023目标：2 */}
            <Statistic
              title="个人作品统计"
              value={0}
              formatter={formatter as Formatter}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            {/* 2023目标：5 */}
            <Statistic
              title="github star"
              value={0}
              formatter={formatter as Formatter}
              valueStyle={{ color: '#faa219' }}
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card bordered={false} onClick={() => history.push('/contribute')}>
            {/* 2023目标：5 */}
            <Statistic
              title="社区贡献"
              value={2}
              formatter={formatter as Formatter}
              valueStyle={{ color: '#faa219' }}
              suffix="次"
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default About;

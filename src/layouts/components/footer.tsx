import { CheckCircleTwoTone, SmileTwoTone } from '@ant-design/icons';
import { Space } from 'antd';
import styles from './footer.less';
const Footer: React.FC = () => (
  <div className={styles.footer}>
    <Space>
      <SmileTwoTone />
      <CheckCircleTwoTone twoToneColor="#52c41a" />
    </Space>
  </div>
);

export default Footer;

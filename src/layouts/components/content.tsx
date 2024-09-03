//  <Outlet /> 用于渲染嵌套路由
import { Outlet } from '@umijs/max';
import styles from './content.less';

const Content: React.FC = () => {
  return (
    <div className={styles.container}>
      <Outlet />
    </div>
  );
};

export default Content;

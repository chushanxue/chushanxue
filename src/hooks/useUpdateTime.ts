// 导入posts数据
import { prettyLog } from '@/hooks/useConsole';
import posts from '@/models/data/posts.json';
export const useUpdateTime = () => {
  // 创建打印对象
  const log = prettyLog();
  // 获取当前日期
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // 将时分秒设置为0

  // 获取第一条post的日期
  const firstPostDate = new Date(posts[0].time);

  // 计算相隔的天数
  const timeDiff = Math.abs(currentDate.getTime() - firstPostDate.getTime());
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

  // 判断是否为同一天
  if (currentDate.toDateString() === firstPostDate.toDateString()) {
    return false;
  } else {
    log.success('距离上次更新', String(daysDiff) + '天');
    return daysDiff;
  }
};

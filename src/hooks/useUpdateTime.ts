// 导入posts数据
import posts from '@/models/data/posts.json';
export const useUpdateTime = () => {
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
  console.log(true);
  return false;
} else {
  console.log(daysDiff);
  return daysDiff
}
}
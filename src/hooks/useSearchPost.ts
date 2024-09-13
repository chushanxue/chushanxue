// 导入posts数据
import posts from '@/models/data/posts.json';
import { useBasePath } from './useBasePath';

const getMatchText=  (content:string, keyword:string)  =>{
    const regex = new RegExp(`[^\\p{P}\\p{S}]{0,20}${keyword}[^\\p{P}\\p{S}]{0,20}`, 'gu');
    const matchTextList = [];
  
    let match;
    while ((match = regex.exec(content)) !== null) {
        matchTextList.push(match[0]);
    }
  
    return matchTextList;
  }


export const useSearchPost = async (keyword?: string) => {
// 指定要匹配的关键字
    if(!keyword){
    return[]
}

// 存储匹配结果的列表
const matchedPosts:any= [];

// 遍历每个post元素
//  for (const post of posts) {
//   // 检查标题是否包含关键字
//   if (post.title.includes(keyword)) {
//     matchedPosts.push(post);
//   }

// //可能是这里异步的问题
//   // 检查链接文档是否包含关键字
//    fetch(`${useBasePath()}/md/${post.title}.md`)
//   .then((resp) => resp.text())
//   .then((txt) => {
//     if (txt.includes(keyword)) {
//     const matchText = getMatchText(txt, keyword);
//     matchedPosts.push({ ...post, matchText });
//   }
//   });
// }
// 遍历每个post元素
const fetchPromises = posts.map(async (post) => {
  // 检查标题是否包含关键字
  if (post.title.includes(keyword)) {
    matchedPosts.push(post);
  }

  // 检查链接文档是否包含关键字
  const response = await fetch(`${useBasePath()}/md/${post.title}.md`);
  const text = await response.text();

  if (text.includes(keyword)) {
    const matchText = getMatchText(text, keyword);
    matchedPosts.push({ ...post, matchText });
  }
});

// 等待所有的 fetch 请求完成
await Promise.all(fetchPromises);

console.log('匹配到的',matchedPosts)
return matchedPosts
}



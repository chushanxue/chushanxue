import { buildPostQueryString } from '@/services/content';
import type { SearchMatchPost } from '@/types/post';
import { history } from '@umijs/max';
import { List } from 'antd';
import styles from './index.less';

interface CluesProps {
  keyword: string;
  matchPosts: SearchMatchPost[];
  cleanKeyword: () => void;
  cleanMatchPosts: () => void;
}

const Clues = ({
  keyword,
  matchPosts,
  cleanKeyword,
  cleanMatchPosts,
}: CluesProps) => {
  const jumpToPost = (item: SearchMatchPost) => {
    history.push(`/md?${buildPostQueryString(item)}`);
    cleanKeyword();
    cleanMatchPosts();
  };
  return (
    <div className={styles['chat-clues-panel-header']}>
      {keyword && matchPosts?.length > 0 ? (
        <List
          size="small"
          dataSource={matchPosts}
          renderItem={(item: SearchMatchPost) => (
            <List.Item onClick={() => jumpToPost(item)}>
              <div className={styles['chat-clues-item']}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: item?.title?.replace(
                      keyword,
                      `<span style=" color: #1890ff ">${keyword}</span>`,
                    ),
                  }}
                />
                <div className={styles['chat-clues-item-desc']}>
                  {item.matchText?.map((val: string, index: number) => {
                    return (
                      <span
                        key={index}
                        dangerouslySetInnerHTML={{
                          __html: val.replace(
                            keyword,
                            `<span style=" color: #1890ff ">${keyword}</span>`,
                          ),
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </List.Item>
          )}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default Clues;

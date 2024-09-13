import { history } from '@umijs/max';
import { List } from 'antd';
import querystring from 'querystring';
import styles from './index.less';

const Clues = ({ keyword, matchPosts, cleanKeyword, cleanMatchPosts }: any) => {
  const jumpToPost = (item: any) => {
    history.push(
      `/md?${querystring.stringify({
        title: item.title,
        tags: item.tag,
        time: item.time,
      })}`,
    );
    cleanKeyword();
    cleanMatchPosts();
  };
  return (
    <div className={styles['chat-clues-panel-header']}>
      {keyword && matchPosts?.length > 0 ? (
        <List
          size="small"
          dataSource={matchPosts}
          renderItem={(item: any) => (
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

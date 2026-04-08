import { fetchNewsDigest } from '@/services/news';
import type { NewsDigest, NewsItem } from '@/types/news';
import {
  ArrowRightOutlined,
  ReloadOutlined,
  ThunderboltFilled,
} from '@ant-design/icons';
import { Button, Empty, Skeleton, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.less';

const formatDateTime = (value?: string) => {
  if (!value) {
    return '--';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const renderSummary = (item: NewsItem) =>
  item.summary?.trim() || '这条资讯暂时没有可用摘要，建议直接打开原文查看。';

// 中文标题优先：有就用中文，没有则显示原文
const renderTitle = (item: NewsItem) => item.titleZh?.trim() || item.title;

// 分类区域标识 kicker
const CATEGORY_KICKER: Record<string, string> = {
  frontend: '前端 · 技术',
  ai: 'AI · 效率',
  product: '产品 · 商业',
  design: '设计 · UI',
  industry: '行业 · 热点',
  tools: '工具 · 发现',
};

const News: React.FC = () => {
  const [digest, setDigest] = useState<NewsDigest | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const loadDigest = async () => {
    setLoading(true);
    setError('');

    try {
      const nextDigest = await fetchNewsDigest();
      setDigest(nextDigest);
    } catch (err) {
      setError(err instanceof Error ? err.message : '资讯数据加载失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDigest().catch(() => {
      setError('资讯数据加载失败');
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.loadingGrid}>
          <Skeleton active paragraph={{ rows: 8 }} />
          <Skeleton active paragraph={{ rows: 8 }} />
        </div>
      </div>
    );
  }

  if (error || !digest) {
    return (
      <div className={styles.page}>
        <div className={styles.emptyState}>
          <Empty description={error || '暂无资讯数据'}>
            <Button
              type="primary"
              icon={<ReloadOutlined />}
              onClick={loadDigest}
            >
              重新加载
            </Button>
          </Empty>
        </div>
      </div>
    );
  }

  const hasContent = Boolean(
    digest.headline ||
      digest.latest.length ||
      digest.featuredTools.length ||
      digest.sections.length,
  );

  if (!hasContent) {
    return (
      <div className={styles.page}>
        <div className={styles.emptyState}>
          <Empty description="当前没有可展示的资讯，稍后再试。">
            <Button
              type="primary"
              icon={<ReloadOutlined />}
              onClick={loadDigest}
            >
              重新加载
            </Button>
          </Empty>
        </div>
      </div>
    );
  }

  const importantItems = digest.latest.filter(
    (item) => item.id !== digest.headline?.id,
  );

  return (
    <div className={styles.page}>
      {digest.trendingTags?.length ? (
        <div className={styles.trendStrip}>
          <span className={styles.trendLabel}>热议话题</span>
          {digest.trendingTags.map((t) => (
            <span className={styles.trendTag} key={t.tag}>
              {t.tag}
              <em>{t.count}</em>
            </span>
          ))}
        </div>
      ) : null}

      <section className={styles.leadGrid}>
        {digest.headline ? (
          <a
            className={styles.headlineCard}
            href={digest.headline.url}
            target="_blank"
            rel="noreferrer"
          >
            {digest.headline.cover ? (
              <div
                className={styles.headlineCover}
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(20, 20, 20, 0.04), rgba(20, 20, 20, 0.78)), url(${digest.headline.cover})`,
                }}
              >
                <Tag color="gold" className={styles.headlineTag}>
                  <ThunderboltFilled /> 头条
                </Tag>
              </div>
            ) : null}
            <div className={styles.headlineBody}>
              <div className={styles.itemMetaRow}>
                {!digest.headline.cover ? (
                  <Tag color="gold" className={styles.headlineTagInline}>
                    <ThunderboltFilled /> 头条
                  </Tag>
                ) : null}
                <span>{digest.headline.source}</span>
                <span>{formatDateTime(digest.headline.publishedAt)}</span>
              </div>
              {digest.headline.cover ? (
                <p className={styles.editorNote}>编辑精选</p>
              ) : null}
              <h2>{renderTitle(digest.headline)}</h2>
              {renderTitle(digest.headline) !== digest.headline.title && digest.headline.title ? (
                <p className={styles.titleZhLead}>{digest.headline.title}</p>
              ) : null}
              <p>{renderSummary(digest.headline)}</p>
              <div className={styles.tagRow}>
                {digest.headline.tags.slice(0, 4).map((tag) => (
                  <span className={styles.inlineTag} key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <span className={styles.readMore}>
                打开原文 <ArrowRightOutlined />
              </span>
            </div>
          </a>
        ) : null}

        <aside className={styles.latestPanel}>
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.panelTitle}>精选速览</p>
              <h2>本轮最重要的几条</h2>
            </div>
            <Button type="link" icon={<ReloadOutlined />} onClick={loadDigest}>
              刷新
            </Button>
          </div>
          <div className={styles.latestList}>
            {importantItems.slice(0, 5).map((item, index) => (
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                key={item.id}
                className={styles.latestItem}
              >
                <span className={styles.latestIndex}>0{index + 1}</span>
                <div className={styles.itemMetaRow}>
                  <span>{item.source}</span>
                  <span>{formatDateTime(item.publishedAt)}</span>
                </div>
                <h3>{renderTitle(item)}</h3>
                {renderTitle(item) !== item.title && item.title ? (
                  <p className={styles.titleZhInline}>{item.title}</p>
                ) : null}
                <p>{renderSummary(item)}</p>
                <span className={styles.readMore}>
                  继续阅读 <ArrowRightOutlined />
                </span>
              </a>
            ))}
          </div>
        </aside>
      </section>

      {digest.featuredTools.length ? (
        <section className={styles.toolsSection}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionKicker}>发现好物</p>
              <h2>今日工具与网站</h2>
            </div>
            <span>适合顺手收藏，不适合沉底吃灰</span>
          </div>
          <div className={styles.toolGrid}>
            {digest.featuredTools.map((item) => (
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                key={item.id}
                className={styles.toolCard}
              >
                <div className={styles.toolCardTop}>
                  <span>{item.source}</span>
                  <span>{formatDateTime(item.publishedAt)}</span>
                </div>
                <h3>{renderTitle(item)}</h3>
                {renderTitle(item) !== item.title && item.title ? (
                  <p className={styles.titleZhInline}>{item.title}</p>
                ) : null}
                <p>{renderSummary(item)}</p>
              </a>
            ))}
          </div>
        </section>
      ) : null}

      <div className={styles.sectionStack}>
        {digest.sections.map((section) => (
          <section className={styles.section} key={section.key}>
            <div className={styles.sectionHeader}>
              <div>
                <p className={styles.sectionKicker}>
                  {CATEGORY_KICKER[section.key] || section.title}
                </p>
                <h2>{section.title}</h2>
                <p className={styles.sectionDesc}>{section.description}</p>
              </div>
              <span>{section.items.length} 篇</span>
            </div>
            <div className={styles.cardGrid}>
              {section.items.map((item) => (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  key={item.id}
                  className={styles.newsCard}
                >
                  <div className={styles.cardBody}>
                    <div className={styles.itemMetaRow}>
                      <span>{item.source}</span>
                      <span>{formatDateTime(item.publishedAt)}</span>
                    </div>
                    <h3>{renderTitle(item)}</h3>
                    {renderTitle(item) !== item.title && item.title ? (
                      <p className={styles.titleZhInline}>{item.title}</p>
                    ) : null}
                    <p>{renderSummary(item)}</p>
                    <div className={styles.tagRow}>
                      {item.tags.slice(0, 3).map((tag) => (
                        <span className={styles.inlineTag} key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default News;

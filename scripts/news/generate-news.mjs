import { XMLParser } from 'fast-xml-parser';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { NEWS_CATEGORY_META, NEWS_SOURCES } from './sources.mjs';

const currentFilePath = fileURLToPath(import.meta.url);
const projectRoot = path.resolve(path.dirname(currentFilePath), '../..');
const outputPath = path.join(projectRoot, 'public/news/daily-digest.json');
const requestHeaders = {
  'user-agent': 'chushanxue-news-bot/1.0 (+https://github.com)',
  accept:
    'application/json, text/html, application/xml, text/xml;q=0.9,*/*;q=0.8',
};

const parser = new XMLParser({
  ignoreAttributes: false,
  removeNSPrefix: true,
  trimValues: true,
});

const decodeHtmlEntities = (value = '') =>
  value
    .replace(/&#(\d+);/g, (_, code) => {
      const parsed = Number.parseInt(code, 10);
      return Number.isNaN(parsed) ? _ : String.fromCodePoint(parsed);
    })
    .replace(/&#x([\da-f]+);/gi, (_, code) => {
      const parsed = Number.parseInt(code, 16);
      return Number.isNaN(parsed) ? _ : String.fromCodePoint(parsed);
    })
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

const stripHtml = (value = '') =>
  decodeHtmlEntities(value)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const clampText = (value = '', maxLength = 160) => {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 1).trim()}…`;
};

const isBlockedUrl = (value = '') =>
  /github\.com\/login\?return_to=|github\.com\/sponsors\//i.test(value);

const isLikelyValidItem = (item) => {
  if (!item) {
    return false;
  }

  const title = stripHtml(item.title || '');
  const summary = stripHtml(item.summary || '');

  return Boolean(
    title.length >= 8 &&
      /^https?:\/\//i.test(item.url || '') &&
      !isBlockedUrl(item.url) &&
      !/^(login\?return_to=|sponsors\/)/i.test(title) &&
      (summary.length >= 16 || title.length >= 18),
  );
};

const toArray = (value) => {
  if (!value) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
};

const readTextField = (value) => {
  if (!value) {
    return '';
  }

  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'number') {
    return String(value);
  }

  if (typeof value === 'object') {
    return (
      value['#text'] || value.__cdata || value['@_href'] || value.title || ''
    );
  }

  return '';
};

const normalizeUrl = (value = '', fallbackBase = '') => {
  if (!value) {
    return '';
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  if (!fallbackBase) {
    return value;
  }

  try {
    return new URL(value, fallbackBase).toString();
  } catch {
    return value;
  }
};

const resolvePublishedAt = (item) => {
  const candidates = [
    item.pubDate,
    item.published,
    item.updated,
    item.isoDate,
    item.date,
  ]
    .map(readTextField)
    .filter(Boolean);

  for (const candidate of candidates) {
    const date = new Date(candidate);

    if (!Number.isNaN(date.getTime())) {
      return date.toISOString();
    }
  }

  return new Date().toISOString();
};

const resolveLink = (item, sourceUrl) => {
  const links = toArray(item.link);

  for (const link of links) {
    if (typeof link === 'string' && link) {
      return normalizeUrl(link, sourceUrl);
    }

    if (link?.['@_href']) {
      return normalizeUrl(link['@_href'], sourceUrl);
    }
  }

  return normalizeUrl(readTextField(item.guid), sourceUrl) || sourceUrl;
};

const resolveCover = (item, sourceUrl) => {
  const enclosure = toArray(item.enclosure)[0];
  const media = toArray(item.content)
    .map((entry) => entry?.['@_url'] || entry?.url)
    .find(Boolean);
  const firstImage = readTextField(
    item.thumbnail?.['@_url'] || item.image?.url,
  );
  const html = [
    readTextField(item.description),
    readTextField(item.summary),
    readTextField(item['content:encoded']),
    readTextField(item.content),
  ]
    .filter(Boolean)
    .join(' ');
  const inlineImageMatch = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  const url =
    enclosure?.['@_url'] ||
    enclosure?.url ||
    media ||
    firstImage ||
    inlineImageMatch?.[1] ||
    '';

  return normalizeUrl(url, sourceUrl);
};

const toNewsItem = ({
  source,
  title,
  summary,
  url,
  publishedAt,
  tags = [],
  cover,
  author,
  sourceType,
}) => {
  const safeTitle = stripHtml(title);
  const safeSummary = clampText(stripHtml(summary), 168);
  const safeUrl = normalizeUrl(url, source.sourceUrl);
  const published = publishedAt || new Date().toISOString();
  const freshnessHours = Math.max(
    0,
    (Date.now() - new Date(published).getTime()) / (1000 * 60 * 60),
  );
  const freshnessScore = Math.max(0, 36 - freshnessHours) * 1.6;
  const score = Math.round(
    source.weight * 55 + freshnessScore + safeSummary.length / 28,
  );

  return {
    id: crypto
      .createHash('sha1')
      .update(`${source.key}:${safeUrl || safeTitle}`)
      .digest('hex')
      .slice(0, 16),
    title: safeTitle,
    summary: safeSummary,
    url: safeUrl || source.sourceUrl,
    source: source.title,
    sourceUrl: source.sourceUrl,
    publishedAt: published,
    category: source.category,
    tags: [...new Set([...(source.tags || []), ...tags].filter(Boolean))].slice(
      0,
      6,
    ),
    score,
    sourceType,
    cover,
    author,
  };
};

const parseRssItems = async (source) => {
  const response = await fetch(source.url, { headers: requestHeaders });

  if (!response.ok) {
    throw new Error(`${source.title} 返回 ${response.status}`);
  }

  const xml = await response.text();
  const parsed = parser.parse(xml);
  const rssItems = toArray(parsed?.rss?.channel?.item);
  const atomItems = toArray(parsed?.feed?.entry);
  const items = rssItems.length ? rssItems : atomItems;

  return items.slice(0, source.limit).map((item) => {
    const tags = toArray(item.category).map((entry) =>
      stripHtml(readTextField(entry?.['@_term'] || entry)).trim(),
    );

    return toNewsItem({
      source,
      title: readTextField(item.title),
      summary:
        readTextField(item.summary) ||
        readTextField(item.description) ||
        readTextField(item['content:encoded']) ||
        readTextField(item.content),
      url: resolveLink(item, source.sourceUrl),
      publishedAt: resolvePublishedAt(item),
      tags,
      cover: resolveCover(item, source.sourceUrl),
      author: readTextField(item.author?.name || item.author),
      sourceType: 'rss',
    });
  });
};

const parseHackerNewsItems = async (source) => {
  const response = await fetch(source.url, { headers: requestHeaders });

  if (!response.ok) {
    throw new Error(`${source.title} 返回 ${response.status}`);
  }

  const ids = (await response.json()).slice(0, source.limit);
  const items = [];

  for (const id of ids) {
    const itemResponse = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
      {
        headers: requestHeaders,
      },
    );

    if (!itemResponse.ok) {
      continue;
    }

    const item = await itemResponse.json();

    if (!item?.title) {
      continue;
    }

    items.push(
      toNewsItem({
        source,
        title: item.title,
        summary:
          stripHtml(item.text || '') ||
          `Hacker News 热帖，当前积分 ${item.score || 0}，评论 ${item.descendants || 0}。`,
        url: item.url || `https://news.ycombinator.com/item?id=${item.id}`,
        publishedAt: new Date(
          (item.time || Date.now() / 1000) * 1000,
        ).toISOString(),
        tags: ['Hacker News', item.type === 'job' ? '招聘' : '讨论'],
        sourceType: 'api',
      }),
    );
  }

  return items;
};

const uniqueBy = (items) => {
  const map = new Map();

  items
    .filter((item) => item?.title && item?.url)
    .forEach((item) => {
      const key = `${item.url.toLowerCase()}::${item.title.toLowerCase()}`;

      if (!map.has(key) || (map.get(key)?.score || 0) < item.score) {
        map.set(key, item);
      }
    });

  return [...map.values()];
};

const sortByScore = (items) =>
  items.sort((left, right) => {
    const timeDiff =
      new Date(right.publishedAt).getTime() -
      new Date(left.publishedAt).getTime();

    if (Math.abs(timeDiff) > 1000 * 60 * 60) {
      return timeDiff;
    }

    return right.score - left.score;
  });

const buildSections = (items) =>
  NEWS_CATEGORY_META.map((category) => ({
    key: category.key,
    title: category.title,
    description: category.description,
    items: sortByScore(
      items.filter((item) => item.category === category.key).slice(0, 6),
    ),
  })).filter((section) => section.items.length > 0);

const generateDigest = async () => {
  const collected = [];
  const sourceFailures = [];
  let succeededSources = 0;

  for (const source of NEWS_SOURCES) {
    try {
      let items = [];

      if (source.type === 'rss') {
        items = await parseRssItems(source);
      } else if (source.type === 'api') {
        items = await parseHackerNewsItems(source);
      }

      items = items.filter(isLikelyValidItem);

      if (items.length) {
        collected.push(...items);
        succeededSources += 1;
      } else {
        sourceFailures.push(`${source.title} 无可用条目`);
      }
    } catch (error) {
      sourceFailures.push(
        `${source.title}: ${error instanceof Error ? error.message : '抓取失败'}`,
      );
    }
  }

  const mergedItems = sortByScore(uniqueBy(collected));
  const sections = buildSections(mergedItems);
  const headline = mergedItems[0];
  const latest = mergedItems.slice(0, 8);
  const featuredTools = mergedItems
    .filter(
      (item) => item.category === 'tools' || item.tags.includes('工具/网站'),
    )
    .slice(0, 6);
  const digest = {
    generatedAt: new Date().toISOString(),
    headline,
    latest,
    featuredTools,
    sections,
    sourceFailures,
    sourceStats: {
      totalItems: mergedItems.length,
      totalSources: NEWS_SOURCES.length,
      succeededSources,
      failedSources: NEWS_SOURCES.length - succeededSources,
    },
  };

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(
    outputPath,
    `${JSON.stringify(digest, null, 2)}\n`,
    'utf8',
  );

  return digest;
};

generateDigest()
  .then((digest) => {
    console.log(
      `[news] generated ${digest.sourceStats.totalItems} items at ${digest.generatedAt}`,
    );
  })
  .catch((error) => {
    console.error('[news] failed to generate digest');
    console.error(error);
    process.exitCode = 1;
  });

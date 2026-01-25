import { CopyOutlined } from '@ant-design/icons';
import { message } from 'antd';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import vs from 'react-syntax-highlighter/dist/esm/styles/prism/vs';
import rehypeRaw from 'rehype-raw';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import style from './index.less';
interface IMarkdownProps {
  children: string;
}

const Markdown: React.FC<IMarkdownProps> = ({ children }) => {
  return (
    <ReactMarkdown
      className={style.markdown}
      remarkPlugins={[remarkGfm, remarkBreaks]}
      rehypePlugins={[rehypeRaw]}
      components={{
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          const handleCopy = () => {
            navigator.clipboard.writeText(String(children).replace(/\n$/, ''));
            message.success('复制成功');
          };
          return !inline && match ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={handleCopy}
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#919191',
                }}
              >
                <CopyOutlined />
              </button>
              <SyntaxHighlighter
                {...props}
                style={vs}
                language={match[1]}
                PreTag="div"
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          );
        },
        // 代替原linkTarget="_blank"方案
        a: ({ node, href, children, ...props }) => (
          <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
            {children}
          </a>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

export default Markdown;

// TagScroller.tsx
import React from 'react';
import { Tag, TagContainer } from './Tagscroller.styles';

interface TagData {
  name: string;
  link: string;
}

const tags: TagData[] = [
  { name: "#게이밍", link: "https://link1.com" },
  { name: "#프로게이머", link: "https://link2.com" },
  { name: "#디자이너", link: "https://link2.com" },
  { name: "#프로그래머", link: "https://link2.com" },
  { name: "#모니터암", link: "https://link2.com" },
  { name: "#노트북", link: "https://link2.com" },
  { name: "#대학생", link: "https://link2.com" },
  { name: "#맥북", link: "https://link2.com" },
  { name: "#애플", link: "https://link2.com" },
  { name: "#삼성", link: "https://link2.com" },
  { name: "#우드", link: "https://link2.com" },
  { name: "#미니멀리즘", link: "https://link2.com" },
  { name: "#필립스", link: "https://link2.com" },
  { name: "#HUE", link: "https://link2.com" },
  { name: "#애플홈팟", link: "https://link2.com" },
];

const TagScroller: React.FC = () => {
  return (
    <TagContainer>
      <div className="scrolling-wrapper">
        {tags.map((tag, index) => (
          <Tag key={index} href={tag.link}>
            {tag.name}
          </Tag>
        ))}
        {tags.map((tag, index) => (
          <Tag key={`second-${index}`} href={tag.link}>
            {tag.name}
          </Tag>
        ))}
      </div>
    </TagContainer>
  );
};

export default TagScroller;

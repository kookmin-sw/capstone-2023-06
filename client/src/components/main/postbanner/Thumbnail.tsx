import React from 'react';
import { PostWrapper, PostContainer, PostImage, PostContent } from './Thumbnail.styles';

interface Post {
  title: string;
  author: string;
  date: string;
}

interface PostProps {
  post: Post;
}

export const MainPost = (props: PostProps) => {
  const { post } = props;

  const handlePostClick = () => {
    console.log(`Post clicked: ${post.title}`);
    
  };


  return (
    <PostContainer>
      <PostContent onClick={handlePostClick}>
        <PostImage></PostImage>
        <span>{post.date}</span>
        <h3>{post.title}</h3>
        <p>{post.author}</p>
      </PostContent>
    </PostContainer>
  );
};

export default MainPost;

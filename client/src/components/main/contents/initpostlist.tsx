import React, { useState, useEffect } from 'react';
import Review, { ReviewType } from '../../../components/Review';
import { getPostList } from '../../../api/upload';

type PostType = {
  id: string;
  thumbnail: string;
  title: string;
  authorNickname: string;
  author_id: string;
  authorEmail: string;
  authorImagep: string;
  createdAt: string;
  hashtags: string;
};

const InitPostList = ({ type }: { type: "user" | "date" | "like" }) => {
  const [posts, setPosts] = useState<ReviewType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getPostList(type);
      if (response.success) {
        setPosts(response.result.map((post: PostType) => ({
            id: post.id,
            thumbnail: post.thumbnail,
            title: post.title,
            author: {
              nickname: post.authorNickname,
              id: post.author_id,
              email: post.authorEmail,
              img: post.authorImagep,
            },
            date: post.createdAt,
            tags: post.hashtags,
          })));
      }
    };
    fetchData();
  }, [type]);

  return (
    <div className="row">
      {posts.map((post) => (
        <div className="col-md-3" key={post.id}>
          <Review {...post} />
        </div>
      ))}
    </div>
  );
};

export default InitPostList;

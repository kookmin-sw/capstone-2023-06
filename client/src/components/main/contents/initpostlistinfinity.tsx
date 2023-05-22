// InitPostListInfinity.tsx
import { useParams } from 'react-router-dom';
import Review, { ReviewType } from '../../Review';
import { useEffect, useState } from 'react';
import { getPostListInfinity } from '../../../api/upload';

type PostType = {
    id: string;
    thumbnail: string;
    title: string;
    authorNickname: string;
    author_id: string;
    authorEmail: string;
    authorImage: string;
    createdAt: string;
    hashtags: string;
  };
  

const InitPostListInfinity = () => {
  const { type } = useParams<{ type: "user" | "date" | "like" }>(); // Update here
  const [posts, setPosts] = useState<ReviewType[]>([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (!type) { // Add this check
      console.error('Type is not defined');
      return;
    }

    const fetchData = async () => {
      const response = await getPostListInfinity(type, false, offset);
      if (response.success) {
        setPosts(prevPosts => [
          ...prevPosts,
          ...response.result.map((post: PostType) => ({
            id: post.id,
            thumbnail: post.thumbnail,
            title: post.title,
            author: {
              nickname: post.authorNickname,
              id: post.author_id,
              email: post.authorEmail,
              img: post.authorImage,
            },
            date: post.createdAt,
            tags: post.hashtags,
          }))
        ]);
        setOffset(prevOffset => prevOffset + 20);
      }
    };
    fetchData();
  }, [type, offset]); // Add 'type' as a dependency

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

export default InitPostListInfinity;

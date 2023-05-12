import React from 'react';
import styled from 'styled-components';
import { MainLayout } from '../components/layout/Layout';
import { MainPost } from '../components/main/postbanner/Thumbnail'; //이렇게 분리하는게 맞는지?
import { PostWrapper } from '../components/main/postbanner/Thumbnail.styles';
import AdBanner from '../components/main/adbanner/AdBanner';
import Review, { ReviewType } from '../components/Review';
import { getPostList } from '../api/upload';


//걍 테스트 서버에서 받아오기
const testPosts: ReviewType[] = [
  { id:0, thumbnail: "", title: "게시물 1", author: { nickname: "작성자 1", id: 0, email: "333", image: "2323" }, tags: ['태그1', '태그2', '태그3'], date: "2023-05-03" }, //임시 데이터
  { id:0, thumbnail: "", title: "게시물 2", author: { nickname: "작성자 1", id: 0, email: "333", image: "2323" }, tags: ['태그1', '태그2', '태그3'], date: "2023-05-04" },
  { id:0, thumbnail: "", title: "게시물 3", author: { nickname: "작성자 1", id: 0, email: "333", image: "2323" }, tags: ['태그1', '태그2', '태그3'], date: "2023-05-05" },
  { id:0, thumbnail: "", title: "게시물 4", author: { nickname: "작성자 1", id: 0, email: "333", image: "2323" }, tags: ['태그1', '태그2', '태그3'], date: "2023-05-06" },
];

// 나중에 레이아웃좀 변경해야지
const Main = () => {

  const [recommendPost, setRecommendPost] = React.useState<ReviewType[]>();

  React.useEffect(() => {
    initPostList();

  }, []);

  const initPostList = async () => {
    try {
      const res = await getPostList("user");

      console.log(res);
      if (res.success) {
        setRecommendPost([...res.result.map((post: { id:any; thumbnail: any; title: any; authorNickname: any; author_id: any; authorEmail: any; authorImagep: any; createdAt: any; hashtags: any; }) => {
          return {
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
          }
        })]);
      }
    } catch (err) {
      console.error(err);
      // navigate('/404');
    }
  };

  return (
    <MainLayout>
      <AdBanner />
      <div style={{ marginBottom: '3rem' }}></div>
      <h2 style={{ color: '#386437' }}>추천 게시물</h2>
      <h5>고롱스를 위한 추천 게시물</h5>
      <div style={{ marginBottom: '1rem' }}></div>
      <div className='row'>
        {recommendPost?.map((post, index) => (
          <div className="col-md-3">
            <Review key={index} {...post} />
          </div>
          // <MainPost key={index} post={post} />
        ))}
      </div>
      <h2 style={{ color: '#386437' }}>인기 게시물</h2>
      <h5>최근 인기 게시물</h5>
      <div className='row'>
        {testPosts.map((post, index) => (
          <div className="col-md-3">
            <Review key={index} {...post} />
          </div>
          // <MainPost key={index} post={post} />
        ))}
      </div>
      <h2 style={{ color: '#386437' }}>셀럽 게시물</h2>
      <h5>드라마 속 그 제품</h5>
      <div className='row'>
        {testPosts.map((post, index) => (
          <div className="col-md-3">
            <Review key={index} {...post} />
          </div>
          // <MainPost key={index} post={post} />
        ))}
      </div>
    </MainLayout>
  );
};

export default Main;
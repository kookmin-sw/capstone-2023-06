import React from 'react';
import styled from 'styled-components';
import { MainLayout } from '../components/layout/Layout';
import { MainPost } from '../components/main/postbanner/Thumbnail'; //이렇게 분리하는게 맞는지?
import { PostWrapper } from '../components/main/postbanner/Thumbnail.styles';
import AdBanner from '../components/main/adbanner/AdBanner';
import Review, { ReviewType } from '../components/Review';


//걍 테스트 서버에서 받아오기
const testPosts: ReviewType[] = [
  { title: "게시물 1", author: "작성자 1", tags: ['태그1', '태그2', '태그3'], date: "2023-05-03" }, //임시 데이터
  { title: "게시물 2", author: "작성자 2", tags: ['태그1', '태그2', '태그3'], date: "2023-05-04" },
  { title: "게시물 3", author: "작성자 3", tags: ['태그1', '태그2', '태그3'], date: "2023-05-05" },
  { title: "게시물 4", author: "작성자 4", tags: ['태그1', '태그2', '태그3'], date: "2023-05-06" },
];

// 나중에 레이아웃좀 변경해야지
const Main = () => {
  return (
    <MainLayout>
      <AdBanner />
      <div style={{ marginBottom: '3rem' }}></div>
      <h2 style={{ color: '#386437' }}>추천 게시물</h2>
      <h5>고롱스를 위한 추천 게시물</h5>
      <div style={{ marginBottom: '1rem' }}></div>
      <div className='row'>
        {testPosts.map((post, index) => (
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
import React from "react";
import styled from "styled-components";
import { MainLayout } from "../components/layout/Layout";
import AdBanner from "../components/main/adbanner/AdBanner";
import Review, { ReviewType } from "../components/Review";
import { getPostList } from "../api/upload";
import { Link } from "react-router-dom";


type PostType = {
  id: string;
  thumbnail: string;
  title: string;
  authorNickname: string;
  author_id: string;
  authorEmail: string;
  authorPicture: string;
  createdAt: string;
  hashtags: string;
};

// 나중에 레이아웃좀 변경해야지
const Main = () => {
  const [recommendPost, setRecommendPost] = React.useState<ReviewType[]>();
  const [popularPost, setPopularPost] = React.useState<ReviewType[]>();
  const [celebPost, setCelebPost] = React.useState<ReviewType[]>();

  React.useEffect(() => {
    initPostList();
  }, []);

  const initPostList = async () => {
    try {
      const resRecommend = await getPostList("user");
      if (resRecommend.success) {
        setRecommendPost([
          ...resRecommend.result.map((post: PostType) => {
            return {
              id: post.id,
              thumbnail: post.thumbnail,
              title: post.title,
              author: {
                nickname: post.authorNickname,
                id: post.author_id,
                email: post.authorEmail,
                image: post.authorPicture,
              },
              date: post.createdAt,
              tags: post.hashtags,
            };
          }),
        ]);
      }

      const resPopular = await getPostList("like");
      if (resPopular.success) {
        console.log(resPopular);
        setPopularPost([
          ...resPopular.result.map((post: PostType) => {
            return {
              id: post.id,
              thumbnail: post.thumbnail,
              title: post.title,
              author: {
                nickname: post.authorNickname,
                id: post.author_id,
                email: post.authorEmail,
                image: post.authorPicture,
              },
              date: post.createdAt,
              tags: post.hashtags,
            };
          }),
        ]);
      }

      const resCeleb = await getPostList("date");
      if (resCeleb.success) {
        setCelebPost([
          ...resCeleb.result.map((post: PostType) => {
            return {
              id: post.id,
              thumbnail: post.thumbnail,
              title: post.title,
              author: {
                nickname: post.authorNickname,
                id: post.author_id,
                email: post.authorEmail,
                image: post.authorPicture,
              },
              date: post.createdAt,
              tags: post.hashtags,
            };
          }),
        ]);
      }
    } catch (err) {
      console.error(err);
      // navigate('/404');
    }
  };

  return (
    <MainLayout>
      <AdBanner />
      {/* <TagScroller/> */}
      <div style={{ marginBottom: "3rem" }}></div>
      <SubHeader style={{ color: "#386437" }}>추천 게시물
        <MoreLink to="/styling?type=user">더보기</MoreLink>
      </SubHeader>
      <h5>당신을 위한 추천 게시물</h5>
      <div style={{ marginBottom: "1rem" }}></div>
      <div className="row">
        {recommendPost?.map((post, index) => (
          <div className="col-md-3" key={index}>
            <Review  {...post} />
          </div>
        ))}
      </div>


      <div style={{ marginBottom: "3rem" }}></div>
      <SubHeader style={{ color: "#386437" }}>인기 게시물
        <MoreLink to="/styling?type=like">더보기</MoreLink>
      </SubHeader>
      <h5>지금 인기있는 게시물</h5>
      <div style={{ marginBottom: "1rem" }}></div>
      <div className="row">
        {popularPost?.map((post, index) => (
          <div className="col-md-3" key={index}>
            <Review  {...post} />
          </div>
        ))}
      </div>


      <div style={{ marginBottom: "3rem" }}></div>
      <SubHeader style={{ color: "#386437" }}>최신 게시물
        <MoreLink to="/styling?type=date">더보기</MoreLink>
      </SubHeader>
      <h5>따끈따끈, 최근에 작성된 게시물</h5>
      <div style={{ marginBottom: "1rem" }}></div>
      <div className="row">
        {celebPost?.map((post, index) => (
          <div className="col-md-3" key={index}>
            <Review  {...post} />
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default Main;

const SubHeader = styled.h2`
display: flex;
justify-content: space-between;
align-items: center;
`
const MoreLink = styled(Link)`
  font-size: 1rem;
  color: black;
`;
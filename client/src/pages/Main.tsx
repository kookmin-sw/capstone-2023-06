import React from "react";
import styled from "styled-components";
import { MainLayout } from "../components/layout/Layout";
import { MainPost } from "../components/main/postbanner/Thumbnail"; //이렇게 분리하는게 맞는지?
import { PostWrapper } from "../components/main/postbanner/Thumbnail.styles";
import AdBanner from "../components/main/adbanner/AdBanner";
import TagScroller from '../components/main/tagscroller/Tagscroller';
import Review, { ReviewType } from "../components/Review";
import { getPostList } from "../api/upload";
import ProductList from "../components/store/Productlist";


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
                img: post.authorImagep,
              },
              date: post.createdAt,
              tags: post.hashtags,
            };
          }),
        ]);
      }
      const resPopular = await getPostList("user");

      if (resPopular.success) {
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
                img: post.authorImagep,
              },
              date: post.createdAt,
              tags: post.hashtags,
            };
          }),
        ]);
      }
      const resCeleb = await getPostList("user");

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
                img: post.authorImagep,
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
    <AdBanner/>
    <TagScroller/>
    <div style={{ marginBottom: "3rem" }}></div>
    <h2 style={{ color: "#386437" }}>추천 게시물</h2>
    <h5>당신을 위한 추천 게시물</h5>
    <div style={{ marginBottom: "1rem" }}></div>
    <div className="row">
        {recommendPost?.map((post, index) => (
          <div className="col-md-3" key={index}>
            <Review  {...post} />
          </div>
          // <MainPost key={index} post={post} />
        ))}
    </div>
    <h2 style={{ color: "#386437" }}>인기 게시물</h2>
    <h5>최근 인기 게시물</h5>
    <div className="row">
        {popularPost?.map((post, index) => (
          <div className="col-md-3">
            <Review key={index} {...post} />
          </div>
          // <MainPost key={index} post={post} />
        ))}
    </div>
    <h2 style={{ color: "#386437" }}>셀럽 게시물</h2>
    <h5>드라마 속 그 게시물</h5>
    <div className="row">
        {celebPost?.map((post, index) => (
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

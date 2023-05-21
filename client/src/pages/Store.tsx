import React, { useState, useEffect } from "react";
import { MainLayout } from "../components/layout/Layout";
import AdBanner from "../components/main/adbanner/AdBanner";
import { ReviewType } from "../components/Review";
import { getProductListInfinity } from "../api/product";
import ProductList from "../components/store/Productlist";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";
import { throttle } from "lodash";

type ProductType = {
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

const Store = () => {
  const [search] = useSearchParams();
  const [type, setType] = React.useState<string>("");
  const [products, setProducts] = useState<ReviewType[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isDataEnd, setIsDataEnd] = useState<boolean>(false);

  useEffect(() => {
    setProducts([]);
    console.log(search.get("type"), "@@@@@@@");
    setType(search.get("type") || "date");
    //loadHandler();
  }, [search]);


  useEffect(() => {
    loadHandler();
  }, [type]);



  const loadHandler = throttle(() => {
    if (isDataEnd || type === "") {
      console.log("asdf");
      return;
    }
    fetchMoreData();
  }, 2000);

  const fetchMoreData = async () => {
    try {
      const res = await getProductListInfinity("date", false, offset);
      if (res.success) {
        if (res.result.length === 0) {
          setHasMore(false);
          return;
        }
        setProducts(prevProducts => [
          ...prevProducts,
          ...res.result.map((product: ProductType) => ({
            id: product.id,
            thumbnail: product.thumbnail,
            title: product.title,
            author: {
              nickname: product.authorNickname,
              id: product.author_id,
              email: product.authorEmail,
              img: product.authorImagep,
            },
            date: product.createdAt,
            tags: product.hashtags,
          }))
        ]);
        setOffset(prevOffset => prevOffset + 20);
      }
    } catch (err) {
      console.error(err);
      // navigate('/404');
    }
  };

  return (
    <MainLayout>
      <AdBanner />
      <div style={{ marginBottom: "3rem" }} />
      <InfiniteScroll
        dataLength={products.length}
        next={loadHandler}
        hasMore={hasMore}
        loader={<h4>로딩 중...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>모든 제품을 보셨습니다.</b>
          </p>
        }
      >
        <ProductList
          title="추천 제품"
          subtitle="고롱스를 위한 추천 제품"
          products={products}
        />
      </InfiniteScroll>
    </MainLayout>
  );
};

export default Store;

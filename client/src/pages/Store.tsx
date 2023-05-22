import React, { useState, useEffect } from "react";
import { MainLayout } from "../components/layout/Layout";
import AdBanner from "../components/main/adbanner/AdBanner";
import { ReviewType } from "../components/Review";
import { productSearch, getProductListInfinity } from "../api/product";
import ProductList from "../components/store/Productlist";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";
import Search from "../components/Search";
import { throttle } from "lodash";

type ProductType = {
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

const Store = () => {
  const [search] = useSearchParams();
  const [type, setType] = React.useState<string>("");
  const [products, setProducts] = useState<ReviewType[]>([]);
  const [offset, setOffset] = useState(0);
  const [isDataEnd, setIsDataEnd] = useState<boolean>(false);
  const limit = 20;

  useEffect(() => {
    setProducts([]);
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
        if (res.result.length < limit) {
          setIsDataEnd(true);
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
              img: product.authorImage,
            },
            date: product.createdAt,
            tags: product.hashtags,
          }))
        ]);
        setOffset(prevOffset => prevOffset + limit);
      }
    } catch (err) {
      console.error(err);
      // navigate('/404');
    }
  };

  const searchProduct = async (data: string) => {
    try {
      console.log(data);
      const res = await productSearch(data);

      if (res.success) {
        setProducts(
          res.result.map((product: ProductType) => ({
            id: product.id,
            thumbnail: product.thumbnail,
            title: product.title,
            author: {
              nickname: product.authorNickname,
              id: product.author_id,
              email: product.authorEmail,
              img: product.authorImage,
            },
            date: product.createdAt,
            tags: product.hashtags,
          }))
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <MainLayout>
      <AdBanner />
      <Search msgType="제품" searchEvent={searchProduct} placeholder="데스크 의자" />
      <div style={{ marginBottom: "3rem" }} />
      <InfiniteScroll
        dataLength={products.length}
        next={loadHandler}
        hasMore={!isDataEnd}
        loader={<h4>로딩 중...</h4>}
        endMessage={
          <p style={{ textAlign: 'center', opacity: '0.2' }}>
            <b>모든 제품을 보셨습니다.</b>
          </p>
        }
        style={{overflow: "hidden"}}
      >
        <ProductList
          title="추천 제품"
          subtitle="당신을 위한 추천 제품"
          products={products}
        />
      </InfiniteScroll>
    </MainLayout>
  );
};

export default Store;

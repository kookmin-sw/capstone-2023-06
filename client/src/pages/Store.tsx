import React from "react";
import { MainLayout } from "../components/layout/Layout";
import AdBanner from "../components/main/adbanner/AdBanner";
import { ReviewType } from "../components/Review";
import { getProductList } from "../api/product";
import ProductList from "../components/store/Productlist";
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
  const [recommendProduct, setRecommendProduct] = React.useState<ReviewType[]>([]);
  const [popularProduct, setPopularProduct] = React.useState<ReviewType[]>([]);
  const [celebProduct, setCelebProduct] = React.useState<ReviewType[]>([]);

  React.useEffect(() => {
    initProductList();
  }, []);

  const initProductList = async () => {
    try {
      const resRecommend = await getProductList("like");

      if (resRecommend.success) {
        setRecommendProduct([
          ...resRecommend.result.map((product: ProductType) => {
            return {
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
            };
          }),
        ]);
      }
      const resPopular = await getProductList("date");

      if (resPopular.success) {
        setPopularProduct([
          ...resPopular.result.map((product: ProductType) => {
            return {
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
            };
          }),
        ]);
      }
      const resCeleb = await getProductList("user");

      if (resCeleb.success) {
        setCelebProduct([
          ...resCeleb.result.map((product: ProductType) => {
            return {
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
      <div style={{ marginBottom: "3rem" }} />
      <ProductList 
        title="추천 제품" 
        subtitle="고롱스를 위한 추천 제품" 
        products={recommendProduct} 
      />
      <ProductList 
        title="인기 제품" 
        subtitle="최근 인기 제품" 
        products={popularProduct} 
      />
      <ProductList 
        title="셀럽 제품" 
        subtitle="드라마 속 그 제품" 
        products={celebProduct} 
      />
    </MainLayout>
  );
};

export default Store;

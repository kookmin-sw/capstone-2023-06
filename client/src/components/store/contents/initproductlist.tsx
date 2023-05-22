import React from 'react';
import ProductList from "../../../components/store/Productlist";
import { getProductList } from "../../../api/product";
import { ReviewType } from "../../../components/Review";

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

const InitProductList = ({ type }: { type: "user" | "date" | "like" }) => {
  const [productList, setProductList] = React.useState<ReviewType[]>([]);

  React.useEffect(() => {
    const fetchProductList = async () => {
      const response = await getProductList(type);
      if (response.success) {
        setProductList(
          response.result.map((product: ProductType) => ({
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
    };

    fetchProductList();
  }, [type]);

  return (
    <ProductList
      title="추천 제품"
      subtitle="고롱스를 위한 추천 제품"
      products={productList}
    />
  );
};

export default InitProductList;

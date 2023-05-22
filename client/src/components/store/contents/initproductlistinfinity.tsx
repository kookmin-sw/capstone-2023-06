import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ProductList from "../../../components/store/Productlist";
import { getProductListInfinity } from "../../../api/product";
import Review, { ReviewType } from "../../../components/Review";

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

const InitProductListInfinity = ({ type }: { type: "user" | "date" | "like" }) => {
    const [products, setProducts] = useState<ReviewType[]>([]);
    const [offset, setOffset] = useState(0);
  
    useEffect(() => {
      const fetchData = async () => {
        const response = await getProductListInfinity(type, false, offset);
        if (response.success) {
          setProducts(prevProducts => [
            ...prevProducts,
            ...response.result.map((product: ProductType) => ({
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
          setOffset(prevOffset => prevOffset + 20);
        }
      };
      fetchData();
    }, [type, offset]);
  
    return (
      <div className="row">
        {products.map((product, index) => (
          <div className="col-md-3" key={index}>
            <Review {...product} />
          </div>
        ))}
      </div>
    );
  };
  
  export default InitProductListInfinity;

import React from "react";
import { MainLayout } from "../components/layout/Layout";
import styled, { css } from "styled-components";
import ProductDetailPostImage from "../components/product/ProductDetailPost";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import CommentList from "../components/Comment/CommentList";
import { CommentData, ProductData } from "../type/product";
import ProductCard from "../components/product/ProductCard";
import ProductReview from "../components/product/ProductReview";
import {
  getComments,
  getProduct,
  getProductLike,
  productLike,
  productReviews,
} from "../api/product";
import { useSelector } from "react-redux";
import { RootState } from "../modules";
import { ReviewType } from "../components/Review";

const Product = () => {
  const { hash } = useLocation();
  const { product_id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = React.useState<ProductData>({
    name: "",
    tags: [],
    thumbnail: "",
    subThumbnail: [],
    price: "",
    detail: "",
    content: "",
    brand: "",
  });
  const [comments, setComments] = React.useState<CommentData[]>([]);
  const [reviews, setReviews] = React.useState<ReviewType[]>([]);
  const [isFollowing, setIsFollowing] = React.useState<boolean>();
  const { id, isLoggedIn } = useSelector((state: RootState) => ({
    id: state.users.id,
    isLoggedIn: state.users.isLoggedIn,
  }));

  React.useEffect(() => {
    initProduct();
    initReviews();
    initComments();
  }, [product_id]);

  React.useEffect(() => {
    initFollowing();
  }, [product_id, isLoggedIn]);

  const initProduct = async () => {
    if (!product_id) return;
    try {
      const res = await getProduct(product_id);

      if (res.success) {
        console.log(res);

        setProduct({
          name: res.result.title,
          tags: res.result.hashtags,
          thumbnail: res.result.thumbnail,
          subThumbnail: res.result.subthumbnails,
          price: res.result.price,
          detail: res.result.description,
          content: res.result.content,
          brand: res.result.authorNickname,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const initReviews = async () => {
    if (!product_id) return;
    try {
      const res = await productReviews(product_id);
      if (res.success) {
        setReviews(
          res.result.map(
            (r: {
              id: any;
              thumbnail: any;
              title: any;
              author_id: any;
              authorNickname: any;
              authorPicture: any;
              authorEmail: any;
              created_at: any;
              hashtags: any;
            }) => {
              return {
                id: r.id,
                thumbnail: r.thumbnail,
                title: r.title,
                author: {
                  id: r.author_id,
                  nickname: r.authorNickname,
                  image: r.authorPicture,
                  email: r.authorEmail,
                },
                date: r.created_at,
                tags: r.hashtags,
              };
            }
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const initComments = async () => {
    if (!product_id) return;
    try {
      const res = await getComments(product_id);
      if (res.success) {
        setComments(
          res.result.map(
            (co: {
              comment: any;
              user_id: any;
              userNickname: any;
              userPicture: any;
              userEmail: any;
            }) => {
              return {
                comment: co.comment,
                user: {
                  id: co.user_id,
                  nickname: co.userNickname,
                  image: co.userPicture,
                  email: co.userEmail,
                },
              };
            }
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const initFollowing = async () => {
    if (!product_id || !isLoggedIn) return;
    try {
      const res = await getProductLike(product_id);

      console.log(res);
      if (res.success) {
        if (
          res.result.find((e: { user_id: string | number }) => e.user_id === id)
        ) {
          setIsFollowing(true);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const followHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!isLoggedIn) {
      if (
        window.confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?")
      ) {
        navigate("/login");
      }
      return;
    }

    if (!product_id) return;
    try {
      const res = await productLike(product_id);

      console.log(res);
      if (res.success) {
        setIsFollowing(res.result);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <MainLayout>
      <ProductHeader>
        <ProductCard
          product={product}
          likeEvent={followHandler}
          isLike={isFollowing}
        />
      </ProductHeader>

      <DottedLine />
      <ProductNav>
        <ProductNavItem to="#detail" $active={hash === "#detail"}>
          제품 상세 정보
        </ProductNavItem>
        <ProductNavItem to="#review" $active={hash === "#review"}>
          리뷰 {reviews.length}개
        </ProductNavItem>
        <ProductNavItem to="#comment" $active={hash === "#comment"}>
          댓글 {comments.length}개
        </ProductNavItem>
      </ProductNav>

      {hash === "#comment" ? (
        <CommentList comments={comments} fluid />
      ) : hash === "#review" ? (
        <ProductReview reviews={reviews} />
      ) : (
        <ProductDetailPostImage content={product.content} />
      )}
      {/* <ProductDetailPostImage src="https://iws.danawa.com/prod_img/500000/541/312/desc/prod_19312541/add_1/20230314163829604_0GUVMB4J.jpg" /> */}
    </MainLayout>
  );
};

export default Product;

const ProductHeader = styled.div`
  margin-top: 3rem;
`;

// Product nav ======================
const ProductNav = styled.div`
  display: flex;
`;
const ProductNavItem = styled(Link) <{ $active: boolean }>`
  flex: 1;
  padding: 1rem;
  margin-bottom: 3rem;
  text-align: center;
  &:hover {
    background-color: #f8f2e287;
  }
  ${(props) => {
    if (props.$active)
      return css`
        font-weight: 600;
        color: var(--primaryColor);
        background-color: #f8f2e2;
      `;
  }}
`;

const DottedLine = styled.div`
  margin-top: 3rem;
  height: 1px;
  width: 100%;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23333' stroke-width='1' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
`;

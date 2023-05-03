import React from "react";
import { MainLayout } from "../components/layout/Layout";
import styled, { css } from "styled-components";
import {
  Button,
  LightButton,
  PrimaryButton,
} from "../components/common/Button";
import { SecondaryButton } from "../components/common/Button";
import ProductDetailPostImage from "../components/product/ProductDetailPost";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import ProductDetailPost from "../components/product/ProductDetailPost";
import ProductComment from "../components/product/ProductComment";
import { ProductData } from "../type/product";
import ProductCard from "../components/product/ProductCard";

type ProductSample = {
  src: string;
};
const Product = () => {
  const { hash } = useLocation();
  const [product, setProduct] = React.useState<ProductData>({
    name: "Lorem Ipsum",
    tags: ["태그", "태그2", "태그3"],
    thumbnail:
      "https://retailminded.com/wp-content/uploads/2016/03/EN_GreenOlive-1.jpg",
    subThumbnail: [
      "https://retailminded.com/wp-content/uploads/2016/03/EN_GreenOlive-1.jpg",
      "https://retailminded.com/wp-content/uploads/2016/03/EN_GreenOlive-1.jpg",
      "https://retailminded.com/wp-content/uploads/2016/03/EN_GreenOlive-1.jpg",
    ],
    price: "45,600",
    detail:
      "nisi est. ex est. commodo volutpat non nisl. odio hendrerit hendrerit ac ipsum quis ipsum Donec elementum efficitur. consectetur nisl. Donec tortor. at, Nunc leo. ex viverra in tincidunt nibh nec In faucibus Ut cursus dui. urna. ac elit",
  });

  return (
    <MainLayout>
      <ProductHeader>
        <ProductCard product={product} />
      </ProductHeader>

      <DottedLine />
      <ProductNav>
        <ProductNavItem to="#detail" active={hash === "#detail"}>
          제품 상세 정보
        </ProductNavItem>
        <ProductNavItem to="#review" active={hash === "#review"}>
          리뷰 28개
        </ProductNavItem>
        <ProductNavItem to="#comment" active={hash === "#comment"}>
          댓글 4,333개
        </ProductNavItem>
      </ProductNav>

      {hash === "#comment" ? <ProductComment /> : <ProductDetailPostImage />}
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
const ProductNavItem = styled(Link)<{ active: boolean }>`
  flex: 1;
  padding: 1rem;
  margin-bottom: 3rem;
  text-align: center;
  &:hover {
    background-color: #f8f2e287;
  }
  ${(props) => {
    if (props.active)
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

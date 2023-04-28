import React from "react";
import { MainLayout } from "../components/layout/Layout";
import styled, { css } from "styled-components";
import {
  Button,
  LightButton,
  PrimaryButton,
} from "../components/common/Button";
import { SecondaryButton } from "../components/common/Button";
import { IconBasketFilled, IconHeartFilled } from "@tabler/icons-react";
import ProductDetailPostImage from "../components/product/ProductDetailPost";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import ProductDetailPost from "../components/product/ProductDetailPost";
import ProductComment from "../components/product/ProductComment";

type ProductSample = {
  src: string;
};
type ProductData = {
  name: string;
  tags: string[];
  detail: string;
  price: string;
};
const Product = () => {
  const { hash } = useLocation();
  const [subImageList, setSubImageList] = React.useState<ProductSample[]>([
    {
      src: "https://retailminded.com/wp-content/uploads/2016/03/EN_GreenOlive-1.jpg",
    },
    {
      src: "https://retailminded.com/wp-content/uploads/2016/03/EN_GreenOlive-1.jpg",
    },
    {
      src: "https://retailminded.com/wp-content/uploads/2016/03/EN_GreenOlive-1.jpg",
    },
  ]);
  const [product, setProduct] = React.useState<ProductData>({
    name: "Lorem Ipsum",
    tags: ["태그", "태그2", "태그3"],
    price: "45,600",
    detail:
      "nisi est. ex est. commodo volutpat non nisl. odio hendrerit hendrerit ac ipsum quis ipsum Donec elementum efficitur. consectetur nisl. Donec tortor. at, Nunc leo. ex viverra in tincidunt nibh nec In faucibus Ut cursus dui. urna. ac elit",
  });

  return (
    <MainLayout>
      <ProductHeader>
        <div className="row">
          <div className="col-lg-6">
            <ProductImage
              src="https://retailminded.com/wp-content/uploads/2016/03/EN_GreenOlive-1.jpg"
              alt=" "
            />
            <SubImageList>
              {subImageList.map((s) => (
                <ProductSub>
                  <ProductImage src={s.src} className="sub" />
                </ProductSub>
              ))}
            </SubImageList>
          </div>
          <div className="col-lg-6">
            <ProductMakeInfo>제조사명 | 브랜드명명 | 등록일</ProductMakeInfo>
            <ProductName>{product.name}</ProductName>
            {product.tags.map((tag) => (
              <ProductTag>#{tag}</ProductTag>
            ))}
            <ProductPrice>
              가격 <span className="price-cost">{product.price}</span>원
            </ProductPrice>
            <ProductDetail>{product.detail}</ProductDetail>
            <ProductPurchaseBlock>
              <BuyButton>
                <IconBasketFilled className="icon" />
                상품 구매
              </BuyButton>
              <LikeButton>
                <IconHeartFilled className="icon" />
                찜하기
              </LikeButton>
            </ProductPurchaseBlock>
          </div>
        </div>
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
const ProductImage = styled.img`
  border-radius: 1rem;
  width: 100%;
  border: 1px solid #e0e0ef;
  &.sub {
    height: 7rem;
    object-fit: cover;
  }
`;
const ProductSub = styled.div`
  flex: 1;
  padding: 0.25rem;
`;
const SubImageList = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
`;

const ProductMakeInfo = styled.p`
  color: grey;
`;
const ProductName = styled.h2`
  font-weight: bold;
  font-size: 3rem;
  margin: 1rem 0rem;
`;
const ProductTag = styled.span`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-right: 0.5rem;
`;
const ProductPrice = styled.p`
  font-size: 2rem;
  font-weight: 500;
  margin: 2rem 0rem;
  .price-cost {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
  }
`;
const ProductDetail = styled.p`
  color: grey;
  font-size: 1rem;
`;

const ProductPurchaseBlock = styled.div`
  margin-top: 2rem;
  bottom: 0.75rem;
  width: 100%;
  display: flex;
  gap: 1rem;
  ${({ theme }) => theme.devices.desktop} {
    margin-top: 0rem;
    position: absolute;
  }
`;
const ProductButtonStyle = `
    padding: 1rem;
    flex: 1;
    border-radius: 0.5rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    .icon {
        margin-right: 0.5rem;
    }
`;
const BuyButton = styled(PrimaryButton)`
  ${ProductButtonStyle} 
  .icon {
    mar
  }
`;
const LikeButton = styled(LightButton)`
  ${ProductButtonStyle}
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

import React from "react";
import styled, { css } from "styled-components";
import {
  IconBasketFilled,
  IconHeart,
  IconHeartFilled,
} from "@tabler/icons-react";
import { ProductData } from "../../type/product";
import { LightButton, PrimaryButton } from "../common/Button";
import { Link } from "react-router-dom";

const ProductCard = ({
  product,
  setProduct,
  summary = false,
  likeEvent,
  isLike,
}: {
  product: ProductData;
  setProduct: React.Dispatch<React.SetStateAction<ProductData>>;
  summary?: boolean;
  likeEvent?: any;
  isLike?: boolean;
}) => {
  const subHandler = (idx: number) => {
    const temp = product;
    const thumb = product.thumbnail;
    temp.thumbnail = product.subThumbnail[idx];
    temp.subThumbnail[idx] = thumb;
    setProduct({...temp});
  };

  return (
    <ProductCardContainer className="row" $summary={summary}>
      <div className="col-lg-6">
        <ProductImage src={product.thumbnail} alt=" " />
        <SubImageList>
          {product.subThumbnail.map((s, idx) => (
            <ProductSub key={`sT-${idx}`} onClick={() => subHandler(idx)}>
              <ProductImage src={s} className="sub" />
            </ProductSub>
          ))}
        </SubImageList>
      </div>
      <div className="col-lg-6">
        <ProductMakeInfo>{product.brand}</ProductMakeInfo>
        <ProductName>{product.name}</ProductName>
        {product.tags.map((tag) => (
          <ProductTag key={tag}>#{tag}</ProductTag>
        ))}
        <ProductPrice>
          가격{" "}
          <span className="price-cost">
            {product.price
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
          </span>
          원
        </ProductPrice>
        <ProductDetail>{product.detail}</ProductDetail>
        {!summary ? (
          <ProductPurchaseBlock>
            <BuyButton type="button">
              <IconBasketFilled className="icon" />
              상품 구매
            </BuyButton>
            <LikeButton
              type="button"
              className={isLike ? "" : "un-active"}
              onClick={likeEvent}
            >
              {isLike ? (
                <>
                  <IconHeartFilled className="icon" />찜 해제
                </>
              ) : (
                <>
                  <IconHeart className="icon" />찜 하기
                </>
              )}
            </LikeButton>
          </ProductPurchaseBlock>
        ) : (
          <Shortcuts to={`/product/${product.id}`}>
            상품 자세히 보러 가기 &#187;
          </Shortcuts>
        )}
      </div>
    </ProductCardContainer>
  );
};

export default ProductCard;

const ProductCardContainer = styled.div<{ $summary: boolean }>`
  ${(props) => {
    if (props.$summary === true) {
      return css`
        position: absolute;
        top: 0px;
        min-height: 100%;
        width: 100%;
        left: 1rem;
        background: #f7f7f7;
        border: 1px solid #d9d9d9;
        padding: 2rem 0rem;
        z-index: 1;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        ${ProductMakeInfo} {
          font-size: 0.875rem;
        }
        ${ProductName} {
          font-size: 2rem;
          margin: 0rem 0rem 0.5rem 0rem;
        }
        ${ProductTag} {
          font-size: 1rem;
        }
        ${ProductPrice} {
          font-size: 1.5rem;
        }
      `;
    }
    return ``;
  }}
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
  // flex: 1;
  cursor: pointer;
  padding: 0.25rem;
  flex: 0 0 33.33333%;
  max-width: 33.33333%;
`;
const SubImageList = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
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
  // display: inline-flex;
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
  margin-right: 1rem;
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
  color: rgb(131 171 130);
  background: rgb(225 229 225);
  &.un-active {
    color: rgb(56 100 55);
  }
`;

const Shortcuts = styled(Link)`
  margin-top: 3rem;
  display: block;
  font-size: 1rem;
`;

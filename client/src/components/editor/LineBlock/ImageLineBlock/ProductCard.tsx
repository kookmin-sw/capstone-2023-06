import styled from "styled-components";

export type ProductType = {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
};

type ProductCardProps = ProductType & {
  onClick?: (e: any) => void;
};

const ProductCard = ({
  title,
  thumbnail,
  description,
  onClick,
}: ProductCardProps) => {
  return (
    <ProductCardStyled onClick={onClick}>
      <ProductCardImage src={thumbnail} alt="" />
      <ProductDetail>
        <ProductTitle>{title}</ProductTitle>
        <ProductContent>{description}</ProductContent>
      </ProductDetail>
    </ProductCardStyled>
  );
};
export default ProductCard;

const ProductCardStyled = styled.div`
  display: flex;
  gap: 1rem;
  //   margin-bottom: 1rem;
  cursor: pointer;
  border-raidus: 0.25rem;
  &:hover {
    background-color: #efefefef;
  }
  & + & {
    margin-top: 1rem;
  }
`;
const ProductDetail = styled.div`
  flex: 1;
`;
const ProductCardImage = styled.img`
  width: 70px;
  height: 70px;
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  border-radius: 0.125rem;
`;
const ProductTitle = styled.p`
  font-size: 0.75rem;
  font-weight: 500;
  overflow: hidden;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;
const ProductContent = styled.p`
  font-size: 0.75rem;
  font-weight: 300;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

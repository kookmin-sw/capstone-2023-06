import { Link } from "react-router-dom";
import styled from "styled-components";

const ProductLink = ({
  id,
  thumbnail,
  tags,
  title,
}: {
  id: string;
  thumbnail: string;
  tags: string[];
  title: string;
}) => {
  return (
    <Link to={`/product/${id}`}>
      <ProductCard>
        <ProductThumbnail src={thumbnail} />
        <div className="card-body">
          <ProductTags>
            {tags.length > 1 && tags.map(tag => `#${tag} `)}
          </ProductTags>
          <ProductTitle>{title}</ProductTitle>
        </div>
      </ProductCard>
    </Link>
  );
};

export default ProductLink;

const ProductCard = styled.div`
  margin-bottom: 4rem;
  transition: opacity ease 0.5s;
  .user-name {
    font-size: 0.675rem;
    font-weight: 400;
    .user-name {
      color: rgb(91, 91, 91);
    }
  }
  .sub-content {
    font-size: 0.675rem;
  }
  &:hover {
    opacity: 0.8;
  }
`;

const ProductTags = styled.span`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 0.75rem;
    display: inline-flex;
`;
const ProductThumbnail = styled.img`
  width: 100%;
  height: 10rem;
  object-fit: cover;
  border-radius: 1rem;
  // border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;
const ProductTitle = styled.h3`
  font-size: 1.25rem;
  color: rgb(90 90 90);
  font-weight: 400;
  margin-bottom: 0.25rem;
`;

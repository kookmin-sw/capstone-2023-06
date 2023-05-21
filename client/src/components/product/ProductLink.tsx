import { Link } from "react-router-dom";
import styled from "styled-components";

const ProductLink = ({
  id,
  thumbnail,
  title,
}: {
  id: string;
  thumbnail: string;
  title: string;
}) => {
  return (
    <Link to={`/product/${id}`}>
      <ProductCard>
        <ProductThumbnail src={thumbnail} />
        <div className="card-body">
          <ProductTitle>{title}</ProductTitle>
        </div>
      </ProductCard>
    </Link>
  );
};

export default ProductLink;

const ProductCard = styled.div`
  margin-bottom: 2rem;
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

const ProductThumbnail = styled.img`
  width: 100%;
  height: 10rem;
  object-fit: cover;
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
`;
const ProductTitle = styled.h3`
  font-size: 1.25rem;
  color: #383838;
  margin: 0.25rem 0rem;
  font-weight: 400;
`;

// ProductList.tsx

import styled from "styled-components";
import Review, { ReviewType } from "../Review";
import ProductLink from "../product/ProductLink";


const ProductSection = styled.div`
  .product-section-header {
    color: "#386437";
  }

  .product-section-subheader {
    margin-bottom: 1rem;
  }

  .product-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .product-list-item {
  }
`;

type ProductListProps = {
  title: string;
  subtitle: string;
  products: ReviewType[];
};

const ProductList: React.FC<ProductListProps> = ({ title, subtitle, products }) => (
  <ProductSection>
    {/* <h2 className="product-section-header">{title}</h2>
    <h5 className="product-section-subheader">{subtitle}</h5> */}
    <div className="row">
      {products.map((product) => (
        <div className="product-list-item col-md-3" key={product.id}>
          <ProductLink id={product.id.toString()} title={product.title} tags={product.tags} thumbnail={product.thumbnail} />
        </div>
      ))}
    </div>
  </ProductSection>
);

export default ProductList;

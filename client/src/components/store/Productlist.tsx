// ProductList.tsx

import styled from "styled-components";
import Review, { ReviewType } from "../Review";


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
    flex: 0 0 calc(25% - 1rem); // Substitute for "col-md-3"
    margin-bottom: 1rem; // Add some vertical margin between rows
  }
`;

type ProductListProps = {
  title: string;
  subtitle: string;
  products: ReviewType[];
};

const ProductList: React.FC<ProductListProps> = ({ title, subtitle, products }) => (
  <ProductSection>
    <h2 className="product-section-header">{title}</h2>
    <h5 className="product-section-subheader">{subtitle}</h5>
    <div className="product-list">
      {products.map((product) => (
        <div className="product-list-item" key={product.id}>
          <Review {...product} />
        </div>
      ))}
    </div>
  </ProductSection>
);

export default ProductList;

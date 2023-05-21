import styled from "styled-components";

export const Productlist = styled.div`
  .product-section-header {
    color: #386437;
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

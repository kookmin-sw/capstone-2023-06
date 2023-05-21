import styled from "styled-components";

const ProductDetailPost = ({ content }: { content: string }) => {
  return (
    <ProductDetailPostImage src={content} />
  );
};

// Detail Block ======================
const ProductDetailPostImage = styled.img`
  width: 100%;
`;

export default ProductDetailPost;

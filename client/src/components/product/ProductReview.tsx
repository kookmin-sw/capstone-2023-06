import React from "react";
import Review, { ReviewType } from "../Review";

const ProductReview = ({ reviews }: { reviews: ReviewType[] }) => {
  return (
    <div className="row">
      {reviews.map((review, idx) => (
        <div className="col-md-4" key={`r-${idx}`}>
          <Review {...review} />
        </div>
      ))}
    </div>
  );
};

export default ProductReview;

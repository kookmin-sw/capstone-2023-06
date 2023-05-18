import React from "react";
import Review, { ReviewType } from "../Review";

const ProductReview = () => {
  const [reviews, setReviews] = React.useState<ReviewType[]>([
    {
      id: 0,
      thumbnail: "",
      title: "게시물 1",
      author: { nickname: "작성자 1", id: 0, email: "333", image: "2323" },
      tags: ["태그1", "태그2", "태그3"],
      date: "2023-05-03",
    }, //임시 데이터
    {
      id: 0,
      thumbnail: "",
      title: "게시물 2",
      author: { nickname: "작성자 1", id: 0, email: "333", image: "2323" },
      tags: ["태그1", "태그2", "태그3"],
      date: "2023-05-04",
    },
    {
      id: 0,
      thumbnail: "",
      title: "게시물 3",
      author: { nickname: "작성자 1", id: 0, email: "333", image: "2323" },
      tags: ["태그1", "태그2", "태그3"],
      date: "2023-05-05",
    },
    {
      id: 0,
      thumbnail: "",
      title: "게시물 4",
      author: { nickname: "작성자 1", id: 0, email: "333", image: "2323" },
      tags: ["태그1", "태그2", "태그3"],
      date: "2023-05-06",
    },
  ]);

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

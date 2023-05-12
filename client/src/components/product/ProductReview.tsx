import React from "react";
import Review, { ReviewType } from "../Review";

const ProductReview = () => {
    const [reviews, setReviews] = React.useState<ReviewType[]>([
        {
            tags: '#어쩌구, #저쩌구',
            title: '30대 직장인의 Desk Setup',
            user: "a",
            date: '2023.03.03',
        },
        {
            tags: '#어쩌구, #저쩌구',
            title: '30대 직장인의 Desk Setup',
            user: "a",
            date: '2023.03.03',
        },
        {
            tags: '#어쩌구, #저쩌구',
            title: '30대 직장인의 Desk Setup',
            user: "a",
            date: '2023.03.03',
        },
        {
            tags: '#어쩌구, #저쩌구',
            title: '30대 직장인의 Desk Setup',
            user: "a",
            date: '2023.03.03',
        },
    ]);

    return (
        <div className="row">
            {
                reviews.map(review =>
                    <div className="col-md-4">
                        <Review {...review} />
                    </div>
                )
            }
        </div>
    )
};

export default ProductReview;

import styled from "styled-components";
import ProfileBar from "./profile/ProfileBar";
import { Link } from "react-router-dom";


export type GoodsType = {
    title: string,
    author: string,
    price: string,
    review: string,
    tags : string[]
}
const Review = ({ title, author, price, review, tags }: GoodsType) => {
    return (
        <Link to="">
            <ReviewCard>
                <ReviewThumbnail src="https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/167176095297175810.jpg?gif=1&w=1280&h=1280&c=c&webp=1" />
                <div className="card-body">
                    <ReviewTags>
                        {tags.map(tag => `#${tag} `)}
                    </ReviewTags>
                    <ReviewTitle>{title}</ReviewTitle>
                    
                </div>
            </ReviewCard>
        </Link>
    );
}

export default Review;

const ReviewCard = styled.div`
    margin-bottom: 2rem;
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
    transition: opacity ease 0.5s;
    &:hover {
        opacity: 0.8;
    }
`;

const ReviewThumbnail = styled.img`
    width: 100%;
    height: 10rem;
    object-fit: cover;
    border-radius: 1rem;
`;
const ReviewTags = styled.span`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 0.75rem;
`;
const ReviewTitle = styled.h3`
    font-size: 1.375rem;
    color: black;
    margin-bottom: 0.25rem;
`;
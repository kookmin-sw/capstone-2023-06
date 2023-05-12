import styled from "styled-components";
import ProfileBar from "./profile/ProfileBar";
import { Link } from "react-router-dom";

export type ReviewType = {
    title: string,
    author: string,
    date: string,
    tags: string[],
}
const Review = ({ title, author, date, tags }: ReviewType) => {
    return (
        <Link to="">
            <ReviewCard>
                <ReviewThumbnail src="https://cdn.shopify.com/s/files/1/0870/0656/files/Inked0nk1apgq5tf41_LI_large.jpg?v=1596810453" />
                <div className="card-body">
                    <ReviewTags>
                        {tags.map(tag => `#${tag} `)}
                    </ReviewTags>
                    <ReviewTitle>{title}</ReviewTitle>
                    <ProfileBar profileID={author} nickname={author} size={1.5} padding="0.125rem 0rem" subContent={date} />
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
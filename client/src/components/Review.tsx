import styled from "styled-components";
import ProfileBar from "./profile/ProfileBar";
import { Link } from "react-router-dom";
import { UserData } from "../type/user";

export type ReviewType = {
    id: number | string,
    thumbnail: string,
    title: string,
    author: UserData,
    date: string,
    tags: string[],
}
const Review = ({ id, thumbnail, title, author, date, tags }: ReviewType) => {
    return (
        <Link to={`/post/${id}`}>
            <ReviewCard>
                <ReviewThumbnail src={thumbnail} />
                <div className="card-body">
                    <ReviewTags>
                        {tags.length > 1 && tags.map(tag => `#${tag} `)}
                    </ReviewTags>
                    <ReviewTitle>{title}</ReviewTitle>
                    <ProfileBar profileID={author.id} nickname={author.nickname} size={1.5} padding="0.125rem 0rem" subContent={date} img={author.image} />
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
    border: 1px solid black;
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
import { Link } from "react-router-dom";
import Profile from "../profile/Profile";
import { IconHeart } from "@tabler/icons-react";
import styled from "styled-components";
import { TransparentButton } from "../common/Button";

const Comment = () => {
    return (
      <CommentStyled>
        <Profile profileID="3" marginright="1.5rem" img={''} />
        <CommentContent>
          <Link className="name" to="profile/3">이름</Link>
          <p className="content">
            디자인도 무난하고 튼튼해서 가성비로 괜찮은 것 같아요.
          </p>
          <LikeButton>
            <IconHeart className="icon" /> 좋아요
          </LikeButton>
        </CommentContent>
      </CommentStyled>
    );
  };

  export default Comment;
  
  const CommentStyled = styled.div`
    display: flex;
    margin: 2rem 0rem;
  `;
  const CommentContent = styled.div`
    display: flex;
    flex: 1;
    gap: 0.5rem;
    flex-direction: column;
    align-items: flex-start;
    .name {
      font-weight: 500;
      color: black;
    }
    .content {
      color: grey;
      margin-bottom: 1rem;
    }
  `;
  
  const LikeButton = styled(TransparentButton)`
    padding: 0;
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.lightGrey};
    .icon {
      margin-right: 0.5rem;
    }
  `;
  
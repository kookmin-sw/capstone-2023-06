import styled from "styled-components";
import { CommentInput } from "../common/Input";
import Profile from "../profile/Profile";
import { Button } from "../common/Button";

import Comment from ".";
import { CommentData } from "../../type/product";

const CommentList = ({ comments }: { comments: CommentData[] }) => {
  return (
    <div>
      <CommentForm>
        <Profile profileID="3" marginright="1.5rem" />
        <CommentInput placeholder="댓글을 남겨주세요." />
        <Button>작성</Button>
      </CommentForm>
      {
        comments.map(comment => <Comment {...comment}/>)
      }
      <div className="row"></div>
    </div>
  );
};

export default CommentList;

const CommentForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 3rem 0rem;
`;

import styled from "styled-components";
import { CommentInput } from "../common/Input";
import Profile from "../profile/Profile";
import { Button } from "../common/Button";

import Comment from ".";
import { CommentData } from "../../type/product";
import { postComments } from "../../api/upload";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../modules";

const CommentList = ({ comments }: { comments: CommentData[] }) => {
  const { post_id } = useParams();
  const { id, image, isLoggedIn } = useSelector(
    (state: RootState) => ({
      id: state.users.id,
      image: state.users.image,
      isLoggedIn: state.users.isLoggedIn,
    }),
    shallowEqual
  );
  const navigate = useNavigate();
  const [commentInput, setCommentInput] = React.useState<string>("");

  const submitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (commentInput.replace(/\s/g, "") === "") {
      alert("내용을 입력해주세요");
      return;
    }

    if (!post_id) return;

    try {
      const res = await postComments(post_id, 1, commentInput);

      console.log(res);

      if (res.success) {
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
      if (
        window.confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?")
      ) {
        navigate("/login");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentInput(e.target.value);
  };

  return (
    <CommentListStyled>
      {isLoggedIn && (
        <CommentForm onSubmit={submitComment} method="post">
          <Profile profileID={id} marginright="1.5rem" size={4} img={image} />
          <CommentInput
            placeholder="댓글을 남겨주세요."
            value={commentInput}
            onChange={handleChange}
          />
          <Button type="submit">작성</Button>
        </CommentForm>
      )}
      {comments.map((comment, idx) => (
        <Comment key={`c-${idx}`} {...comment} />
      ))}
      <div className="row"></div>
    </CommentListStyled>
  );
};

export default CommentList;

const CommentListStyled = styled.div`
  padding-left: 0rem;
  padding-right: 0rem;

  ${({ theme }) => theme.devices.desktop} {
    padding-left: 12rem;
    padding-right: 12rem;
  }
`;

const CommentForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 3rem 0rem;
`;

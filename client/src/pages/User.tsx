import { useParams } from "react-router-dom";
import { MainLayout } from "../components/layout/Layout";
import Profile from "../components/profile/Profile";
import styled from "styled-components";
import React from "react";
import { getuserByID } from "../api/users";
import { UserData } from "../type/user";

const User = () => {
  const { id } = useParams();
  const [user, setUser] = React.useState<UserData>();
  const [reviews, setReviews] = React.useState();
  const [products, setProducts] = React.useState();

  React.useEffect(() => {
    initUser();
  }, [id]);

  const initUser = async () => {
    if (!id) return;
    try {
      const res = await getuserByID(id);

      if (res.success) {
        setUser({
          id: res.result.id,
          nickname: res.result.nickname,
          image: res.result.picture,
          email: res.result.email,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <MainLayout>
      <UserCard>
        <Profile size={6} profileID={id} img={user?.image} />
        <UserNickname>{user?.nickname}</UserNickname>
        <p>{user?.email}</p>
      </UserCard>
      <PostWrapper>
        <h2>작성 리뷰</h2>
        <div className="row">
          {reviews ? <></> : <span>작성한 리뷰가 없습니다.</span>}
        </div>
      </PostWrapper>
      <PostWrapper>
        <h2>관심 제품</h2>
        <div className="row">
          {products ? <></> : <span>관심 제품이 없습니다.</span>}
        </div>
      </PostWrapper>
    </MainLayout>
  );
};

export default User;

const UserCard = styled.div`
  margin-top: 1rem;
  border: 1px solid #dddddd;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0rem;
`;
const UserNickname = styled.h1`
  margin-top: 1rem;
`;

const PostWrapper = styled.div`
  margin: 4rem 0rem;
  h2 {
    margin-bottom: 1rem;
    font-size: 1.25rem;
    font-weight: 500;
  }
  .row {
    padding: 1rem;
    background-color: #eee;
  }
`;

import { useParams } from "react-router-dom";
import { MainLayout } from "../components/layout/Layout";
import Profile from "../components/profile/Profile";
import styled from "styled-components";
import React from "react";
import { getFollowerList, getuserByID, updateProfile } from "../api/users";
import { UserData } from "../type/user";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { RootState } from "../modules";
import { uploadImage } from "../api/upload";
import { setProfileImage } from "../modules/users";
import { IconPencil } from "@tabler/icons-react";

const User = () => {
  const { user_id } = useParams();
  const { id, isLoggedIn } = useSelector(
    (state: RootState) => ({
      id: state.users.id,
      isLoggedIn: state.users.isLoggedIn,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const [user, setUser] = React.useState<UserData>();
  const [reviews, setReviews] = React.useState();
  const [products, setProducts] = React.useState();
  const [followers, setFollowers] = React.useState<UserData[]>();
  const fileInputRef = React.useRef<any>(null);

  React.useEffect(() => {
    initUser();
  }, [user_id]);

  const initUser = async () => {
    if (!user_id) return;
    try {
      const res = await getuserByID(user_id);
      
      if (res.success) {
        setUser({
          id: res.result.id,
          nickname: res.result.nickname,
          image: res.result.picture,
          email: res.result.email,
        });
      }

      const res2 = await getFollowerList(user_id);

      console.log(res2);
      if (res2.success) {
        setFollowers(
          res2.result.map((r: { nickname: any; picture: any; email: any }) => {
            return {
              id: 0,
              nickname: r.nickname,
              image: r.picture,
              email: r.email,
            };
          })
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddImages = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const imageLists = event.target.files;

    if (imageLists == null || imageLists.length !== 1) {
      // 이미지 입력 안했음. 잘못된 행동

      return;
    }

    // setThumbnail(URL.createObjectURL(imageLists[0]));

    // 이미지 업로드
    try {
      const formData = new FormData();
      formData.append("image", imageLists[0]);

      const res = await updateProfile(formData);

      console.log(res);
      if (res.success) {
        dispatch(setProfileImage(res.result));
        // setThumbnail(res.result.url);
        if (user)
          setUser({
            ...user,
            image: res.result,
          });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <MainLayout>
      <UserCard>
        <Profile size={6} profileID={user_id} img={user?.image} disabled>
          {id.toString() === user_id && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                name="thumbnail_file"
                onChange={handleAddImages}
                style={{ display: "none" }}
              />
              <InputImageButton
                onClick={(e: any) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log("#####");
                  fileInputRef.current.click();
                }}
              >
                <IconPencil strokeWidth={1.25} width={20} height={20} />
              </InputImageButton>
            </>
          )}
        </Profile>
        <UserNickname>{user?.nickname}</UserNickname>
        <p>{user?.email}</p>
      </UserCard>
      <PostWrapper>
        <h2>작성 리뷰</h2>
        <div className="row">
          {reviews ? (
            <></>
          ) : (
            <NoneDataCol className="col-12">
              <span>작성한 리뷰가 없습니다.</span>
            </NoneDataCol>
          )}
        </div>
      </PostWrapper>
      <PostWrapper>
        <h2>관심 제품</h2>
        <div className="row">
          {products ? (
            <></>
          ) : (
            <NoneDataCol className="col-12">
              <span>관심 제품이 없습니다.</span>
            </NoneDataCol>
          )}
        </div>
      </PostWrapper>
      <PostWrapper>
        <h2>팔로워</h2>
        {followers && followers.length !== 0 ? (
          followers.map((f) => <Profile profileID={f.id} img={f.image} />)
        ) : (
          <div className="row">
            <NoneDataCol className="col-12">
              <span>팔로워 목록이 없습니다.</span>
            </NoneDataCol>
          </div>
        )}
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
`;

const NoneDataCol = styled.div`
  padding: 1rem;
  background-color: #eee;
  color: #aaa;
  min-height: 10rem;
  border-radius: 0.5rem;
  margin: 0rem 1rem;
`;

const InputImageButton = styled.button`
  position: absolute;
  right: -1rem;
  bottom: 0px;
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  background: ${({ theme }) => theme.colors.light};
  border-radius: 0.5rem;
`;

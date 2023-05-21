import { Link, useNavigate } from "react-router-dom";

import styled, { css } from "styled-components";
import Profile, { ProfileProps } from "./Profile";
import React from "react";
import { PrimaryButton } from "../common/Button";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { followUser, getIsFollowing } from "../../api/users";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../modules";

type ProfileBarProps = ProfileProps & {
  activeFollow?: boolean;
  subContent?: string;
  padding?: string;
};

const ProfileBar = ({
  profileID,
  nickname,
  size = 4,
  marginright = "0.5rem",
  activeFollow = false,
  subContent,
  padding = "1rem 0rem",
  img,
}: ProfileBarProps) => {
  const navigate = useNavigate();
  const { id, isLoggedIn } = useSelector(
    (state: RootState) => ({
      id: state.users.id,
      isLoggedIn: state.users.isLoggedIn,
    }),
    shallowEqual
  );
  const [isFollowing, setIsFollowing] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (activeFollow && isLoggedIn) {
      initFollowing();
    }
  }, [activeFollow, isLoggedIn]);

  const initFollowing = async () => {
    if (!profileID) return;
    try {
      const res = await getIsFollowing(profileID.toString());

      if (res.success) {
        setIsFollowing(res.result);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const followHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!isLoggedIn) {
      if (
        window.confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?")
      ) {
        navigate("/login");
      }
    }

    if (!profileID) return;
    try {
      const res = await followUser(profileID.toString());

      if (res.success) {
        console.log(res);
        setIsFollowing(res.result);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ProfileBarBlock padding={padding}>
      <Profile
        profileID={profileID}
        nickname={nickname}
        size={size}
        marginright={marginright}
        img={img}
      ></Profile>
      <ProfileDetail>
        <span className="user-name">
          <Link to={`/user/${profileID}`} className="user-name">
            {nickname}
          </Link>
        </span>
        {subContent && <span className="sub-content">{subContent}</span>}
      </ProfileDetail>
      {id !== profileID && activeFollow && (
        <FollowButton onClick={followHandler} isFollowing={isFollowing}>
          {isFollowing ? (
            <>
              언팔로우
              <IconMinus className="icon" />
            </>
          ) : (
            <>
              팔로우
              <IconPlus className="icon" />
            </>
          )}
        </FollowButton>
      )}
    </ProfileBarBlock>
  );
};

export default ProfileBar;

const ProfileBarBlock = styled.div<{ padding: string }>`
  display: flex;
  position: relative;
  align-items: center;
  padding: ${(props) => props.padding};
`;
const ProfileDetail = styled.div`
  display: flex;
  flex-direction: column;
  // margin-left: 1rem;
  .user-name a {
    color: black;
  }
  .sub-content {
    color: ${({ theme }) => theme.colors.lightGrey};
    font-size: 0.8rem;
    font-weight: 300;
  }
`;
const FollowButton = styled(PrimaryButton)<{ isFollowing: boolean }>`
  position: absolute;
  right: 0px;
  display: flex;
  align-items: center;
  border-radius: 1.5rem;
  .icon {
    width: 1rem;
    height: 1rem;
    margin-left: 0.25rem;
  }
  ${(props) => {
    if (props.isFollowing) {
      return css`
        background: #ababab;
      `;
    }
  }}
`;

import { Link } from "react-router-dom";

import styled, { css } from "styled-components";
import Profile, { ProfileProps } from "./Profile";
import React from "react";
import { PrimaryButton } from "../common/Button";
import { IconPlus } from "@tabler/icons-react";

type ProfileBarProps = ProfileProps & {
  activeFollow?: boolean,
  subContent?: string,
  isFollowing?: boolean,
  padding?: string,
};

const ProfileBar = ({
  profileID,
  nickname,
  size = 4,
  marginright = "0.5rem",
  activeFollow = false,
  subContent,
  padding = "1rem 0rem",
  isFollowing,
}: ProfileBarProps) => {

  const followHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // TODO :
    // 팔로우 시작 or 해제
  }

  return (
    <ProfileBarBlock padding={padding}>
      <Profile
        profileID={profileID}
        nickname={nickname}
        size={size}
        marginright={marginright}
      ></Profile>
      <ProfileDetail>
        <span className="user-name">
          <Link to={`/user/${profileID}`} className="user-name">
            {nickname}
          </Link>
        </span>
        {
          subContent &&
          <span className="sub-content">{ subContent }</span>
        }
      </ProfileDetail>
      {
        activeFollow &&
        <FollowButton onClick={followHandler}>
          팔로우
          <IconPlus className="icon" />
        </FollowButton>
      }
    </ProfileBarBlock>
  );
};

export default ProfileBar;

const ProfileBarBlock = styled.div<{padding: string}>`
  display: flex;
  position: relative;
  align-items: center;
  padding: ${props => props.padding};
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
const FollowButton = styled(PrimaryButton)`
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
`;

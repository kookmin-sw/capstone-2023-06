import { Link } from "react-router-dom";

import styled, { css } from "styled-components";
import Profile, { ProfileProps } from "./Profile";
import React from "react";
import { PrimaryButton } from "../common/Button";
import { IconPlus } from "@tabler/icons-react";

const ProfileBar = ({
  profileID,
  nickname,
  size = 4,
  marginright = "0px",
}: ProfileProps) => {
  const [followerCount, setFollowerCount] = React.useState<number>(31231);

  return (
    <ProfileBarBlock>
      <Profile
        profileID={profileID}
        nickname={nickname}
        size={size}
        marginright={marginright}
      ></Profile>
      <ProfileDetail>
        <span>
          <Link to={`/user/${profileID}`} className="user-name">
            {nickname}
          </Link>
        </span>
        <span className="user-followers">{followerCount} 팔로워</span>
      </ProfileDetail>
      <FollowButton>
        팔로우
        <IconPlus className="icon" />
      </FollowButton>
    </ProfileBarBlock>
  );
};

export default ProfileBar;

const ProfileBarBlock = styled.div`
  display: flex;
  position: relative;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGrey};
  align-items: center;
  padding: 1.5rem 0rem;
`;
const ProfileDetail = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  .user-name {
    font-weight: 500;
  }
  .user-followers {
    color: ${({ theme }) => theme.colors.lightGrey};
    font-size: 0.8rem;
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

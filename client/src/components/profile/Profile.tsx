import { Link } from "react-router-dom";

import styled, { css } from "styled-components";

export type ProfileLinkProps = {
  size?: number;
  marginright?: string;
  disabled?: boolean;
};
export type ProfileProps = ProfileLinkProps & {
  profileID: string | number | undefined;
  nickname?: string;
  img: string | undefined;
  children?: React.ReactNode;
};

const Profile = ({
  profileID,
  nickname,
  img,
  size = 4,
  marginright = "0px",
  disabled = false,
  children,
}: ProfileProps) => {
  if (disabled) {
    return (
      <ProfileDiv size={size} marginright={marginright}>
        {img && <ProfileImg src={img} alt="" />}
        {children}
      </ProfileDiv>
    );
  }

  return (
    <ProfileLink
      to={`/user/${profileID}`}
      size={size}
      marginright={marginright}
    >
      {img && <ProfileImg src={img} alt="" />}
      {children}
    </ProfileLink>
  );
};

const ProfileStyled = css`
  display: inline-flex;
  align-items: center;
  position: relative;
  ${(props: ProfileLinkProps) => {
    return css`
      width: ${props.size}rem;
      height: ${props.size}rem;
      margin-right: ${props.marginright};
    `;
  }}
  ${(props: ProfileLinkProps) => {
    if (props.disabled) {
      return css`
        pointer-events: none;
      `;
    }
  }}
& + & {
    margin-left: 0.5rem;
  }
  .profile-nickname {
    color: black;
    margin-left: 0.25rem;
    font-weight: 300;
  }
  &:hover {
    .profile-nickname {
      font-weight: 400;
    }
  }
`;

const ProfileLink = styled(Link)`
  ${ProfileStyled}
`;
const ProfileDiv = styled.div`
  ${ProfileStyled}
`;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  // background: rgb(149, 61, 147);
  // background: linear-gradient(
  //   125deg,
  //   rgba(149, 61, 147, 1) 0%,
  //   rgba(234, 136, 76, 1) 100%
  // );
`;

export default Profile;

import { Link } from "react-router-dom";

import styled, { css } from "styled-components";

export type ProfileLinkProps = {
    size?: number,
    marginright?: string,
}
export type ProfileProps = ProfileLinkProps & {
    profileID: string | number | undefined,
    nickname?: string,
    img: string | undefined,
}

const Profile = ({ profileID, nickname, img, size = 4, marginright = '0px' } : ProfileProps) => {
    return (
        <ProfileLink to={`/user/${profileID}`} size={size} marginright={marginright}>
            <ProfileImg src={img} alt="profile"/>
        </ProfileLink>
    )
};

const ProfileLink = styled(Link)`
    // display: inline-block;
    display: inline-flex;
    align-items: center;
    ${(props: ProfileLinkProps) => {
        return css`
            width: ${props.size}rem;
            height: ${props.size}rem;
            margin-right: ${props.marginright};
        `;
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

const ProfileImg = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
`;

export default Profile;
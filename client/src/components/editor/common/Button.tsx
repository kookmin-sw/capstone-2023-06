
import styled from 'styled-components';
import { PrimaryRoundButton } from '../../common/Button';
import { POSITION } from '../type';


export const MoveButton = styled(PrimaryRoundButton)`
    position: absolute;
    left: 9.25rem;
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    svg {
        color: white;
    }
`;

export const SelectButton = styled(MoveButton)`
    left: 7.5rem;
`;

export const ReferButton = styled(PrimaryRoundButton)`
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;

    top: ${(props: POSITION) => props.posY}px;
    left: ${(props: POSITION) => props.posX}px;

    display: flex;
    align-items: center;
    svg {
        color: white;
    }
`;

export const MenuButton = styled.button`
    font-size: 1.25rem;
    display: flex;
    background: white;
    border: none;
    &:hover {
        background: #efefef;
    }
    & + & {
        margin-top: 0.25rem;
    }
    svg {
        margin-right: 0.5rem;
    }
`;

export const ModeButton = styled.button`
    border: none;
    border-radius: .125rem;
    padding: ${(props: { padding?: string }) => (props.padding || '0.5rem 1rem')};
    background: white;
    font-size: 1rem;
    outline: none;
    color: white;
    background: #0000007a;
    position: absolute;
    top: 1rem;
    left: 1rem;
`;

export const RemoveButton = styled.button`
    border-radius: .125rem;
    background: #0000007a;
    // position: absolute;
    // bottom: 1rem;
    // right: 12rem;
    border: none;
    svg {
        color: white;
    }
`;
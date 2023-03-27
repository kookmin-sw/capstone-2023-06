
import styled from 'styled-components';
import { PrimaryRoundButton } from '../common/Button';
import { POSITION } from './type';


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
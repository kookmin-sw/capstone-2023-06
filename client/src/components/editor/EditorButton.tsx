
import styled from 'styled-components';
import { PrimaryRoundButton } from '../common/Button';


export const MoveButton = styled(PrimaryRoundButton)`
    position: absolute;
    left: -2.25rem;
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    svg {
        color: white;
    }
`;

export const SelectButton = styled(MoveButton)`
    left: -4rem;
`;
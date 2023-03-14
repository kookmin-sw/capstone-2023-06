import styled from 'styled-components';
import { IconH1 } from '@tabler/icons-react';

const EditMenuBlock = styled.div`
    position: absolute;
    bottom: 2rem;
    left: -2rem;
    display: flex;
    flex-direction: column;
    background: #FFF;
    padding: 0.5rem;
    border-radius: 0.5rem;
    -webkit-box-shadow: 0px 0px 15px 2px rgba(0,0,0,0.3); 
    box-shadow: 0px 0px 15px 2px rgba(0,0,0,0.3);
`;

const Menu = styled.button`
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
`

export const EditMenu = () => {
    return (
        <EditMenuBlock>
            <Menu>
                <IconH1 />
                header
            </Menu>
            <Menu>
                <IconH1 />
                header
            </Menu>
            <Menu>
                <IconH1 />
                header
            </Menu>
        </EditMenuBlock>
    )
}

export default EditMenu;
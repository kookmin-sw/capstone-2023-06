import styled from 'styled-components';
import { IconH1, IconH2, IconH3, IconAbc } from '@tabler/icons-react';
// 아이콘 : https://tabler-icons.io/

const EditMenuBlock = styled.div`
    position: absolute;
    bottom: 3rem;
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
type EditMenuProps = {
    onClickHandler: (e:React.ElementType) => void;
}
type MenusType =  {
    text: string,
    icon: React.ReactNode,
    ret: React.ElementType
}
export const EditMenu = ({ onClickHandler } : EditMenuProps) => {
    const menus : MenusType[] = [
        {
            text: 'header 1',
            icon: <IconH1/>,
            ret: 'h1',
        },
        {
            text: 'header 2',
            icon: <IconH2/>,
            ret: 'h2',
        },
        {
            text: 'header 2',
            icon: <IconH3/>,
            ret: 'h3',
        },
        {
            text: '일반',
            icon: <IconAbc/>,
            ret: 'p',
        },
    ];

    // function ff(e: any) {
    //     onClickHandler()
    // }

    return (
        <EditMenuBlock>
            {
                menus.map((m, idx)  => {
                    return (
                        <Menu
                            key={idx}
                            onClick={(e)=>{
                                e.preventDefault();
                                onClickHandler(m.ret);
                            }}
                        >
                            { m.icon }
                            { m.text }
                        </Menu>
                    )
                })
            }
        </EditMenuBlock>
    )
}

export default EditMenu;
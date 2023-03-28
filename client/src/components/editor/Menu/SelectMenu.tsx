import styled from 'styled-components';
import {
    IconH1, IconH2, IconH3, IconAbc, 
    IconList, IconListNumbers,
    IconBlockquote, 
    IconPhoto} from '@tabler/icons-react';
import React from 'react';
// 아이콘 : https://tabler-icons.io/
import { POSITION } from '../type';
import { MenuButton } from '../common/Button';

const EditMenuBlock = styled.div`
    position: absolute;
    top: ${(props: POSITION) => props.posY}px;
    left: ${(props: POSITION) => props.posX}px;
    display: flex;
    flex-direction: column;
    background: #FFF;
    padding: 0.5rem;
    border-radius: 0.5rem;
    -webkit-box-shadow: 0px 0px 15px 2px rgba(0,0,0,0.3); 
    box-shadow: 0px 0px 15px 2px rgba(0,0,0,0.3);
    z-index: ${({theme} ) => theme.zIndex.editMenuIndex};
`;

type MenusType =  {
    text: string,
    icon: React.ReactNode,
    ret: React.ElementType
}

type EditMenuProps = POSITION & {
    onClickHandler: (e:React.ElementType) => void;
}
export const EditMenu = ({ posX, posY, onClickHandler } : EditMenuProps) => {
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
        {
            text: 'ol',
            icon: <IconListNumbers/>,
            ret: 'ol',
        },
        {
            text: 'ul',
            icon: <IconList/>,
            ret: 'ul',
        },
        {
            text: 'blockquote',
            icon: <IconBlockquote/>,
            ret: 'blockquote',
        },
        {
            text: '이미지',
            icon: <IconPhoto/>,
            ret: 'img'
        }
    ];

    return (
        <EditMenuBlock
            posX={posX}
            posY={posY}
        >
            {
                menus.map((m, idx)  => {
                    return (
                        <MenuButton
                            key={idx}
                            onClick={(e)=>{
                                e.preventDefault();
                                onClickHandler(m.ret);
                            }}
                        >
                            { m.icon }
                            { m.text }
                        </MenuButton>
                    )
                })
            }
        </EditMenuBlock>
    )
}

export default EditMenu;
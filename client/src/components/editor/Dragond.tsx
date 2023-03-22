
import styled from 'styled-components';
import { 
    IconBold, IconItalic, IconUnderline, IconStrikethrough,
    IconAlignLeft, IconAlignCenter, IconAlignRight,
    IconTextSize, IconPalette, IconTexture
} from '@tabler/icons-react';
import { ToolButton } from './ToolButton';
import { POSITION } from './type';
import React from 'react';

type Tool = {
    icon: JSX.Element,
    commandId: string,
    value?: string
}

const DragondContainer = styled.div`
    position: absolute;
    background-color: white;
    padding: 0.5rem;
    top: ${(props: POSITION) => props.posY}px;
    left: ${(props: POSITION) => props.posX}px;
    border-radius: 0.5rem;
    z-index: ${({theme} ) => theme.zIndex.editDragond};
    box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.75);
    -webkit-box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.75);
`;

const Dragond = ({ posX, posY } : POSITION) => {
    const [openSubDragond, setOpenSubDragond] = React.useState<boolean>(false);
    
    const tools : Tool[] = [
        {
            icon: <IconBold/>,
            commandId: 'bold'
        },
        {
            icon: <IconItalic/>,
            commandId: 'Italic'
        },
        {
            icon: <IconUnderline/>,
            commandId: 'Underline'
        },
        {
            icon: <IconStrikethrough/>,
            commandId: 'StrikeThrough'
        },
        // {
        //     name: '내어쓰기',
        //     commandId: 'outdent'
        // },
        // {
        //     name: '들여쓰기',
        //     commandId: 'indent'
        // },
        {
            icon: <IconAlignLeft/>,
            commandId: 'justifyleft'
        },
        {
            icon: <IconAlignCenter/>,
            commandId: 'justifycenter'
        },
        {
            icon: <IconAlignRight/>,
            commandId: 'justifyright'
        },
        {
            icon: <IconTextSize/>,
            commandId: 'fontSize',
            value: '30px'
        },
        {
            icon: <IconPalette/>,
            commandId: 'foreColor',
            value: '#ff0000'
        },
        {
            icon: <IconTexture/>,
            commandId: 'hiliteColor',
            value: '#005500'
        },
        // {
        //     name: '글번호 매기기',
        //     commandId: 'insertorderedList'
        // },
        // {
        //     name: '글머리 매기기',
        //     commandId: 'insertunorderdList'
        // },
    ];

    return (
        <DragondContainer
            posX={posX}
            posY={posY}
        >
            {
                tools.map(tool => 
                    <ToolButton 
                        key={tool.commandId}
                        icon={tool.icon}
                        commandId={tool.commandId}
                        value={tool.value || undefined}
                    ></ToolButton>
                )
            }

            {
                openSubDragond &&
                <div>

                </div>
            }

        </DragondContainer>
    );
}

export default Dragond;
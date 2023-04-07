import React from 'react';
import styled from 'styled-components';
import { 
    IconBold, IconItalic, IconUnderline, IconStrikethrough,
    IconAlignLeft, IconAlignCenter, IconAlignRight,
    IconTextSize, IconPalette, IconTexture,
    IconLink
} from '@tabler/icons-react';
import { ToolButton } from './ToolButton';
import { POSITION } from '../type';
import { ColorPicker, LinkInput, RoundInputBlock } from '../../common/Input';

type Tool = {
    icon: JSX.Element,
    commandId: string,
    value?: string,
    needCheck?: boolean,
}

const DragondContainer = styled.div`
    display: flex;
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



type DragondType = POSITION & {
    drawColor: string,
    linkURL: string,
    setDrawColor: React.Dispatch<React.SetStateAction<string>>,
    setLinkURL: React.Dispatch<React.SetStateAction<string>>,
}
const Dragond = ({ posX, posY, drawColor, setDrawColor, linkURL, setLinkURL } : DragondType) => {
    const [openSubDragond, setOpenSubDragond] = React.useState<boolean>(false);

    const tools : Tool[] = [
        {
            icon: <IconBold/>,
            commandId: 'bold',
            needCheck: true,
        },
        {
            icon: <IconItalic/>,
            commandId: 'Italic',
            needCheck: true,
        },
        {
            icon: <IconUnderline/>,
            commandId: 'Underline',
            needCheck: true,
        },
        {
            icon: <IconStrikethrough/>,
            commandId: 'StrikeThrough',
            needCheck: true,
        },
        // {
        //     icon: <IconStrikethrough/>,
        //     commandId: 'outdent'
        // },
        // {
        //     icon: <IconStrikethrough/>,
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
            value: drawColor
        },
        {
            icon: <IconTexture/>,
            commandId: 'hiliteColor',
            value: drawColor
        },
        {
            icon: <IconLink/>,
            commandId: 'CreateLink',
            value: linkURL,
        },
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
                        needCheck={tool.needCheck}
                    ></ToolButton>
                )
            }

            {/* 색상 Dragond */}
            {
                !openSubDragond &&
                <DragondContainer
                    posX={0}
                    posY={64}
                >
                    <RoundInputBlock>
                        <ColorPicker
                            value={drawColor}
							onChange={e => { 
								setDrawColor(e.target.value);
							}}
                        />
                    </RoundInputBlock>
                </DragondContainer>
            }

            {/* input link Dragond */}
            {
                !openSubDragond &&
                <DragondContainer
                    posX={48}
                    posY={64}
                >
                    <LinkInput
                        value={linkURL}
                        onChange={e=>{
                            setLinkURL(e.target.value);
                        }}
                    />
                </DragondContainer>
            }


        </DragondContainer>
    );
}

export default Dragond;
import React from 'react';
import styled from 'styled-components';
import { LINE_TYPE } from './type';

import EditLineBlock from './EditLineBlock';
import EditMenu from './SelectMenu';

import Dragond from './Dragond';

export const EditorContainer = styled.div`
    background-color: #ecffeb;
    padding: 1rem;
`;

const cid = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

type POS = {
    posX: number,
    posY: number
}

const Editor = () => {
    const initialLine : LINE_TYPE = { 
        id: cid(),
        html: '',
        tag: 'p',
        flag: 0
    };
    const [content, setContent] = React.useState<LINE_TYPE[]>([initialLine]);

    const [openMenu, setOpenMenu] = React.useState<boolean>(false);
    const [curTargetIdx, setCurTargetIdx] = React.useState<number>(0);
    const [menuPos, setMenuPos] =  React.useState<POS>({ posX: 0, posY: 0 });
    
    function keyHandler(e: React.KeyboardEvent<HTMLParagraphElement>) {
        if (e.key === 'Enter') {
            // 새 EditLine 생성하고 focus 이동
            e.preventDefault();


            // const idx = content.findIndex(line => line.id === )

            // setContent((prev) => [...prev,
            //     {
            //         id: cid(),
            //         html: 'aaaa',
            //         tag: 'p',
            //         flag: 0
            //     }
            // ]);



            // e.target.nextSibling.focus();
        }
    }

    function updateContentHandler(curline: LINE_TYPE) {
        const idx = content.findIndex(line => line.id === curline.id);

        setContent((prev) => {
            prev[idx] = curline;

            return [...prev];
        })
    }

    function addBlockHandler(curline: LINE_TYPE) {
        const idx = content.findIndex(line => line.id === curline.id);

        setContent((prev) => {
            prev.splice(idx + 1, 0, initialLine);
            
            return [
                ...prev
            ]
        });
    }
    
    function changeCurLine(id: string, posX: number, posY: number) {
        const idx = content.findIndex(line => line.id === id);
        setMenuPos({posX, posY});
        setCurTargetIdx(idx);
    }

    function changeTagStyle(e: React.ElementType) {
        setContent((prev) => {
            prev[curTargetIdx].tag = e;
            console.log(curTargetIdx);
            return [
                ...prev
            ]
        });
    }

    return (
        <>
        
            <Dragond/>

            {
                openMenu &&
                <EditMenu
                    onClickHandler={changeTagStyle}
                    posX={menuPos.posX}
                    posY={menuPos.posY}
                />
            }

            <EditorContainer onKeyDown={keyHandler}>
                {
                    content?.map(e => {
                        return <EditLineBlock
                            key={e.id} 
                            text={e.html}
                            line={e}
                            updateContent={updateContentHandler}
                            addBlockHandler={addBlockHandler}
                            tagStyle={e.tag}
                            setOpenMenu={setOpenMenu}
                            changeCurLine={changeCurLine}
                            // tag={'p'}
                        ></EditLineBlock>
                    })
                }
                {/* <EditLine></EditLine> */}
            </EditorContainer>

            <div>
                { content.map(e => JSON.stringify(e)) }
            </div>
        </>
    )
}

export default Editor;
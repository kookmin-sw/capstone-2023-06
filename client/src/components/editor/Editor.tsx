import React from 'react';
import styled from 'styled-components';
import { LINE_TYPE, POSITION } from './type';

import EditLineBlock from './EditLineBlock';
import EditMenu from './SelectMenu';

import Dragond from './Dragond';


import { List  , arrayMove, arrayRemove } from 'react-movable';

import { IItemProps } from 'react-movable';

export const EditorContainer = styled.div`
    background-color: #ecffeb;
    padding: 1rem;
`;
// export const EditorContainer = React.forwardRef((props : any, ref: React.Ref<HTMLDivElement>) => {
//     return <EditorContainerProvider {...props}></EditorContainerProvider>
// });

const cid = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};


const Editor = () => {
    const initialLine : LINE_TYPE = { 
        id: cid(),
        html: '',
        tag: 'p',
        flag: 0
    };

    // 전체 내용
    const [content, setContent] = React.useState<LINE_TYPE[]>([initialLine]);

    // 선의 속성을 변경 시켜줄 메뉴 state
    const [openMenu, setOpenMenu] = React.useState<boolean>(false);
    const [curTargetId, setCurTargetId] = React.useState<string>('');
    const [menuPos, setMenuPos] =  React.useState<POSITION>({ posX: 0, posY: 0 });

    // Dragond(드래그 후 띄워줄 수정 메뉴) state
    const [openDragond, setOpenDragond] = React.useState<boolean>(false);
    const [dragondPos, setDragondPos] = React.useState<POSITION>({ posX: 0, posY: 0 });

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
    
    function changeCurLine(id: string, posX?: number, posY?: number) {
        // const idx = content.findIndex(line => line.id === id);
        if (posX !== undefined && posY !== undefined)
            setMenuPos({posX, posY});
        setCurTargetId(id);
    }

    function changeElementTagStyle(tag: React.ElementType) {
        setContent((prev) => {
            const idx = prev.findIndex(line => line.id === curTargetId);
            if (idx !== -1)
                prev[idx].tag = tag;
            return [
                ...prev
            ]
        });
    }

    function mouseDown(_e: React.MouseEvent<HTMLDivElement>) {
        // e.preventDefault();
        
        window.getSelection()?.removeAllRanges();
    }

    function mouseUp(_e: React.MouseEvent<HTMLDivElement>) {
        // e.preventDefault();

        const sel = window.getSelection();
        if (sel?.toString().length === undefined || sel.toString().length === 0) {
            setOpenDragond(false);
            return;
        }

        const scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    
        let selectionRect = sel.getRangeAt(0).getBoundingClientRect();
        const posX = selectionRect.x +
                        (selectionRect.right - selectionRect.left) / 2 +
                        0;
        const posY = selectionRect.bottom +
                        16 +
                        scrollTop +
                        0;

        setDragondPos({posX, posY});
        setOpenDragond(true);
    }

    return (
        <>
            {
                openDragond &&
                <Dragond
                    posX={dragondPos.posX}
                    posY={dragondPos.posY}
                />
            }

            {
                openMenu &&
                <EditMenu
                    onClickHandler={changeElementTagStyle}
                    posX={menuPos.posX}
                    posY={menuPos.posY}
                />
            }

            <List
                values={content}
                onChange={({ oldIndex, newIndex }) => {
                    return setContent(arrayMove(content, oldIndex, newIndex))
                }}
                renderList={({ children, props, isDragged }) => (
                    <EditorContainer onKeyDown={keyHandler} onMouseDown={mouseDown} onMouseUp={mouseUp}
                        {...props}
                    >
                        {children}
                    </EditorContainer>

                )}
                renderItem={({ value, props, isDragged, isSelected }) => (
                    <EditLineBlock
                        {...props}
                        curLineId={curTargetId}
                        line={value}
                        updateContent={updateContentHandler}
                        addBlockHandler={addBlockHandler}
                        tagStyle={value.tag}
                        setOpenMenu={setOpenMenu}
                        changeCurLine={changeCurLine}
                        style={{
                          ...props.style,
                        }}
                        // tag={'p'}
                    ></EditLineBlock>
                )}
            />

            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>

            <div>
                { content.map(e => JSON.stringify(e)) }
            </div>
        </>
    )
}

export default Editor;
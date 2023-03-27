import React from 'react';
import styled from 'styled-components';
import { LINE_TYPE, POSITION } from './type';

import EditLineBlock from './EditLineBlock';
import EditMenu from './SelectMenu';

import Dragond from './Dragond';

import { List as MovableContainer , arrayMove, arrayRemove } from 'react-movable';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { addLine, changeTag, updateContent } from '../../modules/editor';

export const EditorContainer = styled.div`
    background-color: #ecffeb;
    padding: 1rem;
`;

const Editor = () => {
    // 전체 내용
    const dispatch = useDispatch();
    const content = useSelector((state: RootState) => state.editor);

    // 선의 속성을 변경 시켜줄 메뉴 state
    const [openMenu, setOpenMenu] = React.useState<boolean>(false);
    const [curTargetId, setCurTargetId] = React.useState<string>('');
    const [menuPos, setMenuPos] =  React.useState<POSITION>({ posX: 0, posY: 0 });

    // Dragond(드래그 후 띄워줄 수정 메뉴) state
    const [openDragond, setOpenDragond] = React.useState<boolean>(false);
    const [dragondPos, setDragondPos] = React.useState<POSITION>({ posX: 0, posY: 0 });

    function changeCurLine(id: string, posX?: number, posY?: number) {
        if (openMenu)
            return;

        if (posX !== undefined && posY !== undefined)
            setMenuPos({posX, posY});
        setCurTargetId(id);
    }

    function changeElementTagStyle(tag: React.ElementType) {
        dispatch(changeTag(curTargetId, tag));
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
                        0;      // offset 값
        const posY = selectionRect.bottom +
                        scrollTop +
                        16;     // offset 값

        setDragondPos({posX, posY});
        setOpenDragond(true);

        console.log(document.queryCommandState('createLink'));
        // if (document.queryCommandState('CreateLink'))

    }

    const [drawColor, setDrawColor] = React.useState<string>('#FFF');
    const [linkURL, setLinkURL] = React.useState<string>('');

    return (
        <>
            {
                openDragond &&
                <Dragond
                    posX={dragondPos.posX}
                    posY={dragondPos.posY}
                    drawColor={drawColor}
                    linkURL={linkURL}
                    setDrawColor={setDrawColor}
                    setLinkURL={setLinkURL}
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

            <MovableContainer
                lockVertically
                values={content}
                onChange={({ oldIndex, newIndex }) => {
                    return dispatch(updateContent( arrayMove(content, oldIndex, newIndex) ))
                }}
                renderList={({ children, props, isDragged }) => (
                    <EditorContainer onMouseDown={mouseDown} onMouseUp={mouseUp}
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
                        setOpenMenu={setOpenMenu}
                        changeCurLine={changeCurLine}
                        style={{
                          ...props.style,
                          marginTop: '10px',
                          marginBottom: '10px',
                        }}
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
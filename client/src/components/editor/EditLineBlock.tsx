import React from 'react';
import styled from 'styled-components';
import { LINE_TYPE } from './type';

import { IconPlus, IconGripVertical } from '@tabler/icons-react';
import { IItemProps } from 'react-movable';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { addLine, changeTag, removeLine, updateContent, updateHtml } from '../../modules/editor';

import DynamicTag from './DynamicTag';
import { SelectButton, MoveButton } from './EditorButton';

const Line = styled.div`
    position: relative;
    margin-bottom: 10px;
    margin-top: 10px;
    :focus-visible {
        outline: 3px solid #aaa;
    }
`;

type LineBlockType = IItemProps & {
    curLineId: string,
    line: LINE_TYPE,
    setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>,
    changeCurLine: (line_id:string, posX?:number, posY?:number)=>void,
}
const EditLineBlock = React.forwardRef(( props : LineBlockType, ref: React.Ref<HTMLDivElement> ) => {
    const dispatch = useDispatch();
    const content = useSelector((state: RootState) => state.editor);
        
    const { curLineId, line, /*updateContent, */ setOpenMenu, changeCurLine  /*, addBlockHandler*/ } = props;
    const lineRef = React.useRef<HTMLParagraphElement>(null);

    /**
     * 라인이 삭제 되어서 그 아래 컴포넌트들이 다시 렌더링 되어야 할때 필요함.
     */
    React.useEffect(() => {
        if (lineRef.current)
            lineRef.current.innerHTML = line.html;
        
    }, [line]);

    /**
     * 라인 새로 생성 되었을때 포커싱 하기
     */
    React.useEffect(() => {
        focusSelf();
    }, [lineRef]);

    /**
     * line.tag 변경되서 컴포넌트 재렌더링된 이후 설정 필요
     */
    React.useEffect(() => {
        // 태그 변경됨 알림
        if (line.tag === 'ol' || line.tag === 'ul') {
            // 만약 ol, ul 형태가 된다면 이전 태그도 그런지 확인, 만약 그렇다면 flag 값이 변경되어야 함
            const prevLineData = getLineData(line);

            if (prevLineData?.tag === line.tag) {
                line.flag = prevLineData.flag + 1;
            } else {
                line.flag = 0;
            }
        }
        dispatch(changeTag(line.id, line.tag));
        
        // 열려있던 메뉴 창 닫기
        setOpenMenu(false);

        // 기존에 입력 되어 있던 내용 다시 넣기
        if (lineRef.current && line.html !== '') {
            lineRef.current.innerHTML = line.html;
        }
        
        // 포커스
        focusSelf();

    }, [line.tag])

    /**
     * 입력(수정)
     * @param _e 입력 이벤트
     */
    function typing(_e: React.FormEvent<HTMLParagraphElement>) {
        dispatch(updateHtml(line.id, lineRef.current?.innerHTML || ''));
    }

    /**
     * 현재 Line 기준으로 offset 만큼 있는 Line 데이터 가져오기
     * @param {LINE_TYPE} curLine 현재 라인 데이터
     * @param {number} offset 기준, default 값은 내 이전 라인을 가져오겠다는 뜻
     * @returns {LINE_TYPE || undefined} 위에 있는 라인 데이터
     */
    function getLineData(curLine: LINE_TYPE, offset: number = -1) {
        const idx = content.findIndex(line => line.id === curLine.id) + offset;

        if (idx <= -1 || content.length <= idx)
            return undefined;

        return content[idx];
    }

    /**
     * 키 입력 핸들러
     * @param e 입력 키 이벤트
     */
    function keyHandler(e: React.KeyboardEvent<HTMLParagraphElement>) {

        // 새 EditLine 생성하고 focus 이동
        if (e.key === 'Enter') {
            e.preventDefault();
            
            let sPos = window.getSelection()?.focusOffset || 0;     // selection 시작 pos
            let ePos = window.getSelection()?.anchorOffset || 0;    // selection 끝나는 pos

            if (ePos < sPos) [sPos, ePos] = [ePos, sPos];

            if (0 < ePos && ePos < line.html.length) {
                // 내 뒷 부분을 다음 줄로 이동
                dispatch(addLine(line.id, line.html.slice(ePos)));

                // 선택한 부분이 있다면 제거
                line.html = line.html.slice(0, sPos);
                if (lineRef.current) lineRef.current.innerHTML = line.html;
                // 현재 줄은 상태에 따라 다시 변경
                dispatch(updateHtml(line.id, line.html));
            }
            else {
                dispatch(addLine(line.id));
            }
        }
        // 현재 EditLine 삭제하고 이전 focus 이동 (첫째 줄이라면 제거 되어선 안되므로 무시)
        else if (e.key === 'Backspace' && content[0].id !== line.id) {
            if (line.html === '') {
                e.preventDefault();

                // ol, li 태그들은 줄 삭제 이전에 <p> 태그로의 변환이 한번 있어야 함
                if (line.tag === 'ol' || line.tag === 'ul') {
                    dispatch(changeTag(line.id, 'p'));
                    return;
                }

                dispatch(removeLine(line.id));
            }
            else if (window.getSelection()?.focusOffset === 0 && window.getSelection()?.anchorOffset === 0) {
                e.preventDefault();

                // ol, li 태그들은 줄 삭제 이전에 <p> 태그로의 변환이 한번 있어야 함
                if (line.tag === 'ol' || line.tag === 'ul') {
                    dispatch(changeTag(line.id, 'p'));
                    return;
                }

                // 내 위에 라인이 남아있다면 내 뒤에 있는 내용들을 그 위에 붙여 줘야 함.
                let prevLine = getLineData(line);
                if (prevLine) {
                    prevLine.html += line.html;
                    
                    (lineRef.current?.parentElement?.previousSibling?.lastChild as HTMLElement).innerHTML = prevLine.html;
                    
                    dispatch(updateHtml(prevLine.id, prevLine.html));
                }
                
                // 현재 줄 삭제
                dispatch(removeLine(line.id));
            }
        }
        else if (e.key === 'Delete') {
            const sPos = window.getSelection()?.focusOffset || 0;     // selection 시작 pos
            const ePos = window.getSelection()?.anchorOffset || 0;    // selection 끝나는 pos

            // 내 뒤에 있는 줄을 가져와야 함
            if (sPos === line.html.length && ePos === line.html.length) {
                const afterLineData = getLineData(line, 1);
                if (afterLineData) {
                    e.preventDefault();

                    // 현재 줄의 데이터를 내 다음 데이터 앞에 붙임
                    afterLineData.html = line.html + afterLineData.html;
                    afterLineData.tag = line.tag;
                    dispatch(updateHtml(afterLineData.id, afterLineData.html));
                    
                    // 현재 줄 삭제
                    dispatch(removeLine(line.id));
                }
            }
        }
        else if (e.key === 'ArrowDown') {
            // firstChild 에는 + 버튼이 들어갈 수 있기 때문에 lastChild로 찾아야 함
            (lineRef.current?.parentElement?.nextSibling?.lastChild as HTMLElement).focus();
        } else if (e.key === 'ArrowUp') {
            (lineRef.current?.parentElement?.previousSibling?.lastChild as HTMLElement).focus();
        }
    }

    /**
     * 라인의 속성을 변경하려 함 (설정창 열기와 현재 타겟 line id를 변경)
     * @param e 클릭 이벤트
     */
    function clickedSettingBT(e: React.MouseEvent<HTMLElement>) {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        
        e.preventDefault();

        changeCurLine(line.id, left + 24, top + 16);
        setOpenMenu(prev => !prev);
    }

    /**
     * Line 에 마우스 올려둠
     */
    function onMouseEnterHandler(_e: any) {
        changeCurLine(line.id);
    }

    /**
     * Line 포커스 시키기
     */
    function focusSelf() {
        if (lineRef.current?.innerText.length === 0) {
            lineRef.current.focus();
            return;
        }

        if (lineRef.current) {
            const selection = window.getSelection();
            const newRange = document.createRange();
            newRange.selectNodeContents(lineRef.current);
            newRange.collapse(false);
            selection?.removeAllRanges();
            selection?.addRange(newRange);
        }
    }

    return (
        <Line
            style={props.style}
            ref={ref}
            onMouseEnter={onMouseEnterHandler}
            // onMouseLeave={editExitHandler}
        >
            {
                curLineId === line.id &&
                <>
                    <SelectButton
                        onClick={clickedSettingBT}
                    >
                        <IconPlus/>
                    </SelectButton>
                    <MoveButton
                        data-movable-handle    
                        tabIndex={-1}
                    >
                        <IconGripVertical/>
                    </MoveButton>
                </>
            }
            {
                line.tag === 'ol' ?
                    <ol start={line.flag + 1}>
                        <DynamicTag 
                            as={'li'}
                            ref={lineRef}
                            onInput={typing}
                            onKeyDown={keyHandler}
                        >
                        </DynamicTag>
                    </ol>
                :
                line.tag === 'ul' ?
                    <ul>
                        <DynamicTag 
                            as={'li'}
                            ref={lineRef}
                            onInput={typing}
                            onKeyDown={keyHandler}
                        >
                        </DynamicTag>
                    </ul>
                :
                    <DynamicTag 
                        as={line.tag}
                        ref={lineRef}
                        onInput={typing}
                        onKeyDown={keyHandler}
                    >
                    </DynamicTag>
            }
        </Line>
    )
});

export default EditLineBlock;
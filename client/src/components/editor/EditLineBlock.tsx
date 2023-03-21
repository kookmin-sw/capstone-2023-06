import React from 'react';
import styled from 'styled-components';
import { LINE_TYPE } from './type';

import DynamicTag from './DynamicTag';
import { SelectButton, MoveButton } from './EditorButton';
import SelectMenu from './SelectMenu';

import { IconPlus, IconGripVertical } from '@tabler/icons-react';
import { IItemProps } from 'react-movable';

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
    updateContent: (e:LINE_TYPE)=>void,
    setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>,
    changeCurLine: (line_id:string, posX?:number, posY?:number)=>void,
    addBlockHandler: (curLine:LINE_TYPE)=>void,
    getBeforeLineData: (curLine:LINE_TYPE)=>LINE_TYPE | undefined,
}
const EditLineBlock = React.forwardRef(
    (
        props : LineBlockType,
        ref: React.Ref<HTMLDivElement>
    ) => {
    
    const { curLineId, line, updateContent, setOpenMenu, changeCurLine, addBlockHandler } = props;
    const lineRef = React.useRef<HTMLParagraphElement>(null);
    // const [focusing, setFocusing] = React.useState<boolean>(false);

    // const [content, setContent] = React.useState<string | undefined>('');
    // const [line.tag, setline.tag] = React.useState<React.ElementType>('p');

    React.useEffect(() => {
        if (lineRef.current)
            lineRef.current.innerHTML = line.html;

            console.log('chg');
        
    }, [line]);

    React.useEffect(() => {
        if (lineRef.current)
            lineRef.current.innerHTML = line.html;
            console.log('chg333333333');
        
    }, [line.html]);

    React.useEffect(() => {
        focusSelf();
    }, [lineRef]);

    // line.tag 변경되서 컴포넌트 재렌더링된 이후
    React.useEffect(() => {
        // 태그 변경됨 알림
        if (line.tag === 'ol' || line.tag === 'ul') {
            // 만약 ol, ul 형태가 된다면 이전 태그도 그런지 확인, 만약 그렇다면 flag 값이 변경되어야 함
            const prevLineData = props.getBeforeLineData(line);

            if (prevLineData?.tag === line.tag) {
                line.flag = prevLineData.flag + 1;
            } else {
                line.flag = 0;
            }
        }
        updateContent(line);
        
        // 열려있던 메뉴 창 닫기
        setOpenMenu(false);

        // 기존에 입력 되어 있던 내용 다시 넣기
        if (lineRef.current && line.html !== '') {
            lineRef.current.innerHTML = line.html;
        }
        
        // 포커스
        focusSelf();

    }, [line.tag])

    function typing(e: React.FormEvent<HTMLParagraphElement>) {
        line.html = lineRef.current?.innerHTML || '';
        updateContent(line);
    }

    function keyHandler(e: React.KeyboardEvent<HTMLParagraphElement>) {
        console.log(window.getSelection());
        // 새 EditLine 생성하고 focus 이동
        if (e.key === 'Enter') {
            e.preventDefault();
            addBlockHandler(line);
        }
        // 현재 EditLine 삭제하고 이전 focus 이동
        else if (e.key === 'Backspace') {
            if (line.html === '') {
                e.preventDefault();
                lineRef.current?.remove();
            }
            else if (window.getSelection()?.focusOffset === 0 && window.getSelection()?.anchorOffset === 0) {
                e.preventDefault();

                lineRef.current?.remove();

                let prevLine = props.getBeforeLineData(line);
                if (prevLine) {
                    prevLine.html += line.html;
                    updateContent(prevLine);
                }
            }
        }
        else if (e.key === 'ArrowDown') {
            // firstChild 에는 + 버튼이 들어갈 수 있음
            (lineRef.current?.parentElement?.nextSibling?.lastChild as HTMLElement).focus();
        } else if (e.key === 'ArrowUp') {
            (lineRef.current?.parentElement?.previousSibling?.lastChild as HTMLElement).focus();
        }
    }

    function clickedSettingBT(e: React.MouseEvent<HTMLElement>) {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        
        e.preventDefault();

        changeCurLine(line.id, left + 24, top + 16);
        setOpenMenu(prev => !prev);
    }

    function editOnHandler(e: any) {
        // setFocusing(true);

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
            onMouseEnter={editOnHandler}
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
                line.tag !== 'ol' ?
                <DynamicTag 
                    // onFocus={(e)=>setFocusing(true)}
                    // onBlur={blurEv}
                    as={line.tag}
                    ref={lineRef}
                    onInput={typing}
                    onKeyDown={keyHandler}
                    // onFocus={()=>{setFocusing(true)}} onBlur={()=>{setFocusing(false)}} 
                >
                </DynamicTag>
                :
                <ol start={line.flag}>
                <DynamicTag 
                    // onFocus={(e)=>setFocusing(true)}
                    // onBlur={blurEv}
                    as={'li'}
                    ref={lineRef}
                    onInput={typing}
                    onKeyDown={keyHandler}
                    // onFocus={()=>{setFocusing(true)}} onBlur={()=>{setFocusing(false)}} 
                >
                </DynamicTag>
                </ol>
            }
        </Line>
    )
});

export default EditLineBlock;
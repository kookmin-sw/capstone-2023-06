import React from 'react';
import styled from 'styled-components';
import { LINE_TYPE } from './type';

import DynamicTag from './DynamicTag';
import SelectButton from './SelectButton';
import SelectMenu from './SelectMenu';


const Line = styled.div`
    position: relative;
    :focus-visible {
        outline: 3px solid #aaa;
    }
`;

type LineBlockType = {
    curLineId: string,
    line: LINE_TYPE,
    updateContent: (e:LINE_TYPE)=>void,
    tagStyle: React.ElementType,
    setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>,
    changeCurLine: (line_id:string, posX?:number, posY?:number)=>void,
    addBlockHandler: (curLine:LINE_TYPE)=>void
}
const EditLineBlock = ({ curLineId, line, updateContent, tagStyle, setOpenMenu, changeCurLine, addBlockHandler } : LineBlockType) => {
    const ref = React.useRef<HTMLParagraphElement>(null);
    // const [focusing, setFocusing] = React.useState<boolean>(false);

    // const [content, setContent] = React.useState<string | undefined>('');
    // const [tagStyle, setTagStyle] = React.useState<React.ElementType>('p');

    React.useEffect(() => {
        focusSelf();
    }, [ref]);

    // tagStyle 변경되서 컴포넌트 재렌더링된 이후
    React.useEffect(() => {
        // 태그 변경됨 알림
        line.tag = tagStyle;
        updateContent(line);
        
        // 열려있던 메뉴 창 닫기
        setOpenMenu(false);

        // 기존에 입력 되어 있던 내용 다시 넣기
        if (ref.current && line.html !== '') {
            ref.current.innerHTML = line.html;
        }
        
        // 포커스
        focusSelf();
    }, [tagStyle])

    function typing(e: React.FormEvent<HTMLParagraphElement>) {
        line.html = ref.current?.innerHTML || '';
        updateContent(line);
    }

    function keyHandler(e: React.KeyboardEvent<HTMLParagraphElement>) {
        // 새 EditLine 생성하고 focus 이동
        if (e.key === 'Enter') {
            e.preventDefault();
            addBlockHandler(line);
        }
        // 현재 EditLine 삭제하고 이전 focus 이동
        else if (e.key === 'Backspace' && line.html === '') {
            e.preventDefault();
            ref.current?.remove();
        } else if (e.key === 'ArrowDown') {
            // firstChild 에는 + 버튼이 들어갈 수 있음
            (ref.current?.parentElement?.nextSibling?.lastChild as HTMLElement).focus();
        } else if (e.key === 'ArrowUp') {
            (ref.current?.parentElement?.previousSibling?.lastChild as HTMLElement).focus();
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
    // function editExitHandler(e: any) {
    //     setFocusing(false);
    // }

    /**
     * Line 포커스 시키기
     */
    function focusSelf() {
        if (ref.current?.innerText.length === 0) {
            ref.current.focus();
            return;
        }

        if (ref.current) {
            const selection = window.getSelection();
            const newRange = document.createRange();
            newRange.selectNodeContents(ref.current);
            newRange.collapse(false);
            selection?.removeAllRanges();
            selection?.addRange(newRange);
        }
    }

    return (
        <Line
            onMouseEnter={editOnHandler}
            // onMouseLeave={editExitHandler}
        >
            {
                curLineId === line.id &&
                <SelectButton
                    onClick={clickedSettingBT}
                >+</SelectButton>
            }
            <DynamicTag 
                // onFocus={(e)=>setFocusing(true)}
                // onBlur={blurEv}
                as={tagStyle}
                ref={ref}
                onInput={typing}
                onKeyDown={keyHandler}

            
                // onFocus={()=>{setFocusing(true)}} onBlur={()=>{setFocusing(false)}} 
            >
            </DynamicTag>
        </Line>
    )
}

export default EditLineBlock;
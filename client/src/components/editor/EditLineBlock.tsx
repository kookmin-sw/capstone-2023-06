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
    text: string,
    line: LINE_TYPE,
    updateContent: (e:LINE_TYPE)=>void,
    addBlockHandler: (curLine:LINE_TYPE)=>void
}
const EditLineBlock = ({ text, line, updateContent, addBlockHandler } : LineBlockType) => {
    const ref = React.useRef<HTMLParagraphElement>(null);
    const [focusing, setFocusing] = React.useState<boolean>(false);
    const [openMenu, setOpenMenu] = React.useState<boolean>(false);

    // const [content, setContent] = React.useState<string | undefined>('');
    const [tagStyle, setTagStyle] = React.useState<React.ElementType>('p');

    React.useEffect(() => {
        ref.current?.focus();
        console.log("!!!!!!!!!!!");
    }, [ref]);

    React.useEffect(() => {        
        line.tag = tagStyle.toString();
        updateContent(line);
        setOpenMenu(false);
    }, [tagStyle])

    function typing(e: React.FormEvent<HTMLParagraphElement>) {
        // setContent(e?.currentTarget.textContent || '');
        // setContent(ref.current?.innerHTML);

        line.html = ref.current?.innerHTML || '';
        updateContent(line);
    }

    function keyHandler(e: React.KeyboardEvent<HTMLParagraphElement>) {
        if (e.key === 'Enter') {
            // 새 EditLine 생성하고 focus 이동
            e.preventDefault();
            addBlockHandler(line);
        } else if (e.key === 'Backspace' && line.html === '') {
            // 현재 EditLine 삭제하고 이전 focus 이동
            e.preventDefault();
            ref.current?.remove();
        }
    }

    function clickedSettingBT(e: any) {
        e.preventDefault();

        setOpenMenu(prev => !prev);
    }

    function editOnHandler(e: any) {
        setFocusing(true);
    }
    function editExitHandler(e: any) {
        setFocusing(false);
    }



    return (
        <Line
        onMouseEnter={editOnHandler}
        // onMouseLeave={editExitHandler}
        >
            {
                focusing &&
                <SelectButton
                    onClick={clickedSettingBT}
                >+</SelectButton>
            }
            {
                openMenu &&
                <SelectMenu onClickHandler={setTagStyle}/>
            }
            <DynamicTag 
                // onFocus={(e)=>setFocusing(true)}
                // onBlur={blurEv}
                as={tagStyle}
                ref={ref}
                onInput={typing}
                onKeyDown={keyHandler}
            >
            </DynamicTag>
        </Line>
    )
}

export default EditLineBlock;
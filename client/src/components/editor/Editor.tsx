import React from 'react';
import styled from 'styled-components';

export const EditorContainer = styled.div`
    border: 1px solid black;
    
`;

const cid = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

type LineType = {
    text: string,
    line: Line,
    updateContent: (e:Line)=>void,
    addBlockHandler: (curLine:Line)=>void
}
const EditLine = ({ text, line, updateContent, addBlockHandler } : LineType) => {
    const ref = React.useRef<HTMLParagraphElement>(null);
    const [content, setContent] = React.useState<string | undefined>('');

    React.useEffect(() => {
        ref.current?.focus();
    }, []);

    function typing(e: React.FormEvent<HTMLParagraphElement>) {
        setContent(e?.currentTarget.textContent || '');
        setContent(ref.current?.innerHTML);

        line.html = ref.current?.innerHTML || '';
        // updateContent(line);
    }

    function keyHandler(e: React.KeyboardEvent<HTMLParagraphElement>) {
        if (e.key === 'Enter') {
            // 새 EditLine 생성하고 focus 이동
            e.preventDefault();
            addBlockHandler(line);
        } else if (e.key === 'Backspace' && content === '') {
            // 현재 EditLine 삭제하고 이전 focus 이동
            e.preventDefault();
            ref.current?.remove();
        }
    }

    return (
        <p ref={ref} onInput={typing} onKeyDown={keyHandler} contentEditable suppressContentEditableWarning={true}></p>
    )
}

type ToolButtonProps =  {
    name: string,
    commandId: string,
    value?: string | undefined
}

const ToolButton = ({ name, commandId, value = undefined } : ToolButtonProps) => {
    function clickEvent(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        document.execCommand(commandId, false, value);
        console.log(value);
    }

    return (
        <button 
            key={name}
            type="button"
            onClick={clickEvent}
        >
            { name }
        </button>
    )
}

type Line = {
    id: string,
    html: string,
    tag: string,
    flag: Number,
}

const Editor = () => {



    const tools = [
        {
            name: '강조',
            commandId: 'bold'
        },
        {
            name: '기울이기',
            commandId: 'Italic'
        },
        {
            name: '밑줄',
            commandId: 'Underline'
        },
        {
            name: '중간줄',
            commandId: 'StrikeThrough'
        },
        {
            name: '내어쓰기',
            commandId: 'outdent'
        },
        {
            name: '들여쓰기',
            commandId: 'indent'
        },
        {
            name: '왼쪽정렬',
            commandId: 'justifyleft'
        },
        {
            name: '가운데정렬',
            commandId: 'justifycenter'
        },
        {
            name: '오른쪽정렬',
            commandId: 'justifyright'
        },
        {
            name: '글번호 매기기',
            commandId: 'insertorderedList'
        },
        {
            name: '글머리 매기기',
            commandId: 'insertunorderdList'
        },
    ];
    
    const [content, setContent] = React.useState<Line[]>([{ 
        id: cid(),
        html: 'aaaa',
        tag: 'p',
        flag: 0
    }]);
    
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

    function updateContentHandler(line: Line) {

    }

    function addBlockHandler(curline: Line) {
        const idx = content.findIndex(line => line.id === curline.id);

        // setContent([...content, {
        //     id: cid(),
        //     html: 'aaa22a',
        //     tag: 'p',
        //     flag: 0
        // }]);

        setContent((prev) => {
            console.log(idx);
            console.log(prev);
            console.log(prev.splice(idx + 1, 0, {
                id: cid(),
                html: 'aaa22a',
                tag: 'p',
                flag: 0
            }));
            console.log(prev);
            // prev.push({
            //     id: cid(),
            //     html: 'aaa22a',
            //     tag: 'p',
            //     flag: 0
            // })
            return [
                ...prev
                // prev.splice(idx, 0, {
                //     id: cid(),
                //     html: 'aaa22a',
                //     tag: 'p',
                //     flag: 0
                // })
            ]
        });
    }

    // function kkk(e : React.FormEvent<HTMLDivElement>) {
    //     e.target.nextSibling.focus();
    // }
    return (
        <>
        
            <div>
                {
                    tools.map(tool => {
                        return <ToolButton key={tool.name} name={tool.name} commandId={tool.commandId}></ToolButton>
                    })
                }
                <ToolButton name='폰트 크기' commandId='fontSize' value='20px'></ToolButton>
                <ToolButton name='폰트 크기' commandId='fontSize' value='10px'></ToolButton>
                <ToolButton name='폰트 크기' commandId='foreColor' value='#ee00ff'></ToolButton>
                <ToolButton name='폰트 크기' commandId='hiliteColor' value='#ff0000'></ToolButton>
                <ToolButton name='폰트 크기' commandId='Undo'></ToolButton>
            </div>

            <EditorContainer onKeyDown={keyHandler}>
                {
                    content?.map(e => {
                        return <EditLine
                                    key={e.id} 
                                    text={e.html}
                                    line={e}
                                    updateContent={updateContentHandler}
                                    addBlockHandler={addBlockHandler}
                                ></EditLine>
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
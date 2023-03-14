import React from 'react';
import styled from 'styled-components';
import { LINE_TYPE } from './type';

import EditLineBlock from './EditLineBlock';

export const EditorContainer = styled.div`
    background-color: #ecffeb;
    padding: 1rem;
`;


const cid = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };


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
    
    const [content, setContent] = React.useState<LINE_TYPE[]>([{ 
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

    function updateContentHandler(line: LINE_TYPE) {

    }

    function addBlockHandler(curline: LINE_TYPE) {
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
                        return <>
                                    <EditLineBlock
                                        key={e.id} 
                                        text={e.html}
                                        line={e}
                                        updateContent={updateContentHandler}
                                        addBlockHandler={addBlockHandler}
                                    ></EditLineBlock>
                                </>
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
import React from 'react';

type Props = {
    as?: React.ElementType;
    children: React.ReactNode;
    // ref: RefObject<HTMLParagraphElement>;
    onInput: (e:React.FormEvent<HTMLParagraphElement>)=>void;
    onKeyDown: (e:React.KeyboardEvent<HTMLParagraphElement>)=>void;
    onFocus?: (e:React.FocusEvent<HTMLInputElement>)=>void;
    onBlur?: (e:React.FocusEvent<HTMLInputElement>)=>void;
};

const DynamicTag = React.forwardRef(
    (
        { as: Tag = "p", children, onInput, onKeyDown, onFocus, onBlur } : Props, 
        ref: React.Ref<HTMLDivElement>
    ) => {

    const props = {
        className:'outline-none',
        spellCheck:'false',
        // ref:{ref},
        // onInput:{onInput},
        // onKeyDown:{onKeyDown},
        // onFocus:{onFocus},
        // onBlur:{onBlur},
    }


    return (
        <Tag
            // className='outline-none'
            // spellCheck='false'
            ref={ref}
            onInput={onInput}
            onKeyDown={onKeyDown}
            onFocus={onFocus}
            onBlur={onBlur}
            contentEditable
            suppressContentEditableWarning={true}
            {...props}
        >
            { children }
        </Tag>
    );
});

export default DynamicTag;
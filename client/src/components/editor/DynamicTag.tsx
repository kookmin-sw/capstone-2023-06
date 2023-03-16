import React, { FC, FunctionComponent, PropsWithoutRef, PropsWithRef, RefObject } from 'react';

type Props = {
    as?: React.ElementType;
    children: React.ReactNode;
    // ref: RefObject<HTMLParagraphElement>;
    onInput: (e:React.FormEvent<HTMLParagraphElement>)=>void;
    onKeyDown: (e:React.KeyboardEvent<HTMLParagraphElement>)=>void;
};

const DynamicTag = React.forwardRef(({ as: Tag = "p", children, onInput, onKeyDown } : Props, ref: React.Ref<HTMLDivElement>) => {
    return (
        <Tag
            ref={ref}
            onInput={onInput}
            onKeyDown={onKeyDown}
            contentEditable
            suppressContentEditableWarning={true}
        >
            { children }
        </Tag>
    );
});

export default DynamicTag;
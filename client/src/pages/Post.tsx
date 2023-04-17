import React from "react";
import { FluidLayout } from "../components/layout/Layout";
import { Container } from "../components/common/Grid";
import styled from "styled-components";
import { ImagesObjectType, LINE_TYPE } from "../components/editor/type";
import { DynamicTagReadOnly } from "../components/editor/LineBlock/DynamicTag";
// import { ImagesObjectType } from "../modules/images";

const Post = () => {
    const [tagList, setTagList] = React.useState<string>('#태그, #태그1, #태그2');
    const [title, setTitle] = React.useState<string>('Lorem Ipsum');
    const [content, setContent] = React.useState<LINE_TYPE[]>([
        {
            id: '111',
            html: '<h1>어쩌구</h1>',
            tag: 'p',
            flag: 0
        },
        {
            id: '222',
            html: '저쩌구',
            tag: 'p',
            flag: 0
        }
    ]);
    const [images, setImages] = React.useState<ImagesObjectType>({

    });
    return (
        <FluidLayout>
            <HeaderImage/>
            <Container>
                <Tags>{tagList}</Tags>
                <Title>{title}</Title>
                <Content>
                    {
                        content.map(line => {
                            return (
                                <LineBlock key={line.id}>
                                {
                                    line.tag === 'ol' ?
                                        <ol start={line.flag + 1}>
                                            <DynamicTagReadOnly
                                                as={'li'}
                                            >
                                                {line.html}
                                            </DynamicTagReadOnly>
                                        </ol>
                                    :
                                    line.tag === 'ul' ?
                                        <ul>
                                            <DynamicTagReadOnly 
                                                as={'li'}
                                            >
                                                {line.html}
                                            </DynamicTagReadOnly>
                                        </ul>
                                    :
                                    // line.tag === 'img' ?
                                    //     <ImageBlockReadOnly
                                    //         id={line.id}
                                    //     ></ImageBlockReadOnly>
                                    // :
                                        <DynamicTagReadOnly 
                                            as={line.tag}
                                        >
                                            {line.html}
                                        </DynamicTagReadOnly>
                                }
                                </LineBlock>
                            )
                        })
                    }

                </Content>
            </Container>
        </FluidLayout>

    )
};

export default Post;

const HeaderImage = styled.div`
position: relative;
width: 100%;
background-color: black;
padding: 3rem 0rem;
`;
const Tags = styled.p`
    font-size: 1rem;
    font-weight: 700;
    color: ${({theme})=>theme.colors.primary};
`;
const Title = styled.h1`
    font-size: 2rem;
    font-weight: bold;
`;
const Content = styled.div`
    padding: 1rem;
`;
const LineBlock = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
`;
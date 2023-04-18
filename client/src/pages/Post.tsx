import React from "react";
import { FluidLayout } from "../components/layout/Layout";
import { Container } from "../components/common/Grid";
import styled from "styled-components";
import { ImagesObjectType, LINE_TYPE } from "../components/editor/type";
import { DynamicTagReadOnly } from "../components/editor/LineBlock/DynamicTag";
import { useParams } from "react-router-dom";
import { getPost } from "../api/upload";
import { PostHeaderImage } from "../components/Image/PostHeaderImage";
import ImageBlock from "../components/editor/LineBlock/ImageLineBlock/ImageBlock";
import { useDispatch } from "react-redux";
import { resetImages } from "../modules/images";
import ImageBlockReadonly from "../components/editor/LineBlock/ImageLineBlock/ImageBlockReadonly";
// import { ImagesObjectType } from "../modules/images";

const Post = () => {
  const { post_id } = useParams();

  const [tagList, setTagList] = React.useState<string>("#태그, #태그1, #태그2");
  const [title, setTitle] = React.useState<string>("Lorem Ipsum");
  const [thumbnail, setThumbnail] = React.useState<string>("");
  const [content, setContent] = React.useState<LINE_TYPE[]>([
    {
      id: "111",
      html: "<h1>어쩌구</h1>",
      tag: "p",
      flag: 0,
    },
    {
      id: "222",
      html: "저쩌구",
      tag: "p",
      flag: 0,
    },
  ]);
//   const [images, setImages] = React.useState<ImagesObjectType>({});

  const dispatch = useDispatch();
  // const images = useSelector((state: RootState) => state.images);

  const initPost = async () => {
    if (!post_id) return;
    // 이미지 업로드
    try {
      const res = await getPost(post_id);

      if (res.success) {
        console.log(res);
        setTagList(res.post.hashtags);
        setContent(res.post.content.content);
        setTitle(res.post.title);
        setThumbnail(res.post.thumbnail);
        dispatch(resetImages(res.post.content.images));
      }
    } catch (err) {
      console.error(err);
    }
  };
  React.useEffect(() => {
    initPost();
  }, [post_id]);

  return (
    <FluidLayout>
      <PostHeaderImage thumbnail={thumbnail}/>
      <Container>
        <Tags>{tagList}</Tags>
        <Title>{title}</Title>
        <Content>
          {content.map((line) => {
            return (
              <LineBlock key={line.id}>
                {line.tag === "ol" ? (
                  <ol start={line.flag + 1}>
                    <DynamicTagReadOnly as={"li"}>
                      {line.html}
                    </DynamicTagReadOnly>
                  </ol>
                ) : line.tag === "ul" ? (
                  <ul>
                    <DynamicTagReadOnly as={"li"}>
                      {line.html}
                    </DynamicTagReadOnly>
                  </ul>
                ) : (
                  line.tag === 'img' ?
                      <ImageBlockReadonly
                          id={line.id}
                      ></ImageBlockReadonly>
                  :
                  <DynamicTagReadOnly as={line.tag}>
                    {line.html}
                  </DynamicTagReadOnly>
                )}
              </LineBlock>
            );
          })}
        </Content>
      </Container>
    </FluidLayout>
  );
};

export default Post;

const Tags = styled.p`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
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

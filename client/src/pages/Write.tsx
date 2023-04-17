import React from "react";

import styled, { CSSProperties } from "styled-components";

import { FluidLayout } from "../components/layout/Layout";
import { Container } from "../components/common/Grid";
import { Button, PrimaryButton } from "../components/common/Button";
import Editor from "../components/editor/Editor";
import { TagInput, TitleInput } from "../components/common/Input";
import { RootState } from "../modules";
import { useSelector } from "react-redux";
import { upload } from "../api/upload";

const Write = () => {
  const [title, setTitle] = React.useState<string>("");
  // const [tags, setTags] = React.useState<string[]>(['어쩌구', '저쩌구', 'ABC']);
  const [tags, setTags] = React.useState<string[]>([]); // 만약 분리식으로 저장해야 한다면 윗줄식으로로 변경
  const [thumbnail, setThumbnail] = React.useState<string>("");

  const content = useSelector((state: RootState) => state.editor);
  const images = useSelector((state: RootState) => state.images);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 글 업로드
    try {
      const res = await upload({
        title: title,
        thumbnail: thumbnail,
        hashtags: tags,
        content: {
          content: content,
          images: images,
        },
      });

      console.log(res);

      if (res.success) {
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FluidLayout>
      <ImageUpload>
        <p>썸네일을 추가해주세요.</p>
        <PrimaryButton>업로드</PrimaryButton>
      </ImageUpload>
      <Container>
        <form onSubmit={submitHandler}>
          {/* <p>
                    {
                        tags.map(tag => {
                            return <strong className='primary' key={tag}>#{tag} </strong>
                        })
                    }
                </p> */}
          <TagInput
            className="outline-none"
            spellCheck="false"
            type="text"
            placeholder="#태그입력"
            onChange={(e) => {
              setTags((prev) => [...prev, e.target.value]);
            }}
          />
          <TitleInput
            className="outline-none"
            spellCheck="false"
            type="text"
            placeholder="제목을 입력해주세요."
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          {/* <hr/> */}
          <Editor></Editor>
          <PrimaryButton type="submit">작성</PrimaryButton>
        </form>
      </Container>
    </FluidLayout>
  );
};

export default Write;

const ImageUpload = styled.div`
  height: 30rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: repeating-linear-gradient(
      -21deg,
      #bdbdbd,
      #bdbdbd 30px,
      transparent 30px,
      transparent 60px,
      #bdbdbd 60px
    ),
    repeating-linear-gradient(
      69deg,
      #bdbdbd,
      #bdbdbd 30px,
      transparent 30px,
      transparent 60px,
      #bdbdbd 60px
    ),
    repeating-linear-gradient(
      159deg,
      #bdbdbd,
      #bdbdbd 30px,
      transparent 30px,
      transparent 60px,
      #bdbdbd 60px
    ),
    repeating-linear-gradient(
      249deg,
      #bdbdbd,
      #bdbdbd 30px,
      transparent 30px,
      transparent 60px,
      #bdbdbd 60px
    );
  background-size: 3px 100%, 100% 3px, 3px 100%, 100% 3px;
  background-position: 0 0, 0 0, 100% 0, 0 100%;
  background-repeat: no-repeat;
`;

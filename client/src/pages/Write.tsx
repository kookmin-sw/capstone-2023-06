import React from "react";

import styled, { CSSProperties } from "styled-components";

import { FluidLayout } from "../components/layout/Layout";
import { Container } from "../components/common/Grid";
import { Button, PrimaryButton } from "../components/common/Button";
import Editor from "../components/editor/Editor";
import { TagInput, TitleInput } from "../components/common/Input";
import { RootState } from "../modules";
import { useSelector } from "react-redux";
import { upload, uploadImage } from "../api/upload";
import { PostHeaderImage } from "../components/Image/PostHeaderImage";
import { useNavigate } from "react-router-dom";

const Write = () => {
  const navigate = useNavigate();
  const thumbnailInputRef = React.useRef<any>(null);
  const [title, setTitle] = React.useState<string>("");
  // const [tags, setTags] = React.useState<string[]>(['어쩌구', '저쩌구', 'ABC']);
  // const [tags, setTags] = React.useState<string[]>([]); // 만약 분리식으로 저장해야 한다면 윗줄식으로로 변경
  const [tags, setTags] = React.useState<string>(""); //

  const [thumbnail, setThumbnail] = React.useState<string>("");

  const content = useSelector((state: RootState) => state.editor);
  const images = useSelector((state: RootState) => state.images);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.replace(/^\s+|\s+$/g, "") === "") {
      alert("제목을 입력해주세요.");
      return;
    }

    if (thumbnail.replace(/^\s+|\s+$/g, "") === "") {
      alert("썸네일 이미지를 추가해주세요.");
      return;
    }

    if (content.length < 5) {
      alert("내용이 너무 적습니다.");
      return;
    }

    // 글 업로드
    try {
      const res = await upload({
        title: title,
        thumbnail: thumbnail,
        hashtags: tags.replace(/#/g, "").split(" "),
        content: {
          content: content,
          images: images,
        },
      });

      if (res.success) {
        navigate(`/post/${res.result}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddImages = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const imageLists = event.target.files;

    if (imageLists == null || imageLists.length !== 1) {
      // 이미지 입력 안했음. 잘못된 행동

      return;
    }

    // setThumbnail(URL.createObjectURL(imageLists[0]));

    // 이미지 업로드
    try {
      const formData = new FormData();
      formData.append("image", imageLists[0]);

      const res = await uploadImage(formData);

      if (res.success) {
        setThumbnail(res.result.url);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const inputTagHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value);
    // setTags((prev) => [...prev, e.target.value]);
  };

  return (
    <FluidLayout>
      <PostHeaderImage thumbnail={thumbnail}>
        {!thumbnail && (
          <p style={{ marginBottom: "1rem" }}>썸네일을 추가해주세요.</p>
        )}
        <PrimaryButton
          type="button"
          onClick={(e: any) => {
            e.preventDefault();
            e.stopPropagation();
            thumbnailInputRef.current.click();
          }}
        >
          업로드
        </PrimaryButton>
        <input
          ref={thumbnailInputRef}
          type="file"
          name="thumbnail_file"
          onChange={handleAddImages}
          style={{ display: "none" }}
        />
      </PostHeaderImage>
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
            onChange={inputTagHandler}
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
          <EndLine>
            <PrimaryButton type="submit">작성</PrimaryButton>
          </EndLine>
        </form>
      </Container>
    </FluidLayout>
  );
};

export default Write;

const EndLine = styled.div`
  display: flex;
  justify-content: center;
`;

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
        // dispatch(srcImage(id, res.result.url));
      setThumbnail(res.result.url);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // const bgStyle: CSSProperties = {
  //   backgroundImage: `url(${thumbnail})`,
  //   backgroundSize: "cover",
  //   backgroundRepeat: "no-repeat",
  //   backgroundPosition: "center center",
  // };

  return (
    <FluidLayout>
      <PostHeaderImage thumbnail={thumbnail}>
        {thumbnail}
        <p>썸네일을 추가해주세요.</p>
        <PrimaryButton>업로드</PrimaryButton>
        <input type="file" name="thumbnail_file" onChange={handleAddImages} />
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

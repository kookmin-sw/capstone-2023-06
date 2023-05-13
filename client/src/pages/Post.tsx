import React from "react";
import { FluidLayout } from "../components/layout/Layout";
import { Container } from "../components/common/Grid";
import styled from "styled-components";
import { ImagesObjectType, LINE_TYPE } from "../components/editor/type";
import { DynamicTagReadOnly } from "../components/editor/LineBlock/DynamicTag";
import { useNavigate, useParams } from "react-router-dom";
import { getComments, getPost, getPostLike, postLike } from "../api/upload";
import { PostHeaderImage } from "../components/Image/PostHeaderImage";
import ImageBlock from "../components/editor/LineBlock/ImageLineBlock/ImageBlock";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { resetImages } from "../modules/images";
import ImageBlockReadonly from "../components/editor/LineBlock/ImageLineBlock/ImageBlockReadonly";
import { Line, LineStyle } from "../components/editor/common/LineStyle";
import { dateFormat } from "../utils/format";
import ProfileBar from "../components/profile/ProfileBar";
import { CommentData } from "../type/product";
import CommentList from "../components/Comment/CommentList";
import { UserData } from "../type/user";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { RootState } from "../modules";
// import { Line } from "../components/editor/LineBlock/EditLineBlock";
// import { ImagesObjectType } from "../modules/images";

type PostData = {
  title: string;
  thumbnail: string;
  content: LINE_TYPE[];
  hashtags: string[];
  created_at: string;
};

const Post = () => {
  const dispatch = useDispatch();
  const { post_id } = useParams();
  const navigate = useNavigate();
  const { id, nickname, isLoggedIn } = useSelector((state: RootState) => ({
    id: state.users.id,
    nickname: state.users.nickname,
    isLoggedIn: state.users.isLoggedIn,
  }));

  const [post, setPost] = React.useState<PostData>();
  const [author, setAuthor] = React.useState<UserData>();

  const [comments, setComments] = React.useState<CommentData[]>([]);
  const [cntFollow, setCntFollow] = React.useState<number>(0);
  const [isFollowing, setIsFollowing] = React.useState<boolean>();

  React.useEffect(() => {
    initPost();
    initComments();
  }, [post_id]);
  React.useEffect(() => {
    initFollowing();
  }, [post_id, id]);

  const initPost = async () => {
    if (!post_id) return;
    // 이미지 업로드
    try {
      const res = await getPost(post_id);
      console.log(res);

      if (res.success) {
        setPost({ ...res.post, content: res.post.content.content });
        setAuthor({
          id: res.post.author_id,
          nickname: res.post.authorNickname,
          image: res.post.authorImage,
          email: res.post.authorEmail,
        });
        dispatch(resetImages(res.post.content.images));
      }
    } catch (err) {
      console.error(err);
      navigate("/404");
    }
  };

  const initComments = async () => {
    if (!post_id) return;
    try {
      const res = await getComments(post_id);

      console.log(res);
      if (res.success) {
        setComments(
          res.result.map(
            (co: {
              comment: any;
              user_id: any;
              userNickname: any;
              userPicture: any;
              userEmail: any;
            }) => {
              return {
                comment: co.comment,
                user: {
                  id: co.user_id,
                  nickname: co.userNickname,
                  image: co.userPicture,
                  email: co.userEmail,
                },
              };
            }
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const initFollowing = async () => {
    if (!post_id) return;
    try {
      const res = await getPostLike(post_id);

      if (res.success) {
        setCntFollow(res.result.length);

        if (
          res.result.find((e: { user_id: string | number }) => e.user_id === id)
        ) {
          setIsFollowing(true);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const followHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!post_id) return;
    try {
      const res = await postLike(post_id);

      if (res.success) {
        setIsFollowing(res.result);
        if (res.result) {
          setCntFollow(prev => prev + 1);
        } else {
          setCntFollow(prev => prev - 1);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FluidLayout>
      {post && (
        <>
          <PostHeaderImage thumbnail={post.thumbnail} />
          <Container>
            <PostHead>
              <Tags>{post.hashtags.map((t) => "#" + t)}</Tags>
              <Title>{post.title}</Title>
              <PostDate>{dateFormat(new Date(post.created_at))}</PostDate>
              <ProfileBar
                profileID={author?.id}
                nickname={author?.nickname}
                activeFollow
                subContent={`${3} 팔로워`}
                marginright="1rem"
                img={author?.image}
              ></ProfileBar>
              <HR />
            </PostHead>
            <Content>
              <SideWrapper>
                <SideMenu>
                  <SideMenuButton onClick={followHandler}>
                    {isFollowing ? (
                      <IconHeartFilled width={32} height={32} strokeWidth={1} />
                    ) : (
                      <IconHeart width={32} height={32} strokeWidth={1} />
                    )}
                  </SideMenuButton>
                  <span>{cntFollow}</span>
                </SideMenu>
              </SideWrapper>
              {post.content.map((line) => {
                return (
                  <Line key={line.id}>
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
                    ) : line.tag === "img" ? (
                      <ImageBlockReadonly id={line.id}></ImageBlockReadonly>
                    ) : (
                      <DynamicTagReadOnly as={line.tag}>
                        {line.html}
                      </DynamicTagReadOnly>
                    )}
                  </Line>
                );
              })}
            </Content>
            <CommentList comments={comments} />
          </Container>
        </>
      )}
    </FluidLayout>
  );
};

export default Post;

const PostHead = styled.div`
  margin: 2rem 0rem;
  ${LineStyle}
`;
const Tags = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.primary};
`;
const Title = styled.h1`
  margin: 0.5rem 0rem;
  font-size: 2rem;
  font-weight: bold;
`;
const PostDate = styled.p`
  margin: 0.5rem 0rem;
`;
const Content = styled.div`
  font-size: 1.25rem;
  padding-bottom: 10rem;
  // padding: 1rem;
`;

const HR = styled.hr`
  background: ${({ theme }) => theme.colors.lightGrey};
  height: 1px;
  border: 0;
`;

const SideWrapper = styled.div`
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  z-index: 200;
  ${({ theme }) => theme.devices.desktop} {
    left: auto;
    top: 600px;
  }
`;
const SideMenu = styled.div`
  display: inline-flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  font-size: 1rem;
  gap: 0.675rem;
  color: #606060;
  span {
    display: none;
    ${({ theme }) => theme.devices.desktop} {
      display: block;
    }
  }
`;
const SideMenuButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  background-color: white;
  padding: 1rem;
  border-radius: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #606060;
`;

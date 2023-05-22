import React, { useState, useEffect } from "react";
import Review, { ReviewType } from "../components/Review";
import { getPostListInfinity } from "../api/upload";
import { MainLayout } from "../components/layout/Layout";
import InfiniteScroll from "react-infinite-scroll-component";
import { throttle } from "lodash";
import { useSearchParams } from "react-router-dom";
import Search from "../components/Search";

type PostType = {
    id: string;
    thumbnail: string;
    title: string;
    authorNickname: string;
    author_id: string;
    authorEmail: string;
    authorPicture: string;
    createdAt: string;
    hashtags: string;
};

type StylingProps = {
    type?: "user" | "date" | "like";
};

const Styling: React.FC<StylingProps> = () => {
    const [search] = useSearchParams();
    const [type, setType] = React.useState<string>("");
    const [postList, setPostList] = useState<ReviewType[]>([]);
    const [offset, setOffset] = useState(0);
    const [isDataEnd, setIsDataEnd] = useState<boolean>(false);
    const limit = 20;

    useEffect(() => {
        setPostList([]);
        console.log(search.get("type"), "@@@@@@@");
        setType(search.get("type") || "date");
        //loadHandler();
    }, [search]);

    useEffect(() => {
        loadHandler();
    }, [type]);

    const loadHandler = throttle(() => {
        if (isDataEnd || type === "") {
            return;
        }
        loadPosts();
    }, 2000);

    const loadPosts = async () => {
        const res = await getPostListInfinity(type, false, offset);
        if (res.success) {
            if (res.result.length < limit) {
                setIsDataEnd(true);
            }
            console.log(res);
            setPostList(prevPosts => [
                ...prevPosts,
                ...res.result.map((post: PostType) => ({
                    id: post.id,
                    thumbnail: post.thumbnail,
                    title: post.title,
                    author: {
                        nickname: post.authorNickname,
                        id: post.author_id,
                        email: post.authorEmail,
                        image: post.authorPicture,
                    },
                    date: post.createdAt,
                    tags: post.hashtags,
                })),
            ]);
            setOffset(prevOffset => prevOffset + limit);
        }
    };

    const searchStyling = (data: string) => {

    }

    return (
        <MainLayout>
            {/* <Search msgType="스타일링" searchEvent={searchStyling} placeholder="게이밍"/> */}
            <br/>
            <br/>
            <br/>
            <br/>
            <InfiniteScroll
                dataLength={postList.length}
                next={loadHandler}
                hasMore={!isDataEnd}
                loader={<h4>Loading...</h4>}
                scrollThreshold={0.9}
                style={{ overflow: "hidden" }}
                endMessage={
                    <p style={{ textAlign: 'center', opacity: '0.2' }}>
                        <b>모든 스타일링을 보셨습니다.</b>
                    </p>
                }
            >
                <div className="row">
                    {postList.map((post, idx) => (
                        <div className="col-md-3" key={`p-${idx}`}>
                            <Review {...post} />
                        </div>
                    ))}
                </div>
            </InfiniteScroll>
        </MainLayout>
    );
};

export default Styling;

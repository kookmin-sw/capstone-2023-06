import React, { useState, useEffect } from "react";
import Review, { ReviewType } from "../components/Review";
import { getPostListInfinity } from "../api/upload";
import { FluidLayout, MainLayout } from "../components/layout/Layout";
import InfiniteScroll from "react-infinite-scroll-component";
import { Container } from "../components/common/Grid";
import App from "../App";
import { debounce, throttle } from "lodash";
import { useParams, useSearchParams } from "react-router-dom";

type PostType = {
    id: string;
    thumbnail: string;
    title: string;
    authorNickname: string;
    author_id: string;
    authorEmail: string;
    authorImagep: string;
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
            console.log("asdf");
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
                        img: post.authorImagep,
                    },
                    date: post.createdAt,
                    tags: post.hashtags,
                })),
            ]);
            setOffset(prevOffset => prevOffset + limit);
        }
    };

    return (
        <MainLayout>
            <InfiniteScroll
                dataLength={postList.length}
                next={loadHandler}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                scrollThreshold={0.9}
                style={{ overflow: "hidden" }}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>모든 제품을 보셨습니다.</b>
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

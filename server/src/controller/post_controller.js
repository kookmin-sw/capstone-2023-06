const Posts = require("../model/post_model.js");
const Picture = require("../model/picture_model.js");
const PostHashtag = require("../model/post_hashtag_model.js");
const {GetConnection, ReleaseConnection} = require("../../database/connect.js");

const sendError = (res, msg, status) => {
    res.status(status).send({
        success: false,
        message: msg,
    })  
}

const sendResult = (res, msg, result) => {
    res.status(200).send({
        success: true,
        message: msg,
        result: result
    });
}

const addHashtags = async (conn, posts) => {
    let renewPosts = [];
    for(post of posts) {
        const hashtagData = await PostHashtag.findByPostId(conn, post.id);
        const hashtags = hashtagData.map((hashtag) => hashtag.title);
        renewPosts.push({
            ...post,
            content: JSON.parse(post.content).content,
            hashtags: hashtags
        });
    }

    return renewPosts;
}

exports.list = async (req,res) => {
    console.info(req.originalUrl, 'type: list');
    let type;
    let reverse;
    if(!req.query.type) {
        type = "date";
    } else if(req.query.type === "date" || req.query.type === "user" || req.query.type === "like") {
        type = req.query.type;
    } else {
        res.status(400).send({
            success: false,
            message: "parameter 설정 error"
        });
        return;
    }

    if(!req.query.reverse) {
        reverse = false
    } else if(req.query.reverse === "true") {
        reverse = true;
    } else if(req.query.reverse === "false") {
        reverse = false;
    } else {
        res.status(400).send({
            success: false,
            message: "parameter 설정 error"
        });
        return;
    }

    if(type === 'date' && (!req.body.startTime || !req.body.endTime)) {
        res.status(400).send({
            success: false,
            message: "req body 설정 error"
        });
        return;
    }

    if(typeof req.body.offset != 'number' || typeof req.body.limit != 'number'){
        res.status(400).send({
            success: false,
            message: "req body 설정 error"
        });
        return;
    }

    // const condition = {
    //     ...req.body,
    //     type: type,
    //     reverse: reverse,
    // }
    const conn = await GetConnection();
    try {
        // const posts = await Posts.list(condition);
        // res.status(200).send({
        //     success:true,
        //     message: "리스트 가져오기 성공",
        //     result: posts
        // });
        let posts;
        let renewPosts;
        switch(type) {
            case 'date':
                posts = await Posts.getListByDate(
                    conn, req.body.startTime, req.body.endTime, reverse,
                    req.body.limit, req.body.offset, req.body.keyword
                );

                renewPosts = await addHashtags(conn, posts);
                sendResult(res,"리스트 가져오기 성공", renewPosts);
                return;
            case 'user':
                if(req.user.id) {
                    posts = await Posts.getListByUser(
                        conn, req.body.limit, req.body.offset, req.user.id
                    );
    
                    renewPosts = await addHashtags(conn, posts);
                    sendResult(res,"리스트 가져오기 성공", renewPosts);
                } else {
                    posts = await Posts.getListByLike(
                        conn, req.body.startTime, req.body.endTime, reverse,
                        req.body.limit, req.body.offset, req.body.keyword
                    );
    
                    renewPosts = await addHashtags(conn, posts);
                    sendResult(res,"리스트 가져오기 성공", renewPosts);
                }
                return;
            case 'like':
                posts = await Posts.getListByLike(
                    conn, req.body.startTime, req.body.endTime, reverse,
                    req.body.limit, req.body.offset, req.body.keyword
                );

                renewPosts = await addHashtags(conn, posts);
                sendResult(res,"리스트 가져오기 성공", renewPosts);
                return;
            default:
                return;
        }
    } catch (err) {
        sendError(res, err.message, 400);
        return;
    } finally {
        ReleaseConnection(conn);
    }
}

// async await 완료
exports.create = async (req,res) => {
    console.info(req.originalUrl, 'type: create');
    const {title, thumbnail, hashtags, content} = req.body;
    try {
        const postId = await Posts.create(req.user.id, title, thumbnail, hashtags, JSON.stringify({"content": content}));
        res.status(201).send({
            success: true,
            message: "Post Create",
            result: postId
        });
        return;
    } catch (err) {
        sendError(res, err.message, 400);
        return;
    }
}

// async await 완료
exports.uploadImage = async (req,res) => {
    console.info(req.originalUrl, 'type: image');
    try {
        if(!req.file) {
            res.status(400).send({
                success: false,
                message: "사진 업로드 실패",
            });
            return;
        }

        const pictureId = await Picture.create(req.file.location, "STYLING");
        res.status(200).send({
            success: true,
            message: "사진 업로드 성공",
            result: {
                id: pictureId,
                url: req.file.location
            }
        });
    } catch(err) {
        sendError(res, err.message, 400);
        return;
    }
}

// async await 완료
exports.findById = async (req, res) => {
    console.info(req.originalUrl);
    try {
        const post = await Posts.findById(req.params.id);
        if(!post) { //null 리턴
            res.status(200).send({
                success:true,
                message: "포스트 조회 완료",
                result: post
            });
            return;
        }
        const searchPost = {
            ...post,
            content: JSON.parse(post.content).content 
        };
        res.status(200).send({
            success:true,
            message: "포스트 조회 완료",
            result: searchPost
        });
        return;
    } catch (err) {
        sendError(res,err.message,400);
        return;
    }
}

// 세션 유저의 게시글 가져오기
exports.myPost = async (req,res) => {
    try {
        const posts = await Posts.findByAuthorId(req.user.id);
        res.status(200).send({
            success: true,
            message: "유저의 포스트 조회 성공",
            result: posts
        });
        return;
    } catch (err) {
        sendError(res,err.message,500);
        return;
    }
}

// 유저가 쓴 게시글 가져오기 유저 라우트에 위치
exports.findByAuthorId = async (req,res) => {
    const conn = await GetConnection();
    try {
        let posts = await Posts.findByAuthorId(req.params.id);
        let renewPosts = [];
        for(post of posts) {
            const hashtagData = await PostHashtag.findByPostId(conn, post.id);
            const hashtags = hashtagData.map((hashtag) => hashtag.title);
            renewPosts.push({
                ...post,
                hashtags: hashtags
            });
        }
        
        res.status(200).send({
            success: true,
            message: "유저의 포스트 조회 성공",
            result: renewPosts
        });
        return;
    } catch (err) {
        console.error(err);
        sendError(res,err.message,500);
        return;
    } finally {
        ReleaseConnection(conn);
    }
}

// async await으로 처리 완료
exports.deleteById = async (req, res) => {
    try {
        const affectRows = await Posts.deleteById(req.params.id, req.user.id);
        if(affectRows < 1) { // 영향받은 row의 수
            sendError(res,"제대로 삭제되지 않았음",400);
        return;
        }
        res.status(200).send({
            success: true,
            message: "delete 성공",
        })
        return;
    } catch (err) {
        sendError(res,err.message,400);
        return;
    }
}
const Posts = require("../model/post_model.js");
const Picture = require("../model/picture_model.js");


const sendError = (res, msg, status) => {
    res.status(status).send({
        success: false,
        message: msg,
    })  
}

exports.search = (req,res) => {
    
}

// async await 완료
exports.create = async (req,res) => {
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
    try {
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
    try {
        const post = await Posts.findById(req.params.id);
        if(!post) { //null 리턴
            res.status(200).send({
                success:true,
                message: "포스트 조회 완료",
                post: post
            });
        }
        const searchPost = {
            ...post,
            content: JSON.parse(post.content).content 
        };
        res.status(200).send({
            success:true,
            message: "포스트 조회 완료",
            post: searchPost
        });
    } catch (err) {
        sendError(res,err.message,400);
        return;
    }
}

// async await으로 처리 완료
exports.deleteById = async (req, res) => {
    try {
        const affetRows = await Posts.deleteById(req.params.id, req.user.id);
        if(affetRows < 1) { // 영향받은 row의 수
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
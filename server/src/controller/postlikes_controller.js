const PostLikes = require("../model/postlikes_model.js");
const Posts = require("../model/post_model.js");

const sendError = (res, msg, status) => {
    res.status(status).send({
        success: false,
        message: msg,
    })  
}

exports.toggle = async (req,res) => {
    try {
        // post가 존재하는지
        const post = await Posts.findById(req.params.id);
        if(!post) {
            sendError(res, "포스트가 존재하지 않습니다", 400);
            return;
        }

        const searchLikes = await PostLikes.findByUserIdAndPostId(req.user.id, req.params.id);
        // like가 존재하지 않을 경우, create 하고 true 반환
        if(!searchLikes) {
            await PostLikes.create(req.user.id, req.params.id);
            res.status(200).send({
                success: true,
                message: "포스트 좋아요",
                result: true,
            });
            return;
        }
        
        const affectRows = await PostLikes.deleteById(searchLikes.id);
        if(affectRows < 1) {
            sendError(res,"International Error", 500);
            return;
        }
        res.status(200).send({
            success: true,
            message: "포스트 좋아요",
            result: false,
        });
        return;

    } catch (err) {
        sendError(res,err.message, 500);
        return;
    }
}

exports.getPostLikes = async (req, res) => {
    try {
        // post가 존재하는지
        const post = await Posts.findById(req.params.id);
        if(!post) {
            sendError(res, "포스트가 존재하지 않습니다", 400);
            return;
        }
        
        const postLikes = await PostLikes.findByPostId(req.params.id);
        res.status(200).send({
            success: true,
            message: "좋아요 조회 완료",
            result: postLikes,
        });
        return;
    } catch (err) {
        sendError(res,err.message, 500);
        return;
    }
}
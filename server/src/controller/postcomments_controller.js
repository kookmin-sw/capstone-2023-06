const PostComments = require("../model/postcomments_model.js");
const Posts = require("../model/post_model.js");
const moment = require("moment");

const sendError = (res, msg, status) => {
    res.status(status).send({
        success: false,
        message: msg,
    })  
}

const sendResult = (res, msg, data) => {
    res.status(200).send({
        success: true,
        message: msg,
        result: data
    })
}

exports.create = async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if(!post) {
            sendError(res, "포스트가 존재하지 않습니다", 400);
            return;
        }

        const {comment, parent} = req.body;
        if(!parent) {
            const commentId = await PostComments.create(req.user.id, req.params.id, comment);
            sendResult(res, "스타일링 댓글 성공", commentId);
            return;
        }
        const commentId = await PostComments.create(req.user.id, req.params.id, comment, parent);
        sendResult(res, "스타일링 댓글 성공", commentId);
    } catch(err) {
        sendError(res, err.message, 400);
        return;
    }
}

exports.findById = async (req, res) => {
    try {
        const comment = await PostComments.findById(req.params.commentId);
        if(comment.post_id !== parseInt(req.params.postId)) {
            throw new Error("포스트가 존재하지 않음");
        }
        
        sendResult(res, "댓글 가져오기 성공", comment);
        return;
    } catch(err) {
        sendError(res, err.message, 400);
        return;
    }
}

exports.getComments = async (req, res) => {
    try {
        // post가 존재하는지
        const post = await Posts.findById(req.params.id);
        if(!post) {
            throw new Error("포스트가 존재하지 않습니다.");
        }
        const comments = await PostComments.findByPostId(req.params.id);
        sendResult(res,"댓글 리스트 가져오기 성공", comments);
        return;
    } catch(err) {
        sendError(res, err.message, 400);
        return;
    }
}

exports.update = async (req, res) => {
    try {
        const post = await Posts.findById(req.params.postId);
        if(!post) {
            throw new Error("포스트가 존재하지 않습니다.");
        }

        const comment = await PostComments.findById(req.params.commentId);
        if(comment.user_id !== req.user.id) {
            sendError(res,"권한이 없습니다.", 403);
            return;
        }
        
        const now = moment();
        const dateTime = now.format('YYYY-MM-DD HH:mm:ss');
        const affectedRows = await PostComments.update(req.body.comment, dateTime, req.params.commentId);
        if(affectedRows !== 1) {
            sendError(res, "International Error", 500);
            return;
        }

        sendResult(res,"업데이트 성공", true);
        return;
    } catch (err) {
        sendError(res, err.message, 400);
        return;
    }
}

exports.deleteById = async (req, res) => {
    try {
        const comment = await PostComments.findById(req.params.commentId);
        if(comment.user_id !== req.user.id) {
            sendError(res, "유저 권한이 존재하지 않음", 403);
        }
        if(comment.post_id !== parseInt(req.params.postId)) {
            throw new Error("포스트가 존재하지 않음");
        }

        const affectedRows = await PostComments.deleteById(req.params.commentId);
        if(affectedRows < 1) {
            sendError(res, "International Error", 500);
            return;
        }

        sendResult(res,"삭제 성공", true);
        return;
    } catch (err) {
        sendError(res, err.message, 400);
        return;
    }
}
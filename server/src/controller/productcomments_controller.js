const Products = require("../model/product_model.js");
const {GetConnection, ReleaseConnection} = require("../../database/connect.js");
const moment = require("moment");
const ProductComments = require("../model/productcomment_model.js");

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
    const conn = await GetConnection();
    try {
        const product = await Products.findByIdWithUser(conn, req.params.id);
        if(!product) {
            sendError(res,"상품이 존재하지 않습니다", 400);
            return;
        }

        const {comment, parent} = req.body;
        if(!parent) {
            const insertId = await ProductComments.create(conn, req.user.id, req.params.id, comment);
            sendResult(res,"댓글 생성 성공", insertId);
            return;
        }

        const insertId = await ProductComments.createWithParent(conn, req.user.id, req.params.id, comment,parent);
        sendResult(res,"댓글 생성 성공", insertId);
        return;
    } catch(err) {
        console.error(err);
        sendError(res, err.message, 500);
        return;
    } finally {
        ReleaseConnection(conn);
    }
}

exports.findById = async (req, res) => {
    const conn = await GetConnection();
    try {
        const comment = await ProductComments.findById(conn, req.params.commentId);
        if(comment.product_id !== parseInt(req.params.productId)) {
            sendError(res,"포스트가 존재하지 않음", 400);
            return;
        }

        sendResult(res, "댓글 가져오기 성공", comment);
        return;
    } catch(err) {
        console.error(err);
        sendError(res, err.message, 500);
    } finally {
        ReleaseConnection(conn);
    }
}

exports.getComments = async (req, res) => {
    const conn = await GetConnection();
    try {
        const product = await Products.findByIdWithUser(conn, req.params.id);
        if(!product) {
            sendError(res, "상품이 존재하지 않습니다", 400);
            return;
        }
        const comments = await ProductComments.findByProductId(conn, req.params.id);
        sendResult(res, "댓글 리스트 가져오기 성공", comments);
        return;
    } catch(err) {
        console.error(err);
        sendError(res, err.message, 500);
    } finally {
        ReleaseConnection(conn);
    }
}

exports.update = async (req, res) => {
    const conn = await GetConnection();
    try {
        const comment = await ProductComments.findById(conn, req.params.commentId);
        if(comment.product_id !== parseInt(req.params.productId)) {
            sendError(res,"포스트가 존재하지 않음", 400);
            return;
        }

        if(comment.user_id !== req.user.id) {
            sendError(res,"유저가 맞지 않음", 400);
            return;
        }

        const now = moment();
        const dateTime = now.format('YYYY-MM-DD HH:mm:ss');
        const affectedRows = await ProductComments.update(conn, req.body.comment, dateTime, req.params.commentId);
        if(affectedRows !== 1) {
            sendError(res, "잘못된 요청", 400);
            return;
        }

        sendResult(res, "업데이트 성공",true);
        return;
    } catch(err) {
        console.error(err);
        sendError(res, err.message, 500);
    } finally {
        ReleaseConnection(conn);
    }
}

exports.delete = async (req, res) => {
    const conn = await GetConnection();
    try {
        const affectedRows = await ProductComments.deleteByIdAndUserId(conn, req.params.commentId, req.user.id);
        if(affectedRows !== 1) {
            sendError(res, "잘못된 요청(CommentId 혹은 User)", 400);
            return;
        }

        sendResult(res, "삭제 성공",true);
        return;
    } catch(err) {
        console.error(err);
        sendError(res, err.message, 500);
    } finally {
        ReleaseConnection(conn);
    }
}
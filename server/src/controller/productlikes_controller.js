const ProductLikes = require("../model/productlikes_model.js");
const Products = require("../model/product_model.js");
const {GetConnection, ReleaseConnection} = require("../../database/connect.js");

const sendError = (res, msg, status) => {
    res.status(status).send({
        success: false,
        message: msg,
    });
}

const sendResult = (res, msg, result) => {
    res.status(200).send({
        success: true,
        message: msg,
        result: result
    });
}

exports.toggle = async (req, res) => {
    const conn = await GetConnection();
    try {
        // Products가 존재하는지
        const product = await Products.findByIdWithUser(conn, req.params.id);
        if(!product) {
            sendError(res, "상품이 존재하지 않습니다.", 400);
            return;
        }

        const searchLikes = await ProductLikes.findByUserIdAndProductId(conn, req.user.id, req.params.id);
        
        if(!searchLikes) {
            await ProductLikes.create(conn, req.user.id, req.params.id);
            sendResult(res, "상품 좋아요", true);
            return;
        }

        const affectedRows = await ProductLikes.deleteById(conn, searchLikes.id);
        if(affectedRows !== 1) {
            throw new Error("International Error");
        }

        sendResult(res, "상품 좋아요 해제", false);
        return;
    } catch (err) {
        console.error(err);
        sendError(res, err.message, 500);
    } finally {
        ReleaseConnection(conn);
    }
}

exports.getProductLikes = async (req, res) => {
    const conn = await GetConnection();
    try {
        // Products가 존재하는지
        const product = await Products.findByIdWithUser(conn, req.params.id);
        if(!product) {
            sendError(res, "상품이 존재하지 않습니다.", 400);
            return;
        }

        const productLikes = await ProductLikes.findByProductId(conn, req.params.id);
        sendResult(res, "좋아요 조회 완료", productLikes);
        return;
    } catch (err) {
        console.error(err);
        sendError(res, err.message, 500);
    } finally {
        ReleaseConnection(conn);
    }
}
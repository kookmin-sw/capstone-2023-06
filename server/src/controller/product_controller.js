const Products = require("../model/product_model.js");
const Picture = require("../model/picture_model.js");
const Hashtag = require("../model/hashtag_model.js");
const ProductHashtag = require("../model/product_hashtag_model.js");
const Subthumbnail = require("../model/subthumbnail_model.js");
const MysqlError = require("../utils/errors/MysqlError.js");
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

exports.create = async (req, res) => {
    console.info("Create Posts");
    const conn = await GetConnection();
    let pictureIdList = [];

    const {title, content, thumbnail, price, subthumbnails, hashtags, options} = req.body;
    try {
        await conn.beginTransaction();
        // 프로덕트 올리기
        
        const productId = await Products.create(conn, req.user.id, title, content, thumbnail, price);
        console.info("product Create");

        // 서브 섬네일 로직
        for(const imageUrl of subthumbnails) {
            const pictureId = await Picture.createWithConn(conn, imageUrl, "PRODUCT");
            pictureIdList.push(pictureId);
        }
        console.info("Picture create");

        // 서브섬네일 테이블 매핑
        pictureIdList.forEach((pictureId) => {
            Subthumbnail.create(conn, productId, pictureId);
        });
        console.info("subthumbnail create");

        // 해시태그 삽입
        if(hashtags) {
            for (const hashtagTitle of hashtags) {
                const findHashtag = await Hashtag.findById(conn, hashtagTitle);
                if(!findHashtag) { //해시태그가 없으면
                    const hashtagId = await Hashtag.create(conn, hashtagTitle);
                    ProductHashtag.create(conn, productId, hashtagId);
                } else { //해시태그가 있으면
                    ProductHashtag.create(conn, productId, findHashtag.id);
                }
            }
        }
        console.info("hashtag create");

        // 일단 공란
        // if(options) {

        // }
        

        await conn.commit();
        sendResult(res, "포스트 생성 완료", productId);
        return;
    } catch(err) {
        conn.rollback();
        if (err instanceof MysqlError) {
            sendError(res, err.message, 500);
        } else {
            sendError(res, err.message, 400);
        }
    } finally {
        ReleaseConnection(conn);
    }
}

exports.findById = async (req, res) => {
    const conn = await GetConnection();
    try {
        const product = await Products.findByIdWithUser(conn, req.params.id);
        const hashtags = await ProductHashtag.findByProductId(conn, product.id);
        const subthumbnails = await Subthumbnail.findByProductId(conn, product.id);
        //options 생략
        const options = [];
        
        const renewProduct = {
            ...product,
            content: JSON.parse(product.content),
            hashtags: hashtags.map((hashtag) => hashtag.value),
            subthumbnails: subthumbnails.map((subthumbnail) => subthumbnail.value),
            options: options.map((option)=> option.value) //option 바뀌면 여기도 바뀌어야함
        };
        

        sendResult(res, "조회 성공", renewProduct);
    } catch(err) {
        if (err instanceof MysqlError) {
            sendError(res, err.message, 500);
        } else {
            sendError(res, err.message, 400);
        }
    } finally {
        ReleaseConnection(conn);
    }
}

exports.getProducts = (req, res) => {

}

exports.uploadProductsImage = (req, res) => {
    if(!req.file) {
        sendError(res, "사진 업로드 실패", 400);
        return;
    }

    sendResult(res,"상품 사진 업로드 성공", req.file.location);
    return;
}
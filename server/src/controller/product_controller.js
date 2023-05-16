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

const getHashtags = async (conn, productId) => {
    const hashtags = await ProductHashtag.findByProductId(conn, productId);
    return hashtags.map((hashtag) => hashtag.value);
}

const getSubthumbnails = async (conn, productId) => {
    const subthumbnails = await Subthumbnail.findByProductId(conn, productId);
    return subthumbnails.map((subthumbnail) => subthumbnail.value);
}

const addInfoAndParseContent = async (conn, product) => {
    const hashtags = await getHashtags(conn, product.id);
    const subthumbnails = await getSubthumbnails(conn, product.id);

    const renewProduct = {
        ...product,
        content: JSON.parse(product.content),
        hashtags: hashtags,
        subthumbnails: subthumbnails
    };

    return renewProduct;
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
        
        const renewProduct = {
            ...product,
            content: JSON.parse(product.content),
            hashtags: hashtags.map((hashtag) => hashtag.value),
            subthumbnails: subthumbnails.map((subthumbnail) => subthumbnail.value),
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


const sendDateTypeProducts = async (res, req, reverse, conn) => {
    const {startTime, endTime, offset, limit, keyword} = req.body;

    const products = await Products.getProductsByDate(
        conn, startTime, endTime, reverse, limit, offset, keyword?`%${keyword}%`:null
    );
    
    let renewProducts = [];
    for(product of products) {
        const renewProduct = await addInfoAndParseContent(conn, product);
        renewProducts.push(renewProduct);
    }
    sendResult(res,"Date로 조회 성공", renewProducts);
}

exports.getProducts = async (req, res) => {
    let type;
    let reverse;
    if(!req.query.type) {
        type = "date";
    } else if(req.query.type === "date" || req.query.type === "user" || req.query.type === "like") {
        type = req.query.type;
    } else {
        sendError(res,"parameter 설정 error",400);
        return;
    }

    if(!req.query.reverse) {
        reverse = false;
    } else if(req.query.reverse === "true") {
        reverse = true;
    } else if(req.query.reverse === "false") {
        reverse = false;
    } else {
        sendError(res,"parameter 설정 error",400);
        return;
    }

    if(type === 'date' && (!req.body.startTime || !req.body.endTime)) {
        sendError(res,"req body 설정 error",400);
        return;
    }

    if(typeof req.body.offset != 'number' || typeof req.body.limit != 'number'){
        sendError(res,"req body 설정 error",400);
        return;
    }

    const conn = await GetConnection();

    try {
        switch(type) {
            case "date":
                sendDateTypeProducts(res,req, reverse, conn);                
                return;
            case "user":
                sendDateTypeProducts(res,req, reverse, conn);  
                return;
            case "like":
                sendDateTypeProducts(res,req, reverse, conn);  
                return;
            default:
                sendDateTypeProducts(res,req, reverse, conn);  
                return;
        }

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

exports.search = async (req, res) => {
    const conn = await GetConnection();
    try {
        const products = await Products.search(conn, req.body.keyword);
        let renewProducts = [];

        for(product of products) {
            const renewProduct = await addInfoAndParseContent(conn, product);
            renewProducts.push(renewProduct);
        }
        sendResult(res,"상품 키워드 검색", renewProducts);
        return;
    } catch(err) {
        sendError(res, err.message, 500);
    } finally {
        ReleaseConnection(conn);
    }
}

exports.uploadProductsImage = (req, res) => {
    if(!req.file) {
        sendError(res, "사진 업로드 실패", 400);
        return;
    }

    sendResult(res,"상품 사진 업로드 성공", req.file.location);
    return;
}
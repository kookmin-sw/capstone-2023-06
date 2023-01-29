const Picture = require("../model/picture_model.js");
const Product = require("../model/product_model.js");

exports.findById = function (req, res) {
    /*
    {
        author_id: 123,
        title: title,
        content: <xml></xml>,
        create_at: 2022-01-01 00:00:00T0000,
        tags: [
            {
                x: 1,
                y: 1,
                target_product_id: 1,
                picture_cnt: 1,
            }, 
            {
                x: 1,
                y: 1,
                target_product_id: 1,
                picture_cnt: 1,
            }, 
        ],
        imgs: [
            {
                base64: abasdfs===
            },
            {
                base64: asdf===
            }
        ]
    }
    */
    Product.findById(req.params.id, (err, product) => {
        if (err) res.send(err)
        else {
            const tags = await new Promise((resolve, reject) => { Product.findTagByProductId(product.id, (err, tag) => { if (!err) resolve(tag) }) })
            const imgs = await new Promise((resolve, reject) => { Picture.findById(product.id, (err, img) => { if (!err) resolve(img) }) })
            res.status(200).json({
                ...product,
                tags,
                imgs,
            });
        }
    });
}

exports.create = async function (req, res) {
    /*
    {
        author_id: 123,
        title: title,
        content: <xml></xml>,
        create_at: 2022-01-01 00:00:00T0000,
        tags: [
            {
                x: 1,
                y: 1,
                target_product_id: 1,
                picture_cnt: 1,
            }, 
            {
                x: 1,
                y: 1,
                target_product_id: 1,
                picture_cnt: 1,
            }, 
        ],
        imgs: [
            {
                base64: abasdfs===
            },
            {
                base64: asdf===
            }
        ]
    }
    */
    const { author_id, title, content, create_at, tags, imgs } = req.body;
    const tagsJson = JSON.parse(tags)
    const imgsJson = JSON.parse(imgs)
    const imgIds = []
    for (let i = 0; i < imgsJson.length; i++) {
        const id = await new Promise((resolve, reject) => {
            Picture.create(imgsJson[i].base64, (err, img) => { if (!err) resolve(img) })
        })
        imgIds.push(id)
    }
    // inject img ids into xml
    Product.create(author_id, title, content, create_at, null, (err, user) => {
        if (err) res.send(err)
        else {
            for (let i = 0; i < tagsJson.length; i++) {
                const { x, y, target_product_id, picture_cnt } = tagsJson
                await new Promise((resolve, reject) => {
                    Product.createTag(x, y, user.insertId, target_product_id, picture_cnt, (err, tag) => { if (!err) resolve(tag) })
                })
            }
            res.status(201).json({
                "isSuccess": true,
                "result": [
                    user
                ]
            });
        }
    });
}

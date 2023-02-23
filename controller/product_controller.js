const Picture = require("../model/picture_model.js");
const Product = require("../model/product_model.js");

/*
    Product Scheme
    {
        author_id: 123,
        title: "title",
        content: "<content>
                    중앙선거관리위원회는 <span style="bold | italic" color="red">대통령</span>이 임명하는 3인, 국회에서 선출하는 3인과 대법원장이 지명하는 3인의 위원으로 구성한다. 위원장은 위원중에서 호선한다.
                    <picture id="0"/>
                    <picture id="1"/>
                    국가는 <span style="bold">주택개발정책</span>등을 통하여 모든 국민이 쾌적한 주거생활을 할 수 있도록 노력하여야 한다. 국민경제의 발전을 위한 중요정책의 수립에 관하여 대통령의 자문에 응하기 위하여 국민경제자문회의를 둘 수 있다.
                    <picture id="2"/>
                    <picture id="3"/>
                </content>",
        created_at: "2022-01-01 00:00:00",
        modified_at: "2022-01-01 00:00:00",
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
                picture_cnt: 2,
            }, 
        ],
        imgs: [
            {
                base64: "abasdfs==="
            },
            {
                base64: "asdf==="
            }
        ]
    }
*/

exports.findById = function (req, res) {
    Product.findById(req.params.id, async (err, product) => {
        console.log(product)
        if (err) res.send(err)
        else {
            const tags = await new Promise((resolve, reject) => { Product.findTagByProductId(product[0].id, (err, tag) => { if (!err) resolve(tag) }) })
            const imgs = await new Promise((resolve, reject) => { Picture.findByProductId(product[0].id, (err, img) => { if (!err) resolve(img) }) })
            res.status(200).json({
                ...(product[0]),
                tags,
                imgs,
            });
        }
    });
}

exports.create = async function (req, res) {
    const { author_id, title, content, tags } = req.body;
    const tagsJson = JSON.parse(tags)
    const imgIds = []

    Product.create(author_id, title, content, new Date().toISOString().slice(0, 19).replace('T', ' '), async (err, product) => {
        for (let i = 0; i < req.files.length; i++) {
            const id = await new Promise((resolve, reject) => {
                Picture.create(req.files[i].filename, product.insertId, (err, img) => { if (!err) resolve(img) })
            })
            imgIds.push(id.insertId)
        }

        if (err) {
            res.send(err)
        }
        else {
            for (let i = 0; i < tagsJson.length; i++) {
                const { x, y, target_product_id, picture_cnt } = tagsJson[i]
                await new Promise((resolve, reject) => {
                    Product.createTag(x, y, product.insertId, target_product_id, imgIds[picture_cnt], (err, tag) => { if (!err) resolve(tag) })
                })
            }
            res.status(201).json({
                "isSuccess": true,
                "result": [
                    product
                ]
            });
        }
    });
}

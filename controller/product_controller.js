const Product = require("../model/product_model.js");

exports.findById = function (req, res) {
    Product.findByEmail(req.params.email, (err, product) => {
        if (err) res.send(err);
        res.json(product);
    });
}

exports.create = function (req, res) {
    /*
    {
        tags: [
            {
                x: 1,
                y: 1,
                picture_cnt: 1,
                target_product_id: 1,
            }, 
            {
                x: 1,
                y: 1,
                picture_cnt: 1,
                target_product_id: 1,
            }, 
        ]
    }
    */
    const { author_id, title, content, create_at, tag } = req.body;
    const tags = JSON.parse(tag).tags
    Product.create(author_id, title, content, create_at, null, (err, user) => {
        if (err) res.send(err)
        else {
            for (let i = 0; i < tags.length; i++) {
                const { x, y, picture_cnt, target_product_id } = tags
                Product.createTag(x, y, user.id, picture_cnt, target_product_id, (err, tag) => { })
            }
            res.json({
                "isSuccess": true,
                "result": [
                    user
                ]
            });
        }
    });
}

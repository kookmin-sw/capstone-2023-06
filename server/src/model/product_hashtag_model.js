const MysqlError = require("../utils/errors/MysqlError");

const TABLE = "product_hashtag";

const ProductHashtag = (productHashtag) => {
    this.id = productHashtag.id;
    this.product_id = productHashtag.product_id;
    this.hashtag_id = productHashtag.hashtag_id;
}

ProductHashtag.create = async (conn, productId, hashtagId) => {
    try {
        const INSERT_QUERY = `
            insert into ${TABLE} (product_id, hashtag_id)
            values (?, ?);
        `

        const [res] = await conn.execute(INSERT_QUERY, [productId, hashtagId]);
        return res.insertId;
    } catch (err) {
        console.error(err.message);
        throw new MysqlError("MYSQL ERROR");
    }
}

ProductHashtag.findByProductId = async (conn, productId) => {
    const FIND_QUERY = `
        select h.title as value
        from ${TABLE} p
        left join hashtag h
        on p.hashtag_id = h.id
        where p.product_id = ?
    `;

    try {
        const [productHashtags] = await conn.execute(FIND_QUERY, [productId]);
        return productHashtags;
    } catch (err) {
        console.error(err.message);
        throw new MysqlError("MYSQL ERROR");
    }
}

module.exports = ProductHashtag;
const TABLE = "subthumbnail";
const MysqlError = require("../utils/errors/MysqlError.js");

const Subthumbnail = (subthumbnail) => {
    this.id = subthumbnail.id;
    this.product_id = subthumbnail.product_id;
    this.picture_id = subthumbnail.picture_id;
}

Subthumbnail.create = async (conn, productId, pictureId) => {
    try {
        const INSERT_QUERY = `
            insert into ${TABLE} (product_id, picture_id)
            values (?, ?);
        `;
        const [res] = await conn.execute(INSERT_QUERY, [productId, pictureId]);
        return res.insertId;
    } catch(err) {
        throw new MysqlError("MYSQL ERROR");
    }
}

Subthumbnail.findByProductId = async (conn, productId) => {
    try {
        const FIND_QUERY = `
            select p.url as value
            from ${TABLE} s
            left join picture p
            on s.picture_id = p.id
            where s.product_id = ?
        `;

        const [subthumbnails] = await conn.execute(FIND_QUERY, [productId]);
        return subthumbnails;
    } catch(err) {
        console.error(err);
        throw new MysqlError("MYSQL ERROR");
    }
}

module.exports = Subthumbnail;


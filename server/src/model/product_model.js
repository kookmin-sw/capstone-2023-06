const TABLE = "products";
const MysqlError = require("../utils/errors/MysqlError.js");

const Products = (products) => {
    this.id = products.id;
    this.author_id = products.author_id;
    this.title = products.title;
    this.content = products.content;
    this.created_at = products.created_at;
    this.modified_at = products.modified_at;
    this.thumbnail = products.thumbnail;
    this.price = products.price;
}

Products.create = async (conn, author_id, title, content, thumbnail, price) => {
    try {
        const INSERT_QUERY = `
            insert into ${TABLE} (author_id, title, content, thumbnail, price)
            values (?, ?, ?, ?, ?);
        `
        const [res] = await conn.execute(INSERT_QUERY, [author_id, title, content, thumbnail, price]);
        return res.insertId;
    } catch(err) {
        throw new MysqlError("MYSQL ERROR");
    }
};

Products.findByIdWithUser = async (conn, productId) => {
    try {
        const FIND_QUERY = `
            select p.*, u.nickname as authorNickname, u.email as authorEmail, u.picture as authorPicture
            from ${TABLE} p
            left join user u
            on p.author_id = u.id
            where p.id = ?
        `;
        const [products] = await conn.execute(FIND_QUERY, [productId]);
        return products[0];
    } catch(err) {
        console.error(err);
        throw new MysqlError("MYSQL ERROR");
    }
}

module.exports = Products;
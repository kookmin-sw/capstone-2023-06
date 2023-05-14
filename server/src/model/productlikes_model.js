const MysqlError = require("../utils/errors/MysqlError");

const TABLE = "product_likes";

const ProductLikes = (productLikes) => {
    this.id = productLikes.id;
    this.user_id = productLikes.user_id;
    this.product_id = productLikes.product_id;
}

ProductLikes.create = async (conn, userId, productId) => {
    try {
        const INSERT_QUERY = `
            insert into ${TABLE} (user_id, product_id)
            values (?, ?);
        `;
        
        const [res] = await conn.execute(INSERT_QUERY, [userId, productId]);
        return res.insertId;
    } catch(err) {
        console.error(err);
        throw new MysqlError("MYSQL ERROR");
    }
}

ProductLikes.findByUserIdAndProductId = async (conn, userId, productId) => {
    try {
        const FIND_QUERY = `
            select *
            from ${TABLE}
            where user_id = ? and product_id = ?;
        `;
        const [productLikes] = await conn.execute(FIND_QUERY, [userId, productId]);
        return productLikes[0];
    } catch(err) {
        console.error(err);
        throw new MysqlError("MYSQL ERROR");
    }
}

ProductLikes.deleteById = async (conn, id) => {
    try {
        const [res] = await conn.execute(`delete from ${TABLE} where id = ?;`, [id]);
        return res.affectedRows;
    } catch(err) {
        console.error(err);
        throw new MysqlError("MYSQL ERROR");
    }
}

ProductLikes.findByProductId = async (conn, productId) => {
    try {
        const FIND_QUERY = `
            select l.*, u.nickname as userNickname, u.picture as userPicture, u.email as userEmail 
            from ${TABLE} l
            left join user u
            on l.user_id = u.id 
            where l.product_id = ?;
        `;

        const [productLikes] = await conn.execute(FIND_QUERY, [productId]);
        return productLikes;
    } catch(err) {
        console.error(err);
        throw new MysqlError("MYSQL ERROR");
    }
}

module.exports = ProductLikes;
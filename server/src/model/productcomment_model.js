const TABLE = "product_comments";

const ProductComments = (productComments) => {
    this.id = productComments.id;
    this.user_id = productComments.user_id;
    this.product_id = productComments.product_id;
    this.parent_id = productComments.parent_id;
    this.comment = productComments.comment;
    this.created_at = productComments.created_at;
    this.modified_at = productComments.modified_at;
}

ProductComments.create = async (conn, userId, productId, comment) => {
    try {
        const INSERT_QUERY = `
            insert into ${TABLE} (user_id, product_id, comment)
            values (?, ?, ?);
        `;

        const [res] = await conn.execute(INSERT_QUERY, [userId, productId, comment]);
        return res.insertId;
    } catch (err) {
        console.error(err);
        throw new Error("MYSQL ERROR");
    }
}

ProductComments.createWithParent = async (conn, userId, productId, comment, parentId) => {
    try {
        const INSERT_QUERY = `
            insert into ${TABLE} (user_id, product_id, comment, parent_id)
            values (?, ?, ?, ?);
        `;

        const [res] = await conn.execute(INSERT_QUERY, [userId, productId, comment, parentId]);
        return res.insertId;
    } catch (err) {
        throw new Error("MYSQL ERROR");
    }
}

ProductComments.findById = async (conn, id) => {
    try {
        const FIND_QUERY = `
            select c*, u.email as userEmail, u.nickname as userNickname, u.picture as userPicture
            from ${TABLE} c
            left join user u
            on c.user_id = u.id
            where c.id = ?;    
        `;

        const [comments] = await conn.execute(FIND_QUERY, [id]);
        return comments[0];
    } catch (err) {
        throw new Error("MYSQL ERROR");
    }
}

ProductComments.findById = async (conn, id) => {
    try {
        const FIND_QUERY = `
            select c.*, u.email as userEmail, u.nickname as userNickname, u.picture as userPicture
            from ${TABLE} c
            left join user u
            on c.user_id = u.id
            where c.id = ?;    
        `;

        const [comments] = await conn.execute(FIND_QUERY, [id]);
        return comments[0];
    } catch (err) {
        console.error(err);
        throw new Error("MYSQL ERROR");
    }
}

ProductComments.findByProductId = async (conn, productId) => {
    try {
        const FIND_QUERY = `
            select c.*, u.email as userEmail, u.nickname as userNickname, u.picture as userPicture
            from ${TABLE} c
            left join user u
            on c.user_id = u.id
            where c.product_id = ?;    
        `;

        const [comments] = await conn.execute(FIND_QUERY, [productId]);
        return comments;
    } catch (err) {
        throw new Error("MYSQL ERROR");
    }
}

ProductComments.update = async (conn, comment, dateTime, commentId) => {
    try {
        const UPDATE_QUERY = `
            update ${TABLE}
            set comment = ?, modified_at = ?
            where id = ?;
        `;

        const [res] = await conn.execute(UPDATE_QUERY, [comment, dateTime, commentId]);
        return res.affectedRows;
    } catch (err) {
        throw new Error("MYSQL ERROR");
    }
}

ProductComments.deleteByIdAndUserId = async (conn, commentId, userId) => {
    try {
        const DELETE_QUERY = `
            delete from ${TABLE}
            where id = ? and user_id = ?;
        `;

        const [res] = await conn.execute(DELETE_QUERY, [commentId, userId]);
        return res.affectedRows;
    } catch (err) {
        console.error(err);
        throw new Error("MYSQL ERROR");
    }
}


module.exports = ProductComments;
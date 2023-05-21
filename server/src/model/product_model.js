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

Products.create = async (conn, author_id, title, content, thumbnail, price, description) => {
    try {
        const INSERT_QUERY = `
            insert into ${TABLE} (author_id, title, content, thumbnail, price, description)
            values (?, ?, ?, ?, ?, ?);
        `
        const [res] = await conn.execute(INSERT_QUERY, [author_id, title, content, thumbnail, price, description]);
        return res.insertId;
    } catch(err) {
        console.error(err);
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

Products.search = async (conn, keyword) => {
    try {
        const FIND_QUERY = `
            select p.*, u.nickname as authorNickname, u.email as authorEmail, u.picture as authorPicture
            from ${TABLE} p
            left join user u
            on p.author_id = u.id
            where p.title like '%${keyword}%'
            limit 10 offset 0
        `;

        const [products] = await conn.execute(FIND_QUERY);
        return products;
    } catch(err) {
        console.error(err);
        throw new MysqlError("MYSQL ERROR");
    }
}

Products.findByUserLike = async (conn, userId) => {
    try {
        const FIND_QUERY = `
            select p.*, u.nickname as authorNickname, u.email as authorEmail, u.picture as authorPicture
            from ${TABLE} p
            left join user u
            on p.author_id = u.id
            left join product_likes l
            on l.product_id = p.id
            where l.user_id = ?;
        `;
        const [products] = await conn.execute(FIND_QUERY, [userId]);
        return products;
    } catch (err) {
        console.error(err);
        throw new MysqlError("MYSQL ERROR");
    }
}

Products.getProductsByDate = async (conn, startTime, endTime, reverse, limit, offset, keyword) => {
    try {
        // created_at 비교에서 스트링이 제대로 안들어가서 이렇게 바꿈
        const FIND_QUERY = `
            select p.*, u.nickname as authorNickname, u.email as authorEmail, u.picture as authorPicture
            from ${TABLE} p
            left join user u
            on p.author_id = u.id
            where p.created_at >= '${startTime}' and p.created_at <= '${endTime}'
            order by p.created_at ${reverse? 'ASC':'DESC'}
            limit ${limit} offset ${offset}
        `;

        const FIND_QUERY_KEYWORD = `
            select p.*, u.nickname as authorNickname, u.email as authorEmail, u.picture as authorPicture
            from ${TABLE} p
            left join user u
            on p.author_id = u.id
            where p.created_at >= '${startTime}' and p.created_at <= '${endTime}' and p.title like '%${keyword}%'
            order by p.created_at ${reverse? 'ASC':'DESC'}
            limit ${limit} offset ${offset}
        `;

        if(!keyword) {
            const [products] = await conn.execute(FIND_QUERY);
            return products;
        }

        const [products] = await conn.execute(FIND_QUERY_KEYWORD);
        return products;
    } catch(err) {
        console.error(err);
        throw new MysqlError("MYSQL ERROR");
    }
}

Products.getProductsByLike = async (conn, startTime, endTime, reverse, limit, offset, keyword) => {
    try {
        // created_at 비교에서 스트링이 제대로 안들어가서 이렇게 바꿈
        const FIND_QUERY = `
            select p.*, u.nickname as authorNickname, u.email as authorEmail, u.picture as authorPicture, COUNT(l.product_id) AS likes
            from ${TABLE} p
            left join user u
            on p.author_id = u.id
            left join product_likes l
            on p.id = l.product_id
            where p.created_at >= '${startTime}' and p.created_at <= '${endTime}'
            group by p.id
            order by likes ${reverse? 'ASC':'DESC'}, p.created_at ${reverse? 'ASC':'DESC'}
            limit ${limit} offset ${offset}
        `;

        const FIND_QUERY_KEYWORD = `
            select p.*, u.nickname as authorNickname, u.email as authorEmail, u.picture as authorPicture, COUNT(l.product_id) AS likes
            from ${TABLE} p
            left join user u
            on p.author_id = u.id
            left join product_likes l
            on p.id = l.product_id
            where p.created_at >= '${startTime}' and p.created_at <= '${endTime}' and p.title like '%${keyword}%'
            group by p.id
            order by likes ${reverse? 'ASC':'DESC'}, p.created_at ${reverse? 'ASC':'DESC'}
            limit ${limit} offset ${offset}
        `;

        if(!keyword) {
            const [products] = await conn.execute(FIND_QUERY);
            return products;
        }

        const [products] = await conn.execute(FIND_QUERY_KEYWORD);
        return products;
    } catch(err) {
        console.error(err);
        throw new MysqlError("MYSQL ERROR");
    }
}

Products.getProductsByUser = async (conn, limit, offset, userId) => {
    try {
        const USER_HASHTAG = `
            select *
            from user_hashtag
            where user_id = ?
            order by score desc;
        `;
        const [userHashtagData] = await conn.execute(USER_HASHTAG, [userId]);

        const FIND_QUERY = `
            select p.*, u.email as authorEmail, u.nickname as authorNickname, u.picture as authorPicture ,COUNT(l.product_id) AS likes
            from products p
            left join product_likes l
            on p.id = l.product_id
            left join user u
            on p.author_id = u.id
            where p.created_at >= DATE_SUB(NOW(), INTERVAL 1 MONTH) and p.created_at <= now() and p.author_id != ?
            group by p.id
            order by likes desc limit 1500;
        `;

        const [products] = await conn.execute(FIND_QUERY, [userId]);
        let renewProducts = [];

        const scoreCalculator = (productHashtagIds) => {
            let score = 0;
            for(userHashtag of userHashtagData) {
                if(userHashtag.hashtag_id in productHashtagIds) {
                    score += userHashtag.score;
                }
            }
            return score;
        }

        for(product of products) {
            const [productHashtags] = await conn.execute('select hashtag_id from product_hashtag where product_id = ?', [product.id]);
            const productHashtagIds = productHashtags.map((h) => h.hashtag_id);
            const score = scoreCalculator(productHashtagIds); 
            renewProducts.push({
                ...post,
                score: score
            });
        }
        
        return products;
    } catch(err) {
        console.error(err);
        throw new MysqlError("MYSQL ERROR");
    }
}
module.exports = Products;
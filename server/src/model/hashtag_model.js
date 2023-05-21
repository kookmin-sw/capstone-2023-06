const MysqlError = require("../utils/errors/MysqlError");

const TABLE = "hashtag";

const Hashtag = (hashtag) => {
    this.id = hashtag.id;
    this.title = hashtag.title;
}

Hashtag.create = async (conn, title) => {
    const INSERT_QUERY = `
        insert into ${TABLE} (title)
        values (?)
    `;

    try {
        const [res] = await conn.execute(INSERT_QUERY, [title]);
        return res.insertId;
    } catch(err) {
        console.error(err.message);
        throw new MysqlError("MYSQL ERROR");
    }
}

Hashtag.findById = async (conn, id) => {
    const SELECT_QUERY = `
        select * from ${TABLE} where id = ?;
    `;
    try {
        const [hashtags] = await conn.execute(SELECT_QUERY, [id]);
        return hashtags[0];
    } catch(err) {
        console.error(err.message);
        throw new MysqlError("MYSQL ERROR");
    }
}

Hashtag.findByTitle = async (conn, title) => {
    const SELECT_QUERY = `
        select * from ${TABLE} where title = ?;
    `;
    try {
        const [hashtags] = await conn.execute(SELECT_QUERY, [title]);
        return hashtags[0];
    } catch(err) {
        console.error(err);
        throw new MysqlError("MYSQL ERROR");
    }
}

module.exports = Hashtag;
'user strict';
const {GetConnection, ReleaseConnection} = require("../../database/connect.js");
const TABLE = "postlikes";

const PostLikes = (postLikes) => {
    this.id = postLikes.id;
    this.user_id = postLikes.user_id;
    this.post_id = post_id;
}

PostLikes.create = async (user_id, post_id) => {
    const conn = await GetConnection();
    const INSERT_QUERY = `
        insert into ${TABLE} (user_id, post_id)
        values (?, ?);
    `;
    try {
        const [postLikes] = await conn.execute(INSERT_QUERY, [user_id, post_id]);
        return postLikes.insertId;
    } catch(err) {
        throw new Error("MYSQL ERROR");
    } finally {
        ReleaseConnection(conn);
    }
}

PostLikes.findByUserIdAndPostId = async (user_id, post_id) => {
    const conn = await GetConnection();
    const FIND_QUERY = `
        select *
        from ${TABLE}
        where user_id = ? and post_id = ?
    `;
    try {
        const [postLikes] = await conn.execute(FIND_QUERY, [user_id, post_id]);
        return postLikes[0];
    } catch(err) {
        throw new Error("MYSQL ERROR");
    } finally {
        ReleaseConnection(conn);
    }
}

PostLikes.deleteById = async (postlikes_id) => {
    const conn = await GetConnection();
    const DELETE_QUERY = `delete from ${TABLE} where id = ?;`;
    try {
        const [res] = await conn.execute(DELETE_QUERY, [postlikes_id]);
        return res.affectedRows;
    } catch(err) {
        throw new Error("MYSQL ERROR");
    } finally {
        ReleaseConnection(conn);
    } 
}

PostLikes.findByPostId = async (post_id) => {
    const conn = await GetConnection();
    const FIND_QUERY = `
        select * from ${TABLE} where post_id = ?
    `;
    try {
        const [postLikes] = await conn.execute(FIND_QUERY, [post_id]);
        return postLikes;
    } catch(err) {
        throw new Error("MYSQL ERROR");
    } finally {
        ReleaseConnection(conn);
    }
}

module.exports = PostLikes;
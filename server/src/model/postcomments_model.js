'use strict';
const {GetConnection, ReleaseConnection} = require("../../database/connect.js");
const TABLE = "post_comments";

const PostComments = (postComments) => {
    this.id = postComments.id;
    this.user_id = postComments.user_id;
    this.post_id = postComments.post_id;
    this.parent_id = postComments.parent_id;
    this.comment = postComments.comment;
    this.created_at = postComments.created_at;
    this.modified_at = postComments.modified_at;
}

// user_id, post_id, comment, parent_id, 3~4개의 인자가 필요
PostComments.create = async (...arg) => {
    const conn = await GetConnection();
    try {
        let INSERT_QUERY;
        switch (arg.length) {
            case 3:
                INSERT_QUERY = `
                    insert into ${TABLE} (user_id, post_id, comment)
                    values (?,?,?);`;
                break;
            case 4:
                INSERT_QUERY = `
                    insert into ${TABLE} (user_id, post_id, comment, parent_id)
                    values (?,?,?,?);`;
                break;
            default:
                throw new Error("WTF");
        }

        const [res] = await conn.execute(INSERT_QUERY, arg);
        return res.insertId;
    } catch (err) {
        throw new Error("MYSQL ERROR");
    } finally {
        ReleaseConnection(conn);
    }
}

PostComments.findById = async (id) => {
    const conn = await GetConnection();
    const FIND_QUERY = `
        select c.*, u.email as userEmail, u.nickname as userNickname, u.picture as userPicture
        from ${TABLE} c
        left join user u
        on c.user_id = u.id
        where c.id = ?;
    `;
    try {
        const [comments] = await conn.execute(FIND_QUERY, [id]);
        return comments[0];
    } catch(err) {
        console.error(err);
        throw new Error("MYSQL ERROR");
    } finally {
        ReleaseConnection(conn);
    }
}

//set comment = ?, modified_at = ? where id = ?
PostComments.update = async (...arg) => {
    const conn = await GetConnection();
    const UPDATE_QUERY = `
        update ${TABLE} 
        set comment = ?, modified_at = ?
        where id = ?
    `;
    try {
        const [res] = await conn.execute(UPDATE_QUERY, arg);
        return res.affectedRows;
    } catch(err) {
        console.error(err.message);
        throw new Error("MYSQL ERROR");
    } finally {
        ReleaseConnection(conn);
    }
}

// where id = ? and post_id ? and user_id = ?
PostComments.deleteById = async (...arg) => {
    const conn = await GetConnection();
    const DELETE_QUERY = `
        delete from ${TABLE} 
        where id = ?
    `;
    try {
        const [res] = await conn.execute(DELETE_QUERY, arg);
        return res.affectedRows;
    } catch(err) {
        console.error(err.message);
        throw new Error("MYSQL ERROR");
    } finally {
        ReleaseConnection(conn);
    }
}

PostComments.findByPostId = async (post_id) => {
    const conn = await GetConnection();

    const FIND_QUERY = `
        select c.*, u.email as userEmail, u.nickname as userNickname, u.picture as userPicture
        from ${TABLE} c
        left join user u
        on c.user_id = u.id
        where c.post_id = ?;
    `;
    try {
        const [comments] = await conn.execute(FIND_QUERY, [post_id]);
        console.info(comments);
        return comments;
    } catch(err) {
        throw new Error("MYSQL ERROR");
    } finally {
        ReleaseConnection(conn);
    }
}

module.exports = PostComments;
const TABLE = "follower";

const Follower = (follower) => {
    this.id = follower.id;
    this.user_id = follower.user_id;
    this.follower_id = follower.follower_id;
}

Follower.findByUserIdAndFollowerId = async (conn, userId, followerId) => {
    try {
        const FIND_QUERY = `
            select * from ${TABLE}
            where user_id = ? and follower_id = ?;
        `;

        const [followers] = await conn.execute(FIND_QUERY, [userId, followerId]);
        return followers[0];
    } catch(err) {
        console.error(err);
        throw new Error("MYSQL ERROR");
    }
}

Follower.create = async (conn, userId, followerId) => {
    try {
        const INSERT_QUERY = `
            insert into ${TABLE} (user_id, follower_id)
            values (?, ?);
        `;

        const [res] = await conn.execute(INSERT_QUERY, [userId, followerId]);
        return res.insertId;
    } catch(err) {
        console.error(err);
        throw new Error("MYSQL ERROR");
    }
}

Follower.deleteByUserIdAndFollowerId = async (conn, userId, followerId) => {
    try {
        const DELETE_QUERY = `
            delete from ${TABLE}
            where user_id = ? and follower_id = ?;
        `;

        const [res] = await conn.execute(DELETE_QUERY, [userId, followerId]);
        return res.affectedRows;
    } catch(err) {
        console.error(err);
        throw new Error("MYSQL ERROR");
    }
}

Follower.findByUserId = async (conn, userId) => {
    try {
        const FIND_QUERY = `
            select u.nickname, u.email, u.picture 
            from ${TABLE} f
            left join user u
            on f.follower_id = u.id
            where f.user_id = ?
        `;

        const [followers] = await conn.execute(FIND_QUERY, [userId]);
        return followers;
    } catch (err) {
        console.error(err);
        throw new Error("MYSQL ERROR");
    }
}

Follower.findByFollowerId = async (conn, followerId) => {
    try {
        const FIND_QUERY = `
            select u.nickname, u.email, u.picture 
            from ${TABLE} f
            left join user u
            on f.user_id = u.id
            where f.follower_id = ?
        `;

        const [followers] = await conn.execute(FIND_QUERY, [followerId]);
        return followers;
    } catch (err) {
        console.error(err);
        throw new Error("MYSQL ERROR");
    }
}

module.exports = Follower;
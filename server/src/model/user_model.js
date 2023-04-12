const {GetConnection, ReleaseConnection} = require("../../database/connect.js");

const table = "user";

const User = function(user){
    this.id = user.id;
    this.nickname = user.nickname;
    this.password = user.password;
    this.email = user.email;
    this.picture = user.picture;
    this.userRoleId = user.user_role_id;
}
/**
 * 현재 callback -> async/await로 마이그레이션 중, 일단 유저는 컨트롤러의 콜백을 사용
 */
User.findById = async function (id, result) {
    let conn = await GetConnection();
    try {
        const [users] = await conn.execute(`select * from ${table} where id = '${id}'`);
        result(null, users[0]);
    } catch(err){
        result(err, null);
    } finally {
        await ReleaseConnection(conn);
    }
}

User.findByEmail = async function (email, result) {
    let conn = await GetConnection();
    try {
        const [users] = await conn.execute(`select * from ${table} where email = ?`, [email]);
        result(null, users[0]);
    } catch(err) {
        result(err,null);
    } finally {
        await ReleaseConnection(conn);
    }
};

User.findByNickname = async function (nickname, result) {
    let conn = await GetConnection();
    try {
        const [users] = await conn.execute(`select * from ${table} where email = ?`, [email]);
        result(null, users[0]);
    } catch(err) {
        result(err,null);
    } finally {
        await ReleaseConnection(conn);
    }
}

User.create = async function(nickname, password, email, picture, userRoleId, result){
    let conn = await GetConnection();
    try {
        const INSERT_QUERY = `
            INSERT INTO ${table} (nickname, password, email, picture, user_role_id) 
            VALUES('${nickname}', '${password}', '${email}', '${picture}', ${userRoleId});
        `;
        const [res] = await conn.execute(INSERT_QUERY);
        result(null, res.insertId);
    } catch(err) {
        result(err, null);
    } finally {
        await ReleaseConnection(conn);
    }
}

User.deleteById = async function (id, result) {
    let conn = await GetConnection();

    const DELETE_QUERY = `delete from ${table} where id = ${id};`;
    try {
        const [res] = await conn.execute(DELETE_QUERY);
        result(null, res);
    } catch (err) {
        result(err, null);
    } finally {
        await ReleaseConnection(conn);
    }
}

module.exports = User;
const {GetConnection, ReleaseConnection} = require("../../database/connect.js");
const MysqlError = require("../utils/errors/MysqlError.js");

const Picture = function (picture) {
    this.id = picture.id;
    this.url = picture.url;
    this.type = picture.type;
}

// Transaction을 위해서 conn을 인자로 받음
Picture.createWithConn = async (conn, url, type) => {
    try {
        const [result] = await conn.execute('insert into picture (url, type) values(?, ?)', [url, type]);
        return result.insertId;
    } catch (err) {
        console.error(err.message);
        throw new MysqlError("MYSQL ERROR");
    }
}

Picture.create = async (url, type) => {
    const conn = await GetConnection();
    try {
        const [result] = await conn.execute('insert into picture (url, type) values(?, ?)', [url, type]);
        return result.insertId;
    } catch(err) {
        throw new Error("MYSQL ERROR");
    } finally {
        await ReleaseConnection(conn);
    }
}

module.exports = Picture;
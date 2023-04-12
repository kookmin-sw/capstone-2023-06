const {GetConnection, ReleaseConnection} = require("../../database/connect.js");

const Picture = function (picture) {
    this.id = picture.id;
    this.url = picture.url;
    this.type = picture.type;
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
const mysql = require('mysql2/promise');
const config = require('./config');
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({path:path.join(__dirname,"/./../src/enviroment/.env")});

const pool = mysql.createPool(
    config[process.env.CURRENT_TYPE]
);

exports.GetConnection = async () => {
    try {
        const conn = await pool.getConnection();
        if(!conn) {
            throw Error("No Connection");
        }
        return conn;
    } catch (err) {
        console.error(`connection error: ${err.message}`);
    }
};

exports.ReleaseConnection = async (conn) => {
    try {
        await conn.release();
    } catch (err) {
        console.error(`release error: ${err.message}`);
    }
}

//테스트 때를 위함 실제 서비스에서는 들어가면 절대 안됨
exports.DeletePool = async () => {
    await pool.end();
}
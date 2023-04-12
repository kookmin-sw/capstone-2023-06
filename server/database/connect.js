const mysql = require('mysql2/promise');
const config = require('./config');

const pool = mysql.createPool(
    config['dev']
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

// const conn = mysql.createConnection(
//     config['dev']  
// );

// conn.connect((err)=>{
//     if(err) throw err;
//     console.log("DB connect success!");
// });

// conn.release((err)=>{
//     if(err) throw err;
//     console.log("DB Release")
// })
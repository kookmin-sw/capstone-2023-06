const mysql = require('mysql');
const dotenv = require('dotenv');
const config = require('./config');
dotenv.config();

// 현재 test 연결
const conn = mysql.createConnection(
    config['test']  
);

conn.connect((err)=>{
    if(err) throw err;
    console.log("DB connect success!");
});

module.exports = conn;
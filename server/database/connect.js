const mysql = require('mysql2');
const config = require('./config');

// 현재 test 연결
const conn = mysql.createConnection(
    config['dev']  
);

conn.connect((err)=>{
    if(err) throw err;
    console.log("DB connect success!");
});

module.exports = conn;
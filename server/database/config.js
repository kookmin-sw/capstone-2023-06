const dotenv = require("dotenv");
const path = require("path");
dotenv.config({path:path.join(__dirname,"/./../src/enviroment/.env")});

const config = {
    release: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        charset: "utf8mb4",
        dateStrings: [ 
            'DATE', 
            'DATETIME' 
        ]
    },
    dev: {
        host: "dev_db_container",
        user: "root",
        password: "ehddnjs12",
        port: 3306,
        database: "desk_it_test",
        charset: "utf8mb4",
        dateStrings: [ 
            'DATE', 
            'DATETIME' 
        ]
    }
};
// test는 docker에서 돌리는 로컬 DB 이기에 공개
// dateStrings Date에서 String으로 출력: mysql2에서 timezone 세팅이 안됨

module.exports = config;
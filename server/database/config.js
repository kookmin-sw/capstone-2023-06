const dotenv = require("dotenv");
const path = require("path");
dotenv.config({path:path.join(__dirname,"/./../enviroment/.env")});

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
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT,
        database: process.env.DB_TEST_NAME,
        charset: "utf8mb4",
        dateStrings: [ 
            'DATE', 
            'DATETIME' 
        ]
    }
};
// dateStrings Date에서 String으로 출력: mysql2에서 timezone 세팅이 안됨

module.exports = config;
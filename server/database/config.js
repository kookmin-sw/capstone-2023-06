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
        charset: "utf8mb4"
    },
    dev: {
        host: "dev_db_container",
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT,
        database: process.env.DB_TEST_NAME,
        charset: "utf8mb4"
    }
};

module.exports = config;
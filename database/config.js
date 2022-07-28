const dotenv = require("dotenv");

dotenv.config();

const config = {
    development: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: 'project_a'
    },
    test: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: 'project_a_test'
    }
  };

  module.exports = config;
const mysql = require("../../database/connect.js");
const table = "USER";
const passport = require('passport');

const User = function(user){
    this.uid = user.uid;
    this.nickname = user.nickname;
    this.password = user.password;
    this.email = user.email;
    this.picture = user.picture;
    this.userRoleId = user.user_role_id;
}

User.findByEmail = function (email, result) {
    mysql.query(`Select * from ${table} where email = '${email}'`, email, (err, res) =>{
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

User.findByNickname = function (nickname, result) {
    mysql.query(`SELECT * from ${table} where nickname = ?`, nickname, (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

User.create = function(nickname, password, email, picture, userRoleId, result){
    const INSERT_QUERY = `
        INSERT INTO ${table} (NICKNAME, PASSWORD, EMAIL, PICTURE, USER_ROLE_ID) 
        VALUES('${nickname}', '${password}', '${email}', '${picture}', ${userRoleId});
    `;
    mysql.query(INSERT_QUERY, (err, res)=>{
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

module.exports = User;
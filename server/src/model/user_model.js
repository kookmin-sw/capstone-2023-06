const mysql = require("../../database/connect.js");

const table = "user";

const User = function(user){
    this.id = user.id;
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
        INSERT INTO ${table} (nickname, password, email, picture, user_role_id) 
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

User.deleteById = function (id, result) {
    const DELETE_QUERY = `delete from ${table} where id = ${id};`;
    mysql.query(DELETE_QUERY, (err, res)=> {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

module.exports = User;
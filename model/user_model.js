const mysql = require("../database/connect.js");
const table = "USER";
// uid varchar(50) not null unique,
// nickname varchar(12) not null unique,
// email varchar(20) not null unique,
// password varchar(20) not null,
// phone varchar(11) not null unique,
// authtype int not null,
// usertype ENUM("ADMIN", "SELLER", "BUYER") not null DEFAULT "BUYER",


const User = function(user){
    this.uid = user.uid;
    this.nickname = user.nickname;
    this.email = user.email;
    this.password = user.password;
    this.phone = user.phone;
    this.authtype = user.authtype;
    this.usertype = user.usertype;
}

User.findAll = function(result){
    mysql.query(`select * from ${table}`, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(result);
            result(null, res);
        }
    });
}

User.findByEmail = function (email, result) {
    mysql.query(`Select * from ${table} where email = ?`, email, (err, res) =>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res);
            result(null, res);
        }
    });
};

module.exports = User;
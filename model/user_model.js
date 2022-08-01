const mysql = require("../database/connect.js");
const table = "USER";
const uuid = require("uuid");
// uid varchar(50) not null unique,
// nickname varchar(12) not null unique,
// email varchar(20) not null unique,
// password varchar(20) not null,
// phone varchar(11) not null unique,
// authtype int not null,
// usertype ENUM("ADMIN", "SELLER", "BUYER") not null DEFAULT "BUYER",


/**
 * @swagger
 *  components:
 *   schemas:
 *     User: 
 *      type: object
 *      required:
 *        - uid
 *        - nickname
 *        - email
 *        - password
 *        - phone
 *        - authtype
 *        - usertype
 *      properties:
 *        uid: 
 *          type: string
 *          description: 유저 고유 닉네임
 *        nickname: 
 *          type: string
 *          description: 유저의 닉네임
 *        email:
 *          type: string
 *          format: email
 *          description: Email for the user
 *        password:
 *          type: string
 *          format: password
 *          description: password
 *        authtype:
 *          type: integer
 *          description: authtype
 *        userType:
 *          type: string
 *          description: usertype
 *      example: 
 *        uid: 123123jlkjlkdajfldaj
 *        nickname: dongwon
 *        email: dongwonkim@naver.com
 *        password: 1231231
 *        authtype: 1
 *        usertype: "ADMIN"
 */

/**
 * @swagger
 *  components:
 *   schemas:
 *     PostUser: 
 *      type: object
 *      required:
 *        - nickname
 *        - email
 *        - password
 *        - phone
 *        - authtype
 *        - usertype
 *      properties:
 *        nickname: 
 *          type: string
 *          description: 유저의 닉네임
 *        email:
 *          type: string
 *          format: email
 *          description: Email for the user
 *        password:
 *          type: string
 *          format: password
 *          description: password
 *        phone:
 *          type: string
 *          description: phone number
 *        authtype:
 *          type: integer
 *          description: authtype
 *        userType:
 *          type: string
 *          description: usertype
 *      example:
 *        nickname: "dongwon"
 *        email: "dongwonkim@naver.com"
 *        password: "1231231"
 *        phone: "01025300767"
 *        authtype: 1
 *        usertype: "ADMIN"
 */


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
            result(null, res);
        }
    });
};

User.create = function(nickname, email, password, phone, authtype, usertype, result){
    const uid = uuid.v1();
    mysql.query(`insert into ${table} values ("${uid}","${nickname}", "${email}", "${password}", "${phone}", ${authtype}, "${usertype}")`, (err, res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(`Create New User: ${uid}`)
        }
    });

}

module.exports = User;
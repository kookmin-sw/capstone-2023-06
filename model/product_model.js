const mysql = require("../database/connect.js");
const uuid = require("uuid");


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


const Product = function(product){
    this.id = product.id;
    this.author_id = product.author_id;
    this.title = product.title;
    this.content = product.content;
    this.create_at = product.create_at;
    this.modify_at = product.modify_at;
}

Product.findById = function(id, result){
    mysql.query(`select * from product where id = ${id}`, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(result);
            result(null, res);
        }
    });
}

Product.createTag = function(x, y, product_id, picture_id, result) {
    mysql.query(`insert into product_tag values (null, ${x}, ${y}, ${product_id}, ${picture_id})`, (err, res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res);
            result(null, res);
        }
    });
}

Product.create = function(author_id, title, content, create_at, modify_at, result){
    mysql.query(`insert into product values (null, ${author_id}, "${title}", "${content}", ${create_at}, ${modify_at})`, (err, res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res);
            result(null, res);
        }
    });
}

module.exports = User;
const mysql = require("../database/connect.js");
const uuid = require("uuid");


const Product = function(product){
    this.id = product.id;
    this.author_id = product.author_id;
    this.title = product.title;
    this.content = product.content;
    this.create_at = product.create_at;
    this.modify_at = product.modify_at;
}

Product.findTagByProductId = function(id, result) {
    mysql.query(`select * from product_tag where product_id = ${id}`, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(result);
            result(null, res);
        }
    });
}

Product.findById = function(id, result) {
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

Product.createTag = function(x, y, product_id, target_product_id, picture_id,result) {
    
    mysql.query(`insert into product_tag values (null, ${x}, ${y}, ${product_id}, ${target_product_id}, ${picture_id})`, (err, res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res);
            result(null, res);
        }
    });
}

Product.create = function(author_id, title, content, created_at, result){
    mysql.query(`insert into product values (null, ${author_id},'${title}', '${content}', '${created_at}', '${created_at}')`, (err, res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res);
            result(null, res);
        }
    });
}

module.exports = Product;
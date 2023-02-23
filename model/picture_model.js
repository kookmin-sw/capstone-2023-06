const mysql = require("../database/connect.js");

const Picture = function (picture) {
    this.id = picture.id;
    this.url = picture.url;
}

Picture.findByProductId = function (id, result) {
    mysql.query(`select * from picture a left join product_picture b on a.id = b.picture_id where b.product_id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(result);
            result(null, res);
        }
    });
}

Picture.create = function (filename, proudct_id, result) {
    mysql.query(`insert into picture values (null, "${filename}")`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            mysql.query(`insert into product_picture values (${proudct_id}, ${res.insertId})`, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                } else {
                    console.log("Picture Create : ", res);
                    result(null, res);
                }
            });
        }
    });
}

module.exports = Picture;
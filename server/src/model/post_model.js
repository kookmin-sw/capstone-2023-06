const mysql = require("../../database/connect.js");

const TABLE = "posts";

const Posts = function(posts) {
    this.id = posts.id;
    this.author_id = posts.author_id;
    this.title = posts.content;
    this.content = posts.content;
    this.created_at = posts.created_at;
    this.modified_at = posts.modified_at;
}

Posts.create = function (author_id, title, content, result) {
    const INSERT_QUERY = `
        INSERT INTO ${TABLE} (author_id, title, content)
        VALUES('${author_id}', '${title}', '${content}');
    `;
    mysql.query(INSERT_QUERY, (err,res) => {
        if (err) {
            result(err,null);
        } else {
            result(null,res);
        }
    })
}

Posts.findById = function (id, result) {
    const FIND_QUERY = `
        select * from ${TABLE} where id = ${id};
    `;
    mysql.query(FIND_QUERY, (err, res) => {
        if (err) {
            result(err,null);
        } else {
            result(null,res);
        }
    })
}

Posts.deleteById = function (id, result) {
    const DELETE_QUERY = `
        delete from ${TABLE} where id = '${id}';
    `;
    mysql.query(DELETE_QUERY, (err,res) => {
        if(err) {
            result(err, null);
        } else {
            result(null,res);
        }
    });
}

Posts.search = function (condition, result) {
    const SEARCH_QUERY = `
        SELECT from ${TABLE} ;
    `;

    mysql.query(SEARCH_QUERY, (err, res)=> {
        if(err) {
            result
        }
    });
}

module.exports = Posts;
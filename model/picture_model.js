const mysql = require("../database/connect.js");

const Picture = function(picture) {
    this.id = picture.id;
    this.url = picture.url;
}

Picture.create = function(img, result) {

}
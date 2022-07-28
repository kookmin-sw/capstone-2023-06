// test-main rest api 
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

/**
 * @path {GET} http://localhost:3000/
 * @description 요청 데이터 값이 없고 반환 값이 있는 GET Method
 */
 app.get("/", (req, res) => {
    //Hello World 데이터 반환
    res.send("Hello World");
});

app.listen(3000, () => console.log("개발이 취미인 남자 :)"));
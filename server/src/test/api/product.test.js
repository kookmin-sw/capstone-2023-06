'use strict';
const request = require("supertest");
const app = require("../../testServer.js");
const agent = request.agent(app);

const BRANDUSER_INFO = {
    nickname: "ProductTest",
    password: "ProductTestPassword",
    email: "ProductTest@product.com",
    picture: "ProductTestPicture"
}

beforeAll(async () => {
    await agent.post("/api/user/brand/sign-up").send({
        nickname: BRANDUSER_INFO.nickname,
        password: BRANDUSER_INFO.password,
        email: BRANDUSER_INFO.email,
        picture: BRANDUSER_INFO.picture
    }).expect(201);
    
    await agent.post("/api/user/login").send({
        email: BRANDUSER_INFO.email,
        password: BRANDUSER_INFO.password
    }).expect(200);
});

describe("Product API", ()=>{
    // 업로드하기
    let PRODUCT_ID;
    const productJson = {
        title: "DESK 책상",
        content: ["DESK 책상의 매력은... Content", "hi"],
        thumbnail: "THUMBNAIL URL",
        price: 2000,
        subthumbnails: [
            "image url1",
            "image url2",
            "image url3",
        ],
        hashtags: [
            "hashtag1",
            "hashtag2",
            "hashtag3",
        ],
        options: [ // 확정된 부분이 아님
            "options1", 
            "options2"
        ],
    };

    test("Create Product", (done) => {
        agent
        .post(`/api/product`)
        .send(productJson)
        .expect(200)
        .end((err, res) => {
            if(err) throw err;
            expect(res.body.success).toBeTruthy();
            PRODUCT_ID = res.body.result;
            done();
        });
    });

    // 조회하기
    test("Get Product By Id", (done) => {
        request(app)
        .get(`/api/product/${PRODUCT_ID}`)
        .send()
        .expect(200)
        .end((err, res) => {
            if(err) throw err;
            expect(res.body.success).toBeTruthy();
            const {authorNickname, authorEmail, authorPicture, content, title, subthumbnails, hashtags} = res.body.result;
            expect(authorNickname).toEqual(BRANDUSER_INFO.nickname);
            expect(authorEmail).toEqual(BRANDUSER_INFO.email);
            expect(authorPicture).toEqual(BRANDUSER_INFO.picture);
            
            expect(content).toEqual(productJson.content);
            expect(title).toEqual(productJson.title);
            expect(subthumbnails).toEqual(productJson.subthumbnails);
            expect(hashtags).toEqual(productJson.hashtags);
            done();
        });
    });

    // // 업로드하기 반복문 
    // test("Make Some Products (10)", (done)=> {
    //     for(let i=0;i<10;i++) {
    //         agent
    //         .post(`/api/product`)
    //         .send()
    //         .expect(200)
    //         .end((err, res) => {
    //             if(err) throw err;
    //             expect(res.body.success).toBe(true);
    //             PRODUCT_ID = res.body.result;
    //             done();
    //         });
    //     }
    // });

    // // 여러개 조회하기, 무한 스크롤
    // test("Get Products", (done) => {
    //     done();
    // });

    // // 삭제하기
    // test("Delete Products", (done) => {
    //     agent
    //     .delete(`/api/product/${PRODUCT_ID}`)
    //     .send()
    //     .expect(200)
    //     .end((err, res) => {
    //         if(err) throw err;
    //         expect(res.body.success).toBe(true);
    //         done();
    //     });
    // });

    // // 업데이트 하기
    // test("Update Product", (done) => {
    //     agent
    //     .put(`/api/product/productId`)
    //     .send()
    //     .expect(200)
    //     .end((err,res) => {
    //         if(err) throw err;
    //         expect(res.body.success).toBe(true);
    //         done();
    //     });
    // });

    // // 여러개 조회하기 2
    // test("Get Products Validation", (done) => {
    //     // agent
    //     // .get()
    //     done();
    // });
});

afterAll(async () => {
    await agent.delete("/api/user").send().expect(200);
});
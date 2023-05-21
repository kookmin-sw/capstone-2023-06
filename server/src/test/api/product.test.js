'use strict';
const request = require("supertest");
const app = require("../../testServer.js");
const agent = request.agent(app);
const Products = require("../../model/product_model.js");
const {GetConnection, ReleaseConnection} = require("../../../database/connect.js");

const BRANDUSER_INFO = {
    nickname: "ProductTest",
    password: "ProductTestPassword",
    email: "ProductTest@product.com",
    picture: "ProductTestPicture"
}

let productIds = [];
const productJson = {
    title: "DESK 책상",
    content: ["DESK 책상의 매력은... Content", "hi"],
    thumbnail: "THUMBNAIL URL",
    description: "설명",
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

const ITER = 10;
const makeProductLoop = async (userId, iter) => {
    const conn = await GetConnection();
    try {
        for(let i=0;i<iter;i++) {
            const productId = await Products.create(conn, userId, productJson.title + " " + String(i), productJson.content, productJson.thumbnail, productJson.price, productJson.description);
            productIds.push(productId);
        }
    } catch (err) {
        throw err;
    } finally {
        ReleaseConnection(conn);
    }
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
    
    // 반복해서 채워놓기
    const res = await agent.get('/api/user/auto-login');
    await makeProductLoop(res.body.result.id, ITER);
});

describe("Product API", ()=>{
    // 업로드하기
    let PRODUCT_ID;

    test("Create Product", (done) => {
        agent
        .post(`/api/product`)
        .send(productJson)
        .expect(200)
        .end((err, res) => {
            if(err) throw err;
            expect(res.body.success).toBeTruthy();
            PRODUCT_ID = res.body.result;
            productIds.push(PRODUCT_ID);
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

    // 에러 검증
    test("Get Products ERR: Params", (done) => {
        request(app)
        .post(`/api/product/list`)
        .send()
        .expect(400)
        .end((err, res) => {
            if(err) throw err;
            expect(res.body.success).toBeFalsy();
        });

        request(app)
        .post(`/api/product/list?type=none`)
        .send()
        .expect(400)
        .end((err, res) => {
            if(err) throw err;
            expect(res.body.success).toBeFalsy();
            done();
        });
    });

    // 에러 검증
    test("Get Products ERR: body", (done) => {
        request(app)
        .post(`/api/product/list?type=date`)
        .send({})
        .expect(400, done);
    });

    test("Get Products : Date", (done) => {
        request(app)
        .post(`/api/product/list?type=date&reverse=true`)
        .send({
            startTime: "2022-02-01T01:01:01",
            endTime: "2030-02-01T01:01:01",
            limit: 200,
            offset: 0,
            keyword: null
        })
        .expect(200)
        .end((err, res) => {
            if(err) throw err;
            expect(res.body.result.length).toBe(ITER+1);
            done();
        });
    });

    // 검색하기
    test("Search Products", (done) => {
        request(app)
        .post(`/api/product/search`)
        .send({
            keyword: "DESK 책상 1"
        })
        .expect(200)
        .end((err,res) => {
            if(err) throw err;
            expect(res.body.result.length).toBe(1);
            expect(res.body.result[0].title).toBe("DESK 책상 1");
            console.log(res.body);
            done();
        });
    })

    test("Product List: like", (done)=> {
        request(app)
        .post(`/api/product/list`)
        .query({type:'like'})
        .send({
            "startTime": "2022-02-01T01:01:01",
            "endTime": "2024-02-01T01:01:01", 
            "offset": 0,
            "limit": 10,
        })
        .expect(200)
        .end((err,res) => {
            if(err) throw err;
            expect(res.body.result).toBeTruthy();
            console.log(res.body.result);
            done();
        })
    });

    test("Product List: user", (done)=> {
        agent
        .post(`/api/product/list`)
        .query({type:'user'})
        .send({
            "startTime": "2022-02-01T01:01:01",
            "endTime": "2024-02-01T01:01:01", 
            "offset": 0,
            "limit": 10,
        })
        .expect(200)
        .end((err,res) => {
            if(err) throw err;
            expect(res.body.result).toBeTruthy();
            console.log(res.body.result);
            done();
        })
    });

    test("Product List: not user", (done)=> {
        request(app)
        .post(`/api/product/list`)
        .query({type:'user'})
        .send({
            "startTime": "2022-02-01T01:01:01",
            "endTime": "2024-02-01T01:01:01", 
            "offset": 0,
            "limit": 10,
        })
        .expect(200)
        .end((err,res) => {
            if(err) throw err;
            expect(res.body.result).toBeTruthy();
            done();
        })
    });

    test("Product List: date", (done)=> {
        request(app)
        .post(`/api/product/list`)
        .query({type:'date'})
        .send({
            "startTime": "2022-02-01T01:01:01",
            "endTime": "2024-02-01T01:01:01", 
            "offset": 0,
            "limit": 10,
        })
        .expect(200)
        .end((err,res) => {
            if(err) throw err;
            expect(res.body.result).toBeTruthy();
            done();
        })
    });


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
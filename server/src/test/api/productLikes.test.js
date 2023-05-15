const request = require("supertest");
const app = require("../../testServer.js");
const agent = request.agent(app);
const user = request.agent(app);

const BRANDUSER_INFO = {
    nickname: "ProductTest",
    password: "ProductTestPassword",
    email: "ProductTest@product.com",
    picture: "ProductTestPicture"
}

const USER_INFO = {
    nickname: "Pro",
    password: "ProductTestPassword",
    email: "ProductUser@product.com",
    picture: "ProductTestPicture"
}

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

let PRODUCT_ID;

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
    
    const res = await agent.post("/api/product").send(productJson);
    PRODUCT_ID = res.body.result;

    await user.post("/api/user/sign-up").send({
        nickname: USER_INFO.nickname,
        password: USER_INFO.password,
        email: USER_INFO.email,
        picture: USER_INFO.picture
    });

    await user.post("/api/user/login").send({
        email: USER_INFO.email,
        password: USER_INFO.password
    });

});

describe("Product Likes API", () => {
    test("Like", (done) => {
        user
        .post(`/api/product/${PRODUCT_ID}/like`)
        .expect(200)
        .end((err,res) => {
            if(err) throw err;
            const {success, result} = res.body;
            expect(success).toBeTruthy();
            expect(result).toBeTruthy();
            done();
        });
    });

    test("List", (done) => {
        request(app)
        .get(`/api/product/${PRODUCT_ID}/likes`)
        .expect(200)
        .end((err,res) => {
            if(err) throw err;
            const {success, result} = res.body;
            expect(success).toBeTruthy();
            expect(result.length).toBe(1);
            expect(result[0].userNickname).toBe(USER_INFO.nickname);
            done();
        });
    });

    test("UnLike", (done) => {
        user
        .post(`/api/product/${PRODUCT_ID}/like`)
        .expect(200)
        .end((err,res) => {
            if(err) throw err;
            const {success, result} = res.body;
            expect(success).toBeTruthy();
            expect(result).toBeFalsy();
            done();
        });
    })
});

afterAll(async () => {
    await agent.delete("/api/user").send().expect(200);
    await user.delete("/api/user").send().expect(200);
});
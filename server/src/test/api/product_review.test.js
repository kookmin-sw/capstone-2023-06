const request = require("supertest");
const app = require("../../testServer.js");
const fs = require("fs");
const path = require("path");

let postJson = {
    "title": "title",
    "thumbnail": "thumbnail_image",
    "hashtags": ["hashtag"], // 겹치는 hashtag가 존재하면 안됨
    "content": "content",
}

const BRANDUSER_INFO = {
    nickname: "ProductTest",
    password: "ProductTestPassword",
    email: "ProductTest@product.com",
    picture: "ProductTestPicture"
}

const agent = request.agent(app);
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

let PRODUCT_ID;

const makePost = async() => {
    for(let i=0;i<10;i++) {
        await agent.post(`/api/post`).send(postJson).expect(201);
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

    const productRes = await agent.post(`/api/product`).send(productJson).expect(200);
    PRODUCT_ID = productRes.body.result;    
    
    try {
        const data = fs.readFileSync(path.join(__dirname, "./post_content.json"), "utf-8");

        postJson.content = JSON.parse(data);
        postJson.content.images["lhsz55auia8pchd5vql"].refers[1].data = PRODUCT_ID;
        postJson.content.images["lhsz7r8t4ul8do96bkj"].refers[0].data = PRODUCT_ID;
        await makePost();
    } catch(err) {
        console.error(err);
        throw err;
    }
});

describe("Product Review", ()=>{
    test("Product Reviews Test", (done) => {
        request(app)
        .get(`/api/product/${PRODUCT_ID}/reviews`)
        .expect(200)
        .end((err,res) => {
            if(err) throw err;
            expect(res.body.result.length).toBe(10);
            console.log(res.body.result[0]);
            done();
        });
    })
});

afterAll(async () => {
    await agent.delete("/api/user").send().expect(200);
});
const {UpdateAllHashtag} = require("../../utils/RecommendUpdater/recommendUpdater.js");
const {GetConnection, ReleaseConnection} = require("../../../database/connect.js");
const {DeletePool} = require("../../../database/connect.js");

const request = require("supertest");
const app = require("../../testServer.js");

const USER_INFO = {
    email: "u1@email.com",
    password: "password",
    nickname: "u1",
    picture: "base"
}

const FOLLOWER_INFO = {
    email: "foll@dmail.com",
    password: "pass",
    nickname: "hi",
    picture: "base"
}

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


const agent = request.agent(app);
const followerAgent = request.agent(app);
let USER_ID;
let FOLLOWER_ID;


const hashtagTable = [
    ['Hash1'],
    ['Hash2'],
    ['Hash3'],
    ['Hash2','Hash3'],
    ['Hash1','Hash4'],
    ['Hash5', 'Hash6'],
    ['Hash6', 'Hash7'],
    ['Hash8'],
    ['Hash2', 'Hash5'],
    ['Hash3']
];

const makePosts = async () => {
    for(let i=0;i<10;i++) {
        await agent.post(`/api/post`).send({
            ...postJson,
            hashtags: hashtagTable[i]
        }).expect(201);
    }
}

const makeFollowerPosts = async () => {
    for(let i=0;i<3;i++) {
        await followerAgent.post(`/api/post`).send({
            ...postJson,
            hashtags: hashtagTable[i]
        }).expect(201);
    }
}

const makeComment = async () => {
    const postRes = await agent.post(`/api/post`).send({...postJson, hashtags: hashtagTable[8]}).expect(201);
    const productRes = await agent.post(`/api/product`).send({...productJson, hashtags:hashtagTable[2]}).expect(200);

    await followerAgent.post(`/api/post/${postRes.body.result}/comment`)
    .send({comment:"안뇽"}).expect(200);
    await followerAgent.post(`/api/product/${productRes.body.result}/comment`)
    .send({comment:"안뇽2"}).expect(200);
}

const makeLike = async () => {
    const postRes = await agent.post(`/api/post`).send({...postJson, hashtags: hashtagTable[7]}).expect(201);
    const productRes = await agent.post(`/api/product`).send({...productJson, hashtags:hashtagTable[4]}).expect(200);

    await followerAgent.post(`/api/post/${postRes.body.result}/like`).expect(200);
    await followerAgent.post(`/api/product/${productRes.body.result}/like`).expect(200);
}

beforeAll(async () => {
    const res = await agent.post(`/api/user/brand/sign-up`)
    .send(USER_INFO).expect(201);
    USER_ID = res.body.result;

    await agent.post(`/api/user/login`).send({
        email: USER_INFO.email,
        password: USER_INFO.password
    }).expect(200);

    const followerRes = await followerAgent.post(`/api/user/sign-up`).send(FOLLOWER_INFO).expect(201);
    FOLLOWER_ID = followerRes.body.result;

    await followerAgent.post(`/api/user/login`).send({
        email: FOLLOWER_INFO.email,
        password: FOLLOWER_INFO.password
    });

    await followerAgent.post(`/api/user/${USER_ID}/follow`).expect(200);
    await makePosts();
    await makeFollowerPosts();
    await makeComment();
    await makeLike();
});


describe("Recommend Updater Module Test", () => {
    test("Test", async ()=> {
        await UpdateAllHashtag(1000);

        const conn = await GetConnection();
        try {
            const FIND_QUERY = `
                select *
                from user_hashtag
                where user_id = ${FOLLOWER_ID};
            `;

            const [res] = await conn.execute(FIND_QUERY);
            expect(res.length).toBe(8);
        } catch(err) {
            console.error(err);
            throw err;
        } finally {
            await ReleaseConnection(conn);
        }
        expect(true).toBeTruthy();
    });
}); 

afterAll(async () => {
    await agent.delete('/api/user').expect(200);
    await followerAgent.delete('/api/user').expect(200);
    await DeletePool();
});

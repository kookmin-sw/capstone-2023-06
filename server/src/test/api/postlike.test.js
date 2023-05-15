const request = require("supertest");
const app = require("../../testServer.js");
const Posts = require("../../model/post_model.js");
const User = require("../../model/user_model.js");
const {Encryption} = require("../../utils/crypto-util/crypto_util.js");
const agent = request.agent(app);

const USER_INFO = {
    nickname: "PostCommentTest1",
    password: "PostCommentTest1Password",
    email: "PostComment@postcomment.com",
    picture: "SuperTestPicture"
};
const USER_ROLE = 1;

beforeAll(async ()=>{
    const hashedPassword = await Encryption(USER_INFO.password);
    await User.create(USER_INFO.nickname, hashedPassword, 
        USER_INFO.email, USER_INFO.picture, USER_ROLE, (err, user) => {
            if(err) throw err;
            USER_ID = user;
    });
    await agent.post("/api/user/login").send({
        email: USER_INFO.email,
        password: USER_INFO.password
    }).expect(200);
    
    POST_ID = await Posts.create(USER_ID, "Title", "thumbnail", ["hashtag1"], {content: "content"});
});

describe("PostLike API", () => {
    test("toggle => true", (done) => {
        agent
        .post(`/api/post/${POST_ID}/like`)
        .send()
        .expect(200)
        .end((err, res) => {
            if(err) throw err;
            expect(res.body.success).toBe(true);
            expect(res.body.result).toBe(true);
            done();
        });
    });

    test("GetList", (done)=>{
        request(app)
        .get(`/api/post/${POST_ID}/likes`)
        .send()
        .expect(200)
        .end((err, res) => {
            if(err) throw err;
            expect(res.body.success).toBe(true);
            expect(res.body.result.length).toBe(1);
            done();
        });
    });

    test("toggle => false", (done) => {
        agent
        .post(`/api/post/${POST_ID}/like`)
        .send()
        .expect(200)
        .end((err, res) => {
            if(err) throw err;
            expect(res.body.success).toBe(true);
            expect(res.body.result).toBe(false);
            done();
        });
    });
});

afterAll(async ()=>{
    await agent.delete("/api/user").send().expect(200);
});
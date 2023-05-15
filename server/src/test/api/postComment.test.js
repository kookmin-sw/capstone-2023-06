const request = require("supertest");
const app = require("../../testServer.js");
const Posts = require("../../model/post_model.js");
const User = require("../../model/user_model.js");
const {Encryption} = require("../../utils/crypto-util/crypto_util.js");

const PARENT_USER = {
    nickname: "PostCommentTest1",
    password: "PostCommentTest1Password",
    email: "PostComment1@postcomment.com",
    picture: "SuperTestPicture"
};

const CHILD_USER = {
    nickname: "PostCommentTest2",
    password: "PostCommentTest2Password",
    email: "PostComment2@postcomment.com",
    picture: "SuperTestPicture"
}
const USER_ROLE = 1;

let PARENT_USER_ID;
let CHILD_USER_ID;

const parentAgent = request.agent(app);
const childAgent = request.agent(app);

let POST_ID;
beforeAll(async ()=>{
    const parent_hashed = await Encryption(PARENT_USER.password);
    await User.create(PARENT_USER.nickname, parent_hashed, 
        PARENT_USER.email, PARENT_USER.picture, USER_ROLE, (err, user) => {
            if(err) throw err;
            PARENT_USER_ID = user;
    });
    await parentAgent.post("/api/user/login").send({
        email: PARENT_USER.email,
        password: PARENT_USER.password
    }).expect(200);

    const child_hashed = await Encryption(CHILD_USER.password);
    await User.create(CHILD_USER.nickname, child_hashed, 
        CHILD_USER.email, CHILD_USER.picture, USER_ROLE, (err, user) => {
            if(err) throw err;
            CHILD_USER_ID = user;
    });
    await childAgent.post("/api/user/login").send({
        email: CHILD_USER.email,
        password: CHILD_USER.password
    }).expect(200);
    
    POST_ID = await Posts.create(PARENT_USER_ID, "Title", "thumbnail", ["hashtag1"], {content: "content"});
});

describe("PostComment API", () => {
    const PARENT_COMMENT = "혹시 궁금한 거 있으시면 질문해주세요!";
    const CHILD_COMMENT = "저 있어요🤚";
    const CHILD_UPDTE_COMMENT = "앗 아닙니다...";

    let PARENT_COMMENT_ID;
    let CHILD_COMMENT_ID;

    // 댓글 작성
    test("Parent Comment", (done) => {
        parentAgent
        .post(`/api/post/${POST_ID}/comment`)
        .send({comment: PARENT_COMMENT})
        .expect(200)
        .end((err, res) => {
            if(err) throw err;
            expect(res.body.success).toBe(true);
            PARENT_COMMENT_ID = res.body.result;
            done();
        });
    });

    // 댓글 reply가 잘 달리는지
    test("Child Comment", (done) => {
        childAgent
        .post(`/api/post/${POST_ID}/comment`)
        .send({
            parent: PARENT_COMMENT_ID,
            comment: CHILD_COMMENT})
        .expect(200)
        .end((err, res) => {
            if(err) throw err;
            expect(res.body.success).toBe(true);
            CHILD_COMMENT_ID = res.body.result;
            done();
        });
    });

    // 댓글 조회하기
    test("Get Comment", (done) => {
        request(app)
        .get(`/api/post/${POST_ID}/comment/${CHILD_COMMENT_ID}`)
        .send()
        .expect(200)
        .end((err, res)=> {
            if(err) throw err;
            expect(res.body.result.parent_id).toBe(PARENT_COMMENT_ID);
            expect(res.body.result.comment).toBe(CHILD_COMMENT);
            done();
        });
    })

    // 댓글 전체 가져오기 
    test("Get All Comment", (done) => {
        request(app)
        .get(`/api/post/${POST_ID}/comments`)
        .send()
        .expect(200)
        .end((err, res) => {
            if(err) throw err;
            const result = res.body.result;
            //전체 댓글 개수
            expect(result.length).toBe(2);
            done();
        });
    });

    //Update가 잘되는지
    test("Update", (done) => {
        childAgent
        .put(`/api/post/${POST_ID}/comment/${CHILD_COMMENT_ID}`)
        .send({comment: CHILD_UPDTE_COMMENT})
        .expect(200)
        .end((firstErr, _) => {
            if(firstErr) throw firstErr;
            request(app)
            .get(`/api/post/${POST_ID}/comment/${CHILD_COMMENT_ID}`)
            .send()
            .expect(200)
            .end((err, res)=> {
                if(err) throw err;
                expect(res.body.result.parent_id).toBe(PARENT_COMMENT_ID);
                expect(res.body.result.comment).toBe(CHILD_UPDTE_COMMENT);
                done();
            });
        });
    });

    //Delete가 잘되는지
    test("Delete", (done) => {
        parentAgent
        .delete(`/api/post/${POST_ID}/comment/${PARENT_COMMENT_ID}`)
        .send()
        .expect(200)
        .end((err, res) => {
            if(err) throw err;
            expect(res.body.success).toBe(true);
            done();
        });
    });

    //Delete 확인
    test("Delete Check", (done) => {
        request(app)
        .get(`/api/post/${POST_ID}/comments`)
        .send()
        .expect(200)
        .end((err, res) => {
            if(err) throw err;
            const {result} = res.body;
            //전체 댓글 개수
            expect(result.length).toBe(0);
            done();
        });
    });
});

afterAll(async ()=>{
    await Posts.deleteById(POST_ID, PARENT_USER_ID);
    await parentAgent.delete("/api/user").send().expect(200);
    await childAgent.delete("/api/user").send().expect(200);
});
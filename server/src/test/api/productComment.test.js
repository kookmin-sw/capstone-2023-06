const request = require("supertest");
const app = require("../../testServer.js");
const Products = require("../../model/product_model.js");

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
};

const productJson = {
    title: "DESK 책상",
    content: ["DESK 책상의 매력은... Content", "hi"],
    thumbnail: "THUMBNAIL URL",
    price: 2000,
    description: "설명",
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

const parentAgent = request.agent(app);
const childAgent = request.agent(app);

beforeAll(async () => {
    const parentRes = await parentAgent
    .post("/api/user/brand/sign-up")
    .send(PARENT_USER);

    PARENT_USER_ID = parentRes.body.result;
    await parentAgent.post("/api/user/login").send({
        email: PARENT_USER.email,
        password: PARENT_USER.password
    });

    const childRes = await childAgent
    .post("/api/user/sign-up")
    .send(CHILD_USER);

    CHILD_USER_ID = childRes.body.result;
    await childAgent.post("/api/user/login").send({
        email: CHILD_USER.email,
        password: CHILD_USER.password
    });

    const productRes = await parentAgent
    .post("/api/product")
    .send(productJson).expect(200);

    PRODUCT_ID = productRes.body.result;
});

describe("ProductComment API", () => {
    const PARENT_COMMENT = "사주십쇼";
    const CHILD_COMMENT = "싫어요";
    const MODIFY_CHILDCOMMENT = "좋아요";
    let PARENT_COMMENT_ID;
    let CHILD_COMMENT_ID;

    test("Create Comment", (done) => {
        parentAgent
        .post(`/api/product/${PRODUCT_ID}/comment`)
        .send({comment: PARENT_COMMENT})
        .expect(200)
        .end((err, res) => {
            if(err) throw err;
            expect(res.body.success).toBeTruthy();
            PARENT_COMMENT_ID = res.body.result;
            done();
        });
    });

    test("Reply Comment", (done) => {
        childAgent
        .post(`/api/product/${PRODUCT_ID}/comment`)
        .send({
            parent: PARENT_COMMENT_ID,
            comment: CHILD_COMMENT
        })
        .expect(200)
        .end((err, res) => {
            if(err) throw err;
            expect(res.body.success).toBeTruthy();
            CHILD_COMMENT_ID = res.body.result;
            done();
        });
    });

    test("Get Comment", (done) => {
        request(app)
        .get(`/api/product/${PRODUCT_ID}/comment/${CHILD_COMMENT_ID}`)
        .expect(200)
        .end((err, res) => {
            if(err) throw err;
            const {userNickname, comment, parent_id} = res.body.result;
            expect(comment).toBe(CHILD_COMMENT);
            expect(parent_id).toBe(PARENT_COMMENT_ID);
            expect(userNickname).toBe(CHILD_USER.nickname);
            done();
        });
    });

    test("Get Comments", (done) => {
        request(app)
        .get(`/api/product/${PRODUCT_ID}/comments`)
        .expect(200)
        .end((err,res) => {
            if(err) throw err;
            expect(res.body.result.length).toBe(2);
            done();
        });
    });

    test("Update Comment", (done) => {
        childAgent
        .put(`/api/product/${PRODUCT_ID}/comment/${CHILD_COMMENT_ID}`)
        .send({comment:MODIFY_CHILDCOMMENT})
        .expect(200)
        .end((err,res)=> {
            if(err) throw err;
            expect(res.body.success).toBeTruthy();
            done();
        });
    });

    test("Get Comment Validate Update", (done) => {
        request(app)
        .get(`/api/product/${PRODUCT_ID}/comment/${CHILD_COMMENT_ID}`)
        .expect(200)
        .end((err, res) => {
            if(err) throw err;
            const {userNickname, comment, parent_id} = res.body.result;
            expect(comment).toBe(MODIFY_CHILDCOMMENT);
            expect(parent_id).toBe(PARENT_COMMENT_ID);
            expect(userNickname).toBe(CHILD_USER.nickname);
            done();
        });
    });

    test("Delete Comment ERROR", (done) => {
        parentAgent
        .delete(`/api/product/${PRODUCT_ID}/comment/${CHILD_COMMENT_ID}`)
        .expect(400, done);
    });

    test("Delete Comment", (done) => {
        parentAgent
        .delete(`/api/product/${PRODUCT_ID}/comment/${PARENT_COMMENT_ID}`)
        .expect(200)
        .end((err,res) => {
            if(err) throw err;
            expect(res.body.success).toBeTruthy();
            done();
        });
    });


    test("Get Comments Validate Delete", (done) => {
        request(app)
        .get(`/api/product/${PRODUCT_ID}/comments`)
        .expect(200)
        .end((err,res) => {
            if(err) throw err;
            expect(res.body.result.length).toBe(0);
            done();
        });
    });
});

afterAll(async () => {
    await parentAgent.delete('/api/user').expect(200);
    await childAgent.delete('/api/user').expect(200);
});
const request = require("supertest");
const app = require("../../testServer.js");

const USER_INFO = {
    email: "u1@email.com",
    password: "password",
    nickname: "u1",
    picture: "base"
}

const FOLLOWER_INFO_1 = {
    email: "u2@email.com",
    password: "password",
    nickname: "u2",
    picture: "base"
}

const FOLLOWER_INFO_2 = {
    email: "u3@email.com",
    password: "password",
    nickname: "u3",
    picture: "base"
}

const rootAgent = request.agent(app);
const leftAgent = request.agent(app);
const rightAgent = request.agent(app);

let ROOT_USER_ID;
let LEFT_USER_ID;
let RIGHT_USER_ID;

beforeAll(async () => {
    // 회원가입
    const userRes = await rootAgent.post("/api/user/sign-up").send(USER_INFO);
    const leftRes = await leftAgent.post("/api/user/sign-up").send(FOLLOWER_INFO_1);
    const rightRes = await rightAgent.post("/api/user/sign-up").send(FOLLOWER_INFO_2);

    //아이디 할당
    ROOT_USER_ID = userRes.body.result;
    LEFT_USER_ID = leftRes.body.result;
    RIGHT_USER_ID = rightRes.body.result;

    // 로그인
    await rootAgent.post('/api/user/login').send({
        email: USER_INFO.email,
        password: USER_INFO.password
    });

    await leftAgent.post('/api/user/login').send({
        email: FOLLOWER_INFO_1.email,
        password: FOLLOWER_INFO_1.password
    });

    await rightAgent.post('/api/user/login').send({
        email: FOLLOWER_INFO_2.email,
        password: FOLLOWER_INFO_2.password
    });

});

describe("Follower API", () => {
    // 유저 팔로우 
    test("Follow", (done) => {
        leftAgent
        .post(`/api/user/${ROOT_USER_ID}/follow`)
        .expect(200)
        .end((err, res)=> {
            if(err) throw err;
            expect(res.body.result).toBeTruthy();
            done();
        });
    });

    // 유저 팔로우 여부 조회
    test("Follow 조회", (done) => {
        leftAgent
        .get(`/api/user/${ROOT_USER_ID}/follow`)
        .expect(200)
        .end((err,res) => {
            if(err) throw err;
            done();
        });
    });

    // 유저 팔로우 해제
    test("UnFollow", (done) => {
        leftAgent
        .post(`/api/user/${ROOT_USER_ID}/follow`)
        .expect(200)
        .end((err, res)=> {
            if(err) throw err;
            expect(res.body.result).toBeFalsy();
            done();
        });
    });

    // 유저 팔로우 1
    test("ROOT Follow", (done) => {
        leftAgent
        .post(`/api/user/${ROOT_USER_ID}/follow`)
        .expect(200)
        .end((err, res)=> {
            if(err) throw err;
            expect(res.body.result).toBeTruthy();
            done();
        });
    });

    // 유저 팔로우 2
    test("RIGHT Follow", (done) => {
        leftAgent
        .post(`/api/user/${RIGHT_USER_ID}/follow`)
        .expect(200)
        .end((err, res)=> {
            if(err) throw err;
            expect(res.body.result).toBeTruthy();
            done();
        });
    });

    // 유저가 팔로우 하는 사람들
    test("Get My Follows", (done) => {
        leftAgent
        .get(`/api/user/follow`)
        .expect(200)
        .end((err,res) => {
            if(err) throw err;
            expect(res.body.result.length).toBe(2);
            console.log("left유저의 팔로워", res.body.result);
            done();
        });
    });

    // RIGHT USer가 Follow
    test("Follow:Right", (done) => {
        rightAgent
        .post(`/api/user/${ROOT_USER_ID}/follow`)
        .expect(200)
        .end((err, res) => {
            if(err) throw err;
            expect(res.body.result).toBeTruthy();
            done();
        });
    });

    // 해당 유저의 팔로워 수
    test("Follow", (done) => {
        request(app)
        .get(`/api/user/${ROOT_USER_ID}/followers`)
        .expect(200)
        .end((err,res) => {
            if(err) throw err;
            expect(res.body.result.length).toBe(2);
            console.log("Root 유저의 팔로워", res.body.result);
            done();
        });
    });
});

afterAll(async () => {
    await rootAgent.delete('/api/user');
    await leftAgent.delete('/api/user');
    await rightAgent.delete('/api/user');
});
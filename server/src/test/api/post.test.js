const request = require("supertest");
const app = require("../../testServer.js");

const USER_INFO = {
    email: "u1@email.com",
    password: "password",
    nickname: "u1",
    picture: "base"
}
const agent = request.agent(app);
let USER_ID;
beforeAll(async () => {
    const res = await agent.post("/api/user/sign-up").send(USER_INFO);
    USER_ID = res.body.result;
    await agent.post('/api/user/login').send({
        email: USER_INFO.email,
        password: USER_INFO.password
    });
});

describe("Post API", () => {
    const POST_INFO = {
        "title": "title",
        "thumbnail": "thumbnail_image",
        "hashtags": ["hashtag"], // 겹치는 hashtag가 존재하면 안됨
        "content": "content",
    }
    let POST_ID;
    let SECOND_POST_ID;

    //create
    test("Create Post", (done) => {
        agent
        .post('/api/post')
        .send(POST_INFO)
        .expect(201)
        .end((err, res) => {
            if(err) throw err;
            expect(res.body.success).toBeTruthy();
            POST_ID = res.body.result;
            done();
        });
    });

    // Create 2
    test("Create Post 2", (done) => {
        agent
        .post('/api/post')
        .send(POST_INFO)
        .expect(201)
        .end((err, res) => {
            if(err) throw err;
            expect(res.body.success).toBeTruthy();
            SECOND_POST_ID = res.body.result;
            done();
        });
    });

    test("Find Post By Id", (done) => {
        request(app)
        .get(`/api/post/${POST_ID}`)
        .expect(200)
        .end((err, res) => {
            if(err) throw err;
            expect(res.body.success).toBeTruthy();
            const {result} = res.body;
            expect(result.authorEmail).toBe(USER_INFO.email);
            expect(result.title).toBe(POST_INFO.title);
            done();
        });
    })

    test("Find My Post", (done) => {
        agent
        .get(`/api/post/mine`)
        .expect(200)
        .end((err, res) => {
            if(err) throw err;
            expect(res.body.success).toBeTruthy();
            const {result} = res.body;
            expect(result.length).toBe(2);
            done();
        });
    })

    test("Find By Author ID", (done) => {
        agent
        .get(`/api/user/${USER_ID}/posts`)
        .expect(200)
        .end((err, res) => {
            if(err) throw err;
            expect(res.body.success).toBeTruthy();
            const {result} = res.body;
            expect(result.length).toBe(2);
            expect(result[0].hashtags[0]).toBe("hashtag");
            done();
        })
    });

    test("Get Posts", (done) => {
        request(app)
        .post(`/api/post/list`)
        .query({type:'date'})
        .send({
            "startTime": "2022-02-01T01:01:01",
            "endTime": "2024-02-01T01:01:01", 
            "offset": 0,
            "limit": 10,
            "keyword": "title"
        }).expect(200)
        .end((err, res) => {
            if(err) throw err;
            expect(res.body.result.length).toBe(2);
            done();
        })
    });

    test("Like Posts", (done) => {
        agent
        .post(`/api/post/${SECOND_POST_ID}/like`)
        .expect(200, done);
    });

    test("Get Posts LIKES", (done) => {
        request(app)
        .post(`/api/post/list`)
        .query({type:'like'})
        .send({
            "startTime": "2022-02-01T01:01:01",
            "endTime": "2024-02-01T01:01:01", 
            "offset": 0,
            "limit": 10,
            "keyword": "title"
        }).expect(200)
        .end((err, res) => {
            if(err) throw err;
            expect(res.body.result.length).toBe(2);
            expect(res.body.result[0].id).toBe(SECOND_POST_ID);
            console.log(res.body);
            done();
        })
    });

    test("Get Posts UserWeight", (done) => {
        agent
        .post(`/api/post/list`)
        .query({type:'user'})
        .send({
            "startTime": "2022-02-01T01:01:01",
            "endTime": "2024-02-01T01:01:01", 
            "offset": 0,
            "limit": 10,
        }).expect(200)
        .end((err, res) => {
            if(err) throw err;
            // expect(res.body.result.length).toBe(2);
            // expect(res.body.result[0].id).toBe(SECOND_POST_ID);
            console.log(res.body);
            done();
        })
    });
});

afterAll(async () => {
    await agent.delete('/api/user');
});


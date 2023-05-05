const request = require("supertest");
const app = require("../../testServer.js");
const {GetConnection, ReleaseConnection} = require("../../../database/connect.js");
const agent = request.agent(app);

const deleteUser = async (id) => {
    let conn = await GetConnection();
    const DELETE_QUERY = `delete from user where id = ?;`;
    
    try {
        const [res] = await conn.execute(DELETE_QUERY, [id]);
    } catch(err) {
        throw err;
    } finally {
        await ReleaseConnection(conn);
    }
};

describe("POST user/sign-up", () => {
    test("회원가입", (done) => {
        request(app)
        .post("/api/user/sign-up")
        .send(
            { 
                "nickname": "supertest1", 
                "password": "supertest1", 
                "email": "supertest1@naver.com", 
                "picture": "picture_url" 
            } 
        )
        .expect(201)
        .end((err, res) => {
            if(err) throw err;
            expect(res.body.success).toBe(true);
            deleteUser(res.body.result);
            done();
        })
    });
});

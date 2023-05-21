const {GetConnection, ReleaseConnection} = require("../../database/connect.js");
const TABLE = "posts";

const Posts = (posts) => {
    this.id = posts.id;
    this.author_id = posts.author_id;
    this.title = posts.content;
    this.content = posts.content;
    this.created_at = posts.created_at;
    this.modified_at = posts.modified_at;
}

// 트랜잭션을 사용: hashtag가 같이 사용되어야 하기 때문에
Posts.create = async (author_id, title, thumbnail, hashtags, content) => {
    const conn = await GetConnection();
    try {
        await conn.beginTransaction(); // 트랜잭션 시작

        //포스트 업로드 처리
        const [ insertResult ] = await conn.execute(`insert into ${TABLE} (author_id, title, thumbnail, content) values (?, ?, ?, ?);`, [author_id, title, thumbnail, content]);
        const postId = insertResult.insertId;


        if(hashtags) {
            let hashtagList = [];
            //해시태그 추가
            for (const hashtagTitle of hashtags) {
                const [res] = await conn.execute('select * from hashtag where title = ?;', [hashtagTitle]);
                if(!res[0]) { //해시태그가 존재하지 않으면
                    const [hashtag] = await conn.execute('insert into hashtag (title) values (?);', [hashtagTitle]);
                    hashtagList.push({
                        "id": hashtag.insertId,
                        "title": hashtagTitle
                    });
                } else { // 해시태그가 존재하면 
                    hashtagList.push(res[0]);
                }
            };
            

            // 해시태그 <-> 포스트 연관관계

            console.info(hashtagList);
            hashtagList.forEach(async (hashtag) => {
                await conn.execute(`insert into post_hashtag (post_id, hashtag_id) values(?, ?);`,[postId, hashtag.id]);
            });
        }

        await conn.commit();
        return postId;
    } catch(err) {
        await conn.rollback();
        throw new Error("MYSQL ERROR");
    } finally {
        ReleaseConnection(conn);
    }
}

Posts.findByAuthorId = async (userId) => {
    const conn = await GetConnection();
    try {
        const FIND_QUERY = `
            select * 
            from ${TABLE}
            where author_id = ?;
        `;
        const [posts] = await conn.execute(FIND_QUERY, [userId]);
        return posts;
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        ReleaseConnection(conn);
    }
}

Posts.findById = async (id) => {
    const FIND_QUERY = `
        select * from ${TABLE} where id = ?;
    `;
    const conn = await GetConnection();
    try {
        const [posts] = await conn.execute(FIND_QUERY, [id]);
        let post = posts[0];

        const JOIN_QUERY = `
            select h.title
            from post_hashtag p
            left join hashtag h
            on p.hashtag_id = h.id
            where p.post_id = ?
        `;

        if(!post) {
            return null;
        }

        const [hashtagResult] = await conn.execute(JOIN_QUERY, [post.id]);
        const [users] = await conn.execute(`select * from user where id = ?;`, [post.author_id]);
        const returnPost = {
            ...post,
            hashtags: hashtagResult.map((hashtag) => hashtag.title),
            authorNickname: users[0].nickname,
            authorImage: users[0].picture,
            authorEmail: users[0].email 
        };
        return returnPost;
    } catch (err) {
        console.error(err.message);
        throw new Error("MYSQL ERROR");
    } finally {
        ReleaseConnection(conn);
    }
}

Posts.deleteById = async (id, author_id) => {
    const DELETE_QUERY = `
        delete from ${TABLE} where id = ? and author_id = ?;
    `;
    const conn = await GetConnection();
    try {
        const [res] = await conn.execute(DELETE_QUERY, [id, author_id]);
        return res.affectedRows;
    } catch (err) {
        throw new Error("MYSQL ERROR");
    } finally {
        ReleaseConnection(conn);
    }
}

Posts.getAll = async (conn) => {
    try {
        const [posts] = await conn.execute(`
            select p.*, u.nickname as authorNickname, u.email as authorEmail, u.picture as authorPicture 
            from ${TABLE} p
            left join user u
            on p.author_id = u.id
        `);

        return posts;
    } catch (err) {
        throw err;
    }
}


Posts.list = async (condition) => {
    const FIND_QUERY = `
        select * 
        from ${TABLE}
        orders limit ${condition.limit} offset ${condition.offset}
    `;

    const conn = await GetConnection();
    try {
        const [posts] = await conn.execute(FIND_QUERY, []);
        console.info(posts.length);

        const returnPosts = await Promise.all(posts.map(async (post) => {
            const JOIN_QUERY = `
                select h.title
                from post_hashtag p
                left join hashtag h
                on p.hashtag_id = h.id
                where p.post_id = ?
            `;
            const [hashtagResult] = await conn.execute(JOIN_QUERY, [post.id]);
            const [users] = await conn.execute(`select * from user where id = ?;`, [post.author_id]);
            const renewPost = {
                ...post,
                hashtags: hashtagResult.map((hashtag) => hashtag.title),
                content: JSON.parse(post.content).content,
                authorNickname: users[0].nickname,
                authorImage: users[0].picture,
                authorEmail: users[0].email 
            };

            return renewPost;
        }));

        return returnPosts;
    } catch (err) {
        console.error(err.message);
        throw new Error("MYSQL ERROR");
    } finally {
        ReleaseConnection(conn);
    }
}

Posts.getListByDate = async (conn, startTime, endTime, reverse, limit, offset, keyword) => {
    try {
        const FIND_QUERY = `
            select p.*, u.email as authorEmail, u.picture as authorPicture, u.nickname as authorNickname
            from ${TABLE} p
            left join user u
            on p.author_id = u.id
            where p.created_at >= '${startTime}' and p.created_at <= '${endTime}'
            order by p.created_at ${reverse? 'ASC':'DESC'} 
            limit ${limit} offset ${offset};
        `;

        const FIND_QUERY_KEYWORD = `
            select p.*, u.email as authorEmail, u.picture as authorPicture, u.nickname as authorNickname
            from ${TABLE} p
            left join user u
            on p.author_id = u.id
            where p.created_at >= '${startTime}' and p.created_at <= '${endTime}'
            order by p.created_at ${reverse? 'ASC':'DESC'} 
            limit ${limit} offset ${offset};
        `;

        if(!keyword) {
            const [posts] = await conn.execute(FIND_QUERY);
            return posts;
        }
        
        const [posts] = await conn.execute(FIND_QUERY_KEYWORD);
        return posts;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

Posts.getListByLike = async (conn, startTime, endTime, reverse, limit, offset, keyword) => {
    try {
        const FIND_QUERY = `
            select p.*, u.email as authorEmail, u.picture as authorPicture, u.nickname as authorNickname, COUNT(l.post_id) AS likes
            from ${TABLE} p
            left join user u
            on p.author_id = u.id
            left join postlikes l
            on p.id = l.post_id
            where p.created_at >= '${startTime}' and p.created_at <= '${endTime}'
            order by likes ${reverse? 'ASC':'DESC'}, p.created_at ${reverse? 'ASC':'DESC'} 
            limit ${limit} offset ${offset};
        `;

        const FIND_QUERY_KEYWORD = `
            select p.*, u.email as authorEmail, u.picture as authorPicture, u.nickname as authorNickname, COUNT(l.post_id) AS likes
            from ${TABLE} p
            left join user u
            on p.author_id = u.id
            left join postlikes l
            on p.id = l.post_id
            where p.created_at >= '${startTime}' and p.created_at <= '${endTime}'
            group by p.id
            order by likes ${reverse? 'ASC':'DESC'}, p.created_at ${reverse? 'ASC':'DESC'} 
            limit ${limit} offset ${offset};
        `;

        if(!keyword) {
            const [posts] = await conn.execute(FIND_QUERY);
            return posts;
        }
        
        const [posts] = await conn.execute(FIND_QUERY_KEYWORD);
        return posts;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

Posts.getListByUser = async (conn, limit, offset, userId) => {
    try {
        const USER_HASHTAG = `
            select *
            from user_hashtag
            where user_id = ?
            order by score desc;
        `;
        const [userHashtagData] = await conn.execute(USER_HASHTAG, [userId]);

        const FIND_QUERY = `
            select p.id, u.email as authorEmail, u.nickname as authorNickname, u.picture as authorPicture ,COUNT(l.post_id) AS likes
            from posts p
            left join postlikes l
            on p.id = l.post_id
            left join user u
            on p.author_id = u.id
            where p.created_at >= DATE_SUB(NOW(), INTERVAL 1 MONTH) and p.created_at <= now()
            group by p.id
            order by likes desc limit 1500;
        `;

        const [posts] = await conn.execute(FIND_QUERY);

        let renewPosts = [];

        const scoreCalculator = (postHashtagIds) => {
            let score = 0;
            for(userHashtag of userHashtagData) {
                if(userHashtag.hashtag_id in postHashtagIds) {
                    score += userHashtag.score;
                }
            }
            return score;
        }
        
        for(post of posts) {
            const [postHashtags] = await conn.execute('select hashtag_id from post_hashtag where post_id = ?', [post.id]);
            const postHashtagIds = postHashtags.map((h) => h.hashtag_id);
            const score = scoreCalculator(postHashtagIds); 
            renewPosts.push({
                ...post,
                score: score
            });
        }

        renewPosts.sort((a,b) => b.score - a.score);
        
        const newLimit = offset+limit > 1500? 1000: offset+limit;
        renewPosts = renewPosts.slice(offset, newLimit);

        return renewPosts;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports = Posts;
const {GetConnection, ReleaseConnection} = require("../../../database/connect.js");

const WRITE_SCORE  = 5;
const FOLLOW_SCORE = 4;
const COMMENT_SCORE = 4;
const LIKE_SCORE = 3;

const getBasePost = async (conn, limit) => {
    /**
     * 결과 id, likes
     */
    // 현재로부터 1달 기간 동안 좋아요가 가장 많은 상품 id와 좋아요 수, limit 개수 만큼 출력
    const FIND_QUERY = `
        select p.id, COUNT(l.post_id) AS likes
        from posts p
        left join postlikes l
        on p.id = l.post_id
        where p.created_at >= DATE_SUB(NOW(), INTERVAL 1 MONTH) and p.created_at <= now()
        group by p.id
        order by likes desc limit ${limit};
    `;

    try {
        const [products] = await conn.execute(FIND_QUERY);
        return products;
    } catch(err) {
        console.error(err);
        throw err;
    }
}

const getBaseProduct = async (conn, limit) => {
    /**
     * 결과 id, likes
     */
    // 현재로부터 1달 기간 동안 좋아요가 가장 많은 상품 id와 좋아요 수, limit 개수 만큼 출력
    const FIND_QUERY = `
        select p.id, COUNT(l.product_id) AS likes
        from products p
        left join product_likes l
        on p.id = l.product_id
        where p.created_at >= DATE_SUB(NOW(), INTERVAL 1 MONTH) and p.created_at <= now()
        group by p.id
        order by likes desc limit ${limit};
    `;

    try {
        const [products] = await conn.execute(FIND_QUERY);
        return products;
    } catch(err) {
        throw err;
    }
}

// TODO: 로직 수정 완성하기
/**
 * 기존 로직의 문제점: 포스트가 100개, 유저가 100명이면 한 테이블에 100*100이 되어있음
 * 해결방안: 유저가 좋아할 만한 해시태그를 10개만 뽑자
 */


const getBaseHashtags = async (conn, type, ids) => {

    // 모든 해시태그 구하기
    const FIND_QUERY = `
        select h.title
        from ${type}_hashtag p
        left join hashtag h
        on p.hashtag_id = h.id
        ${ids?`where p.${type}_id in (${ids}) group by h.id;`:"group by h.id;"};
    `;
    try {
        const [hashtags] = await conn.execute(FIND_QUERY);
        const hashtagList = await hashtags.map((hashtag)=>hashtag.title);
        return hashtagList;
    } catch(err) {
        console.error(err);
        throw err;
    }
}

const getAllUserId = async (conn) => {
    try {
        const FIND_QUERY = `
            select id
            from user
            where user_role_id = 1;
        `;

        const [usersData] = await conn.execute(FIND_QUERY);
        const userIds = usersData.map((user) => user.id);
        return userIds;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

const getHashtagRank = (hashtagTable, hashtags, points) => {
    // [{title: , score: }]
    let scoredHashtag = hashtagTable;
    for(hashtag of hashtags) {
        scoredHashtag[hashtag.id] = (scoredHashtag[hashtag.id] || 0) + points;
    }
    return scoredHashtag;
}

const userWriteWeight = async (conn, userId, hashtagTable) => {
    try {
        const FIND_POST = `
            select id
            from posts
            where author_id = ?
        `;
        const [posts] = await conn.execute(FIND_POST,[userId]);
        if(!posts[0]) {
            //만약에 하나도 없다면
            return hashtagTable;
        }
        const postIds = await posts.map((post)=> post.id.toString()).join(', ');
        const FIND_POSTHASHTAG = `
            select hashtag_id as id
            from post_hashtag
            ${postIds?`where post_id in (${postIds})`:""}
        `;
        const [hashtags] = await conn.execute(FIND_POSTHASHTAG);
        hashtagTable = await getHashtagRank(hashtagTable, hashtags, WRITE_SCORE);
        return hashtagTable;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

const getHashtagWithType = async (conn, type, targetType, targetString) => {
    try {
        const FIND_QUERY = `
            select id
            from ${type}s
            where ${targetType} in (${targetString});
        `;
        const [res] = await conn.execute(FIND_QUERY);
        
        //없으면 리턴
        if(!res[0]) {
            return [];
        }

        const FIND_HASHTAG = `
            select hashtag_id as id
            from ${type}_hashtag
            where ${type}_id in (${res.map((data) => data.id.toString()).join(', ')});
        `;

        const [hashtags] = await conn.execute(FIND_HASHTAG);
        return hashtags;
    } catch(err) {
        console.error(err);
        throw err;
    }
    
}

// TODO: 해시태그 가져오는 함수 구현 (타입별로)
const userFollowWeight = async (conn, userId, hashtagTable) => {
    try {
        // 유저가 팔로우 하는 사람들 추출
        const FIND_FOLLOW = `
            select follower_id
            from follower
            where user_id = ?
        `;
        const [followers] = await conn.execute(FIND_FOLLOW, [userId]);
        if(!followers[0]) {
            //만약에 팔로우 아무도 안했다면
            return hashtagTable;
        }
        const followerString = followers.map((follower) => follower.follower_id.toString()).join(', ');
        const postHashtags = await getHashtagWithType(conn, 'post', 'author_id', followerString);
        const productHashtags = await getHashtagWithType(conn, 'product', 'author_id', followerString);
        const allHashtags = postHashtags.concat(productHashtags);
        hashtagTable = await getHashtagRank(hashtagTable,allHashtags,FOLLOW_SCORE);
        return hashtagTable;
        //팔로우들이 쓴 포스트 가져오기
        //팔로우가 쓴 상품 가져오기
    } catch (err) {
        console.error(err);
        throw err;
    }
}

const userCommentWeight = async (conn, userId, hashtagTable) => {
    try {
        const FIND_POSTCOMMENT = `
            select post_id
            from post_comments
            where user_id = ?
        `;

        const [postIds] = await conn.execute(FIND_POSTCOMMENT, [userId]);
        let postHashtags = [];
        if(postIds[0]) {
            const postIdsString = postIds.map((post)=> post.post_id.toString()).join(', ');
            postHashtags = await getHashtagWithType(conn,'post', 'id', postIdsString);
        }

        const FIND_PRODUCTCOMMENT = `
            select product_id
            from product_comments
            where user_id = ?
        `;

        const [productIds] = await conn.execute(FIND_PRODUCTCOMMENT, [userId]);
        let productHashtags = [];
        if(productIds[0]) {
            const productIdsString = productIds.map((product)=> product.product_id.toString()).join(', ');
            productHashtags = await getHashtagWithType(conn,'product', 'id', productIdsString);
        }

        const allHashtags = postHashtags.concat(productHashtags);
        hashtagTable =  await getHashtagRank(hashtagTable,allHashtags,COMMENT_SCORE);
        return hashtagTable;
        
    } catch (err) {
        console.error(err);
        throw err;
    }
}

const userLikeWeight = async (conn, userId, hashtagTable) => {
    try {
        const FIND_POSTLIKE = `
            select post_id
            from postlikes
            where user_id = ?
        `;
        const [postIds] = await conn.execute(FIND_POSTLIKE, [userId]);
        let postHashtags = [];
        if(postIds[0]) {
            const postIdsString = postIds.map((post)=> post.post_id.toString()).join(', ');
            postHashtags = await getHashtagWithType(conn,'post', 'id', postIdsString);
        }

        const FIND_PRODUCTLIKE = `
            select product_id
            from product_likes
            where user_id = ?
        `;

        const [productIds] = await conn.execute(FIND_PRODUCTLIKE, [userId]);
        let productHashtags = [];
        if(productIds[0]) {
            const productIdsString = productIds.map((product)=> product.product_id.toString()).join(', ');
            productHashtags = await getHashtagWithType(conn,'product', 'id', productIdsString);
        }

        const allHashtags = postHashtags.concat(productHashtags);
        hashtagTable =  await getHashtagRank(hashtagTable,allHashtags,LIKE_SCORE);
        return hashtagTable;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

const saveWeight = async (conn, userId, hashtagTable) => {
    try {
        await conn.execute(`delete from user_hashtag where user_id = ?;`, [userId]);

        const entries = Object.entries(hashtagTable);
        entries.sort((a, b) => b[1] - a[1]);
        
        let stringValue = [];
        let count = 0;
        for(entry of entries) {
            stringValue.push(`(${userId}, ${entry[0]}, ${entry[1]})`);
            count++;

            if(count === 10) {
                break;
            }
        }


        const insertValues = stringValue.join(`,\n`);
        const INSERT_QUERY = `
            insert into user_hashtag (user_id, hashtag_id, score)
            values ${insertValues}
        `;
        await conn.execute(INSERT_QUERY);
    } catch(err) {
        console.error(err);
        throw err;
    }
}

exports.UpdateAllHashtag = async (limit) => {
    console.log("Updater Get Connection");
    const conn = await GetConnection();
    try {
        // 1. 모든 유저의 아이디 추출
        const USER_IDS = await getAllUserId(conn);
        for(userId of USER_IDS) {
            console.log("유저아이디: ", userId);
            let hashtagTable = {};
            // 유저가 쓴 글 추천
            hashtagTable = await userWriteWeight(conn, userId, hashtagTable);
            
            // 팔로우 대상 추출
            hashtagTable = await userFollowWeight(conn, userId, hashtagTable);
            
            // 댓글을 단 대상 추출
            hashtagTable = await userCommentWeight(conn, userId, hashtagTable);

            // 좋아요한 대상 추출
            hashtagTable = await userLikeWeight(conn, userId, hashtagTable);
            
            // 저장 Update
            await saveWeight(conn, userId, hashtagTable);
        }

        await conn.commit();
    } catch(err) {
        await conn.rollback();
        console.error(err);
        throw err;
    } finally {
        console.log("Updater Release Connection");
        await ReleaseConnection(conn);
    }
}
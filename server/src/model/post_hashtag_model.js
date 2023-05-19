const TABLE = 'post_hashtag';

const PostHashtag = (postHashtag) => {
    this.id = postHashtag.id;
    this.post_id = postHashtag.post_id;
    this.hashtag_id = postHashtag.hashtag_id;
}

PostHashtag.findByPostId = async (conn, postId) => {
    try {
        const FIND_QUERY = `
            select h.title
            from ${TABLE} p
            left join hashtag h
            on p.hashtag_id = h.id
            where p.post_id = ?;
        `;

        const [hashtags] = await conn.execute(FIND_QUERY, [postId]);
        return hashtags;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports = PostHashtag;
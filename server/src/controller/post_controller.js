const Posts = require("../model/post_model.js");

const isSessionLogin = (req, res) => {
    if(!req.isAuthenticated() || !req.user) {
        res.status(403).send({
            success: false,
            message: "세션 로그인 안되었음"
        });
        return false;
    }
    return true;
}

const sendError = (res, msg, status) => {
    res.status(status).send({
        success: false,
        message: msg,
    })  
}

exports.search = (req,res) => {
    
}

exports.create = (req,res) => {
    if(!isSessionLogin(req,res)){
        return;
    }
    const {title, content} = req.body;
    Posts.create(req.user.id, title, JSON.stringify({"content": content}), (err, post) => {
        if (err) {
            sendError(res,err.code,400);
            return;
        }
        
        res.status(201).send({
            success: true,
            message: "Post Create",
            result: {
                id: post.insertId
            }
        });
        return;
    }) 
}

exports.findById = (req, res) => {
    // 인증이 필요없음
    // if(!isSessionLogin(req,res)) {
    //     return;
    // }
    
    Posts.findById(req.params.id, (err, post) => {
        if (err) {
            sendError(res,err.code,400);
            return;
        }
        const searchPost = {
            ...post[0],
            content: JSON.parse(post[0].content).content 
        };
        res.status(200).send({
            success:true,
            message: "포스트 조회 완료",
            post: searchPost
        });

    });
}

exports.deleteById = (req, res) => {
    if(!isSessionLogin(req,res)) {
        return;
    }
    //리팩터링이 필요 굳이 findById 호출할 필요가 있는지
    Posts.findById(req.params.id, (err,post) => {
        if(err) {
            console.log(err);
            sendError(res, err.code, 400);
            return;
        }
        
        if(!post[0]) {
            sendError(res, "존재하지 않음", 404);
            return;
        }

        const { author_id } = post[0];
        if (req.user.id != author_id) {
            sendError(res, "Can't Delete",403);
            return;
        }

        Posts.deleteById(req.params.id, (err, _) => {
            if(err) {
                console.log("err2");
                console.log(err);
                sendError(res, err.code, 400);
                return;
            }
            
            res.status(200).send({
                success: true,
                message: "delete 성공",
            })

        })
    });
}



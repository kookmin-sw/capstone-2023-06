const User = require("../model/user_model.js");
const { Encryption, Decryption } = require("../utils/crypto-util/crypto_util.js");
const validEmailCheck = (email) =>{
    const pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return pattern.test(email)
}

const USER_ROLE = 1;

// 비밀번호를 안보이게 하기 위해서
const userToResponse = (user) => {
    return {
        "id": user.id,
        "nickname": user.nickname,
        "email": user.email,
        "picture": user.picture,
        "user_role": user.user_role
    };
}

exports.uploadProfile = (req,res) => {
    res.status(200).send({
        success: true,
        message: "사진 업로드 성공",
        result: req.file.location
    });
}

exports.findById = function (req, res) {
    User.findById(req.params.id, (err, user) => {
        if (err) {
            res.status(400).send({
                success: false,
                message: err.code,
            });
            return;
        }
        
        if (!user[0]) {
            res.status(200).send({
                success:true,
                message: "유저 찾음",
                result: null
            });
            return
        }
        
        res.status(200).send({
            success:true,
            message: "유저 찾음",
            result: userToResponse(user[0])
        });
    })
}

exports.findByEmail = function (req, res) {
    User.findByEmail(req.params.email, (err, user) => {
        if (err) {
            res.status(400).send({
                success: false,
                message: err.code,
            });
            return;
        }

        if (!user[0]) {
            res.status(200).send({
                success:true,
                message: "유저 찾음",
                result: null
            });
            return;
        }
        
        res.status(200).send({
            success:true,
            message: "유저 찾음",
            result: userToResponse(user[0])
        });
    });
}

exports.userSignUp = async function (req, res) {
    const { nickname, password, email, picture } = req.body;
    
    if(!validEmailCheck(email)) {
        res.status(400).send({
            success: false,
            message: "이메일 형식이 올바르지 않습니다."
        });
        return;
    }

    
    const hashedPassword = await Encryption(password);
    User.create(nickname, hashedPassword, email, picture, USER_ROLE, (err, user) => {
        if (err) {
            res.status(400).send({
                success: false,
                message: err.code,
            });
            return;
        }
        res.status(201).json({
            success: true,
            message: `Sign Up for  ${email}`,
            result: user.insertId
        });
    });
}

exports.login = function (req, res) {
    const user = userToResponse(req.user);
    req.session.user = user;
    req.session.isLogin = true;
    res.json({ success: true, message: "login success", result: user })
};

exports.autologin = function (req, res) {
    if (req.isAuthenticated() && req.user) {
        res.json({
            success: true,
            message: "유저 오토 로그인",
            result: userToResponse(req.user)
        });
        return;
    }

    res.json({
        success: false,
        message: "유저 존재하지 않음",
        result: null
    });
}

exports.logout = function (req, res) {
    req.logout(function (err) {
        req.session.destroy();
        if (err) { return next(err); }
        res.json({
            "success": true,
            "message": "LOGOUT"
        });
    });
}

exports.deleteUser = function (req, res) {
    if(!req.isAuthenticated() || !req.user) {
        res.status(403).send({
            success: false,
            message: "로그인 정보 없음"
        });
        return;
    }

    User.deleteById(req.user.id, (err, _) => {
        if(err) {
            res.status(400).send({
                success: false,
                message: "삭제 실패"
            });
            return;
        }

        req.logout(function (err) {
            req.session.destroy();
            if (err) { return next(err); }
            res.status(200).send({
                success: true,
                message: "delete 성공"
            })
        });
    });
}
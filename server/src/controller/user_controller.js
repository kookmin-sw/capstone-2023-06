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

exports.findByEmail = function (req, res) {
    User.findByEmail(req.params.email, (err, user) => {
        if (err) {
            res.status(400).send({
                success: false,
                message: err.code,
            });
            return;
        }
        
        res.status(200).send({
            success:true,
            user: userToResponse(user[0])
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
            result: {
                userId: user.insertId
            }
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
            user: userToResponse(req.user)
        });
        return;
    }

    res.json({
        success: false,
        user: null
    });
}

exports.logout = function (req, res) {
    req.logout(function (err) {
        req.session.destroy();
        if (err) { return next(err); }
        res.json({
            "isSuccess": true,
            "result": "LOGOUT"
        });
    });
}
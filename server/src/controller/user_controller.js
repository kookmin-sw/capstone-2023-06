const User = require("../model/user_model.js");
const { Encryption, Decryption } = require("../utils/crypto-util/crypto_util.js");

exports.findByEmail = function (req, res) {
    User.findByEmail(req.params.email, (err, user) => {
        if (err) {
            console.log(err);
            res.status(400).send({
                success: false,
                message: err.code,
            });
            return;
        }
        res.json(user);
    });
}

exports.userSignUp = async function (req, res) {
    const { nickname, password, email, picture } = req.body;
    //이메일 형식이 맞는지 체크 해야함
    const hashedPassword = await Encryption(password);
    const USER_ROLE = 1;
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
    console.log('req.user', req.user)
    req.session.user = req.user;
    req.session.isLogin = true;
    res.json({ success: true, message: "login success", result: req.user })
};

exports.autologin = function (req, res) {
    if (req.isAuthenticated() && req.user) {
        res.json({
            success: true,
            user: req.user
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
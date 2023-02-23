const swaggerJSDoc = require("swagger-jsdoc");
const User = require("../model/user_model.js");
const { Encryption, Decryption } = require("../utils/crypto-util/crypto_util.js");

/**
 * @swagger
 *  components:
 *       responses:
 *          UserResponse:
 *              type: "object"
 *              required:
 *                  - success
 *                  - message
 *                  - result
 *              properties:
 *                  success:
 *                      type: boolean
 *                      description: api 요청 성공 여부
 *                  message:
 *                      type: string
 *                      description: 원인 메시지
 *                  result:
 *                      type: object
 *                      description: 유저의 ID
 *              example:
 *                  success: true
 *                  messsage: "Sign up for userEmail"
 *                  result: {userId: 1}
 */

/**
 * @swagger
 *  components:
 *       requests:
 *          UserSignUpRequest:
 *              type: "object"
 *              required:
 *                  - nickname
 *                  - password
 *                  - email
 *                  - picture
 *              properties:
 *                  nickname:
 *                      type: string
 *                      description: User's Nickname
 *                  password:
 *                       type: string
 *                       description: User's Password
 *                  email:
 *                       type: string
 *                       description: User's Email
 *                  picture:
 *                       type: string
 *                       description: User's Profile Image Url
 *              example:
 *                  nickname: "dongwon"
 *                  password: "ehddnjs12"
 *                  email: "dongwon0103@gmail.com"
 *                  picture: "pictureUrl"
 */

/**
 * @swagger
 *  components:
 *       responses:
 *          UserErrorResponse:
 *              type: "object"
 *              required:
 *                  - success
 *                  - message
 *              properties:
 *                  success:
 *                      type: boolean
 *                      description: api 요청 성공 여부
 *                  message:
 *                      type: string
 *                      description: 원인 메시지
 *              example:
 *                  success: true
 *                  messsage: "error message"
 */
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
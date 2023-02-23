const express = require("express");
var router = express.Router();
var userController = require("../controller/user_controller.js");
/**
 * @swagger
 * tags:
 *  name: User
 *  description: 유저 관리
 */

/**
 * @swagger
 * paths:
 *  /user/{email}:
 *   get:
 *      tags: [User]
 *      summary: 특정 이메일을 가진 유저 가져오기
 *      parameters: 
 *          - in: path
 *            name: email
 *            required: true
 *      responses: 
 *          "200":
 *            description: 특정 이메일 유저 정보 가져오기 성공
 *            content: 
 *              application/json:
 *                  schema: 
 *                      $ref: '#/components/responses/UserResponse'
 */
router.get("/:email", userController.findByEmail);

/**
 * @swagger
 * paths:
 *  /user/sign-up:
 *   post:
 *      tags: [User]
 *      summary: 유저 생성하기
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/requests/UserSignUpRequest'

 *                          
 *      responses: 
 *          "201":
 *            description: 특정 이메일 유저 정보 가져오기 성공
 *            content: 
 *              application/json:
 *                  schema: 
 *                      $ref: '#/components/responses/UserResponse'
 */
router.post("/sign-up", userController.userSignUp);
router.post("/login", userController.login);
router.get("/auto-login", userController.autologin);
router.get("/logout", userController.logout);

module.exports = router;


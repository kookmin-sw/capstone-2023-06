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
 *  /user/get-all:
 *   get:
 *      tags: [User]
 *      summary: 유저 정보 모두 가져오기
 *      description: 모든 유저 정보 가져오기
 *      responses: 
 *          "200":
 *            description: 모든 유저 정보 가져오기 성공
 *            content: 
 *              application/json:
 *                  schema: 
 *                      $ref: '#/components/schemas/User'
 */
router.get("/get-all", userController.findAll);

/**
 * @swagger
 * paths:
 *  /user/findByEmail/{email}:
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
 *                      $ref: '#/components/schemas/User'
 */
router.get("/findByEmail/:email", userController.findByEmail);

/**
 * @swagger
 * paths:
 *  /user/sign-up:
 *    post:
 *      tags: [User]
 *      sumary: 유저 가입(POST)
 *      requestBody:
 *        description: 사용자 정보를 기반으로 회원가입
 *        required: true
 *        content: 
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PostUser'
 *      responses:
 *          "200":
 *              description: 유저 추가 완료
 *              content:
 *                application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 */
router.post("/sign-up", userController.userSignUp);

module.exports = router;


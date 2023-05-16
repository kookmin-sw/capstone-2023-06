const Follower = require("../model/follower_model.js");
const {GetConnection, ReleaseConnection} = require("../../database/connect.js");

const sendError = (res, msg, status) => {
    res.status(status).send({
        success: false,
        message: msg,
    })  
}

const sendResult = (res, msg, data) => {
    res.status(200).send({
        success: true,
        message: msg,
        result: data
    })
}

exports.toggle = async (req,res) => {
    const conn = await GetConnection();
    try {
        const follower = await Follower.findByUserIdAndFollowerId(conn, req.user.id, req.params.id);
        if(!follower) {
            // 팔로우 하지 않았으면 하기: create
            Follower.create(conn, req.user.id, req.params.id);
            sendResult(res, "팔로우", true);
            return;
        }
        //팔로우 했으면 해지하기
        const affectedRows = await Follower.deleteByUserIdAndFollowerId(conn, req.user.id, req.params.id);
        if(affectedRows!==1) {
            throw new Error("Inter Error");
        }
        sendResult(res,"언팔로우", false);
        return;
    } catch(err) {
        console.error(err);
        sendError(res,err.message,500);
    } finally {
        ReleaseConnection(conn);
    }
}

exports.isFollow = async (req,res) => {
    const conn = await GetConnection();
    try {
        const follower = await Follower.findByUserIdAndFollowerId(conn, req.user.id, req.params.id);
        if(follower) {
            sendResult(res,"팔로우 상태", true);
            return;
        }
        sendResult(res,"언팔로우 상태", false);
        return;
    } catch(err) {
        console.error(err);
        sendError(res,err.message,500);
    } finally {
        ReleaseConnection(conn);
    }
}

exports.myFollower = async (req,res) => {
    const conn = await GetConnection();
    try {
        const followers = await Follower.findByUserId(conn, req.user.id);
        sendResult(res, "팔로우 리스트", followers);
    } catch(err) {
        console.error(err);
        sendError(res,err.message,500);
    } finally {
        ReleaseConnection(conn);
    }
}

exports.followers = async (req,res) => {
    const conn = await GetConnection();
    try {
        const followers = await Follower.findByFollowerId(conn, req.params.id);
        sendResult(res, "팔로우 리스트", followers);
    } catch(err) {
        console.error(err);
        sendError(res,err.message,500);
    } finally {
        ReleaseConnection(conn);
    }
}
const AuthHandler = (req, res, next) => {
    if(!req.isAuthenticated() || !req.user) {
        res.status(403).send({
            success: false,
            message: "세션 로그인 안되었음"
        });
        return;
    }
    next();
    return;
}

module.exports = AuthHandler;
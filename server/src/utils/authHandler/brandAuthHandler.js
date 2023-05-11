const BrandAuthHandler = (req, res, next) => {
    if(!req.isAuthenticated() || !req.user) {
        res.status(403).send({
            success: false,
            message: "세션 로그인 안되었음"
        });
        return;
    }

    if(req.user_role < 2) {
        res.status(403).send({
            success: false,
            message: "유저의 판매(브랜드) 권한 없음"
        });
        return;
    }
    next();
    return;
}

module.exports = BrandAuthHandler;
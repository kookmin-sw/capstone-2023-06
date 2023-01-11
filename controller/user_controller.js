const User = require("../model/user_model.js");

exports.findAll = function(req, res){
    User.findAll((err,user)=>{
        if(err) res.send(err);
        res.json(user);
    })
}

exports.findByEmail = function(req, res){
    User.findByEmail(req.params.email, (err, user) => {
        if (err) res.send(err);
        res.json(user);
    });
}

exports.userSignUp = function(req, res){
    const { nickname, email, password, phone, authtype, usertype } = req.body;
    User.create(nickname, email, password, phone, authtype, usertype, (err, user)=>{
        if (err) res.send(err);
        res.json({
            "isSuccess": true,
            "result" : [
                user
            ]
        });
    });

}

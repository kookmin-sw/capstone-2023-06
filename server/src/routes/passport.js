
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require("../model/user_model.js");
const { Decryption } = require("../utils/crypto-util/crypto_util.js");

module.exports = () => {
    // Strategy 성공 시 호출됨
    passport.serializeUser((user, done) => {
        console.log('serr ', user);
        done(null, user); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
    });

    // 페이지를 방문할때마다 세션스토어에서 가져와서
    passport.deserializeUser((user, done) => {
        // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
        console.log('deserr ', user);

        done(null, user);   // 여기의 user가 req.user가 됨
    });

    passport.use(
        new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            session: true,
            passReqToCallback: false
        },
            function (email, password, done) {
                return User.findByEmail(email, async (err, user) => {
                    if (err) return done(null, false, { message: err });

                    if (!user) return done(null, false, { message: `No User email by ${email}` });

                    if (!await Decryption(password, user[0].PASSWORD)) return done(null, false, { message: "Not Correct Password" });
                    
                    return done(null, user[0]);
                });
            }
        )
    )
};
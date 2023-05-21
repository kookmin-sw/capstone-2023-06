const express = require("express");
const cors = require('cors');
const app = express();
const moment = require("moment");

const cron = require('node-cron');
const RecommendUpdater = require("./utils/RecommendUpdater/recommendUpdater.js");

const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./routes/passport');
const UserRoute = require("./routes/user_routes.js");
const ProductRoute = require("./routes/product_routes.js");
const PostRoute = require("./routes/post_routes.js");

var cookieParser = require('cookie-parser');
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "/./enviroment/.env") });

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
passportConfig();

app.use("/api/user", UserRoute);
app.use("/api/product", ProductRoute);
app.use("/api/post", PostRoute);
app.use(express.static(path.join(__dirname, '../../client/build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});


// 초(옵션), 분(0~59), 시간(0~23), 일(1~31), 월(1~12), 요일(0~7) 0,7 모두 일요일
// * */4 * * * //4시간마다 실행 
const CYCLE_PATTERN = '*/5 * * * *'; // 릴리즈 시 바꿀 필요 있음 (1분 마다 실행)
cron.schedule(CYCLE_PATTERN, () => {
  const now = moment().format('YYYY-MM-DD HH:mm:ss');
  console.log(`[${now}] Recommend Updater Start`);
  try {
    RecommendUpdater.UpdateAllHashtag(1000);
  } catch(err) {
    const errNow = moment().format('YYYY-MM-DD HH:mm:ss');
    console.log(`[${errNow}]: Recommend Updater Error`);
    console.error(`[${errNow}]: Recommend Updater Error`);
    console.error(err);
  }
});

app.listen(process.env.SERVER_PORT, () => console.log("server start"));
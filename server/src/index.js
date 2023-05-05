const express = require("express");
const cors = require('cors');
const app = express();

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

app.listen(process.env.SERVER_PORT, () => console.log("server start"));
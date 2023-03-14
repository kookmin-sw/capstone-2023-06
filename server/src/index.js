const express = require("express");
const cors = require('cors');
const app = express();

const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./routes/passport');
const UserRoute = require("./routes/user_routes.js");
const ProductRoute = require("./routes/product_routes.js");
var bodyParser = require("body-parser");

var cookieParser = require('cookie-parser');
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "/./../enviroment/.env") });

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: 'http://localhost:3907',
  credentials: true
}));

app.use(cookieParser());

app.use(session({
  secret: 'SECRET_KEY',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
passportConfig();

app.use("/api/user", UserRoute);
app.use("/api/product", ProductRoute);

app.listen(process.env.TEST_SERVER_PORT, () => console.log("server start"));

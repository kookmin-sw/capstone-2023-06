// test-main rest api 
const express = require("express");
const app = express();
const UserRoute = require("./routes/user_routes.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use("/api/user", UserRoute);

app.get("/", (req, res) => {
    res.json({
      success: true,
    });
  });

app.listen(3000, () => console.log("server start"));

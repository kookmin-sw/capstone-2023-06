// test-main rest api 
const express = require("express");
const app = express();
const UserRoute = require("./routes/user_routes.js");
var bodyParser = require("body-parser");
var swaggerJsdoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");
const swaggerOption = require("./swagger/swagger.js")
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({path:path.join(__dirname,"/./../enviroment/.env")});

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use("/api/user", UserRoute);

app.get("/api", (req, res) => {
    res.json({
      success: true,
    });
  });

const specs = swaggerJsdoc(swaggerOption);
app.use("/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, {explorer: true})
);

app.listen(process.env.TEST_SERVER_PORT, () => console.log("server start"));

const options = {
    definition: {
        openapi: "3.0.0",
        components: {
            
        },
        info: {
            title: "Project-A Express API with Swagger",
            version: "0.1.0",
            description: "Project-A api",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "LogRocket",
                url: "https://logrocket.com",
                email: "info@email.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3000/api",
            },
        ],
    },
    apis: ["./routes/*.js", "./swagger/*.js", "./model/*.js"],
};

module.exports = options;
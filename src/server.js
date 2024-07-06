const { checkConnection } = require("./config/db");
const express = require("express");
const app = express();
const config = require("./config");
const port = config.port;
const bodyParser = require("body-parser");
const path = require("path");
const swaggerjsdoc = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");
const glob = require("glob");

checkConnection();
process.env.TZ = "Asia/Jakarta";

//Express configuration
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static(path.join(__dirname, "public")));

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library Express API",
      version: "0.1.0",
      description: "This is a documentation for My library API",
    },
    servers: [
      {
        url: `http://localhost:${port}/`,
      },
    ],
  },
  apis: ["./app/**/*.js"], // Dynamic path generation
};

const specs = swaggerjsdoc(options);
app.use("/", swaggerui.serve, swaggerui.setup(specs));
//express Route
const membersRoute = require("./app/Members/route.js");
const booksRoute = require("./app/Books/route.js");
const borrowAndReturnRoute = require("./app/BorrowAndReturn/route.js");

app.use("/", membersRoute);
app.use("/", booksRoute);
app.use("/", borrowAndReturnRoute);

// Swagger route

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});

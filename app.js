const express = require("express");

const app = express();
const http = require("http").Server(app);

const cors = require("cors");
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");

const { auth } = require("express-openid-connect");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

require("dotenv").config();

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(cors());

app.use(bodyParser.json());

const config = {
    required: false,
    auth0Logout: true,
    appSession: {
        secret: process.env.AUTH0_CLIENT_SECRET,
    },
    baseURL: process.env.BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_DOMAIN,
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
    console.log("We got a request!");
    res.send(req.isAuthenticated() ? "Logged in" : "Logged out");
});

const swaggerDocument = YAML.load("./docs.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/", require("./src/routes/keyresult"));
app.use("/", require("./src/routes/objective"));
app.use("/", require("./src/routes/team"));

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// Development error handler
// Will print stacktrace
app.use((err, req, res, next) => {
    if (process.env.NODE_ENV === "development") {
        // Error handler
        console.error(err);
        res.status(err.status || 500).send({
            message: err.message,
            error: err,
        });
    } else {
        console.error(err);
        res.status(err.status || 500).send({
            message: err.message,
            error: {},
        });
    }
});

http.listen(port, () => {
    console.log("listening on *:" + port);
});

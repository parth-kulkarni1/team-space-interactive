"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app_data_source_1 = require("./app-data-source");
var UserRoute_1 = require("./routes/UserRoute");
var PostRoute_1 = require("./routes/PostRoute");
var session = require("express-session");
var typeorm_pagination_1 = require("typeorm-pagination");
require('dotenv').config();
// establish database connection
app_data_source_1.myDataSource
    .initialize()
    .then(function () {
    console.log("Data Source has been initialized!xzK");
})
    .catch(function (err) {
    console.error("Error during Data Source initialization:", err);
});
// create and setup express app
var app = express();
app.use(typeorm_pagination_1.pagination);
app.use(express.json({ limit: '50mb' }));
app.use(session({
    secret: process.env.EXPRESS_SECERT,
    saveUninitialized: false,
    cookie: { httpOnly: true, maxAge: parseInt(process.env.MAX_AGE), secure: 'auto', sameSite: 'strict' },
    resave: false,
}));
app.set('trust proxy', 1);
var cors = require('cors');
var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(UserRoute_1.router, PostRoute_1.Postrouter);
// start express server
app.listen(4000, function () { return console.log("Running Express On 4000"); });

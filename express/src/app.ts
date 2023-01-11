import * as express from "express"
import { myDataSource } from "./app-data-source"
import { router } from "./routes/UserRoute"
import { Postrouter } from "./routes/PostRoute";
import session = require('express-session');
require('dotenv').config()



// establish database connection
myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!xzK")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

// create and setup express app
const app = express()

app.use(express.json({limit: '50mb'}))


app.use(
    session({
        secret: process.env.EXPRESS_SECERT,
        saveUninitialized: false, // Sets a cookie in the browser by default .. true for now
        cookie: { httpOnly: true, maxAge: parseInt(process.env.MAX_AGE), secure: 'auto', sameSite: 'strict'},
        resave: false, 
    }),
);

app.set('trust proxy', 1)



const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,           
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(router, Postrouter)



// start express server
app.listen(4000, () => console.log("Running Express On 4000"))
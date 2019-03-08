
const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const graphqlHTTP = require("express-graphql");
const dotenv = require("dotenv");
const expressPlayground = require("graphql-playground-middleware-express").default;
const schema = require("./schemas/RootQuery");
const compression = require('compression');
const cors = require('cors');
const morgan = require('morgan');

dotenv.config();

const app = express();

const whitelist = [
    'http://localhost:9357',
    'http://localhost:9957',
    'http://127.0.0.1:9357',
    'http://127.0.0.1:9957',
    'http://local.plan-eat.kitchen',
    'local.plan-eat.kitchen',
    '*'
]

app
    // .use(function(req, res, next) {
    //     res.header('Access-Control-Allow-Credentials', true);
    //     res.header('Access-Control-Allow-Origin', req.headers.origin);
    //     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    //     res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    //     next();
    // })
    .use(cors({
        credentials: true,
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'UPDATE', 'OPTIONS'],
        allowedHeaders: ['X-Requested-With', 'X-HTTP-Method-Override', 'Content-Type', 'Accept']
    }))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended:true}))
    .use(cookieParser())
    .use(compression())
    .use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'))
    .use('/playground', expressPlayground({ endpoint: "/graphql" }))
    .use('/test', (req,res,next) => {
        // res.cookie("id", "dHlsZXIgd2lsbGlhbXM%3D", {
        //     httpOnly: false,
        //     secure: false, //change to true if you are using https
        //     maxAge: 1000 * 60 * 60 * 24 * 7
        // })
        // console.warn('COOKIES', res);
        // res.send('hello world');
    })
    .use("/graphql",
        bodyParser.json(),
        bodyParser.urlencoded({extended:true}),
        cookieParser(),
        graphqlHTTP((req, res) => {
            // console.warn(req,res);
            return {
                schema,
                context: {req, res}
            }
        }
    ))
    .listen(process.env.HTTP_PORT, () =>
        console.log(`Now browse to localhost:${process.env.HTTP_PORT}/graphql`)
    );

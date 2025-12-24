import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cookieparser from 'cookie-parser'
import Authorization from './Middleware/Authorization.middleware.js'
import cors from 'cors'
import { Login ,Signup } from './Controller/user.controller.js'


const app = express();
app.listen(process.env.PORT, () => {
     console.log("server is running on port 4000");
})
mongoose.connect(process.env.DB)


// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors({
    origin: 'http://localhost:5173', // Allow only your React app
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());
app.use(cookieparser());


// home
app.get('/Home' , Authorization , (req ,res) => {
    res.send("welcome to Homepage").status(200);
})

// signup route
app.post('/', Signup )

// login route
app.post('/login', Login)

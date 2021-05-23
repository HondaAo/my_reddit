import "reflect-metadata";
import {createConnection} from "typeorm";
import express from 'express'
import morgan from 'morgan'
import authRoute from './routes/auth'
import postRoute from './routes/post'
import subRoute from './routes/sub'
import trim from "./middleware/trim";
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()

const app = express();

app.use(express.json())
app.use(morgan('dev'))
app.use(trim)
app.use(cookieParser())
app.use('/api/auth', authRoute)
app.use('/api/post', postRoute)
app.use('/api/sub', subRoute)

app.listen(process.env.PORT, async() => {
    console.log(`Server running now`)

    try {
        await createConnection()
        console.log("Connected")
    } catch (error) {
        console.log(error)
    }
})


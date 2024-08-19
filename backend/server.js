import express from 'express'
import connectMongoose from './utils/mongooseConnect.js'
import route from './routes/routes.js'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()

app.use(cors('*'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(route)

connectMongoose()


app.listen(4004, () => console.log('connect to server'))
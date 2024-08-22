import express from 'express'
import connectMongoose from './utils/mongooseConnect.js'
import route from './routes/routes.js'
import dotenv from 'dotenv'
import cors from 'cors'
import cloudinary from 'cloudinary'

dotenv.config()

const app = express()

app.use(cors('*'))
app.use(express.json({limit: '10mb'}))
app.use(express.urlencoded({extended:false}))

app.use(route)

export const cloudinaryConfig = cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// console.log(cloudinaryConfig)
connectMongoose()


app.listen(4004, () => console.log('connect to server'))
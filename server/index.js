import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from "cors"
import helmet from 'helmet'
import morgan from 'morgan'
import authRoute from "./routes/auth.js"

import * as dotenv from 'dotenv'
dotenv.config()

const app=express()

app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));



app.use('/auth',authRoute)

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || 'Something went wrong'
  return res.status(errorStatus).send(errorMessage)
})

// mongoose.connect('mongodb://localhost:27017/gmapintegration', { useNewUrlParser: true }, () => {
//   console.log('connected to mongodb')
// })

async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/gmapintegration',{
      useNewUrlParser:true,
      useUnifiedTopology:true
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Error connecting to MongoDB', error);
  }
}

connectToDatabase();

app.listen(5000, () => {
    console.log('server is listening')
  })
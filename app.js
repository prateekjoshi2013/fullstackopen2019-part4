const config=require('./utils/config')
const express = require('express')
const mongoose=require('mongoose');
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const bodyParser = require('body-parser')
const {requestLogger,unknownEndpoint,errorHandler}=require('./utils/middleware')
const logger=require('./utils/logger')
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true }).then(()=>{
    logger.info('connected to MongoDB')
}).catch((err)=>{
    logger.error('error connection to MongoDB',err.message)
})
app.use(cors())
app.use(bodyParser.json())
app.use(requestLogger)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use(unknownEndpoint)
app.use(errorHandler)
module.exports=app
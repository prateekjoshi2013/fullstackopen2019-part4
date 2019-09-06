const config=require('./utils/config')
const express = require('express')
const mongoose=require('mongoose');
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const bodyParser = require('body-parser')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', blogsRouter)

module.exports=app
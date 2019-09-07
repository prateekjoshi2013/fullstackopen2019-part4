const blogsRouter=require('express').Router()
const Blog=require('../models/blog')

blogsRouter.get('/', (request, response,next) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      }).catch(err=>next(err))
  })
  
  blogsRouter.post('/', (request, response,next) => {
    const blog = new Blog(request.body)
  console.log(blog)
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      }).catch(err=>next(err))
  })
  

module.exports=blogsRouter
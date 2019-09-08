const blogsRouter=require('express').Router()
const Blog=require('../models/blog')
const User=require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response,next) => {
   try{
    const blogs = await Blog.find({}).populate('user',{username:1,name:1})
    console.log(blogs)
    if(blogs){
        response.json(blogs.map(blog=>blog.toJSON()))
    }else{
        response.status(404).end
    }
   }catch(err){
    next(err)
   }
  })
  
  blogsRouter.post('/', async (request, response,next) => {
    const body = request.body
    const token= request.token
    try{
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }   
        const user = await User.findById(decodedToken.id)
        body.user=user._id
        const blog=new Blog(body)
        const result= await blog.save()
        user.blogs=user.blogs.concat(result._id)
        await user.save()
        response.json(result.toJSON())
    }catch(err){
        next(err)
    }
  })

  blogsRouter.delete('/:id', async (request,response,next) => {
    const id = request.params.id
    const token= request.token
    try{
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        const blog=await Blog.findById(id)
        if(blog.user.toString()===decodedToken.id) {
            await Blog.findByIdAndRemove(id);
            return response.status(204).end()
        }else{
            return response.status(400).json({error : 'not authorized to delete the post'})
        }  
       
    }catch(err){
        next(err)
    }
  })

blogsRouter.put('/:id',async (req,res,next)=>{
    const id=(req.params.id)
    try{
        await Blog.findByIdAndUpdate(id,req.body,{new:true})
    }catch(err){
        next(err)
    }
  })
  
module.exports=blogsRouter
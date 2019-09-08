const blogsRouter=require('express').Router()
const Blog=require('../models/blog')

blogsRouter.get('/', async (request, response,next) => {
   try{
    const blogs = await Blog.find({})
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
    const blog = new Blog(request.body)
    try{
        const result= await blog.save()
        if(result){
            response.status(201).json(result.toJSON())
        }else{
            response.status(404).end()
        }
    }catch(err){
        next(err)
    }
  })

  blogsRouter.delete('/:id', async (request,response,next) => {
    const id = request.params.id
    try{
        await Blog.findByIdAndRemove(id);
        response.status(204).end()
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
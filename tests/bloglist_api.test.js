const mongoose=require('mongoose')
const supertest=require('supertest')
const app=require('../app')
const api=supertest(app)
const Blog=require('../models/blog')

const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]

beforeEach(async ()=>{
    await  Blog.deleteMany({})
    const promiseArray=blogs.map(b=>new Blog(b)).map(b=>b.save())
    await Promise.all(promiseArray)
})  

test('blogs are returned as json',async ()=>{
    const response=await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type',/application\/json/)
    expect(response.body.length).toBe(6)
})

test('blogs are returned as json with property id',async ()=>{
    const response=await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type',/application\/json/)
    expect(response.body[0].id).toBeDefined()
})
 
test('blog is saved correctly',async ()=>{
    const newBlog={
        title: "Sixth class tests",
        author: "Rob Marty",
        url: "http://blog.cleancoder.com/uncle-bobby/2017/05/05/TestDefinitions.htmll",
        likes: 20
      }

    const responseBefore = await api.get('/api/blogs')  
    const response=await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type',/application\/json/)
    expect(response.body.title).toEqual("Sixth class tests")
    const responseAfter = await api.get('/api/blogs')  
    expect(responseBefore.body.length+1).toBe(blogs.length+1)
})

test('blog with no likes is saved correctly saved with likes zero',async ()=>{
    const newBlog={
        title: "Sixth class tests",
        author: "Rob Marty",
        url: "http://blog.cleancoder.com/uncle-bobby/2017/05/05/TestDefinitions.htmll"
      }

    const response=await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type',/application\/json/)
    expect(response.body.likes).toEqual(0)
})

test('blog with no author and url is not saved',async ()=>{
    const newBlog={
        author: "Rob Marty",
      }

    const response=await api.post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type',/application\/json/)
})

afterAll(()=>{
    mongoose.connection.close()
})

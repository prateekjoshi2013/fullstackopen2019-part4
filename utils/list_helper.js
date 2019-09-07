const _=require('lodash')
const dummy = (blogs) => {
    return 1;
  }
  
  const totalLikes=(blogs)=>{
      const total=blogs.map(blog=> blog.likes).reduce((sum,curr)=>sum+curr)
      return total
  }

  const favoriteBlog=(blogs)=>{
     return blogs.reduce((max,curr)=>max.likes<curr.likes?curr:max) 
  }

  const mostBlogs=(blogs)=>{
    const found=_.toPairs(_.countBy(blogs,b=>b.author)).reduce((max,curr)=>max[1]>curr[1]?max:curr);
  return { author :found[0], blogs :found[1] }
  }

  const mostLikes=(blogs)=>{
      const found=_.groupBy(blogs.map(b=>{return {author:b.author,likes: b.likes}}),'author')
      const likes=[]
      _.forEach(found,(val,key)=>{
          likes.push({author:key,likes:val.map(v=>v.likes).reduce((sum,curr)=>sum+curr)});
      })
      return likes.reduce((max,curr)=>max.likes>curr.likes?max:curr)
    }

  module.exports = {
    dummy,totalLikes,favoriteBlog,mostBlogs,mostLikes
  }

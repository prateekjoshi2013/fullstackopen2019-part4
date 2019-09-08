const mongoose = require('mongoose')
const uniqueValidator=require('mongoose-unique-validator')
const userSchema = mongoose.Schema({
    username: {type:String,required :true ,unique:true}, 
    name: {type:String,required:true },
    passwordHash: String,
    blogs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog'
    }]
  })

  userSchema.set('toJSON',{
    transform:(doc,ret)=>{
        ret.id=ret._id.toString()
        delete ret._id
        delete ret.__v
        delete ret.passwordHash
    }
})
userSchema.plugin(uniqueValidator)
module.exports=mongoose.model('User', userSchema)
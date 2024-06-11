const mongoose=require('mongoose')
const userdetails=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
})
const user=mongoose.model("users",userdetails)
module.exports=user
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Data = require("../model/schema");
const app = express();
app.use(cors());
app.use(bodyParser.json());
const url = "mongodb://localhost:27017/media";
mongoose.connect(url)
.then(()=>{
    console.log("connected to the backend")
    app.listen(2024,()=>console.log("server has started"))
})
.catch((e)=>console.log("Error has been detected:",e))

app.post('/',async(req,res)=>{
    try {
        const {name,type,description}=req.body
        if(!name || !type || !description){
            throw new Error("Some of the data are missing")
        } 
        const addUserData=await Data.create({name:name,type:type,contents:description})
        return res.status(201).json({message:"Data added successfully"})
        
    } catch (e) {
        return res.status(401).json({message:e.message || "Something went wrong"})
        
    }
})
app.get('/all',async(req,res)=>{
try {
    const getAll= await Data.find()
    if(!getAll){
        throw new Error("Unable to find the notes")
    }
    return res.status(200).json({response:getAll})
} catch (e) {
    return res.status(401).json({response:e.message || "Something went wrong"})
    
}
})
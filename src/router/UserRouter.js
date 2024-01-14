const express = require("express")
const userRouter = express.Router()
   
const usermodle=require("../modle/RegisterModle")




userRouter.post("/deleteuser",async(req,res)=>{
    const id =req.body.id
    const deletedUser = await usermodle.findOneAndDelete({ _id: id });
    const users=await usermodle.find()
    
    res.render("admindash.hbs",{users})
        
})




module.exports = userRouter
const mongoose=require("mongoose")


const newuser=mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    fname:{
        type:String,
       
    },
    lname:{
        type:String,
       
    },
    password:{
        type:String,
       
    },
    address:{
        type:String,
        
    },
   
    phone:{
        type:Number,
        required:true
    },
    status:{
        type:Boolean,
        default:false
    },
    profit:{
        type:Number,
        default:0
    },
    deposit:{
        type:Number,
        default:0
    },
    withdraw:{
        type:Number,
        default:0
    }

    
});

const User=mongoose.model("User",newuser)

module.exports=User

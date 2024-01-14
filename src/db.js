const mongoose  = require("mongoose");


mongoose.connect("mongodb+srv://admin:admin@malik.ylgkkn3.mongodb.net/").then(()=>{
    console.log("database is connected at port: 3000");
}).catch((error)=>{
    console.log(`databse is nt connected ${error}`);
})


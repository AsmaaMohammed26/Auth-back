const mongoose = require("mongoose");

module.exports=()=>{
    mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log("Database connected")
    })
    .catch((err)=>{
        console.log("Database not connected")
        console.log(err)
    })
    
}
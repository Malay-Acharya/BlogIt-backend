const mongoose = require('mongoose')

const URI = "mongodb+srv://dbUser:dbUser@cluster0.yjjbd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const connectDB = async ()=>{
    await mongoose.connect(URI);
    console.log("db connected")
}

module.exports = connectDB;
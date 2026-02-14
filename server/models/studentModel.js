const mongoose = require("mongoose")
const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    age:{
        type:Number,
        required:true,
        min:0,
    },
    address:{
        type:String,
        required:true
    },


},{timestamps:true})

module.exports = mongoose.model("student",studentSchema)
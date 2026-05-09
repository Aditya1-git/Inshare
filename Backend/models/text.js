const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const textSchema = new Schema({
    text:{
        type: String,
        required:true
    },
    code:{
        type:String,
        required:true,
        unique:true
    },
    qrCode:{
        type:String
    }
},{timestamps:true});

module.exports = mongoose.model("Text", textSchema);
const mongoose =require('mongoose')

const dataSch =new mongoose.Schema({
    Email:{type:String},
    fileName:{type:String},
    ids:{type:Number},
    file:{type:String}
})

const mode =mongoose.model("downloadFile",dataSch)

module.exports=mode
const mongoose= require('mongoose');

const AdminSchema=new mongoose.Schema({
    firstNmae:String,
    lastNmae:String,
    email:String,
    password:String,
    role:String,

})

const AdminModel=new mongoose.model("admin",AdminSchema);
module.exports=AdminModel;
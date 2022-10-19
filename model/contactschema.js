const mongoose=require('mongoose');
const contactSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    password:{
        type:Number,
        require:true
    },
    skills:{
        type:String,
        require:true
    }
},{tempstamps:true});

const User=mongoose.model('User',contactSchema);
module.exports=User;
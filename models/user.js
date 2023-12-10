const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    address : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true,
        lowercase:true},
    phoneNumber:{
            type:Number,
            required:true
        }
})
module.exports = mongoose.model('User',userSchema)
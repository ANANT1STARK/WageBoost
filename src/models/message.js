const mongoose = require("mongoose");
 
// create an schema
const Message =mongoose.Schema({
    Name:String,
    Email:String,
   Subject:String,
   Message:String
 

    
           
        }, {collection: 'Message'});
 
// var userModel=mongoose.model('users',userSchema);
 
module.exports = mongoose.model("Message", Message);

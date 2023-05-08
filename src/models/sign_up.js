const mongoose = require("mongoose");
 
// create an schema
const userSchema =mongoose.Schema({
    Name:String,
    Email:String,
    password:String,
    Earning: Number,
    No_of_videos:Number,
    refferal:Number,
    
    refferal_Earning:Number,
    todays_Earning:Number,
    date:String 
           
        }, {collection: 'Users'});
 
// var userModel=mongoose.model('users',userSchema);
 
module.exports = mongoose.model("User", userSchema);

// const { response } = require("express");
// const module = require('module')
let x = 0;
const islogin = async (req , res , next)=>{
try {
    if(req.session.user_id){next();}
    else{
        res.redirect('/sign-in')
    }

    
    
} catch (error) {
    res.send('hello')
}
}   


const islogout = async (req , res , next)=>{
try {
    if(await req.session.user_id){
        res.redirect('/Dashboard')
    }
    else{
        next();
    }
} catch (error) {
    res.send('hello2')
}
}   

module.exports = {islogin , islogout};




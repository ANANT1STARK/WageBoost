
const express = require('express')
const app = express()
const hbs = require('hbs');
const port = 3000
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const Users = require('./models/sign_up')
const config = require('../config/config')
const bodyParser = require('body-parser');
const { escape } = require('querystring');
const Message = require('./models/message')
const auth = require('../middleware/auth');
const { userInfo } = require('os');

app.use(session({secret:config}))
let name;

// connecion with mongodb
app.use(bodyParser.urlencoded({extended: true})) 
app.use(bodyParser.json()) 

mongoose.connect('mongodb://127.0.0.1:27017/video_web', {useNewUrlParser: true});
let conn = mongoose.connection;
conn.on('connected', function() {
    console.log('database is connected successfully');
});
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})
conn.on('error', console.error.bind(console, 'connection error:'));


// Template Enginge 

app.set('view engine','hbs')
app.set('views','D:/PROJECTS/website/HERE/views')
app.use('/static',express.static(path.join(__dirname,'../public')))



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/sign-up',auth.islogout,(req,res)=>{
    res.render('sign_up')
})


app.get('/sign-in',auth.islogout,(req,res)=>{
    res.render('sign_in')
})

// index page
app.get('/',(req,res)=>{
    res.render('index')
})
app.get('/Dashboard',auth.islogin, async (req,res)=>{
    try{
        let user_details = await Users.findOne({Name:req.session.user_id});
    // console.log(await user_details.Email)
        res.render('dashboard_desktop',{Name:req.session.user_id , Email: await user_details.Email , Account_balance :await user_details.Earning , No_of_videos :await user_details.No_of_videos ,  Pan_number:await user_details.Pan_number})
    
   }  
      
    catch(error){console.log(error)}
    })
// sign up page

// sign in page

 

app.get('/withdraw',auth.islogin , async(req, res)=>{
    res.render('withdraw')
})


// for sign-up
app.post('/sign-up', async (req,res)=>{
// console.log(req.body.Name)
    let username = req.body.Name; 
    let Email = req.body.Email;
    let pass = req.body.password;
    let User = await Users.findOne({Email:Email});
    let $username = await Users.findOne({Name:username})
    let date = `${new Date().getDate()}/${new Date().getMonth()}`;
    if($username!=null || User!=null){
        res.render("reserved_username")
    }
    else{
        const User =  new Users(
            {Name : req.body.Name , password : pass , Email : Email ,  Earning:250,
                No_of_videos:0,
                refferal:0,
                
                refferal_Earning:0,todays_Earning :0 , date: date   }
        ) 
    
        const registered = await User.save()
        // console.log(typeof age , typeof gender)
        req.session.user_id = username
        
        res.redirect('/Dashboard')
    }



}
)

app.post('/sign-in',async (req,res)=>{
  
    try{
    Email =  req.body.Email;
        
        let pass = req.body.password;
        let user_details = await Users.findOne({Email:req.body.Email});
       name = user_details.Name;
      
       if (user_details.password == pass){
        
    req.session.user_id = name
    if(user_details.date == `${new Date().getDate()}/${new Date().getMonth()}`){
        res.redirect(`/Dashboard`)
    }
    else{
        await Users.updateOne(
            { Name: req.session.user_id },
             // Specify the ID of the document to update
            { $set: { date: `${new Date().getDate()}/${new Date().getMonth()}`}})

            await Users.updateOne(
                { Name: req.session.user_id },
                 // Specify the ID of the document to update
                { $set: { todays_Earning: 0 } }
                )
                res.redirect(`/Dashboard`)
    }

         
       }
       else{
        res.render('incorrect_password')
       }
    }
    catch{
        res.render('incorrect_password')
    }
    //    console.log(details)
        
     
    

})

app.get(`/profile`,auth.islogin , async (req,res)=>{

    try{
    let user_details = await Users.findOne({Name:req.session.user_id});

    res.render('profile',{Name:req.session.user_id , Email: await user_details.Email , Account_balance :await user_details.Earning , No_of_videos :await user_details.No_of_videos ,  Pan_number:await user_details.Pan_number})

}

catch{
    res.send('got a problem')
}
})  

app.get('/contact',(req , res)=>{
    res.render('contact')

})

app.post('/money-in-video' , async (req , res)=>{




    const data = req.body
   await Users.updateOne(
        { Name: req.session.user_id },
         // Specify the ID of the document to update
        { $inc: { Earning: data.money } }
        )
   await Users.updateOne(
            { Name: req.session.user_id },
             // Specify the ID of the document to update
             { $inc: { No_of_videos: 1 }} 
            )
    await Users.updateOne(
            { Name: req.session.user_id },
                 // Specify the ID of the document to update
                { $inc: { todays_Earning: data.money }} 
            )
    res.json('data recieved fine !')



    // alert('refresh the video and check if Earning is increased')
})
app.post('/money-in-check',async (req,res)=>{
    try{
        let user_details = await Users.findOne({Name:req.session.user_id});
    
        let responsedata = {
            date:await user_details.date ,
            Earn : await user_details.todays_Earning
        }
        let res_data = JSON.stringify(responsedata)
        res.send(res_data)
    
    }
    
    catch{
        res.send(JSON.stringify('got a problem'))
    }

})
// console.log(data.money)})
app.post('/contact',async (req , res)=>{
    try {
        let name = await req.body.Name
        let Email =  await req.body.Email;
        let subject = await req.body.subject
        let message = await req.body.message;
        const Message_send =  new Message(
            {Name : name , Email : Email , Subject : subject ,  Message:message,
              }
        ) 
    
        const registered = await Message_send.save()
        // console.log(typeof age , typeof gender)
    //   alert('thank for your contacting')
       res.render('done',{summary : req.body.subject})
   
    //    console.log(details)
        
    } catch (error) {
        res.send(error)
    }
})
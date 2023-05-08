const express = require('express');
const customer_route = express();
const path = require('path')
const bodyParser = require('body-parser')

// const config = require('../../config/config')
const session = require('express-session');
const { error } = require('console');
// customer_route.use(session({secret:config}))

customer_route.use(bodyParser.json());

customer_route.use(bodyParser.urlencoded({extended: true}))    
customer_route.set('view engine','hbs')
customer_route.set('views','views')
customer_route.use('/static',express.static(path.join(__dirname,'../public')))

// customer_route.get('/sign-up',(req,res)=>{
//     res.render('sign_up')
// })


// customer_route.get('/sign-in',(req,res)=>{
//     res.render('sign_in')
// })



module.exports = {customer_route}
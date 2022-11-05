const express= require("express")
const db= require("./src/database")
require('dotenv').config();
noteservice=require("./src/services/notes")
authmiddleware=require('./src/pre_handlers/auth')
const port=process.env.port
const app=express()

app.use(express.urlencoded({extended:true})) // for taking body paramaters
app.use(express.json()) //parsing json like query



const profileRouter=require('./src/routes/profile/profile')
app.use('/profile',profileRouter)

const noterouter=require('./src/routes/notes/notes')
app.use('/notes',noterouter)

const messagerouter=require('./src/routes/messages/messages')
app.use('/messages',messagerouter)

const friendrouter=require('./src/routes/friends/friends')
app.use('/friends',friendrouter)

app.use('/*',function(req, res, next) {
    res.status(404);
    res.json({status:404,title:"Not Found",msg:"Route not found"});
    next();
   });

app.listen(port,()=>{
    console.log(`🚀 Server listening to ${`http://localhost:${port}`} `);
})

module.exports=app
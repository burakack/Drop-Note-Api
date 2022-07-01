const express= require("express")
const db= require("./src/database")
require('dotenv').config();
noteservice=require("./src/services/notes")
authmiddleware=require('./src/pre_handlers/auth')
var port=process.env.port
const app=express()

app.use(Logger)
app.use(express.static("public")) //for using static structre
app.use(express.urlencoded({extended:true})) // for taking body paramaters
app.use(express.json()) //parsing json like query



const profileRouter=require('./src/routes/profile/profile')
app.use('/profile',profileRouter)

const noterouter=require('./src/routes/notes/notes')
app.use('/notes',noterouter)

const messagerouter=require('./src/routes/messages/messages')
app.use('/messages',messagerouter)





function Logger(req,res,next)
{
    console.log(req.url)
    next()
}
app.listen(port,()=>{
    console.log(`🚀 Server listening to ${`http://localhost:${port}`} `);
})
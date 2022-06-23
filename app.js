const express= require("express")
const db= require("./src/database")
require('dotenv').config();
var port=process.env.port
const app=express()
app.set('view engine', 'ejs');
app.use(Logger)
app.use(express.static("public")) //for using static structre
app.use(express.urlencoded({extended:true})) // for taking body paramaters
app.use(express.json()) //parsing json like query

const profileRouter=require('./src/routes/profile/profile')
const homeRouter=require('./src/routes/home/home')
const messageRouter=require('./src/routes/message/message')
app.use('/profile',profileRouter)
app.use('/',homeRouter)
app.use('/message',messageRouter)



app.get('/',(req,res)=>
{
    console.log("Başarılı istek!")
    res.render('index')
})



function Logger(req,res,next)
{
    console.log(req.url)
    next()
}
app.listen(port,()=>{
    console.log(`🚀 Server listening to ${`http://localhost:${port}`} `);
})
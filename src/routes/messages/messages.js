const express =require('express')
const router = express.Router()
const db=require('../../database')
const messageservice=require('../../services/messages')
var authmiddleware=require('../../pre_handlers/auth')
router.use(authmiddleware.authenticationmid)

router.route('')
.get(async (req,res)=>
{
    messages=await messageservice.getmessages(req.body.to)
    res.send(200,notes)
})
.post(async (req,res)=>
{
    var {to,message}=req.body;
    messages=await messageservice.createmessages(to,message)
    res.send(200,messages)
})
.delete(async (req,res)=>
{
    var {id}=req.body;
    messages=await messageservice.deletemessages(id)
    res.send(200,messages)
})
.put(async (req,res)=>
{
    var {id,message}=req.body;
    messages= await messageservice.updatemessages(id,message)
    res.send(200,messages)
})
module.exports=router
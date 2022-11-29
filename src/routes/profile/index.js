const express =require('express')
const router = express.Router()
const userservice=require('../../services/users')
const tokenservice=require('../../services/tokens')
const noteservice=require('../../services/notes')
const cryptojs=require('crypto-js')
const { response } = require('express')
var authmiddleware=require('../../pre_handlers/auth')
const Joi = require('joi')



router.post('/register',async (req,res)=>
{
    var {nickname,email,password,cpassword}=req.body
    useremail= await userservice.getuserwithemail(email)
    usernickname= await userservice.getuserwithnickname(nickname)
    response.error=""
    if(useremail.message != 'User not found email')
    {
        response.error +="E-mail need to be unique "
    }
    if(usernickname.message !='User not found nickname')
    {
        response.error +="Nickname need to be unique "
    }
    if(password!=cpassword)
    {
        response.error +="E-mail need to be unique "
    }
    if(response.error!="")
    {
        res.status(400).send(response)
    }
    else
    {
        user= await userservice.createuser(nickname,email,password)
        res.status(201).send(user)
    }
})
router.post('/login',async (req,res)=>
{
    var {email,password}=req.body
    user= await userservice.getuserwithemail(email)
    if (user.message!="User not found email" )
        {
            var token=await tokenservice.createtoken(user.id)
            var hash=user.password_hash
            var salt= user.password_salt
            var dbpassword=cryptojs.AES.decrypt(hash,salt).toString(cryptojs.enc.Utf8)
            if(dbpassword==password)
                res.status(200).send({message:"LOGGED İN",token:token})
            else
                res.status(401).send({message:"WRONG PASSWORD"})
        }
    else            
        res.status(401).send({message:"There is no registered user with this email "})
})

router.get('/:slug',async (req,res)=>
{

    user=await userservice.getuserwithid(req.params.slug)
    if(user.message!="User not found id")
        res.status(200).send(user)
    else
        res.status(404).send({message:"User not found id"})
});


router.get('/:slug/notes',async (req,res)=>
{
    userandnotes=await noteservice.getnotebynickname(req.params.slug)
    if(userandnotes.message!="User not found nickname")
        res.status(200).send(userandnotes)
    else 
        res.status(404).send({message:"User not found nickname"})
});

router.use(authmiddleware.authenticationmid)

router.get('',async (req,res)=>
{
    tokenn= await tokenservice.gettokenwithvalue(req.headers.access_token)
    user=await userservice.getuserwithid(tokenn.userid)
    if(user.message!="User not found id")
        res.status(200).send(user)
    else
        res.status(404).send({message:"User not found id"})
});
module.exports={name:"profile",router}
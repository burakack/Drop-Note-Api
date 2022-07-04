const express =require('express')
const router = express.Router()
const db=require('../../database')
const userservice=require('../../services/users')
const tokenservice=require('../../services/tokens')
const noteservice=require('../../services/notes')
const cryptojs=require('crypto-js')

router.route('/register')
.post(async (req,res)=>
{
    var {nickname,email,password,cpassword}=req.body
    useremail= await userservice.getuserwithemail(email)
    usernickname= await userservice.getuserwithnickname(nickname)
    if(useremail.message != 'User not found email')
    {
        res.status(400).send({error:"E-mail need to be unique"})
    }
    if(usernickname.message !='User not found nickname')
    {
        res.status(400).send({error:"Nickname need to be unique"})
    }
    if(password!=cpassword)
    {
        res.status(400).send({error:"Passwords didn't match"})
    }
    user= await userservice.createuser(nickname,email,password)
    res.status(201).send(user)
})
router.route('/login')
.post(async (req,res)=>
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
                res.status(200).send({message:"LOGGED İN",token:token.token})
            else
                res.status(401).send({message:"WRONG PASSWORD"})
        }
    else            
        res.status(401).send({message:"There is no registered user with this email "})
})

router.route('/:slug')
.get(async (req,res)=>
{
    user=await userservice.getuserwithnickname(req.params.slug)
    if(user.message!="User not found nickname")
        res.status(200).send(user)
    res.status(404).send({message:"User not found nickname"})
});


router.route('/:slug/notes')
.get(async (req,res)=>
{
    userandnotes=await noteservice.getnotebynickname(req.params.slug)
    if(userandnotes.message!="User not found nickname")
        res.status(200).send(userandnotes)
    res.status(404).send({message:"User not found nickname"})
});
module.exports=router
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
    if(password==cpassword)
    {
        user= await userservice.createuser(nickname,email,password)
        res.send(user)
    }
    else
        res.send({error:"Passwords didn't match"})
})
router.route('/login')
.post(async (req,res)=>
{
    var {id,email,password}=req.body
    user= await userservice.getuserwithemail(email)
    var token=await tokenservice.createtoken(user.id)
    if (user!=null)
        {
            var hash=user.password_hash
            var salt= user.password_salt
            var dbpassword=cryptojs.AES.decrypt(hash,salt).toString(cryptojs.enc.Utf8)
            if(dbpassword==password)
                res.send({message:"LOGGED İN",token:token.token})
            else
                res.send({message:"WRONG PASSWORD"})
        }
    else    
        res.send({message:"There is no registered user with this email "})
})

router.route('/:slug')
.get(async (req,res)=>
{
    userandnotes=await noteservice.getnotebynickname(req.params.slug)
    res.send(userandnotes)
})
module.exports=router
const express =require('express')
const router = express.Router()
const db=require('../../database')
const userservice=require('../../services/users')
const cryptojs=require('crypto-js')

router.get('/',(req,res)=>
{
    console.log("Başarılı istek!")
    res.render('index')
})

router.route('/register')
.post(async (req,res)=>
{
    var {nickname,email,password,confirmpass}=req.body
    if(password==confirmpass)
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
    var {email,password}=req.body
    user= await userservice.getuserwithemail(email)
    if (user!=null)
        {
            var hash=user.rows[0].password_hash
            var salt= user.rows[0].password_salt
            var dbpassword=cryptojs.AES.decrypt(hash,salt)
            if(dbpassword==password)
                res.send({message:"LOGGED İN"})
            else
                res.send({message:"WRONG PASSWORD"})
        }
    else    
        res.send({message:"There is no registered user with this email "})
})

router.route('/:slug')
.get(async (req,res)=>
{
    user=await userservice.getuser(req.params.slug)
    res.send(user)
})
module.exports=router
const express =require('express')
const router = express.Router()
const db=require('../../database')
const userservice=require('../../services/users')

router.get('/',(req,res)=>
{
    console.log("Başarılı istek!")
    res.render('index')
})

router.route('/register').post(async (req,res)=>
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
router.route('/:slug')
.get(async (req,res)=>
{
    user=await userservice.getuser(req.params.slug)
    res.send(user)
})
module.exports=router
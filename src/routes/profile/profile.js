const express =require('express')
const router = express.Router()
const db=require('../../database')
const userservice=require('../../services/users')

router.get('/',(req,res)=>
{
    console.log("Başarılı istek!")
    res.render('index')
})
router.route('/:slug')
.get(async (req,res)=>
{
    user=await userservice.getuser(req.params.slug)
    res.send(user)
})
.post(async (req,res)=>
{
    var {title,description}=req.body
    res.send({title,description})
    const query = {
        text: 'INSERT INTO nane (title,description) VALUES ($1,$2) RETURNING *',
        values: [title,description],
      }
      db.query(query,(err,res)=>
    {
        console.log(err, res.rows[0])
    })
})

module.exports=router
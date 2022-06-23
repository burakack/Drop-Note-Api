const express =require('express')
const router = express.Router()
const db=require('../../database')

router.get('/',(req,res)=>
{
    console.log("Başarılı istek!")
    res.render('index')
})
router.route('/:id')
.get((req,res)=>
{
    res.render('profile')
})
.post((req,res)=>
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
const express =require('express')
const router = express.Router()
const db=require('../../database')
var noteservice=require('../../services/notes')

router.route('/:slug')
.get(async (req,res)=>
{
    var slug=req.params.slug;
    notes=await noteservice.getnotebytitle(slug)
    res.send(notes)
})
.post(async (req,res)=>
{
    var slug=req.params.slug;
    var {userid, notetext, isanonymus}=req.body;
    notes=await noteservice.createnote(userid, slug, notetext, isanonymus);
    res.send(notes)
})
.delete(async (req,res)=>
{
    var slug=req.params.slug;
    var {userid}=req.body;
    notes=await noteservice.deletenote(userid,slug)
    res.send(notes)
})
.put(async (req,res)=>
{
    var slug=req.params.slug;
    var {userid, notetext, isanonymus}=req.body;
    notes= await noteservice.createnote(userid, slug, notetext, isanonymus);
    res.send(notes)
})
module.exports=router
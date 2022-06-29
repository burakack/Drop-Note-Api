const express =require('express')
const router = express.Router()
const db=require('../../database')
var noteservice=require('../../services/notes')
var authmiddleware=require('../../pre_handlers/auth')
router.use(authmiddleware.authenticationmid)
router.route('/:slug')
.get(async (req,res)=>
{
    var slug=req.params.slug;
    notes=await noteservice.getnotebytitle(slug)
    res.send(200,notes)
})
.post(async (req,res)=>
{
    var slug=req.params.slug;
    var {userid,notetext, isanonymus}=req.body;
    notes=await noteservice.createnote(userid, slug, notetext, isanonymus);
    res.send(200,notes)
})
.delete(async (req,res)=>
{
    var slug=req.params.slug;
    var {userid}=req.body;
    notes=await noteservice.deletenote(userid,slug)
    res.send(200,notes)
})
.put(async (req,res)=>
{
    var {userid, notetext, isanonymus}=req.body;
    notes= await noteservice.updatenote(userid,req.params.slug, notetext, isanonymus);
    res.send(200,notes)
})
module.exports=router
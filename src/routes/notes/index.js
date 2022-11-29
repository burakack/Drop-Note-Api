const express =require('express')
const router = express.Router()
const db=require('../../database')
var noteservice=require('../../services/notes')
var authmiddleware=require('../../pre_handlers/auth')
router.use(authmiddleware.authenticationmid)
const Joi = require('joi')

PostNoteValidation=Joi.object({
    notetext:Joi.string().min(1).max(255).required(),
    isanonymus:Joi.boolean().required(),
})
PutNoteValidation=Joi.object({
    notetext:Joi.string().min(1).max(255).required(),
    isanonymus:Joi.boolean().required(),
})

router.route('/:slug')
.get(async (req,res)=>
{
    var slug=req.params.slug;
    notes=await noteservice.getnotebytitle(slug)
    res.status(200).send(notes)
})
.post(async (req,res)=>
{
    PostNoteValidation.validateAsync(req.body)
    var slug=req.params.slug;
    var {userid,notetext, isanonymus}=req.body;
    if(notetext==null||isanonymus==null)
        res.status(400).send(notes);
    else{
        notes=await noteservice.createnote(userid, slug, notetext, isanonymus);
        res.status(200).send(notes)
    }
})
.delete(async (req,res)=>
{
    var slug=req.params.slug;
    var {userid}=req.body;
    notes=await noteservice.deletenote(slug,userid)
    res.status(200).send(notes)
})
.put(async (req,res)=>
{
    PutNoteValidation.validateAsync(req.body)
    var {userid, notetext, isanonymus}=req.body;
    notes= await noteservice.updatenote(userid,req.params.slug, notetext, isanonymus);
    res.status(200).send(notes)
})
router.route('/:slug/like').post(async (req,res)=>{
    notes= await noteservice.likenote(req.body.userid,req.params.slug,);
    res.status(200).send("LİKED!")
})
router.route('/:slug/dislike').post(async (req,res)=>{
    notes= await noteservice.dislikenote(req.body.userid,req.params.slug,);
    res.status(200).send("DİSLİKED!")
})
module.exports={name:"notes",router}
const express = require("express");
const router = express.Router();
var noteservice = require("../../services/notes");
var authmiddleware = require("../../pre_handlers/auth");
router.use(authmiddleware.authenticationmid);
const Joi = require("joi");

PostNoteValidation = Joi.object({
  userid: Joi.number().required(),
  notetext: Joi.string().min(1).max(255).required(),
  isanonymus: Joi.boolean().required(),
});
PutNoteValidation = Joi.object({
  userid: Joi.number().required(),
  notetext: Joi.string().min(1).max(255).required(),
  isanonymus: Joi.boolean().required(),
});

router
  .route("/:slug")
  .get(async (req, res) => {
    var slug = req.params.slug;
    notes = await noteservice.getnotebytitle(slug);
    notes = notes.filter((note) => note.deleted_at == undefined);
    res.status(200).send(notes);
  })
  .post(async (req, res) => {
    const { error } = PostNoteValidation.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    var slug = req.params.slug;
    var { userid, notetext, isanonymus } = req.body;
    note = await noteservice.createnote(userid, slug, notetext, isanonymus);
    res.status(200).send(note);
  })
  .delete(async (req, res) => {
    var slug = req.params.slug;
    var { userid } = req.body;
    notes = await noteservice.deletenote(slug, userid);
    res.status(200).send(notes);
  })
  .put(async (req, res) => {
    const { error } = PutNoteValidation.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    var { userid, notetext, isanonymus } = req.body;
    notes = await noteservice.updatenote(
      userid,
      req.params.slug,
      notetext,
      isanonymus
    );
    res.status(200).send(notes);
  });
router.route("/:slug/like").post(async (req, res) => {
  notes = await noteservice.likenote(req.body.userid, req.params.slug);
  res.status(200).send("LİKED!");
});
router.route("/:slug/dislike").post(async (req, res) => {
  notes = await noteservice.dislikenote(req.body.userid, req.params.slug);
  res.status(200).send("DİSLİKED!");
});
module.exports = { prefix: "notes", router };

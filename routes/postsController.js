const express = require('express');
const router = express.Router();

const ObjectId = require('mongoose').Types.ObjectId;

const { PostsModel } = require('../models/postsModel');

//pour recuperer les donnees
router.get('/', (req, res) =>
{
    PostsModel.find((err, docs) => {
        if(!err) res.send(docs);
        else console.log("Error getting data:" + err);
    })
});

//pour l'ajout de donnees
router.post('/', (req, res) =>
{
   const newRecord = new PostsModel({
       author: req.body.author,
       message: req.body.message
   });
   newRecord.save((err, docs) => {
    if(!err) res.send(docs);
    else console.log("Error creating new data:" + err);
   })
});

//pour la modification de donnees
router.put('/:id', (req, res) =>
{
  if(!ObjectId.isValid(req.params.id))
  return res.status(400).send("unknown id"+ req.params.id)

  const updateRecord = {
        author: req.body.author,
        message: req.body.message
    };

    PostsModel.findByIdAndUpdate(
        req.params.id,
        { $set: updateRecord },
        { new: true },
        (err, docs) => {
            if(!err) res.send(docs);
            else console.log("Error Updating data:" + err);
        }
    )
});

//pour la suppression de donnees
router.delete('/:id', (req, res) => {
  if(!ObjectId.isValid(req.params.id))
  return res.status(400).send("unknown id"+ req.params.id)

    PostsModel.findByIdAndRemove(
        req.params.id,
        (err, docs) => {
            if(!err) res.send(docs);
            else console.log("Error deleting data:" + err);
        })
});

module.exports = router
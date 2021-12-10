const express = require('express');
const uploader = require("../config/cloudinary.config");


const router = express.Router();

const AnimalModel = require('../models/Animal.model');

// Upload 
router.post('/upload', uploader.single("picture"), (req, res) => {
    if (!req.file) {
        return res.status(500).json({msg: "Upload de arquivo falhou."})
    }

    console.log(req.file);
    return res.status(201).json({url:req.file.path});
});


// POST
router.post('/create-animal', async (req,res) => {
    try {
        const result = await AnimalModel.create(req.body)
        res.status(201).json(result)
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

// GET (lista)
router.get('/animals', async (req, res) => {
    try{
        const animals = await AnimalModel.find()
        res.status(200).json(animals)
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

// GET (Busca detalhada)
router.get('/animals/:id', async (req, res) =>{
    try{
        const result = await AnimalModel.findOne({_id: req.params.id})
        
        if (!result) {
            return res.status(404).json('Animal não encotrado')
        }

        res.status(200).json(result)

    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

// PATCH (Editar)
router.patch('/animals/:id', async (req, res) => {
    try {
        const result = await AnimalModel.findOneAndUpdate(
            { _id: req.params.id},
            {$set: req.body},
            {new: true, runValidators: true}
        );

        if (!result) {
            return res.status(404).json({msg: 'Animal não encontrado'})
        }

        res.status(200).json(result)

    }catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

// DELETE
router.delete('/animals/:id', async (req, res) => {
    try {
        const result = await AnimalModel.deleteOne({_id: req.params.id})
        res.status(200).json({});

    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

module.exports = router;


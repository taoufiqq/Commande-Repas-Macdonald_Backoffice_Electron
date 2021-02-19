const express = require('express')
let SousCategory = require('../models/sousCategory.model');
const router = express.Router();
// show all SousCategory 

router.get('/', (req,res) =>{
  SousCategory.find()
  .then((SousCategory) => res.json(SousCategory))
  .catch((err) => res.status(400).json("Error :" + err));
});
// -------------------------show  Sub category by id--------------------------
router.get('/:id', (req, res) => {
  SousCategory.findById({
      _id: `${req.params.id}`
    })
    .then((category) => res.json(category))
    .catch((err) => res.status(400).json("Error :" + err));
});



router.get('/:id', (req,res) =>{

  SousCategory.find({category: `${req.params.id}`})
  .then((SousCategory) => res.json(SousCategory))
  .catch((err) => res.status(400).json("Error :" + err));
});


//-------------------- get sousCategory to update------------------------- 

router.get('/update/:id', (req,res) =>{

  SousCategory.findById(req.params.id)
  .populate('category')
  .then((SousCategory) => res.json(SousCategory))
  .catch((err) => res.status(400).json("Error :" + err));
});



//----------------------- add SousCategory------------------------------- 
router.route("/add").post((req, res) => {
    const nom = req.body.nom;
    const category = req.body.category;
    const sousCategoryPush = new SousCategory({
      nom,
      category
    });
    sousCategoryPush
      .save()
      .then(() => res.json("Sous Category successfully added"))
      .catch((err) =>  res.status(400).json("Error :" + err));
  });

  //-------------update Sub Category-----------------------------------


  router.route("/update/:id").put((req, res) => {


    const nom = req.body.nom;
    const category = req.body.category;
  
  
      // Find  and update it with the request body
  
      SousCategory.findByIdAndUpdate(req.params.id,{
        nom: req.body.nom,
        category: req.body.category
      })
  
      .then(() => res.status(201).json("Category updated successfully"))
      .catch((err) => res.status(400).json("Error :" + err));
  })

 //--------------------------delete Category------------------------

router.delete('/delete/:id', (req, res) => {
  const {
    id
  } = req.params;

  SousCategory.findOneAndDelete({
      _id: id
    })
    .exec((err, post) => {
      if (err)
        return res.status(500).json({
          code: 500,
          message: 'There was an error deleting the ctg',
          error: err
        })
      res.status(200).json({
        code: 200,
        message: 'ctg deleted',
        deletedPost: post
      })
    });
})
module.exports = router;
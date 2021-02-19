const express = require('express')
let Category = require('../models/category.model');
const router = express.Router();

// show all category 


router.get('/', (req, res) => {
  Category.find()
    .then((category) => res.json(category))
    .catch((err) => res.status(400).json("Error :" + err));
});

// show  category by id
router.get('/:id', (req, res) => {
  Category.findById({
      _id: `${req.params.id}`
    })
    .then((category) => res.json(category))
    .catch((err) => res.status(400).json("Error :" + err));
});


// --------------------add category---------------------------

router.route("/add").post((req, res) => {
  const nom = req.body.nom;
  const categoryPush = new Category({
    nom
  });
  categoryPush
    .save()
    .then(() => res.json("Category successfully added"))
    .catch((err) => res.status(400).json("Error :" + err));
});


//---------------------update Category--------------------------

router.route('/update/:id').put((req, res) => {

  Category.updateOne({
      _id: req.params.id
    }, {
      nom: req.body.nom
    })
    .then(() => res.status(201).json("Category updated successfully"))
    .catch((err) => res.status(400).json("Error :" + err));

});


//--------------------------delete Category------------------------

router.delete('/delete/:id', (req, res) => {
  const {
    id
  } = req.params;

  Category.findOneAndDelete({
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
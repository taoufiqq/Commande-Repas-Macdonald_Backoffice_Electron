const express = require('express')
let Product = require('../models/product.model');
const router = express.Router();
const multer = require('multer');
var fs = require('fs');
var path = require('path')

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
          cb(null, './upload')
      },
  filename: (req, file, cb) => {
              cb(null, file.originalname);
          }

})


const upload = multer({ storage: storage });


// -----------------show all Product------------------ 
router.get('/', (req,res) =>{
  Product.find()
  .then((Product) => res.json(Product))
  .catch((err) => res.status(400).json("Error :" + err));
});



// router.get('/', (req,res) =>{
//     res.send('hi this is when we show all product ')
// });

router.get('/:id', (req,res) =>{

  Product.find({sousCategory: `${req.params.id}`})
  .then(Product =>{ 
    res.json(Product)

  })
  .catch((err) => res.status(400).json("Error :" + err));
});

//-------------------- get Product to update------------------------- 

router.get('/update/:id', (req,res) =>{

  Product.findById(req.params.id)
  .populate('sousCategory')
  .then((Product) => res.json(Product))
  .catch((err) => res.status(400).json("Error :" + err));
});

// -------------------add Product--------------------- 
router.route("/add").post(upload.single('productImg') , (req, res) => {
  //  console.log(req.file);
    const nom = req.body.nom;
    const prix = req.body.prix;
    const ingrediens = req.body.ingrediens;
    const codePromo = req.body.codePromo;
    const productImg = req.file.path;
    const sousCategory = req.body.sousCategory;
  
    const productPush = new Product({  
      nom,
      prix,
      ingrediens,
      codePromo,
      productImg,
      sousCategory

    });
    productPush
      .save()
      .then(() => res.json("Product successfully added"))
      .catch((err) =>  res.status(400).json("Error :" + err));
  });
//-------------update Product-----------------------------------


router.route("/update/:id").put((req, res) => {


  const nom = req.body.nom;
  const prix = req.body.prix;
  const ingrediens = req.body.ingrediens;
  const codePromo = req.body.codePromo;
  const productImg = req.file.path;
  const sousCategory = req.body.sousCategory;


    // Find  and update it with the request body

    Product.findByIdAndUpdate(req.params.id,{
      nom: req.body.nom,
      prix: req.body.prix,
      ingrediens: req.body.ingrediens,
      codePromo: req.body.codePromo,
      productImg: req.file.path,
      sousCategory: req.body.sousCategory
    })

    .then(() => res.status(201).json("Product updated successfully"))
    .catch((err) => res.status(400).json("Error :" + err));
})
//--------------------------delete Product------------------------

router.delete('/delete/:id', (req, res) => {
  const {
    id
  } = req.params;

  Product.findOneAndDelete({
      _id: id
    })
    .exec((err, post) => {
      if (err)
        return res.status(500).json({
          code: 500,
          message: 'There was an error deleting the product',
          error: err
        })
      res.status(200).json({
        code: 200,
        message: 'product deleted',
        deletedPost: post
      })
    });
})

router.get('/upload', (req,res) =>{
  Product.find()
  .then((Product) => res.json(Product))
  .catch((err) => res.status(400).json("Error :" + err));
});


router.get("/image/:name", (req, res) => {
    let filename = path.join(__basedir + '/upload/'+req.params.name)
    res.download(filename)
})

module.exports = router;
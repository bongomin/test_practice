const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
require('../models/author');
const authorsSchema = mongoose.model('author');

// display all authers // localhost:3000/auther/all
router.get('/all', async (req, res) => {
   let searchOptions = {}
   if (req.query.name != null && req.query.name !== '') {
      searchOptions.name = new RegExp(req.query.name, 'i')
   }
   try {
      const allAuthors = await authorsSchema.find(searchOptions)
      res.render('authors/authors', {
         allAuthors: allAuthors,
         searchOptions: req.query
      })
   } catch{
      res.render('/', {
         errorMessage: "There are no users authors error"
      })

   }
});

// add authors page
router.get('/add', (req, res) => {
   res.render('authors/add', { author: new authorsSchema });
})

//create------------------ add/post authers  // localhost:3000/auther/new
router.post('/new', async (req, res) => {
   let author = new authorsSchema({
      "name": req.body.name
   })
   try {
      const newAuthor = await author.save();
      res.redirect('all');

   } catch{
      res.render('authors/add', {
         author: author,
         errorMessage: 'Error created new Author'
      })
   }
});

//display single auther // localhost:3000/auther/singleUser:id
router.get('/singleUser', (req, res) => {
   res.send('single user here')
})

//edit auther / update auther
router.put('/edit', (req, res) => {
   res.send('edit user');
});

//delete /remove auther

module.exports = router;
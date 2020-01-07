const express = require('express');
const router = express.Router();

// show all books
router.get('/all', (req, res) => {
   res.render('books/books');
})

// create- book post method
router.get('/new', (req, res) => {
   res.render('books/add')
})

// show ---display single book
// create- book post method
router.get('/book', (req, res) => {
   res.json({ msg: 'single book' })
})




module.exports = router;
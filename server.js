
if (process.env.NODE_ENV !== 'production') {
   require('dotenv').config({
      path: '.env'
   })
}
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// importing routes
const indexRouter = require('./routes/index');
const authersRouter = require('./routes/authors');
const booksRouter = require('./routes/books');




const app = express();

// databaseConnection
mongoose.connect(process.env.DATABASE_URL, {
   useNewUrlParser: true,
   useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('err', err => {
   console.log(err)
})
db.once('open', () => {
   console.log('Connection to the Database has been Successful')
})


// ejs templating engine
app.set('view engine', 'ejs');
// views dir
app.set('public', __dirname, 'public');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayout)
// making express un derstand my public folder as static
app.use(express.static('public'));

// body parser middleware
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))


// Rourter  Link
app.use(indexRouter);
app.use('/author', authersRouter);
app.use('/books', booksRouter);






// listening to a port 

const PORT = process.env.NODE_ENV || 3000;
app.listen(PORT, () => {
   console.log(`The application is running on port ${PORT}`);
})
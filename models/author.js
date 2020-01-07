const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var myDate = new Date("2016-05-18T16:00:00Z");

const authorsSchema = new Schema({
   "name": {
      type: String,
      required: true
   },
   dateAdded: {
      type: Date,
      default: Date.now
   }
})

mongoose.model('author', authorsSchema);
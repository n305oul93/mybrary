const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Book = require('./book')

const authorSchema = new Schema({
  name: {
    type: String,
    required: true
  }
})

// Will run before remove action occurs
// use normal func instead of arrow as we want to use this
// pass in callback - means code is ok to go forward unless pass in error
authorSchema.pre('remove', function (next) {
  Book.find({ author: this.id }, (err, books) => {
    if (err) {
      next(err)
    } else if (books.length > 0) {
      next(new Error('This author has books still'))
    } else {
      next()
    }
  })
})

module.exports = mongoose.model('Author', authorSchema)

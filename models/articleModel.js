const moongose = require('mongoose');
const Schema = moongose.Schema;

const Article = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  author: {
    type: Object,
    required: true,
  }
}, {
  timestamps: true,
})

module.exports = moongose.model('Article', Article);
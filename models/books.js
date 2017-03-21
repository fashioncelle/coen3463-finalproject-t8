var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var booksSchema = new Schema
(
    {
        title: {type: String, required: true},
        author: {type: String, required: true},
        pub_date: {type: String, required: true},
        edition: {type: String, required: true},
        category: {type: String},
        price: {type: Date},
        uploader_name: {type: String},
        contact: {type: Number},
        email: {type: String},
        created: {type: String},
        updated: {type: String},
    },
    {
        collection: 'books'
    }
);

module.exports = mongoose.model('books', booksSchema);
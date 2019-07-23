var mongoose = require('mongoose');
var moment = require('moment');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/blogdata', {useMongoClient: true})
var db = mongoose.connection;
db.once('error',() => console.log('Mongo!'));
db.once('open',() => console.log('mongodb!'));

var testSchema = new mongoose.Schema({
    title:String,
    author:String,
    date: {
        type: String,
        default: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    },
    content:String
});

var List = mongoose.model('List',testSchema);

module.exports = List;

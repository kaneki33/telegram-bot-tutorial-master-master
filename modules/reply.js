const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO)
mongoose.Promise = global.Promise
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

let Schema = mongoose.Schema

let replysSchema = new Schema({
     ask: {type:String , required:true},
     rep: {type:String , required:true}
});




module.exports = mongoose.model('Replys', replysSchema)
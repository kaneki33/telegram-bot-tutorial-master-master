const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO, { useNewUrlParser: true })
mongoose.Promise = global.Promise
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

let Schema = mongoose.Schema

let userSchema = new Schema({
     id: {type:String , required:true},
     nickName: {type:String , required:true}
});




module.exports = mongoose.model('User', userSchema)
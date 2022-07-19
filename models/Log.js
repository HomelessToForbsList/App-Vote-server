const {Schema, model} = require('mongoose')

const logSchema = new Schema({
  url:{type:String, required: true},
  json:{type:JSON},
  date: {type:String, required:true}
})


module.exports = model('Log', logSchema, 'Logs')
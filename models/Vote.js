const {Schema, model} = require('mongoose')

const voteSchema = new Schema({
  number:{type:Number, required: true},
  date: {type:String, required:true}
})


module.exports = model('Vote', voteSchema, 'Votes')
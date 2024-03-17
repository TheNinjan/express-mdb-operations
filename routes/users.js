var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Connected!'));

const userSchema = mongoose.Schema({
  username: String,
  nickname: String,
  description: String,
  category: {
    type: Array,
    default: []
  },
  createddate: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model("user", userSchema)



const mongoose = require('mongoose');

const { Schema } = mongoose;
const taskSchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  todo: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('TaskCollection', taskSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let studentSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  collegeName: {
    type: String
  },
  skillset: {
      type: String
  },
  profPicFile: {
    type: String,
  },
  
  profPicOG: {
    type: String
  },
  city: {
    type: String
    },
    state: {
        type: String
    },
    dob: {
        type: String
    },
    careerObjective: {
        type: String
    },
    country: {
        type: String
    },
    phone: {
        type:String
    },
}, {
    collection: 'students'
  })

  module.exports = studentSchema

// module.exports = mongoose.model('Student', studentSchema)
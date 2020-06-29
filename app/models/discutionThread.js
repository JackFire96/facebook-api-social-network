const mongoose = require('mongoose')

const Schema = mongoose.Schema

const DiscutionThreadSchema = new Schema({
  message: [{
    content: {
      text: {
        type: String,
        require: true
      },
      comment: [{
        text: {
          type: String
        },
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }
      }]
    },
    time: {
      type: Date,
      default: Date.now
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true
    }
  }],
  time: {
    type: Date,
    default: Date.now
  },
  toChoice: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'choice'
  },
  choice: {
    type: String,
    required: true,
    enum: ['Group', 'Event']
  }
})

module.exports = DiscutionThreadSchema

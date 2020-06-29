const mongoose = require('mongoose')

const Schema = mongoose.Schema

const SurveySchema = new Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  },
  questions: [{
    question: {
      text: String,
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    },
    answers: [{
      index: {
        type: Number
      },
      answer: {
        type: String
      }
    }]
  }],
  answerChoice: [{
    userAnswer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    userChoiceIndex: {
      type: Number
    }
  }]
})

module.exports = SurveySchema

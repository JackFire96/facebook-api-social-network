const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PhotoBookSchema = new Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    unique: true,
    required: [true, 'A photo album is associated with 1 event.']
  },
  photos: [
    {
      content: {
        photo: {
          type: String
        },
        comment: [{
          text: {
            type: String
          },
          memberId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
          }
        }]
      },
      memberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    }
  ]
})

module.exports = PhotoBookSchema

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const GroupSchema = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  icone: {
    type: String,
    default: 'https://picsum.photos/200'
  },
  cover_photo: {
    type: String,
    default: 'https://i.picsum.photos/id/866/600/300.jpg'
  },
  group_type: {
    type: String,
    default: 'public',
    enum: ['public', 'private', 'secret']
  },
  publication_authorization: {
    type: Boolean,
    default: true
  },
  create_event_authorization: {
    type: Boolean,
    default: false
  },
  admins: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Group must have at least one admin']
  }],
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Event must have few or many members']
  }]
})

module.exports = GroupSchema

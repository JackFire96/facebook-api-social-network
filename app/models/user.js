const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  age: {
    type: Number
  },
  city: {
    type: String
  },
  city_code: {
    type: String
  },
  street_number: {
    type: String
  },
  street_type: {
    type: String
  },
  street_name: {
    type: String
  },
  phone: {
    type: String
  },
  image_profil: {
    type: String,
    default: 'https://pbs.twimg.com/profile_images/1126137112825335808/L5WvNz8W_400x400.jpg'
  }
}, {
  collection: 'users',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
  }
})

module.exports = UserSchema

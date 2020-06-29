const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ShoppingListSchema = new Schema({
  shopping_product: [
    {
      product_name: {
        type: String
      },
      product_quantity: {
        type: Number
      },
      arrival_time: {
        type: String
      },
      events: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
      }
    }
  ],
  active: {
    type: Boolean,
    default: true
  }
})

module.exports = ShoppingListSchema

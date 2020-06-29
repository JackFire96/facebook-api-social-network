const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TicketingSchema = new Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  ticket_type: [
    {
      ticket_index: {
        type: Number
      },
      ticket_name: {
        type: String
      },
      amount: {
        type: Number
      },
      ticket_quantity: {
        type: Number
      },
      outside_person_limit: {
        type: Number,
        default: 1
      }
    }
  ],
  ticket_purchased: [{
    ticket_index: {
      type: Number
    },
    user_data: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    last_name: {
      type: String
    },
    first_name: {
      type: String
    },
    adress: {
      type: String
    },
    date_of_purchase: {
      type: Date
    }
  }]
})

module.exports = TicketingSchema

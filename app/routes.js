const User = require('./controllers/user.js')
const Event = require('./controllers/event.js')
const Group = require('./controllers/group.js')
const DiscutionThread = require('./controllers/discutionThread.js')
const PhotoBook = require('./controllers/photoBook.js')
const Survey = require('./controllers/survey.js')
const Ticketing = require('./controllers/ticketing.js')
const ShoppingList = require('./controllers/shoppingList.js')

module.exports = {
  User,
  Event,
  Group,
  DiscutionThread,
  PhotoBook,
  Survey,
  Ticketing,
  ShoppingList
}

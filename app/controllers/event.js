const EventModel = require('../models/event.js')
const JWT = require('../../token/token-organizer')

/**
 * Event
 * @class
 */
class Event {
  constructor (app, connect) {
    this.app = app
    this.EventModel = connect.model('Event', EventModel)
    this.jwt = new JWT()

    this.create()
    this.show()
    this.update()
    this.delete()
    this.search()
  }

  /**
   * Create event
   */
  create () {
    this.app.post('/event/create', this.jwt.checkToken(), (req, res) => {
      this.EventModel(req.body).save().then(event => {
        res.status(200).json(event || {})
      }).catch(err => {
        res.status(500).json({
          code: 500,
          message: err
        })
      })
    })
  }

  /**
   * Show All Event
   */
  show () {
    this.app.get('/event/show', this.jwt.checkToken(), (req, res) => {
      try {
        this.EventModel.find({}).populate('list_of_organizers list_of_members').then(event => {
          res.status(200).json(event || {})
        }).catch(err => {
          res.status(404).json({
            code: 404,
            message: err + ` Not found Event.`
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: err + ` Error retrieving Event.`
        })
      }
    })

    this.app.get('/event/show/:id', this.jwt.checkToken(), (req, res) => {
      try {
        this.EventModel.findById(req.params.id).populate('list_of_organizers').then(event => {
          res.status(200).json(event || {})
        }).catch(err => {
          res.status(404).json({
            code: 404,
            message: err + ` Not found Event with id=${req.params.id}.`
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: err + ` Error retrieving Event with id=${req.params.id}.`
        })
      }
    })
  }

  /**
   * Update by id
   */
  update () {
    this.app.put('/event/update/:id', this.jwt.checkToken(), (req, res) => {
      try {
        this.EventModel.findByIdAndUpdate(req.params.id, req.body).then(event => {
          res.status(200).json(event || {})
        }).catch(err => {
          res.status(404).json({
            code: 404,
            message: err + ` Cannot update Event with id=${req.params.id}. Event was not found!`
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: err + ` Error updating Event with id=${req.params.id}.`
        })
      }
    })
  }

  /**
   * Delete Event by Id
   */
  delete () {
    this.app.delete('/event/destroy/:id', this.jwt.checkToken(), (req, res) => {
      try {
        this.EventModel.findByIdAndRemove(req.params.id).exec().then(event => {
          res.status(200).json(event || {})
        }).catch(err => {
          res.status(404).json({
            code: 404,
            message: err + `Cannot delete Event with id=${req.params.id}.`
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: err
        })
      }
    })
  }

  /**
   * List
   */
  search () {
    this.app.post('/event/search', this.jwt.checkToken(), (req, res) => {
      try {
        const pipe = [{ $limit: req.body.limit || 10 }]

        if (req.body.sort) {
          pipe.push({$sort: req.body.sort})
        }

        this.EventModel.aggregate(pipe).then(event => {
          res.status(200).json(event || {})
        }).catch(err => {
          res.status(500).json({
            code: 500,
            message: err
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: err
        })
      }
    })
  }
}

module.exports = Event

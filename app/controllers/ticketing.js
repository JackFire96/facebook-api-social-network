const TicketingModel = require('../models/ticketing.js')
const OJWT = require('../../token/token-organizer')

/**
 * Ticketing
 * @class
 */
class Ticketing {
  constructor (app, connect) {
    this.app = app
    this.TicketingModel = connect.model('Ticketing', TicketingModel)
    this.jwt = new OJWT()

    this.create()
    this.show()
    this.showById()
    this.update()
    this.delete()
    this.search()
  }

  /**
   * Create Ticketing
   */
  create () {
    this.app.post('/ticketing/create', /* this.jwt.checkToken(), */ (req, res) => {
      this.TicketingModel(req.body).save().then(ticketing => {
        res.status(200).json(ticketing || {})
      }).catch(err => {
        res.status(500).json({
          code: 500,
          message: err
        })
      })
    })
  }

  /**
   * Show All Ticketing
   */
  show () {
    this.app.get('/ticketing/show', /* this.jwt.checkToken(), */ (req, res) => {
      try {
        this.TicketingModel.find({}).then(ticketing => {
          res.status(200).json(ticketing || {})
        }).catch(err => {
          res.status(404).json({
            code: 404,
            message: err + ` Not found Ticketing.`
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: err + ` Error retrieving Ticketing.`
        })
      }
    })
  }

  /**
   * Show Ticketing by id
   */
  showById () {
    this.app.get('/ticketing/show/:id', /* this.jwt.checkToken(), */(req, res) => {
      try {
        this.TicketingModel.findById(req.params.id).then(ticketing => {
          res.status(200).json(ticketing || {})
        }).catch(err => {
          res.status(404).json({
            code: 404,
            message: err + ` Not found Ticketing with id=${req.params.id}.`
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: err + ` Error retrieving Ticketing with id=${req.params.id}.`
        })
      }
    })
  }

  /**
   * Update by id
   */
  update () {
    this.app.put('/ticketing/update/:id', /* this.jwt.checkToken(), */ (req, res) => {
      try {
        this.TicketingModel.findByIdAndUpdate(req.params.id, req.body).then(ticketing => {
          res.status(200).json(ticketing || {})
        }).catch(err => {
          res.status(404).json({
            code: 404,
            message: err + ` Cannot update Ticketing with id=${req.params.id}. Ticketing was not found!`
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: err + ` Error updating Ticketing with id=${req.params.id}.`
        })
      }
    })
  }

  /**
   * Delete Ticketing by Id
   */
  delete () {
    this.app.delete('/ticketing/destroy/:id', this.jwt.checkToken(), (req, res) => {
      try {
        this.TicketingModel.findByIdAndRemove(req.params.id).exec().then(ticketing => {
          res.status(200).json(ticketing || {})
        }).catch(err => {
          res.status(404).json({
            code: 404,
            message: err + `Cannot delete Ticketing with id=${req.params.id}.`
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
    this.app.post('/ticketing/search', this.jwt.checkToken(), (req, res) => {
      try {
        const pipe = [{ $limit: req.body.limit || 10 }]

        if (req.body.sort) {
          pipe.push({$sort: req.body.sort})
        }

        this.TicketingModel.aggregate(pipe).then(ticketing => {
          res.status(200).json(ticketing || {})
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

module.exports = Ticketing

const DiscutionThreadModel = require('../models/discutionthread.js')

/**
 * DiscutionThread
 * @class
 */
class DiscutionThread {
  constructor (app, connect) {
    this.app = app
    this.DiscutionThreadModel = connect.model('DiscutionThread', DiscutionThreadModel)

    this.create()
    this.show()
    this.showById()
    this.update()
    this.delete()
    this.search()
  }

  /**
   * Create DiscutionThread
   */
  create () {
    this.app.post('/discutionthread/create', (req, res) => {
      this.DiscutionThreadModel(req.body).save().then(discutionthread => {
        res.status(200).json(discutionthread || {})
      }).catch(err => {
        res.status(500).json({
          code: 500,
          message: err
        })
      })
    })
  }

  /**
   * Show All DiscutionThread
   */
  show () {
    this.app.get('/discutionthread/show', (req, res) => {
      try {
        this.DiscutionThreadModel.find({}).populate('toChoice').then(discutionthread => {
          res.status(200).json(discutionthread || {})
        }).catch(err => {
          res.status(404).json({
            code: 404,
            message: err + ` Not found DiscutionThread.`
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: err + ` Error retrieving DiscutionThread.`
        })
      }
    })
  }

  /**
   * Show DiscutionThread by id
   */
  showById () {
    this.app.get('/discutionthread/show/:id', (req, res) => {
      try {
        this.DiscutionThreadModel.findById(req.params.id).populate('toChoice').then(discutionthread => {
          res.status(200).json(discutionthread || {})
        }).catch(err => {
          res.status(404).json({
            code: 404,
            message: err + ` Not found DiscutionThread with id=${req.params.id}.`
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: err + ` Error retrieving DiscutionThread with id=${req.params.id}.`
        })
      }
    })
  }

  /**
   * Update by id
   */
  update () {
    this.app.put('/discutionthread/update/:id', (req, res) => {
      try {
        this.DiscutionThreadModel.findByIdAndUpdate(req.params.id, req.body).then(discutionthread => {
          res.status(200).json(discutionthread || {})
        }).catch(err => {
          res.status(404).json({
            code: 404,
            message: err + ` Cannot update DiscutionThread with id=${req.params.id}. DiscutionThread was not found!`
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: err + ` Error updating DiscutionThread with id=${req.params.id}.`
        })
      }
    })
  }

  /**
   * Delete DiscutionThread by Id
   */
  delete () {
    this.app.delete('/discutionthread/destroy/:id', (req, res) => {
      try {
        this.DiscutionThreadModel.findByIdAndRemove(req.params.id).exec().then(discutionthread => {
          res.status(200).json(discutionthread || {})
        }).catch(err => {
          res.status(404).json({
            code: 404,
            message: err + `Cannot delete DiscutionThread with id=${req.params.id}.`
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
    this.app.post('/discutionthread/search', (req, res) => {
      try {
        const pipe = [{ $limit: req.body.limit || 10 }]

        if (req.body.sort) {
          pipe.push({$sort: req.body.sort})
        }

        this.DiscutionThreadModel.aggregate(pipe).then(discutionthread => {
          res.status(200).json(discutionthread || {})
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

module.exports = DiscutionThread

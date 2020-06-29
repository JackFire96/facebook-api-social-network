const PhotoBookModel = require('../models/photobook.js')

/**
 * PhotoBookController
 * @class
 */
class PhotoBookController {
  constructor (app, connect) {
    this.app = app
    this.PhotoBookControllerModel = connect.model('PhotoBook', PhotoBookModel)

    this.create()
    this.show()
    this.showById()
    this.update()
    this.delete()
    this.search()
  }

  /**
   * Create PhotoBookController
   */
  create () {
    this.app.post('/photobook/create', (req, res) => {
      this.PhotoBookControllerModel(req.body).save().then(photobook => {
        res.status(200).json(photobook || {})
      }).catch(err => {
        res.status(500).json({
          code: 500,
          message: err
        })
      })
    })
  }

  /**
   * Show All PhotoBookController
   */
  show () {
    this.app.get('/photobook/show', (req, res) => {
      try {
        this.PhotoBookControllerModel.find({}).then(photobook => {
          res.status(200).json(photobook || {})
        }).catch(err => {
          res.status(404).json({
            code: 404,
            message: err + ` Not found PhotoBookController.`
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: err + ` Error retrieving PhotoBookController.`
        })
      }
    })
  }

  /**
   * Show PhotoBookController by id
   */
  showById () {
    this.app.get('/photobook/show/:id', (req, res) => {
      try {
        this.PhotoBookControllerModel.findById(req.params.id).then(photobook => {
          res.status(200).json(photobook || {})
        }).catch(err => {
          res.status(404).json({
            code: 404,
            message: err + ` Not found PhotoBookController with id=${req.params.id}.`
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: err + ` Error retrieving PhotoBookController with id=${req.params.id}.`
        })
      }
    })
  }

  /**
   * Update by id
   */
  update () {
    this.app.put('/photobook/update/:id', (req, res) => {
      try {
        this.PhotoBookControllerModel.findByIdAndUpdate(req.params.id, req.body).then(photobook => {
          res.status(200).json(photobook || {})
        }).catch(err => {
          res.status(404).json({
            code: 404,
            message: err + ` Cannot update PhotoBookController with id=${req.params.id}. PhotoBookController was not found!`
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: err + ` Error updating PhotoBookController with id=${req.params.id}.`
        })
      }
    })
  }

  /**
   * Delete PhotoBookController by Id
   */
  delete () {
    this.app.delete('/photobook/destroy/:id', (req, res) => {
      try {
        this.PhotoBookControllerModel.findByIdAndRemove(req.params.id).exec().then(photobook => {
          res.status(200).json(photobook || {})
        }).catch(err => {
          res.status(404).json({
            code: 404,
            message: err + `Cannot delete PhotoBookController with id=${req.params.id}.`
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
    this.app.post('/photobook/search', (req, res) => {
      try {
        const pipe = [{ $limit: req.body.limit || 10 }]

        if (req.body.sort) {
          pipe.push({$sort: req.body.sort})
        }

        this.PhotoBookControllerModel.aggregate(pipe).then(photobook => {
          res.status(200).json(photobook || {})
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

module.exports = PhotoBookController

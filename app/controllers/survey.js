const SurveyModel = require('../models/survey.js')
const OJWT = require('../../token/token-organizer')
const MJWT = require('../../token/token-member')

/**
 * Survey
 * @class
 */
class Survey {
  constructor (app, connect) {
    this.app = app
    this.SurveyModel = connect.model('Survey', SurveyModel)
    this.ojwt = new OJWT()
    this.mjwt = new MJWT()

    this.create()
    this.show()
    this.showById()
    this.update()
    this.delete()
    this.search()
  }

  /**
   * Create Survey
   */
  create () {
    this.app.post('/survey/create', /* this.ojwt.checkToken(), */ (req, res) => {
      this.SurveyModel(req.body).save().then(survey => {
        res.status(200).json(survey || {})
      }).catch(err => {
        res.status(500).json({
          code: 500,
          message: err
        })
      })
    })
  }

  /**
   * Show All Survey
   */
  show () {
    this.app.get('/survey/show', (req, res) => {
      try {
        this.SurveyModel.find({}).then(survey => {
          res.status(200).json(survey || {})
        }).catch(err => {
          res.status(404).json({
            code: 404,
            message: err + ` Not found Survey.`
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: err + ` Error retrieving Survey.`
        })
      }
    })
  }

  /**
   * Show Survey by id
   */
  showById () {
    this.app.get('/survey/show/:id', (req, res) => {
      try {
        this.SurveyModel.findById(req.params.id).then(survey => {
          res.status(200).json(survey || {})
        }).catch(err => {
          res.status(404).json({
            code: 404,
            message: err + ` Not found Survey with id=${req.params.id}.`
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: err + ` Error retrieving Survey with id=${req.params.id}.`
        })
      }
    })
  }

  /**
   * Update by id
   */
  update () {
    this.app.put('/survey/update/:id', /* this.ojwt.checkToken(), */ (req, res) => {
      try {
        this.SurveyModel.findByIdAndUpdate(req.params.id, req.body).then(survey => {
          res.status(200).json(survey || {})
        }).catch(err => {
          res.status(404).json({
            code: 404,
            message: err + ` Cannot update Survey with id=${req.params.id}. Survey was not found!`
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: err + ` Error updating Survey with id=${req.params.id}.`
        })
      }
    })

    // update answer choice
    this.app.put('/survey/update/answer/:id', /* this.mjwt.checkToken(), */ (req, res) => {
      try {
        this.SurveyModel.findByIdAndUpdate(req.params.id, req.body.answerChoice).then(survey => {
          res.status(200).json(survey || {})
        }).catch(err => {
          res.status(404).json({
            code: 404,
            message: err + ` Cannot update Survey Answer with id=${req.params.id}. Survey was not found!`
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: err + ` Error updating Survey with id=${req.params.id}.`
        })
      }
    })
  }

  /**
   * Delete Survey by Id
   */
  delete () {
    this.app.delete('/survey/destroy/:id', /* this.ojwt.checkToken(), */(req, res) => {
      try {
        this.SurveyModel.findByIdAndRemove(req.params.id).exec().then(survey => {
          res.status(200).json(survey || {})
        }).catch(err => {
          res.status(404).json({
            code: 404,
            message: err + `Cannot delete Survey with id=${req.params.id}.`
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
    this.app.post('/survey/search', (req, res) => {
      try {
        const pipe = [{ $limit: req.body.limit || 10 }]

        if (req.body.sort) {
          pipe.push({$sort: req.body.sort})
        }

        this.SurveyModel.aggregate(pipe).then(survey => {
          res.status(200).json(survey || {})
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

module.exports = Survey

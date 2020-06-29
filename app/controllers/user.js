const UserModel = require('../models/user.js')
/**
 * User
 * @class
 */
class User {
  constructor (app, connect) {
    this.app = app
    this.UserModel = connect.model('User', UserModel)

    this.create()
    this.show()
    this.update()
    this.delete()
    this.search()
  }

  /**
   * Create user if email doesn't exist
   */
  create () {
    this.app.post('/user/create', (req, res) => {
      try {
        this.UserModel.find({email: req.body.email}, (err, user) => {
          if (user.length) {
            res.status(409).json({
              code: 409,
              message: err + ', this email is already used please choose another one.'
            })
          } else {
            // Validate request
            if (!req.body) {
              res.status(400).send({ message: 'Content can not be empty!' })
              return
            }

            this.UserModel(req.body).save().then(user => {
              res.status(201).json(user || {})
            }).catch(err => {
              res.status(500).json({
                code: 500,
                message: err + ', some error occured while creating the user.'
              })
            })
          }
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
   * Show User by id
   */
  show () {
    this.app.get('/user/show', (req, res) => {
      try {
        this.UserModel.find({}).then(user => {
          res.status(200).json(user || {})
        }).catch(err => {
          res.status(404).json({
            code: 404,
            message: err + ` Not found User.`
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: err + ` Error retrieving User.`
        })
      }
    })

    this.app.get('/user/show/:id', (req, res) => {
      try {
        this.UserModel.findById(req.params.id).then(user => {
          res.status(200).json(user || {})
        }).catch(err => {
          res.status(404).json({
            code: 404,
            message: err + ` Not found User with id=${req.params.id}.`
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: err + ` Error retrieving User with id=${req.params.id}.`
        })
      }
    })
  }

  /**
   * Update by id
   */
  update () {
    this.app.put('/user/update/:id', (req, res) => {
      try {
        this.UserModel.findByIdAndUpdate(req.params.id, req.body).then(user => {
          res.status(200).json(user || {})
        }).catch(err => {
          res.status(404).json({
            code: 404,
            message: err + ` Cannot update User with id=${req.params.id}. User was not found!`
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: err + ` Error updating User with id=${req.params.id}.`
        })
      }
    })
  }

  /**
   * Delete user by Id
   */
  delete () {
    this.app.delete('/user/destroy/:id', (req, res) => {
      try {
        this.UserModel.findByIdAndRemove(req.params.id).exec().then(user => {
          res.status(204).json(user || {})
        }).catch(err => {
          res.status(404).json({
            code: 404,
            message: err + `Cannot delete User with id=${req.params.id}.`
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
    this.app.post('/user/search', (req, res) => {
      try {
        const pipe = [{ $limit: req.body.limit || 10 }]

        if (req.body.sort) {
          pipe.push({$sort: req.body.sort})
        }

        this.UserModel.aggregate(pipe).then(user => {
          res.status(200).json(user || {})
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

module.exports = User

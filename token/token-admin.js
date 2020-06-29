const CryptoJS = require('crypto-js')

/**
 * Jwt - Json Web Token
 */
class JWT {
  /**
   * Encode base64
   * @param {string} source
   * @return {string} string
   */
  encodeBase64 (source) {
    const encodedSource = CryptoJS.enc.Utf8.parse(JSON.stringify(source))

    return CryptoJS.enc.Base64.stringify(encodedSource)
      .replace(/=+$/, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
  }

  /**
   * Encode source to SHA256
   * @param {string} source
   * @return {string} string
   */
  encodeSHA256 (source) {
    const secret = 'secret'
    let encodedSource = CryptoJS.enc.Utf8.parse(JSON.stringify(source))

    encodedSource = CryptoJS.HmacSHA256(encodedSource, secret)

    return this.encodeBase64(encodedSource)
  }

  /**
   * JWT Generator
   * @param {Object} user
   * @param {string} user.id
   * @param {string} user.email
   * @return {Object} token
   * @return {string} token.header
   * @return {string} token.payload
   * @return {string} token.signature
   */
  JWTgenerator (user) {
    if (!user.id && !user.email) {
      return new Error('[ERROR] JWTgenerator() -> user id or email is missing !')
    }

    const header = { alg: 'HS256', typ: 'JWT' }
    const payload = { id: user.id, email: user.email }
    const signature = { header, payload, timestamp: Date.now() }

    return {
      header: this.encodeBase64(header),
      payload: this.encodeBase64(payload),
      signature: this.encodeSHA256(signature)
    }
  }

  /**
   * Save token
   * @param {string} token
   */
  saveToken (token) {
    if (process.env.TOKENS_ADMIN) {
      const tokens = process.env.TOKENS_ADMIN.split(',')

      tokens.push(token)

      process.env.TOKENS_ADMIN = tokens.join(',')

      return
    }

    process.env.TOKENS_ADMIN = token
  }

  /**
   * Get tokens
   * @return {Array} TOKENS_ADMIN
   */
  getTokens () {
    return process.env.TOKENS_ADMIN.split(',')
  }

  getToken (tokenSource) {
    const tokens = this.getTokens()

    return tokens.filter(token => token === tokenSource ? token : false)[0] || false
  }

  verify (tokenSource) {
    return this.getToken(tokenSource)
  }

  checkToken () {
    process.env.TOKENS_ADMIN = 'adminAuth6887wwewrwfwrtrew'

    return (req, res, next) => {
      if (req.headers['admin-authentication'] || req.headers['token']) {
        const token = req.headers['admin-authentication'] || req.headers['token']

        if (this.verify(token)) {
          next()

          return
        }

        res.status(401).json({
          code: 401,
          message: 'unauthorized'
        })

        return
      }

      res.status(403).json({
        code: 403,
        message: 'Invalid token'
      })
    }
  }
}

module.exports = JWT

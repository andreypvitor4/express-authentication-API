const jwt = require('jsonwebtoken')

function generateToken(params = {}) {
  return jwt.sign(params, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRES_IN || '1h',
  })
}

module.exports = generateToken
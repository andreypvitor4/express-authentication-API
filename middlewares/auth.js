const jwt = require('jsonwebtoken')

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization

  if(!authHeader) {
    return res.status(401).send({error: 'nenhum token encontrado'})
  }

  const parts = authHeader.split(' ')

  if(!parts.length === 2) {
    return res.status(401).send({error: 'token formatado de forma incorreta 1'})
  }

  const [scheme, token] = parts

  if(!(/^Bearer$/i.test(scheme))) {
    return res.status(401).send({error: 'token formatado de forma incorreta 2'})
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if(err) return res.status(401).send({error: 'Token inválido'})

    req.userId = decoded.id
    return next()
  })
}

module.exports = authMiddleware
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const generateToken = require('../../utils/generateToken')
const dbConnect = require('../../utils/dbConnect')

dbConnect()

const endPoints =  {
  register: async (req, res) => {
    const { email } = req.body
    try {
      if(await User.findOne({ email })) {
        return res.status(400).send({error: 'Email já existe.'})
      }
  
      const user = await User.create(req.body)
  
      user.password = undefined
  
      return res.send({
        user,
        token: generateToken({id: user.id})
       })
  
    } catch (error) {
      console.log(error)
      return res.status(400).send({error: 'Falha ao registrar usuario.'})
    }
  },

  auth: async (req, res) => {
    const { email, password } = req.body
  
    const user = await User.findOne({ email }).select('+password')
  
    if(!user) {
       return res.status(400).send({error: 'Usuário não existe'})
    }
  
    if(!(await bcrypt.compare(password, user.password))) {
      return res.status(400).send({error: 'Senha inválida'})
    }
  
    user.password = undefined
  
    return res.send({
       user,
       token: generateToken({id: user.id})
      })
  },

  emailAvailability: async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ email })
    const emailRes = user? user.email: false
    return res.send({
      email: emailRes,
    })
  },

  user: async (req, res) => {
    const user = await User.findById(req.userId)
    return res.send({
      user,
     })
  },

  changeName: async (req, res) => {
    const { key, value } = req.body

    if(key == 'password' || key == 'email') {
      return res.status(400).send({error: 'Você não pode alterar a senha nem o email'})
    }

    const user = await User.findByIdAndUpdate({
        _id: req.userId,
      }, 
      {
        [key]: value,
    }, {new: true})

    return res.send({
      user,
    })
  },

}

module.exports =  endPoints
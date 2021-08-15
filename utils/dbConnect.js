const mongoose = require('mongoose')

const dbConnect = () => {
  //Configuração mongoose
  mongoose.Promise = global.Promise
  mongoose.connect(process.env.MONGODB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
  }).then( () => {
      console.log('MongoDB conectado com sucesso. ')
  }).catch( (erro) => {
      console.log('Houve um erro ao se conectar ao mongoDB: ' + erro)
  })
}

module.exports = dbConnect
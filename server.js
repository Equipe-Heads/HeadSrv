//Importar uma Instância/Tipo do Express para a Aplicação
const express = require('express')

//Importar uma Instância "Biblioteca que Gera Token"
const jwt = require('jsonwebtoken')

//Cria um objeto do Tipo "Express" (Variável que Represnta minha Aplicação)
const app = express()

//Utilizar o body-passer
const bdp = require('body-parser')

//"extended=true" permite que o expres entenda o objeto como uma matriz ou uma string
app.use( bdp.urlencoded( { extended:true } ) )

//Define o formata que queremos TAMBÉM utiliza o modo JSON
app.use( bdp.json() )

//Resgata a variarável de ambiente "PORT" ou este valor
const port = process.env.PORT || 5000

//Importa o arquivo "cors"
const cors = require('cors')
//
app.use(cors())

//Importa o arquivo "./src/routes/usuarioRoutes.js"
const routes = require('./src/routes/pessoaRoutes.js')
//utiliza a função exportada pelo arquivo "./src/routes/usuarioRoutes.js"
routes(app)

//Rota Principal
app.route('/')
  .get((req, res) => {
    res.send('API HeadsNew "GET" funcionando')
    console.log('API HeadsNew "GET" funcionando')
  })

//"Escutar" Porta onde roda a Aplicação
app.listen(port)

// Exibe mensagem do servidor
console.log('Servidor funcionando na porta:',port)

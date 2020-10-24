//Importar uma Instância/Tipo do Express
const express = require('express')

//Cria um objeto do Tipo "Express"
const app = express()

//Utilizar o body-passer
const bdp = require('body-parser')
//"extended=true" permite que o expres entenda o objeto como uma matriz ou uma string
app.use(bdp.urlencoded( { extended:true }))
//Define o formata que queremos TAMBÉM utiliza o modo JSON
app.use(bdp.json())

//Resgata a variarável de ambiente "PORT" ou este valor
const port = process.env.PORT || 5000

//Rota Principal
app.route('/')
  //Definir o método "GET" Padrão
  .get((req, res) => {
    res.send('API HeadsNew "GET" funcionando')
    console.log('API HeadsNew "GET" funcionando')
  })
  //Definir o método "POST" Padrão
  .post((req, res) => {
    res.send('API HeadsNew "POST" funcionando')
    console.log('API HeadsNew "POST" funcionando')
  })

//"Escutar" Porta onde roda a Aplicação
app.listen(port)

// Exibe mensagem do servidor
console.log('Servidor funcionando na porta:',port)

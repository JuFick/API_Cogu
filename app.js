import express from 'express'
import cors from "cors"
import { sequelize } from './database/conecta.js'
import { Cogumelo } from './models/Cogumelo.js'
import { Cliente } from './models/Cliente.js'
import { Avaliacao } from './models/Avaliacao.js'
import routes from './routes.js'

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())
app.use(routes)

app.get('/', (req, res) => {
  res.send('Sistema de Controle de Cogumelos')
})

async function conecta_db() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com Banco de Dados realizada com Sucesso');
    // await Cogumelo.sync({force: true})      // cria a tabela no banco (se não existir)
    await Cogumelo.sync()      // cria a tabela no banco (se não existir)
    console.log("Tabela de Cogumelos: Ok")
    await Cliente.sync()      // cria a tabela no banco (se não existir)
    console.log("Tabela de Clientes: Ok")
    await Avaliacao.sync()      // cria a tabela no banco (se não existir)
    console.log("Tabela de Avaliações: Ok")
  } catch (error) {
    console.error('Erro ao conectar o banco de dados:', error);
  }  
}
conecta_db()

app.listen(port, () => {
  console.log(`API de Cogumelos Rodando na Porta: ${port}`)
})


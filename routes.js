import { Router } from "express"
import {cogumeloCreate, cogumeloDelete, cogumeloIndex, cogumeloPesquisa, cogumeloShow, cogumeloUpdate } from "./controllers/cogumeloController.js"
import { clienteCreate, clienteIndex } from "./controllers/clienteController.js"
import { loginCliente } from "./controllers/loginController.js"
import { avaliacaoIndex, avaliacaoCreate, avaliacaoDestroy, avaliacaoCogumelo } from "./controllers/avaliacaoController.js";


const router = Router()

router.get("/cogumelos", cogumeloIndex)
      .post("/cogumelos", cogumeloCreate)
      .put("/cogumelos/:id", cogumeloUpdate)
      .delete("/cogumelos/:id", cogumeloDelete)
      .get("/cogumelos/:id", cogumeloShow)
      .get("/cogumelos/pesquisa/:palavra", cogumeloPesquisa)

router.get("/clientes", clienteIndex)
      .post("/clientes", clienteCreate)
      
router.post("/login", loginCliente)

router.get('/avaliacoes', avaliacaoIndex)
      .post('/avaliacoes', avaliacaoCreate)
      .delete('/avaliacoes/:id', avaliacaoDestroy)
      .get('/avaliacoes/cogumelo/:id', avaliacaoCogumelo)

export default router
import { Op } from "sequelize"
import { Cogumelo } from "../models/Cogumelo.js"

export async function cogumeloIndex(req, res) {
  try {
    const cogumelos = await Cogumelo.findAll({
      where: { destaque: true },
      order: [['id', 'desc']]
    })
    res.status(200).json(cogumelos)
  } catch (error) {
    res.status(400).send(error)
  }
}

export async function cogumeloCreate(req, res) {
  const { nome, qnt_disp, preco, foto, beneficios } = req.body

  if (!nome || !qnt_disp || !preco || !foto || !beneficios) {
    res.status(400).json("Erro... Informe nome, qnt_disp, preco, foto, benefícios do cogumelo")
    return
  }

  try {
    const cogumelo = await Cogumelo.create({
      nome, qnt_disp, preco, foto, beneficios
    })
    res.status(201).json(cogumelo)
  } catch (error) {
    res.status(400).send(error)
  }
}

export async function cogumeloUpdate(req, res) {

  const { id } = req.params

  const { nome, qnt_disp, preco, foto, beneficios } = req.body

  if (!nome || !qnt_disp || !preco || !foto || !beneficios) {
    res.status(400).json("Erro... Informe nome, qnt_disp, preco, foto, benefícios do cogumelo")
    return
  }

  try {
    const cogumelo = await Cogumelo.update({
      nome, qnt_disp, preco, foto, beneficios
    },
      {
        where: { id }
      })
    res.status(200).json(cogumelo)
  } catch (error) {
    res.status(400).send(error)
  }
}

export async function cogumeloDelete(req, res) {

  const { id } = req.params

  try {
    await Cogumelo.destroy({
      where: { id }
    })
    res.status(200).json({ msg: "Ok! Cogumelo removido com sucesso" })
  } catch (error) {
    res.status(400).send(error)
  }
}

export async function cogumeloShow(req, res) {

  const { id } = req.params

  try {
    const cogumelo = await Cogumelo.findByPk(id)
    res.status(200).json(cogumelo)
  } catch (error) {
    res.status(400).send(error)
  }
}

export async function cogumeloPesquisa(req, res) {
  const { palavra } = req.params

  try {
    const cogumelo = await Cogumelo.findAll({
      where: { nome: {
        [Op.like]: '%'+palavra+'%'
      }},
      order: [['id', 'desc']]
    })
    res.status(200).json(cogumelo)
  } catch (error) {
    res.status(400).send(error)
  }
}

export async function adicionarCurtida(cogumeloId) {
  try {
    const cogumelo = await Cogumelo.findByPk(cogumeloId);
    if (!cogumelo) {
      throw new Error('Cogumelo não encontrado');
    }
    cogumelo.curtidas += 1;
    await cogumelo.save();
    return cogumelo;
  } catch (error) {
    throw error;
  }
}

export async function adicionarComentario(cogumeloId, comentario) {
  try {
    const cogumelo = await Cogumelo.findByPk(cogumeloId);
    if (!cogumelo) {
      throw new Error('Cogumelo não encontrado');
    }
    cogumelo.comentarios.push(comentario);
    await cogumelo.save();
    return cogumelo;
  } catch (error) {
    throw error;
  }
}
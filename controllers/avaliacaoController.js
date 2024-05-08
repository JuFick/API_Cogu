import { sequelize } from '../database/conecta.js'
import { Avaliacao } from '../models/Avaliacao.js';
import { Cliente } from '../models/Cliente.js';
import { Cogumelo } from '../models/Cogumelo.js';

export const avaliacaoIndex = async (req, res) => {
  try {
    const avaliacoes = await Avaliacao.findAll({
      include: Cliente
    });
    res.status(200).json(avaliacoes)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const avaliacaoCogumelo = async (req, res) => {
  const { id } = req.params
  try {
    const avaliacoes = await Avaliacao.findAll({
      where: { cogumelo_id: id },
      include: Cliente
    });
    res.status(200).json(avaliacoes)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const avaliacaoCreate = async (req, res) => {
  const { cogumelo_id, cliente_id, comentario, estrelas } = req.body

  // se não informou estes atributos
  if (!cogumelo_id || !cliente_id || !comentario || !estrelas) {
    res.status(400).json({ id: 0, msg: "Erro... Informe os dados" })
    return
  }

  const t = await sequelize.transaction();

  try {

    const avaliacao = await Avaliacao.create({
      cogumelo_id, cliente_id, comentario, estrelas, data: new Date()
    }, { transaction: t });

    await Cogumelo.increment('total',
      { by: estrelas, where: { id: cogumelo_id }, transaction: t }
    );

    await Cogumelo.increment('num',
      { by: 1, where: { id: cogumelo_id }, transaction: t }
    );

    await t.commit();
    res.status(201).json(avaliacao)

  } catch (error) {

    await t.rollback();
    res.status(400).json({ "id": 0, "Erro": error })

  }
}

export const avaliacaoDestroy = async (req, res) => {
  const { id } = req.params

  const t = await sequelize.transaction();

  try {

    const avaliacao = await Avaliacao.findByPk(id)

    await Cogumelo.decrement('total',
      {
        by: avaliacao.estrelas,
        where: { id: avaliacao.cogumelo_id },
        transaction: t
      }
    );

    await Cogumelo.decrement('num',
      {
        by: 1,
        where: { id: avaliacao.restaurante_id },
        transaction: t
      }
    );

    await Avaliacao.destroy({
      where: { id }
    });

    await t.commit();
    res.status(200).json({ msg: "Ok! Avaliação Excluída com Sucesso" })

  } catch (error) {

    await t.rollback();
    res.status(400).json({ "id": 0, "Erro": error })

  }
}

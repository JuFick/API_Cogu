import { DataTypes } from 'sequelize';
import { sequelize } from '../database/conecta.js';
import { Cliente } from './Cliente.js';
import { Cogumelo } from './Cogumelo.js';

export const Avaliacao = sequelize.define('avaliacao', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  comentario: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  estrelas: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  data: {
    type: DataTypes.DATE(),
    allowNull: false
  }
}, {
  tableName: "avaliacoes"
});

Avaliacao.belongsTo(Cogumelo, {
  foreignKey: {
    name: 'cogumelo_id',
    allowNull: false
  },
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE'
})

Cogumelo.hasMany(Avaliacao, {
  foreignKey: 'cogumelo_id'
})

Avaliacao.belongsTo(Cliente, {
  foreignKey: {
    name: 'cliente_id',
    allowNull: false
  },
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE'
})

Cliente.hasMany(Avaliacao, {
  foreignKey: 'cliente_id'
})
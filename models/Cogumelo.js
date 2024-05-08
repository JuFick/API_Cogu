import { DataTypes } from "sequelize";
import { sequelize } from "../database/conecta.js";

export const Cogumelo = sequelize.define(
  "cogumelo",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    qnt_disp: {
      type: DataTypes.INTEGER(6),
      allowNull: false,
      defaultValue: 0,
    },
    preco: {
      type: DataTypes.DECIMAL(9, 2),
      allowNull: false,
    },
    beneficios: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    foto: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    num: {
      type: DataTypes.INTEGER(6),
      allowNull: false,
      defaultValue: 0,
    },
    total: {
      type: DataTypes.INTEGER(8),
      allowNull: false,
      defaultValue: 0
    },
    destaque: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
  }
);

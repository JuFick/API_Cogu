import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  'cogus', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
});
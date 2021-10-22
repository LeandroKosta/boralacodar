const database = require("../database");
const Sequelize = require("sequelize");

const Perguntas = database.define("perguntas", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  pergunta: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  conteudo: {
    type: Sequelize.STRING,
    allowNull: false,
  },   
},
{
  freezeTableName: true,
  timestamps: false, 
  createdAt: false,
  updatedAt: false,
});

module.exports = Perguntas;
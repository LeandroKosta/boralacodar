const database = require("../database");
const Sequelize = require("sequelize");

const Conteudos = database.define("conteudos", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  tema: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  linkconteudo: {
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

module.exports = Conteudos;

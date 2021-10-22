const database = require("../database");
const Sequelize = require("sequelize");

const Respostas = database.define("respostas", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  usuario_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  pergunta_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  resposta: {
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

module.exports = Respostas;
const Sequelize = require('sequelize');

const sequelize = new Sequelize('Products','root','maazdanish',{dialect:'mysql',host:'localhost'});

module.exports = sequelize;
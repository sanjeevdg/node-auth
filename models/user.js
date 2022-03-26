const {Sequelize} = require('sequelize');

const sequelize = require('../utils/database.js');

const User = sequelize.define('users', {
   id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
   },
   email: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   name: {
      type: Sequelize.STRING,
   },
   password: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   latitude: {
      type: Sequelize.FLOAT,
      allowNull: true,
   },
   longitude: {
      type: Sequelize.FLOAT,
      allowNull: true,
   },
   regtoken: {
      type: Sequelize.STRING,
      allowNull:true,
   }
});

//export default User;
module.exports = User;

const {Sequelize} = require('sequelize');

const sequelize = require('../utils/database.js');

const Order = sequelize.define('orders', {
   id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
   },
   name: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   mobile: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   details: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   amount: {
      type: Sequelize.FLOAT,
      allowNull: true,
   },
   address: {
   type: Sequelize.STRING,
      allowNull: true,
   },
   latitude: {
      type: Sequelize.FLOAT,
      allowNull: true,
   },
   longitude: {
      type: Sequelize.FLOAT,
      allowNull: true,
   },
   ordered_at: {
      type: Sequelize.STRING,
      allowNull:true,
   },
   expected_at: {
     type: Sequelize.DATE,
      allowNull:true, 
},
   assigned_to: {
      type: Sequelize.STRING,
      allowNull:true,
   },
   pickup_at: {
      type: Sequelize.DATE,
      allowNull:true,
   },
   drop_at: {
      type: Sequelize.DATE,
      allowNull:true,
   },
   status: {
      type: Sequelize.STRING,
      allowNull:true,
   }
});

//export default User;
module.exports = Order;

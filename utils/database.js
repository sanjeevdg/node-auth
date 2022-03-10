const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sql6478058', 'sql6478058', '3VIQYqW9Yc', {
    dialect: 'mysql',
    host: 'sql6.freemysqlhosting.net', 
});

export default sequelize;

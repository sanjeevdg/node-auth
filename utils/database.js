const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('d53r3v8g11u0i3', 'skjflmfrcwovac', 'ddede2349faac5d2bb95cfbc7198932ccaec5d84635a18b81557b66100b93a3f', {
    dialect: 'postgres',
    dialectOptions: {
    ssl: {
        rejectUnauthorized: false
    }
},
    host: 'ec2-18-209-153-180.compute-1.amazonaws.com'
});

//export default sequelize;
module.exports = sequelize;

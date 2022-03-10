const express = require("express");

const sequelize = require('./utils/database.js');

const router = require('./routes/routes.js');

const app = express();
app.set('port', (process.env.PORT || 5000));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(router);

sequelize.sync(); 

app.listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});

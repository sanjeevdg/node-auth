const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sequelize = require('../utils/database.js');

const User = require('../models/user.js');

const signup = (req, res, next) => {
    // checks if email already exists
    //'san@san.com'
     console.log('entering method fndOne::::::::::::::');
    User.findOne({ where : {
        email:req.body.email, 
    }})
    .then(dbUser => {
        console.log('entered then clause.................');
        if (dbUser) {
            console.log('this is email already exists message after querying db');
            
            
            
             return User.update({
                        latitude:req.body.latitude,
                        longitude:req.body.longitude,
                    },{where:{'email':req.body.email}})
                    .then(() => {
                        res.status(200).json({message: "user latlng updated"});
                    })
                    .catch(err => {
                        console.log('update latlng error message is:::::'+err);
                        res.status(502).json({message: "error while creating the user"});
                    });
            
            
            
            
            
            
            
            
          //  return res.status(409).json({message: "email already exists"});
        } else if (!dbUser && req.body.email && req.body.password) {
            // password hash
       console.log('attemoting to hash password');
            
            bcrypt.hash(req.body.password, 12, (err, passwordHash) => {
                if (err) {
                    return res.status(500).json({message: "couldnt hash the password"}); 
                } else if (passwordHash) {
                    return User.create(({
                        email: req.body.email,
                        name: req.body.name,
                        password: passwordHash,
                        latitude:req.body.latitude,
                        longitude:req.body.longitude,
                    }))
                    .then(() => {
                        res.status(200).json({message: "user created"});
                    })
                    .catch(err => {
                        console.log('signup error message is:::::'+err);
                        res.status(502).json({message: "error while creating the user"});
                    });
                };
            });
        } else if (!req.body.password) {
            return res.status(400).json({message: "password not provided"});
        } else if (!req.body.email) {
            return res.status(400).json({message: "email not provided"});
        };
    })
    .catch(err => {
        console.log('error', err);
    });
};

const login = (req, res, next) => {
    // checks if email exists
    User.findOne({ where : {
        email: req.body.email, 
    }})
    .then(dbUser => {
        if (!dbUser) {
            return res.status(404).json({message: "user not found"});
        } else {
            // password hash
            bcrypt.compare(req.body.password, dbUser.password, (err, compareRes) => {
                if (err) { // error while comparing
                    res.status(502).json({message: "error while checking user password"});
                } else if (compareRes) { // password match
                    const token = jwt.sign({ email: req.body.email }, 'secret', { expiresIn: '1h' });
                    res.status(200).json({message: "user logged in", "token": token});
                } else { // password doesnt match
                    res.status(401).json({message: "invalid credentials"});
                };
            });
        };
    })
    .catch(err => {
        console.log('error', err);
    });
};

const isAuth = (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        return res.status(401).json({ message: 'not authenticated' });
    };
    const token = authHeader.split(' ')[1];
    let decodedToken; 
    try {
        decodedToken = jwt.verify(token, 'secret');
    } catch (err) {
        return res.status(500).json({ message: err.message || 'could not decode the token' });
    };
    if (!decodedToken) {
        res.status(401).json({ message: 'unauthorized' });
    } else {
        res.status(200).json({ message: 'Welcome - you are now Logged In.' });
    };
};


const searchNeighborhood = async (req, res, next) => {

origlat = req.body.latorig;
origlong = req.body.longorig;
distrad = req.body.distance;    

var query = "SELECT t.id, t.name, t.latitude,t.longitude, t.distance FROM (select id,name,latitude,longitude, ( 6371 * ACOS(COS( RADIANS( latitude ) ) * COS( RADIANS( "+origlat+" ) ) * COS( RADIANS( "+origlong+" ) - RADIANS( longitude ) ) + SIN( RADIANS( latitude ) ) *   SIN( RADIANS( "+origlat+") ) ) ) AS distance from deliveryboys)t group by t.id,T.DISTANCE HAVING distance <= "+distrad+" ORDER BY t.distance ASC";

const [results, metadata] = await sequelize.query(query);

console.log('sending results:::'+JSON.stringify(results));
return res.status(200).json({ message: JSON.stringify(results) })
};



//export { signup, login, isAuth };
module.exports = {signup, login, isAuth,searchNeighborhood} ;

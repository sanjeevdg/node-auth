const express =require('express');

//const signup  = require('../controllers/auth.js');
//const login  = require('../controllers/auth.js');
//const isAuth  = require('../controllers/auth.js');
const {signup,login,isAuth} = require('../controllers/auth.js');
 
const router = express.Router();
//function(req, res){
router.post('/login',function(req, res){ login; console.log('aaa'+JSON.stringify(req));});

router.post('/signup',function(req, res){ console.log('aaa'+JSON.stringify(req)); signup; });

//router.get('/signup',function(req, res){
// signup
//} );


router.get('/private', function(req, res){
 isAuth
});

router.get('/public', (req, res, next) => {
    res.status(200).json({ message: "here is your public resource" });
});

// will match any other path
router.use('/', (req, res, next) => {
    res.status(404).json({error : "page not found"});
});

//export default router;
module.exports = router;

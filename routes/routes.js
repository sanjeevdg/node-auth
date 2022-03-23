const express =require('express');

//const signup  = require('../controllers/auth.js');
//const login  = require('../controllers/auth.js');
//const isAuth  = require('../controllers/auth.js');
const {signup,login,isAuth,search_neighborhood} = require('../controllers/auth');
 
const router = express.Router();
//function(req, res){
router.post('/login',function(req, res,next){ login(req,res,next);});

router.post('/search_neighborhood',function(req, res,next){ search_neighborhood(req,res,next);});

router.post('/signup',function(req, res,next){ signup(req,res,next); });

//router.get('/signup',function(req, res){
// signup
//} );


router.get('/private', function(req, res,next){
 isAuth(req,res,next);
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

const express =require('express');

//const signup  = require('../controllers/auth.js');
//const login  = require('../controllers/auth.js');
//const isAuth  = require('../controllers/auth.js');
const {signup,login,isAuth,searchNeighborhood,register, notifications,createOrder,getAllOpenOrders,assignOrder} = require('../controllers/auth');
 
const router = express.Router();
//function(req, res){
router.post('/login',function(req, res,next){ login(req,res,next);});

router.post('/searchNeighborhood',async function(req, res,next){ searchNeighborhood(req,res,next);});

router.post('/signup',function(req, res,next){ signup(req,res,next); });

router.post('/register',function(req, res,next){
 register(req, res,next);
} );

router.post('/notifications',function(req, res,next){
 notifications(req, res,next);
} );


router.get('/private', function(req, res,next){
 isAuth(req,res,next);
});

router.post('/createOrder', function(req, res,next){
 createOrder(req,res,next);
});

router.post('/getAllOpenOrders', function(req, res,next){
 getAllOpenOrders(req,res,next);
});

router.post('/assignOrder', function(req, res,next){
 assignOrder(req,res,next);
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

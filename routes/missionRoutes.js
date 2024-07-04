const express=require('express')
const Missions=require('../controllers/Controller')
const router=express.Router()
const authenticateToken = require('../controllers/authenticateToken');



router.get('/Getmission/:id?',Missions.Getmission)
router.post('/Postmission',authenticateToken, Missions.Postmission);
router.post('/Updatemission/:id',authenticateToken,Missions.Updatemission)
router.post('/ActivateMission/:id',authenticateToken,Missions.ActivateMission)
router.get('/Mission',authenticateToken, Missions.Mission);

module.exports = router;

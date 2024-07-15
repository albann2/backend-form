const express=require('express')
const Entreprise=require('../controllers/Controller')
const router=express.Router()
const authenticateToken = require('../controllers/authenticateToken');



router.get('/Getentreprise/:id?',Entreprise.Getentreprise)
router.post('/Postentreprise',authenticateToken, Entreprise.Postentreprise);
router.post('/Updateentreprise/:id', authenticateToken, Entreprise.Updateentreprise);
router.post('/Activateentreprise/:id',authenticateToken,Entreprise.Activateentreprise)
router.get('/Entreprise',authenticateToken, Entreprise.Entreprise);

module.exports = router;

const express=require('express')
const presentation=require('../controllers/Controller')
const router=express.Router()
const authenticateToken = require('../controllers/authenticateToken');



router.get('/Getpresentation/:id?',presentation.Getpresentation)
router.post('/Postpresentation',authenticateToken, presentation.Postpresentation);
router.post('/Updatepresentation/:id',authenticateToken,presentation.Updatepresentation)
router.post('/Activatepresentation/:id',authenticateToken,presentation.ActivatePresentation)
router.get('/Presentation',authenticateToken, presentation.Presentation);

module.exports = router;

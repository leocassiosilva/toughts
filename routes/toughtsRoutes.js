const express = require('express');
const router = express.Router();
const ToughtsController = require('../controllers/ToughtsController');

//importantdo helpers
const  checkAuth  = require('../helpers/auth').checkAuth


router.get('/dashboard', checkAuth,ToughtsController.dashboard);
router.get('/add', checkAuth,ToughtsController.createTought);
router.get('/edit/:id', checkAuth,ToughtsController.editTought);
router.post('/add', checkAuth,ToughtsController.createToughtSave);
router.post('/edit', checkAuth,ToughtsController.editToughtSave);
router.post('/delete', checkAuth,ToughtsController.deleteTought);
router.get('/', ToughtsController.showToughts);



module.exports = router;
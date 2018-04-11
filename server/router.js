const express = require('express');
const controller = require('./controller');
const router = express.Router();

router.post('/saveScore',  controller.saveScore);
router.get('/getScoreList', controller.getScoreList);
router.get('/getScore', controller.getScore);
// router.post('/updateScore', controller.updateScore);
// router.post('/deletescore', controller.deletescore);

module.exports = router;
const express = require('express');
const controller = require('./controller');
const router = express.Router();

router.post('/saveScore',  controller.saveScore);
router.post('/getScoreList', controller.getScoreList);
router.post('/getScore', controller.getscore);
router.post('/updateScore', controller.updateScore);
router.post('/deletescore', controller.deletescore);

module.exports = router;
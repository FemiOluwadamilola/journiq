const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photoController');
const { ensureAuth } = require('../middlewares/authMiddleware');

router.get('/sync', ensureAuth, photoController.syncPhotos);
router.get('/', ensureAuth, photoController.getPhotos);

module.exports = router;

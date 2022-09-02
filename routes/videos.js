const express = require('express')
const router = express.Router()
const videosController = require('../controllers/videos') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, videosController.getVideos)

router.post('/createVideo', videosController.createVideo)

router.delete('/deleteVideo', videosController.deleteVideo)

module.exports = router
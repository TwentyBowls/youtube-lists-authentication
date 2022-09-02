const Video = require('../models/Video')


module.exports = {
    // GET request for videos
    getVideos: async (req,res) => {
        // console.log(req.user)
        // try {
        //     const todoItems = await Todo.find({userId:req.user.id})
        //     const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})
        //     res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user: req.user})
        // } catch(err) {
        //     console.log(err)
        // }
        res.render('videos.ejs')
    },
    // POST request for videos
    createVideo: async (req, res) => {
        try {
            const videoDetails = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=${API_KEY}&part=contentDetails,statistics`)
            await Video.create({
                YouTubeID: req.body.videoID, 
                title: videoDetails.videos.title, 
                published: videoDetails.videos.publishedAt, 
                views: videoDetails.videos.statistics.viewCount, 
                likes: videoDetails.videos.statistics.likes,
                runtime: videoDetails,
                commentCount: videoDetails,
                userId: req.user.id
            })
            console.log('Video has been added!')
            res.redirect('/todos')
        } catch(err) {
            console.log(err)
        }
    },
    // DELETE request for videos
    deleteVideo: async (req, res) => {
        console.log(req.body.todoIdFromJSFile)
        try {
            await Todo.findOneAndDelete({ _id: req.body.todoIdFromJSFile })
            console.log('Deleted Todo')
            res.json('Deleted It')
        } catch(err) {
            console.log(err)
        }
    }
}    
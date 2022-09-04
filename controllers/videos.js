const Video = require('../models/Video')


module.exports = {
    // GET request for videos
    getVideos: async (req, res) => {
        // console.log(req.user)
        // try {
        //     const todoItems = await Todo.find({userId:req.user.id})
        //     const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})
        //     res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user: req.user})
        // } catch(err) {
        //     console.log(err)
        // }
        /* const videoData = Video.find({ userId: req.user.id }) */
        res.render('videos.ejs'/*, {data: videoData} */)
    },
    // POST request for videos
    createVideo: async (req, res) => {
        console.log('New Video Created!')
        // createVideo =  async (req, res) => {
        //     try {
        //         let videoDetails = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=${process.env.API_KEY}&part=contentDetails,statistics,snippet`);
        //         videoDetails = await videoDetails.json()
        //         //await Video.create({
        //         await console.log(    {
        //            // YouTubeID: req.body.videoID, 
        //             title: videoDetails.items.snippet,
        //             published: videoDetails.items.contentDetails, 
        //             views: videoDetails.items.statistics, 
        //             likes: videoDetails.items.statistics,
        //             runtime: videoDetails.contentDetails,
        //             // commentCount: videoDetails.items.statistics.comments,
        //             // userId: req.user.id
        //         })
        //         console.log('Video has been added!')
        //         // res.redirect('/todos')
        //     } catch(err) {
        //         console.log(err)
        //     }
        // }
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
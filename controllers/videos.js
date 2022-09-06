const Video = require('../models/Video')
const url = require('url')

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
        let videoData = await Video.find({ userId: req.user.id })
        //  console.log(videoData)
        res.render('videos.ejs', {data: videoData})
    },
    // POST request for videos
    createVideo: async (req, res) => {
        console.log(typeof req.user._id)
        try {
            let videoURL = new URL(req.body.url) // get video url
            let videoID = url.parse(req.body.url, true).query.v // get id of video
            // console.log(`url: ${videoURL}, id: ${videoID}`)

            if (videoURL.hostname === 'www.youtube.com' && videoID ) { // check that the url is from youtube.com || add support for m.youtube.com later?
                let response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoID}&key=${process.env.API_KEY}&part=contentDetails,statistics,snippet`);
                videoDetails = await response.json()
                let videoObj = {
                    YouTubeID: videoID,
                    title: videoDetails.items[0].snippet.title,
                    channel: videoDetails.items[0].snippet.channelId,
                    thumbnail: videoDetails.items[0].snippet.thumbnails.high.url,
                    description: videoDetails.items[0].snippet.description.slice(0, 100), // snip description if it's too long
                    published: videoDetails.items[0].snippet.publishedAt,
                    views: videoDetails.items[0].statistics.viewCount, 
                    likes: videoDetails.items[0].statistics.likeCount,
                    commentCount: videoDetails.items[0].statistics.commentCount,
                    runtime: videoDetails.items[0].contentDetails,
                    userId: req.user._id,
                }
                console.log(videoObj)
                Video.create(videoObj, () => console.log(`New Video Created For: ${videoURL}`)) // callback function to print database entry confirmation
            } else {
                console.log(`invalid youtube video`)
            }
            res.redirect('/videos')
        } catch(err) {
            console.error(err)
            res.redirect('/videos')
        }
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
        //             // userId: req.user._id
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
            await Video.findOneAndDelete({ YouTubeID: req.body.todoIdFromJSFile })
            console.log('Deleted Todo')
            res.json('Deleted It')
        } catch(err) {
            console.log(err)
        }
    }
}    
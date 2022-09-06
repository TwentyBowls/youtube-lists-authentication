const mongoose = require('mongoose')

const VideoSchema = new mongoose.Schema({
  YouTubeID: { // id for the video that goes into the url
    type: String,
    required: true
  },
  title: { // video title
    type: String,
    required: true
  },
  channel: { // video channel name
    type: String,
    required: true
  },
  thumbnail: { // video thumbnail
    type: String,
    required: true
  },
  description: { // video description
    type: String,
    required: true
  },
  published: { // publish date
    type: Date,
    required: true
  },
  views: { // number of views
    type: Number,
    required: true,
  },
  likes: { // number of likes
    type: Number,
    required: true
  },
  commentCount: { // number of comments
    type: Number,
    required: true
  },
  // runtime: { // not sure what this is
  //   type: Object, // I think???
  //   required: true
  // },
  userId: { // id of associated user in our app, not youtube uploader
    type: String,
    required: true
  }
}, /*{ collection: 'videolist' }*/)

module.exports = mongoose.model('Video', VideoSchema)
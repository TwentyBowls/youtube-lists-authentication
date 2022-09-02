const mongoose = require('mongoose')

const VideoSchema = new mongoose.Schema({
  YouTubeID: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  thumbnail: {
  type: String,
  required: true
},
  published: {
  type: Date,
  required: true
  },
  views: {
  type: Number,
  required: true,
  },
  likes: {
  type: Number,
  required: true
  },
  runtime: {
    type: Number, // I think???
    required:true
  },
  comments: {
    type: Number,
    required: true
  },
    userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Video', VideoSchema)
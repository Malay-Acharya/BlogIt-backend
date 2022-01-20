const mongoose = require('mongoose')

const Article = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true
        },
        label:{
            type: String,
            required: true
        },
        head:{
            type: String,
            required: true
        },
        cat:{
            type: String,
            required: true
        },
        content:{
            type: String,
            required: true
        },
        main:{
            type: String,
            required: true
        },
        image:{
            type: String
        },
    },
    {collection:'article-data'}
)

const model = mongoose.model('ArticleData', Article)

module.exports = model

const mongoose = require('mongoose')
const validator = require("validator")

const HTMLPage = mongoose.model('HTMLPage', {
    html: {
        type: String,
        required: true
    },
    source_url: {
        type: String,
        unique: true,
        required: true,
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("not a valid url", value)
            }
        }
    },
    crawled_for_image: {
        type: Boolean,
        required: true

    }
})

module.exports = HTMLPage
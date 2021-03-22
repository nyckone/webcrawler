const mongoose = require('mongoose')
const validator = require("validator")

const HTMLImage = mongoose.model('HTMLImage', {
    img_url: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("not a valid url", value)
            }
        }
    },
    source_url: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("not a valid url", value)
            }
        }
    }
})

module.exports = HTMLImage
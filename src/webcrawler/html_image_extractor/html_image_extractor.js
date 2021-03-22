
const HTMLImage = require('../../db/models/html_image')
const HTMLPage = require('../../db/models/html_page')
require('../../db/mongoose')
const utils = require('../utils/utils')

const cheerio = require('cheerio')
const url = require('url')
const axios = require('axios')

const IMG_TAG = 'img'
const SRC_URL_ATTRIBUTE = 'src'

const UPDATE_FIELD = { crawled_for_image: true }


extract_unique_images_from_dom = (html, fetched_url) => {
    const $ = cheerio.load(html)

    img_urls = []
    imgObjects = $(IMG_TAG)
    $(imgObjects).each(function (i, img) {
        var img_url = new URL($(img).attr(SRC_URL_ATTRIBUTE), fetched_url)
        img_urls.push(img_url.href)
    });

    return utils.remove_duplicates(img_urls)
}

save_image = (new_img_url, new_source_url) => {
    const html_image = new HTMLImage({
        img_url: new_img_url,
        source_url: new_source_url
    })

    html_image.save().then((result) => {
        console.log("image saved!", result.img_url)
    }).catch((e) => {
        console.log("error saving image: ", new_img_url)
    })

}

extract_images_from_html = () => {
    return new Promise((resolve, reject) => {
        HTMLPage.findOneAndUpdate({ crawled_for_image: false }, UPDATE_FIELD)
            .then((result) => {
                const fetched_url = result.source_url

                const unique_images_url = extract_unique_images_from_dom(result.html, fetched_url)

                unique_images_url.forEach((curr_img_url) => {
                    save_image(curr_img_url, fetched_url)
                })

                return resolve()
            }).catch((e) => {
                return reject(e)
            })
    })
}

module.exports = {
    extract_images_from_html: extract_images_from_html
}
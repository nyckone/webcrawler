const UrlFetcher = require('./url_fetcher/url_fetcher')

const {Worker} = require('worker_threads')

const URL_FETCHER_FILE_NAME = `${__dirname}\\url_fetcher\\url_fetcher_child.js`
const IMAGE_EXTRACTOR_FILEPATH = `${__dirname}\\html_image_extractor\\html_image_extractor_child.js`


start_crawling = (url, depth) => {
    const url_fetcher_process = new Worker(URL_FETCHER_FILE_NAME, {argv: [url, depth]})
    const image_extractor_process = new Worker(IMAGE_EXTRACTOR_FILEPATH)

    url_fetcher_process.once('message', (finished) => {
        image_extractor_process.postMessage(finished)
    })

}

module.exports = {
    start_crawling: start_crawling
}
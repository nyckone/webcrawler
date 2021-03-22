require('../../db/mongoose')
const HTMLPage = require('../../db/models/html_page')
const utils = require('../utils/utils.js')

const cheerio = require('cheerio')
const url = require('url')
const axios = require('axios')

const URL_LINK_TAG = 'a'
const HREF_ATTRIBUTE = 'href'


const fetch_html_from_url = (url_to_fetch) => {
    return new Promise((resolve, reject) => {
        axios(url_to_fetch).then((response) => {
            resolve(get_and_save_links(url_to_fetch, response.data))
        }).catch((e) => {
            reject(e)
        })
    })
}

get_and_save_links = (fetched_url, data) => {
    return new Promise((resolve, reject) => {
        const html_page = new HTMLPage({
            html: data,
            source_url: fetched_url,
            crawled_for_image: false
        })

        html_page.save().then(() => {
            console.log("saved html for url", fetched_url)
        }).catch((e) => {
            reject(e)
        })

        const links_to_process = []
        const $ = cheerio.load(data)
        linkObjects = $(URL_LINK_TAG)
        $(linkObjects).each(function (i, link) {
            // Creating a valid url - if the current link is uri it concats it to the original url
            var link_url = new URL($(link).attr(HREF_ATTRIBUTE), fetched_url)

            links_to_process.push(link_url.href)
        });

        const unique_links = utils.remove_duplicates(links_to_process)
        resolve(unique_links)
    })
}

run_urls_promise = (urls) => {
    return Promise.allSettled(urls.map(element => fetch_html_from_url(element)))
}

crawl_one_level = (urls) => {
    return new Promise((resolve, reject) => {
        run_urls_promise(urls).then((result) => {
            new_urls_array = []
            result.forEach((element) => {
                if (element.status === 'fulfilled') {
                    new_urls_array = new_urls_array.concat(element.value)
                }
            })

            resolve(utils.remove_duplicates(new_urls_array))
        }).catch((e) => {
            reject(e)
        })
    })
}

start_url_crawling = (urls, depth) => {
    return new Promise((resolve, reject) => {
        if (depth < 0) {
            return resolve()
        }

        crawl_one_level(urls).then((new_urls) => {
            resolve(start_url_crawling(new_urls, depth - 1))
        }).catch((e) => { reject(e) })
    })
}

module.exports = {
    start_url_crawling: start_url_crawling
}
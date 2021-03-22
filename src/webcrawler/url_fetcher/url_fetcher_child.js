const {parentPort} = require('worker_threads')
const UrlFetcher = require('./url_fetcher')

url = process.argv[2]
depth = process.argv[3]

UrlFetcher.start_url_crawling([url], depth).then((result) => {
    console.log("Finished fetching urls, informing the extractor!")
    parentPort.postMessage({finished: true})
}).catch((e) => {
    console.log(e)
})
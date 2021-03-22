const {parentPort} = require('worker_threads')
const HtmlImageExtractor = require('./html_image_extractor')


is_finished = false

parentPort.once('message', (finished) => {
    console.log("Finished fetching images - wrapping up!")
    is_finished = finished.finished
})

run_untill_finished_and_done = () => {
    return new Promise((resolve, reject)=> {
        HtmlImageExtractor.extract_images_from_html().then(()=> {
            return resolve(run_untill_finished_and_done())
        }).catch((e) => {
            if (is_finished === true) {
                return resolve()
            } else {
                return resolve(run_untill_finished_and_done())
            }
        })
    })
}

run_untill_finished_and_done()
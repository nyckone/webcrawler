const WebCrawler = require('./webcrawler/webcrawler')
require('./db/mongoose')
const HTMLImage = require('./db/models/html_image')

const yargs = require('yargs')
const validator = require('validator')
const chalk = require('chalk')

validate_input = (argv) => {
    if (!validator.isURL(argv.url)) {
        console.log(chalk.red.inverse("Bad url - ", argv.url, "Exiting"));
        throw new Error("invalid input");
    }
}

start_web_scrapper = (argv) => {
    validate_input(argv);
    WebCrawler.start_crawling(argv.url, argv.depth);
}

yargs.command({
    command: 'start',
    describe: 'Start running on a url',
    builder: {
        url: {
            describe: 'the url we want to start fetching images from',
            demandOption: true,
            type: 'string'
        },
        depth: {
            describe: 'the depth of the webscrapping',
            default: 0,
            type: 'number'
        }
    },
    handler(argv) {
        start_web_scrapper(argv);
    }
})

yargs.parse()
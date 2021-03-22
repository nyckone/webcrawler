I wrote this project as a web image crawler as an exercise in Node.js.

Several choices i made -
    * The data is saved in mongodb using mongoose.
    * I made a different collection for each model (html_image, html_page)
    * in order to save time runtime - i won't traverse duplicate URL's that i have
      already traversed in the same depth.
    * from the same runtime issues - i won't insert html files that already been
     submited to the db. if you want to change that, go to html_page.js and 
     change unique value to 'false'.
    * this library only extract urls from the html page with an hyperlink (if 
    that's not the intention of this exercise, go to url_fetcher.js and change
    URL_LINK_TAG to empty String)
    * I thought that it's interesting to see in which url the photo was found,
    if it isn't i would drop the source_url, and make the image_url unique
    in html_image.js, which will save some space.


run example:
  node PATH_TO_app.js\app.js start --url=your_url.com --depth=0

This will output for every link or image that was saved - a log message in the console
If some errors while trying to save the link/image - a descriptive message will be printed aswell
var imageProcessor = require('./scripts/embeddedImageProcessor.js');
var multipleFileProcessor = require('./scripts/multipleFileProcessor.js');

module.exports = (markdown, options) => {
    return new Promise((resolve, reject) => {
        const mergedFile = multipleFileProcessor(markdown, options);
        return resolve(imageProcessor(mergedFile, options));
    })
}
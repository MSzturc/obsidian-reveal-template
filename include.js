var imageProcessor = require('./scripts/embeddedImageProcessor.js');

module.exports = (markdown, options) => {
    return new Promise((resolve, reject) => {
        return resolve(imageProcessor(markdown));
    })
}
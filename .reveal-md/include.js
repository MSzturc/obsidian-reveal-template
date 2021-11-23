var imageProcessor = require('./scripts/embeddedImageProcessor.js');
var multipleFileProcessor = require('./scripts/multipleFileProcessor.js');
var blockProcessor = require('./scripts/blockProcessor.js');

module.exports = (markdown, options) => {
    return new Promise((resolve, reject) => {
        const afterMultipleFileProcessor = multipleFileProcessor(markdown, options);
        const afterBlockProcessor = blockProcessor(afterMultipleFileProcessor, options);
        const afterImageProcessor = imageProcessor(afterBlockProcessor, options);
        return resolve(afterImageProcessor);
    })
}
var imageProcessor = require('./scripts/embeddedImageProcessor.js');
var multipleFileProcessor = require('./scripts/multipleFileProcessor.js');
var blockProcessor = require('./scripts/blockProcessor.js');
var footNoteProcessor = require('./scripts/footNoteProcessor.js');

module.exports = (markdown, options) => {
    return new Promise((resolve, reject) => {
        const afterMultipleFileProcessor = multipleFileProcessor(markdown, options);
        const afterBlockProcessor = blockProcessor(afterMultipleFileProcessor, options);
        const afterFootNoteProcessor = footNoteProcessor(afterBlockProcessor, options);
        const afterImageProcessor = imageProcessor(afterFootNoteProcessor, options);
        return resolve(afterImageProcessor);
    })
}
var fs = require('fs');
const path = require('path');
const { findFile, fileExists } = require('./utils/fileUtils.js');

const regex = /!\[\[(.*(jpg|png|jpeg|gif|bmp|svg))\]\]/gmi;

module.exports = (markdown, options) => {
    return markdown
        .split('\n')
        .map((line, index) => {
            if (regex.test(line))
                return transformImageString(line, options);
            return line;
        })
        .join('\n');
}

const transformImageString = (line, options) => {
    var filePath = line.replace("![[", "").replace("]]", "");

    if (!fileExists(filePath)) {
        filePath = findFile(filePath, options);
    }

    return "![](" + filePath + ")";
}
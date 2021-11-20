var fs = require('fs');
const path = require('path');
const { findFile } = require('./utils/fileUtils.js');

const regex = /!\[\[(.*)\]\]/gm;

module.exports = (markdown, options) => {
    return markdown
        .split('\n')
        .map((line, index) => {
            if (regex.test(line))
                return transformLine(line, options);
            return line;
        })
        .join('\n');
}

const transformLine = (line, options) => {
    var filePath = line.replace("![[", "").replace("]]", "");

    const res = getMarkdownFile(filePath);

    if (res === null) {
        return line;
    }

    return fs.readFileSync(res);
}

function getMarkdownFile(line) {
    var file = line;
    if (!line.toLowerCase().endsWith(".md")) {
        file = file + ".md";
    }
    return findFile(file);
}
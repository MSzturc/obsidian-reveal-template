var fs = require('fs');
const path = require('path');
const { findFile, fileExists } = require('./utils/fileUtils.js');

const regex = /!\[\[(.*(jpg|png|jpeg|gif|bmp|svg)(\|\d*(x\d*)?)?)\]\]/gmi;

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

    var comment = null;

    if (line.includes("<!--")) {
        comment = line.substring(line.indexOf("<!--"));
    }

    var filePath = line.replace("![[", "").replace("]]", "");

    if (comment != null) {
        filePath = filePath.replace(comment, "").trim();
    }

    if (filePath.includes("|")) {
        const split = filePath.split("|");
        filePath = split[0];
        comment = buildComment(split[1]);
    }

    if (!fileExists(filePath)) {
        filePath = findFile(filePath, options);
    }

    if (comment != null) {
        return "![](" + filePath + ") " + comment;
    } else {
        return "![](" + filePath + ")";
    }

}

function buildComment(toParse) {

    var width = null;
    var height = null;

    if (toParse.includes("x")) {
        const split = toParse.split("x");
        width = split[0];
        height = split[1];
    } else {
        width = toParse;
    }

    if (height === null) {
        return '<!-- .element: style="width:' + width + 'px;" -->';
    } else {
        return '<!-- .element: style="width:' + width + 'px;height: ' + height + 'px;" -->';
    }

}
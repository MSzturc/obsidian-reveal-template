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

    var header = null;


    if (filePath.includes('#')) {
        const split = filePath.split('#');
        filePath = split[0];
        header = split[1];
    }

    const res = getMarkdownFile(filePath);

    if (res === null) {
        return line;
    }

    return parseFile(res, header);
}

function parseFile(file, header) {

    var fileContent = fs.readFileSync(file, 'UTF-8');

    if (header === null) {
        return fileContent;
    } else {

        var lines = fileContent.split('\n');

        var startIdx = null;
        var endIdx = null;
        for (let i = 0; i < lines.length; i++) {

            if (startIdx != null && lines[i].startsWith('#')) {
                endIdx = i;
                break;
            }

            if (lines[i].includes(header)) {
                startIdx = i;
            }
        }

        if (startIdx === null) {
            return "![[" + file + "#" + header + "]]";
        }

        if (endIdx === null) {
            return lines.slice(startIdx).join('\n');
        } else {
            return lines.slice(startIdx, endIdx).join('\n');
        }
    }
}

function getMarkdownFile(line) {
    var file = line;
    if (!line.toLowerCase().endsWith(".md")) {
        file = file + ".md";
    }
    return findFile(file);
}
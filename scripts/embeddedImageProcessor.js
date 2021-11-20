var fs = require('fs');
const path = require('path');

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

function findFile(filePath, options) {

    const baseDir = path.join(__dirname, '../');
    const staticDirs = typeof options.staticDirs === 'string' ? options.staticDirs.split(',') : options.staticDirs;

    for (let staticDir of staticDirs) {
        let walkBase = path.join(baseDir, staticDir);

        let allFiles = walkDir(walkBase);

        for (let file of allFiles) {
            if (file.endsWith(filePath)) {
                return file.replace(baseDir, "");
            }

        }
    }
    return filePath;
}

function fileExists(filepath) {
    try {
        fs.accessSync(filepath, fs.constants.F_OK);
    } catch (e) {
        return false;
    }
    return true;
}

function walkDir(dir) {
    var results = [];
    var list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        var stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            /* Recurse into a subdirectory */
            results = results.concat(walkDir(file));
        } else {
            /* Is a file */
            results.push(file);
        }
    });
    return results;
}
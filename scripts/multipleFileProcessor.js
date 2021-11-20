var fs = require('fs');
const path = require('path');

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
        return "";
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

function findFile(filePath) {

    const baseDir = findVault(__dirname);

    let allFiles = walkDir(baseDir);

    for (let file of allFiles) {
        if (file.endsWith(filePath)) {
            return file;
        }
    }
    return null;
}

function findVault(baseDir) {
    const pathToTest = path.join(baseDir, '.obsidian');

    if (fs.existsSync(pathToTest)) {
        return baseDir;
    } else {
        return findVault(path.join(baseDir, '../'));
    }
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
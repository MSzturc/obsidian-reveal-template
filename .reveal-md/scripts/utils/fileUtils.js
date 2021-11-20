var fs = require('fs');
const path = require('path');

function findVault(baseDir) {
    const pathToTest = path.join(baseDir, '.obsidian');

    if (fs.existsSync(pathToTest)) {
        return baseDir;
    } else {
        return findVault(path.join(baseDir, '../'));
    }
}

function findFile(filePath) {

    const baseDir = findVault(__dirname);

    let allFiles = walkDir(baseDir);

    for (let file of allFiles) {
        if (file.endsWith(filePath)) {
            return file.replace(baseDir + "/", "");
        }
    }
    return null;
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
        if (fileExists(file)) {
            var stat = fs.statSync(file);
            if (stat && stat.isDirectory()) {
                /* Recurse into a subdirectory */
                results = results.concat(walkDir(file));
            } else {
                /* Is a file */
                results.push(file);
            }
        }

    });
    return results;
}

module.exports = {
    findVault,
    findFile,
    fileExists,
    walkDir
}
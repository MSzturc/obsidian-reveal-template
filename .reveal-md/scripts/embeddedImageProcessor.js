var fs = require('fs');
const path = require('path');
const { findFile, fileExists } = require('./utils/fileUtils.js');

const regex = /!\[\[(.*(jpg|png|jpeg|gif|bmp|svg)(\|\d*(x\d*)?)?)\]\]/gmi;

const markdownImageRegex = /!\[[^\]]*\]\(.*(jpg|png|jpeg|gif|bmp|svg)\)/gmi;

module.exports = (markdown, options) => {
    return markdown
        .split('\n')
        .map((line, index) => {
            // Transform ![[myImage.png]] to ![](myImage.png)
            if (regex.test(line))
                return transformImageString(line, options);
            return line;
        })
        .map((line, index) => {
            // Transform ![](myImage.png) to html
            if (markdownImageRegex.test(line))
                return htmlify(line);
            return line;
        })
        .join('\n');
}

const htmlify = (line) => {

    var comment = null;

    if (line.includes("<!--")) {
        comment = line.substring(line.indexOf("<!--")).trim();
        comment = parseComment(comment);
    }

    var startIdx = line.indexOf('(') + 1;
    var endIdx = line.indexOf(')', startIdx);
    var filePath = line.substring(startIdx, endIdx).trim();

    var startAltIdx = line.indexOf('[') + 1;
    var endAltIdx = line.indexOf(']', startAltIdx);
    var alt = line.substring(startAltIdx, endAltIdx).trim();

    var result = '<img src="' + filePath + '" alt="' + alt + '"></img>';

    if (comment === null) {
        comment = { 'type': 'element', 'style': [], 'clazz': ['reset-paragraph'] }
    } else {
        if (!comment.clazz.includes('reset-paragraph')) {
            comment.clazz.push('reset-paragraph');
        }
    }

    if (comment != null && comment.type === 'element') {
        result = '<p ' + buildAttributes(comment) + '>' + result + '</p>';
    }

    return result;
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
        comment = buildComment(split[1], comment);
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

function buildComment(toParse, comment) {

    if (comment === null) {
        comment = { 'type': 'element', 'style': [], 'clazz': [] }
    } else {
        comment = parseComment(comment);
    }

    var width = null;
    var height = null;

    if (toParse.includes("x")) {
        const split = toParse.split("x");
        width = split[0];
        height = split[1];
    } else {
        width = toParse;
    }

    width = "width: " + width + "px";

    comment.style.push(width);

    if (height != null) {
        height = "height: " + height + "px";
        comment.style.push(height);
    }

    return commentToString(comment);
}

function commentToString(comment) {
    var result = '<!-- ';

    if (comment.type === 'element') {
        result += '.element: ';
    } else {
        console.log("ERROR: type not supported: " + comment.type);
    }

    result += buildAttributes(comment);

    result += ' -->';
    return result;

}

function buildAttributes(comment) {
    var result = '';

    if (comment.style.length > 0) {
        var styles = "";
        for (item of comment.style) {
            styles += item + "; "
        }

        result += 'style="' + styles.trim() + '" ';
    }

    if (comment.clazz.length > 0) {
        var clazzes = "";
        for (item of comment.clazz) {
            clazzes += item + " "
        }

        result += 'class="' + clazzes.trim() + '" ';
    }

    return result.trim();
}

function parseComment(comment) {

    var type = null;
    var style = [];
    var clazz = [];

    if (comment.startsWith('<!--') && comment.endsWith('-->')) {

        //.element: style="height: 200px; width:300px" class="blub"
        var strip = comment.replace('<!--', '').replace('-->', '').trim();

        if (strip.startsWith('.element:')) {
            type = 'element';

            //style="height: 200px; width:300px" class="blub"
            strip = strip.replace('.element:', '').trim();

            if (strip.includes('style=')) {
                style = parseStyle(strip);
            }

            if (strip.includes('class=')) {
                clazz = parseClass(strip);
            }

            return {
                "type": type,
                "style": style,
                "clazz": clazz
            }


        } else {
            console.log("ERROR: Type not supported: " + comment);
            return null;
        }

    } else {
        console.log("ERROR: Cannot parse comment: " + comment);
        return null;
    }
}

function parseStyle(toParse) {

    var quote = "'";

    if (toParse.includes("\"")) {
        quote = '"';
    }

    var startIdx = toParse.indexOf('style=') + 7;
    var endIdx = toParse.indexOf(quote, startIdx + 1);

    var value = toParse.substring(startIdx, endIdx);
    return value.split(";").map((line, index) => {
        return line.trim();
    });
}

function parseClass(toParse) {

    var quote = "'";

    if (toParse.includes("\"")) {
        quote = '"';
    }

    var startIdx = toParse.indexOf('class=') + 7;
    var endIdx = toParse.indexOf(quote, startIdx + 1);

    var value = toParse.substring(startIdx, endIdx);
    return value.split(" ").map((line, index) => {
        return line.trim();
    });
}
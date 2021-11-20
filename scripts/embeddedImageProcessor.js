var fs = require('fs');

module.exports = (markdown) => {
    return markdown
        .split('\n')
        .map((line, index) => {
            if (/!\[\[(.*(jpg|png|jpeg|gif|bmp|svg))\]\]/gmi.test(line))
                return transformImageString(line)
            return line
        })
        .join('\n')
}

const transformImageString = line => {
    let result = line.replace("![[", "![](").replace("]]", ")");
    return result;
}
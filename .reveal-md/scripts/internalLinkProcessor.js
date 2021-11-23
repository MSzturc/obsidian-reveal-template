const regex = /^(?!!).*\[\[(.*)\]\]/gm;

module.exports = (markdown, options) => {
    return markdown
        .split('\n')
        .map((line, index) => {
            if (regex.test(line))
                return transformInternalLink(line, options);
            return line;
        })
        .join('\n');
}

function transformInternalLink(line) {

    if (line.includes('[[')) {
        var startIdx = line.indexOf('[[');
        var endIdx = line.indexOf(']]', startIdx + 3);
        var linkContent = line.substring(startIdx + 2, endIdx).trim();

        if (linkContent.includes('|')) {
            linkContent = linkContent.split('|')[1];
        }
        var result = line.substring(0, startIdx) + linkContent + line.substring(endIdx + 2);

        return transformInternalLink(result);
    }

    return line;
}
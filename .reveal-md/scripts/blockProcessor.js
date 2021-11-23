const regex = /!\[\[(.*(jpg|png|jpeg|gif|bmp|svg)(\|\d*(x\d*)?)?)\]\]/gmi;

module.exports = (markdown, options) => {
    return transformBlock(markdown);
}

function transformBlock(markdown) {

    if (markdown.includes('::: block')) {
        var startIdx = markdown.indexOf('::: block');
        var endIdx = markdown.indexOf(':::', startIdx + 10);
        var blockContent = markdown.substring(startIdx + 9, endIdx).trim();

        var divContent = '<div class="block">\n\n' + blockContent + '\n\n</div>';

        var result = markdown.substring(0, startIdx) + divContent + markdown.substring(endIdx + 3);

        return transformBlock(result);
    }

    return markdown;
}
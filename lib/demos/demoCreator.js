var $ = require('jquery');

function htmlEscape(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

module.exports = function (demo) {

    var demos = $('body').find('#demos');

    demos.append('<h3>' + demo.title + '</h3>');

    demos.append('<p>' + demo.description + '</p>');

    demos.append('<h4>Example</h4>');

    var el = $('<div></div>');
    demos.append(el);
    demos.append(demo.present(el));

    demos.append('<h4>Code</h4>');

    demos.append('<pre>' + htmlEscape(demo.present.toString()) + '</pre>');

    demos.append('<hr/>');
};
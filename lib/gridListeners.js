var $ = require('jqueryify');

module.exports = function (el) {

    var me = this;

    el.find('thead').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var el = $(e.target);

        if (el.is('th')) {
            me._columnClicked(el.attr('data-col-id'));
        }
    });
};

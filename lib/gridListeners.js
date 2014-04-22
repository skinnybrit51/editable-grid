var $ = require('jquery');

module.exports = function (headerContainer, bodyContainer, footerContainer) {

    var me = this;

    headerContainer.find('thead').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var el = $(e.target);

        if (el.is('th')) {
            me._columnClicked(el.attr('data-col-id'));
        }
    });

    footerContainer.find('button.new-row').on('click', function () {
        me._newRowClicked();
    });

    footerContainer.find('td input, td select').on('change', function (e) {
        var target = $(e.target),
            td = target.closest('td');

        me._newRowChanged(td.attr('data-col-id'));
    });

    bodyContainer.find('td input, td select').on('change', function (e) {
        var target = $(e.target),
            td = target.closest('td'),
            tr = target.closest('tr'),
            value = target.val();

        me._valueChanged(tr.attr('data-row-id'), td.attr('data-col-id'), value);
    });

    bodyContainer.find('td').on('click', function (e) {
        var target = $(e.target),
            td = target.closest('td'),
            tr = target.closest('tr');

        me._rowClicked(tr.attr('data-row-id'), td.attr('data-col-id'));
    });

};
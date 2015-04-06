var $ = require('jquery');

module.exports = function (headerContainer, bodyContainer, footerContainer, options) {

    var me = this;

    headerContainer.find('thead').on('mousedown', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var el = $(e.target);

        if (el.is('th')) {
            me._columnClicked(el.attr('data-col-id'));
        }
    });

    // listen to mousedown instead of click due to conflicts with blur events
    function addButton (row) {
        if (me._validateRow(row)) {
            me._newRowClicked();
        }
    }

    footerContainer.find('button.new-row').on('mousedown', function (e) {
        var row = footerContainer.find('tr');
        if (e.which === 1) {// left mouse button
            addButton(row);
        }
    });

    footerContainer.find('button.new-row').on('keydown', function (e) {
        var row = footerContainer.find('tr');
        if (e.keyCode === 13) {// return/enter key
            addButton(row);
        }
    });


    footerContainer.find('td input, td select').on('change', function (e) {
        var target = $(e.target),
            td = target.closest('td');

        me._newRowChanged(td.attr('data-col-id'));
    });

    footerContainer.find('td input').on('blur', function (e) {
        var input = $(e.target),
            td = input.closest('td'),
            tr = input.closest('tr');

        me._validate(tr.attr('data-row-id'), td.attr('data-col-id'), input);
    });

    bodyContainer.find('td input, td select').on('change', function (e) {
        var target = $(e.target),
            td = target.closest('td'),
            tr = target.closest('tr'),
            value = target.val();

        if (target.is('input') && target.attr('type') === 'checkbox') {
            value = target.prop('checked');
        }

        me._valueChanged(tr.attr('data-row-id'), td.attr('data-col-id'), value);
    });

    bodyContainer.find('td input').on('blur', function (e) {
        var input = $(e.target),
            td = input.closest('td'),
            tr = input.closest('tr');

        me._validate(tr.attr('data-row-id'), td.attr('data-col-id'), input);
    });

    bodyContainer.on('click', 'button', function (e) {
        var target = $(e.target),
            td = target.closest('td');

        if (td.is('.delete-column')) {
            me._deleteRow(target.closest('tr').attr('data-row-id'));
        }
    });

    if (options.rows.link) {
        bodyContainer.find('td').on('click', function (e) {
            var target = $(e.target),
                td = target.closest('td'),
                tr = target.closest('tr');

            if (!target.is('a')) {
                // if not a link then a row link
                me._rowClicked(tr.attr('data-row-id'), td.attr('data-col-id'));
            }
        });
    }

    if (options.treeMode) {
        bodyContainer.find('.tree-node').on('mousedown', function (e) {

            if (e.which === 1) {    // left mouse button only
                var node = $(e.target),
                    tr = node.closest('tr');

                var expand = node.is('.tree-node-expand');
                if (expand) {
                    me._treeNodeExpand(tr.attr('data-row-id'));
                } else {
                    me._treeNodeCollapse(tr.attr('data-row-id'));
                }
            }

            e.stopPropagation();
            e.preventDefault();
        });
    }


};
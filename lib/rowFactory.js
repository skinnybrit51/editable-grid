var _ = require('underscore'),
    cellFactory = require('./cellFactory');


module.exports = {

    createTableHeaderRow: function (options) {
        var row = '<tr>';

        _.each(options.columns, function (column) {

            row += cellFactory.createTableHeader(
                {
                    column: column,
                    sorted: options.isColumnSorted(column.id)
                });
        });

        row += '</tr>';
        return row;
    },

    createTableRow: function (obj, options, level, treeState) {

        var id = obj[options.id];

        var row = '<tr data-row-id="' + id + '">';

        _.each(options.columns, function (column, index) {

            row += cellFactory.createTableData({
                column: column,
                obj: obj,
                id: options.id,
                rows: options.rows,
                stateManager: options.stateManager,
                treeColumn: options.treeMode && index === 0,
                level: level,
                treeState: treeState,
                launchLinksNewTab: options.launchLinksNewTab,
                getCellClassesFn: options.getCellClasses
            });
        });

        row += '</tr>';
        return row;
    },

    createTableFooterAddRow: function (options) {
        var columns = options.columns;
        // opening tag
        var row = '<tr class="new-row">';

        // cell markup
        _.each(columns, function (column) {

            if (column.link == null) {
                row += cellFactory.createInput(column, column.preCreateCallback());
            } else {
                row += cellFactory.createOpeningCellTag({ column: column }) + '</td>';
            }
        }, this);

        // closing tag
        row += '</tr>';

        return row;
    },

    createTableFooterTotalRow: function (options) {
        var columns = options.columns,
            data = options.data;

        // opening tag
        var row = '<tr class="total-row">';

        _.each(columns, function (column) {
            row += cellFactory.createTotalCell(column, data);
        });

        // closing tag
        row += '</tr>';

        return row;
    }
};

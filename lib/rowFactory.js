var _ = require('underscore');


var cellFactory = {
    createTableData: function (options) {
        return '<td data-cell-id="' + options.id + '" class="' + options.width + '">' +
            options.value + '</td>';
    },

    createTableHeader: function (options) {
        return '<th data-cell-id="' + options.id + '" class="' + options.width + '">' +
            options.value + '</th>';
    }
};

module.exports = {

    createTableHeaderRow: function (options) {
        var row = '<tr>';

        _.each(options.columns, function (column) {
            row += cellFactory.createTableHeader({width: column.width, value: column.title,
                id: column.id});
        });

        row += '</tr>';
        return row;
    },

    createTableRow: function (options) {
        var row = '<tr data-row-id="' + options.obj.id + '">';

        _.each(options.columns, function (column) {
            var value = options.obj[column.id];
            row += cellFactory.createTableData({width: column.width, value: value, id: column.id});
        });

        row += '</tr>';
        return row;
    }

};
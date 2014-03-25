var _ = require('underscore');


var cellFactory = {
    createTableData: function (options) {
        var column = options.column;

        return '<td data-col-id="' + column.id + '" class="' + column.width + '">' +
            column.formatter(column.id, options.value) + '</td>';
    },

    createTableHeader: function (options) {
        var classes = [options.width],
            sortedClasses = ['pull-right'];

        if (options.sorted === 'asc') {
            sortedClasses.push('sorted-ascending');
        } else if (options.sorted === 'desc') {
            sortedClasses.push('sorted-descending');
        }

        return '<th data-col-id="' + options.id + '" class="' + classes.join(' ') + '">' +
            '<div style="position: relative" class="' + sortedClasses.join(' ') + '"></div>'+
        options.value + '</th>';
    }
};

module.exports = {

    createTableHeaderRow: function (options) {
        var row = '<tr>';

        _.each(options.columns, function (column) {
            row += cellFactory.createTableHeader(
                {
                    width: column.width,
                    value: column.title,
                    id: column.id,
                    sorted: options.isColumnSorted(column.id)
                });
        });

        row += '</tr>';
        return row;
    },

    createTableRow: function (options) {
        var row = '<tr data-row-id="' + options.obj.id + '">';

        _.each(options.columns, function (column) {
            var value = options.obj[column.id];
            row += cellFactory.createTableData({column: column, value: value});
        });

        row += '</tr>';
        return row;
    }

};
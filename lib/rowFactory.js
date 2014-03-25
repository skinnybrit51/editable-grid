var _ = require('underscore');


var cellFactory = {
    createTableData: function (options) {
        var column = options.column,
            value = column.formatter(column.id, options.obj[column.id]);

        // opening table cell markup
        var markup = '<td data-col-id="' + column.id + '" class="' + column.width + '">';

        // value
        if (column.link != null) {
            if (column.link === options.rows.link) {
                markup += '<a class="glyphicon glyphicon-arrow-right" href="' +
                    options.obj[column.link] + '"></a>';
            } else {
                markup += '<a href="' + options.obj[column.link] + '">' + value + '</a>';
            }
        } else {
            markup += value;
        }

        // closing table cell markup
        markup += '</td>';

        return markup;
    },

    createTableHeader: function (options) {
        var classes = [options.width],
            sortedClasses = ['pull-right'];

        if (options.sorted === 'asc') {
            sortedClasses.push('sorted-ascending');
        } else if (options.sorted === 'desc') {
            sortedClasses.push('sorted-descending');
        }

        // open markup
        var markup = '<th data-col-id="' + options.id + '" class="' + classes.join(' ') + '">';


        // sorting
        markup += '<div style="position: relative" class="' + sortedClasses.join(' ') + '"></div>';

        // value
        markup += options.value;


        // close markup
        markup += '</th>';

        return markup;
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
            row += cellFactory.createTableData({
                column: column,
                obj: options.obj,
                rows: options.rows
            });
        });

        row += '</tr>';
        return row;
    }

};
var _ = require('underscore');


var cellFactory = {

    createStringInput: function (column) {
        // opening tag
        var cell = '<td data-col-id="' + column.id + '" class="' + column.width + '">';

        cell += '<input type="text" class="form-control"/>';

        // closing tag
        cell += '</td>';

        return cell;
    },

    createDateInput: function (column) {
        // opening tag
        var cell = '<td data-col-id="' + column.id + '" class="' + column.width + '">';

        cell += '<input type="date" class="form-control"/>';

        // closing tag
        cell += '</td>';

        return cell;
    },

    createCostInput: function (column) {
        // opening tag
        var cell = '<td data-col-id="' + column.id + '" class="' + column.width + '">';

        cell += '<div class="input-group">';
        cell += '<span class="input-group-addon">$</span>';
        cell += '<input type="text" class="form-control"/>';
        cell+='</div>';

        // closing tag
        cell += '</td>';

        return cell;
    },

    createPercentInput: function (column) {
        // opening tag
        var cell = '<td data-col-id="' + column.id + '" class="' + column.width + '">';

        cell += '<div class="input-group">';
        cell += '<input type="text" class="form-control"/>';
        cell += '<span class="input-group-addon">%</span>';
        cell+='</div>';

        // closing tag
        cell += '</td>';

        return cell;
    },

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
        markup += '<div class="' + sortedClasses.join(' ') + '"></div>';

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
    },

    createTableFooterAddRow: function (options) {
        var columns = options.columns;
        // opening tag
        var row = '<tr class="new-row">';

        // cell markup
        _.each(columns, function (column) {

            switch (column.type) {
                case 'date':
                    row += cellFactory.createDateInput(column);
                    break;
                case 'cost':
                    row += cellFactory.createCostInput(column);
                    break;
                case 'percent':
                    row += cellFactory.createPercentInput(column);
                    break;
                default:
                    row += cellFactory.createStringInput(column);
            }
        });

        // closing tag
        row += '</tr>';

        return row;
    }
};
var _ = require('underscore');

var getValue = function getValue(value, path) {
    if (path == null) {
        return value;
    }

    var split = path.split('.');

    var newValue = value[split[0]];
    if (split.length === 1) {
        return newValue;
    }
    split.shift();
    return getValue(newValue, split.join('.'));
};

var getFormattedValue = function (column, obj) {
    if (obj == null) {
        return '';
    }
    var value = getValue(obj, column.id);
    if (value == null) {
        return '';
    }
    return column.formatter(column.id, value);
};

var createInput = function (type, value) {
    if (type === 'date') {
        if (value == null) {
            return '<input type="date" class="form-control"/>';
        }
        return '<input type="date" class="form-control"/>';
    }

    if (value == null) {
        return '<input type="text" class="form-control"/>';
    }

    return '<input type="text" class="form-control" value="' + value + '"/>';
};

var cellFactory = {

    createInput: function (column, value) {
        switch (column.type) {
            case 'date':
                return this.createDateInput(column, value);
            case 'cost':
                return  this.createCostInput(column, value);
            case 'percent':
                return this.createPercentInput(column, value);
            case 'select':
                return this.createSelect(column);
        }
        return this.createStringInput(column, value);
    },

    createSelect: function (column) {
        // opening tag
        var cell = '<td data-col-id="' + column.id + '" class="' + column.width + '">';

        cell += '<select class="form-control">';

        _.each(column.list, function (value) {
            cell += '<option value="' + value + '">' +
                column.formatter(column.id, value) + '</option>';
        });

        cell += '</select>';

        // closing tag
        cell += '</td>';

        return cell;
    },

    createStringInput: function (column, value) {
        // opening tag
        var cell = '<td data-col-id="' + column.id + '" class="' + column.width + '">';

        cell += createInput(column.type, value);

        // closing tag
        cell += '</td>';

        return cell;
    },

    createDateInput: function (column, value) {
        // opening tag
        var cell = '<td data-col-id="' + column.id + '" class="' + column.width + '">';

        cell += createInput(column.type, value);

        // closing tag
        cell += '</td>';

        return cell;
    },

    createCostInput: function (column, value) {
        // opening tag
        var cell = '<td data-col-id="' + column.id + '" class="' + column.width + '">';

        cell += '<div class="input-group">';
        cell += '<span class="input-group-addon">$</span>';
        cell += createInput(column.type, value);
        cell += '</div>';

        // closing tag
        cell += '</td>';

        return cell;
    },

    createPercentInput: function (column, value) {
        // opening tag
        var cell = '<td data-col-id="' + column.id + '" class="' + column.width + '">';

        cell += '<div class="input-group">';
        cell += createInput(column.type, value);
        cell += '<span class="input-group-addon">%</span>';
        cell += '</div>';

        // closing tag
        cell += '</td>';

        return cell;
    },

    createTotalCell: function (column, data) {

        // opening tag
        var cell = '<td data-col-id="' + column.id + '" class="' + column.width + '">';
        if (column.type === 'cost') {
            var values = _.pluck(data, column.id),
                total = 0;
            _.each(values, function (value) {
                var cost = parseFloat(value);
                if (!_.isNaN(cost)) {
                    total += cost;
                }
            });

            cell += '=' + column.formatter(column.id, total);
        }

        // closing tag
        cell += '</td>';

        return cell;
    },

    createTableData: function (options) {
        var column = options.column,
            value = getFormattedValue(column, options.obj);

        // opening table cell markup
        var markup = '<td data-col-id="' + column.id + '" class="' + column.width + '">';


        if (options.stateManager.isEditable(options.obj.id, column.id)) {
            return this.createInput(column, value);
        } else {
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
                rows: options.rows,
                stateManager: options.stateManager
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
                row += cellFactory.createInput(column);
            } else {
                row += '<td data-col-id="' + column.id + '" class="' + column.width + '"></td>';
            }
        });

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
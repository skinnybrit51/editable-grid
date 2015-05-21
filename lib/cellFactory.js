var _ = require('underscore');

var TREE_INDENT_MARGIN = 15;

var getValue = function getValue (value, path) {
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

var dateTemplate = _.template('<div class="input-group">' +
    '<input type="text" class="form-control" placeholder="yyyy-mm-dd" value="<%=date%>">' +
    '<span class="input-group-addon" data-toggle="booty-datepicker">' +
    '<span class="glyphicon glyphicon-calendar"></span>' +
    '</span>' +
    '</div>');

var createInput = function (type, value) {
    if (type === 'date') {
        return dateTemplate({
            date: value == null ? '' : value
        });
    }

    // checkbox
    if (type === 'checkbox') {
        if (value) {
            return '<input type="checkbox" checked="checked"/>';
        }
        return '<input type="checkbox"/>';
    }

    if (value == null) {
        return '<input type="text" class="form-control"/>';
    }

    return '<input type="text" class="form-control" value="' + value + '"/>';
};

var makeStyleAttributes = function (styles) {
    var styleString = '',
        counter = 0,
        styleLength = _.keys(styles).length;

    _.each(styles, function (value, key) {
        styleString += key + ':' + value;
        if (counter < styleLength - 1) {
            styleString += ';';
        }
        counter++;
    });
    return styleString;
};

module.exports = {

    createInput: function (column, value) {
        switch (column.type) {
            case 'date':
                return this.createDateInput(column, value);
            case 'cost':
                return  this.createCostInput(column, value);
            case 'percent':
                return this.createPercentInput(column, value);
            case 'select':
                return this.createSelect(column, value);
            case 'checkbox':
                return this.createCheckboxInput(column, value);
        }
        return this.createStringInput(column, value);
    },

    createOpeningCellTag: function (column, treeColumn, level) {
        var classes = [];

        _.each(column.classes, function (clzz) {
            classes.push(clzz);
        });

        switch (column.alignment) {
            case 'right':
                classes.push('alignment-right');
                break;
            case 'center':
                classes.push('alignment-center');
                break;
        }

        var styles = {
            width: column.width
        };

        if (treeColumn) {
            styles['padding-left'] = (level * TREE_INDENT_MARGIN) + 'px';
            classes.push('tree-column');
        }
        return '<td class="' + classes.join(' ') + '" data-col-id="' + column.id +
            '" style="' + makeStyleAttributes(styles) + '">';
    },

    createSelect: function (column, value) {
        // opening tag
        var cell = this.createOpeningCellTag(column);

        cell += '<select class="form-control">';

        _.each(column.list, function (item) {

            if (value === item) {
                cell += '<option value="' + item + '" selected="selected">' +
                    column.formatter(column.id, item) + '</option>';
            } else {
                cell += '<option value="' + item + '">' +
                    column.formatter(column.id, item) + '</option>';
            }

        });

        cell += '</select>';

        // closing tag
        cell += '</td>';

        return cell;
    },

    createStringInput: function (column, value) {
        // opening tag
        var cell = this.createOpeningCellTag(column);

        cell += createInput(column.type, value);

        // closing tag
        cell += '</td>';

        return cell;
    },

    createCheckboxInput: function (column, value) {
        // opening tag
        var cell = this.createOpeningCellTag(column);

        cell += createInput(column.type, value);

        // closing tag
        cell += '</td>';

        return cell;
    },

    createDateInput: function (column, value) {
        // opening tag
        var cell = this.createOpeningCellTag(column);

        cell += createInput(column.type, value);

        // closing tag
        cell += '</td>';

        return cell;
    },

    createCostInput: function (column, value) {
        // opening tag
        var cell = this.createOpeningCellTag(column);

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
        var cell = this.createOpeningCellTag(column);

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
        var cell = this.createOpeningCellTag(column);
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
            treeColumn = options.treeColumn,
            level = options.level,
            treeState = options.treeState,
            value = getFormattedValue(column, options.obj),
            objId = options.obj[options.id],
            launchLinksNewTab = options.launchLinksNewTab;

        // opening table cell markup
        var markup = this.createOpeningCellTag(column, treeColumn, level);

        if (column.type === 'checkbox' ||
            options.stateManager.isEditable(objId, column.id)) {
            return this.createInput(column, value);
        } else {

            // tree
            if (treeColumn) {
                var expand = options.obj.children === 'empty' ? 'none' : 'expand';
                if (treeState && treeState[objId] && expand !== 'none') {
                    expand = treeState[objId] === 'expand' ? 'collapse' : 'expand';
                }
                markup += '<div class="tree-node tree-node-' + expand + '"/>';
            }

            // value
            var hasValidLink = false;
            if (column.link != null) {
                var href = options.obj[column.link];
                if (href) {
                    hasValidLink = true;
                    if (column.link === options.rows.link) {
                        markup += '<a class="glyphicon glyphicon-arrow-right" href="' +
                            href + '"></a>';
                    } else {
                        if (launchLinksNewTab) {
                            markup += '<a href="' + href + '" target="_blank">' + value + '</a>';
                        } else {
                            markup += '<a href="' + href + '">' + value + '</a>';
                        }
                    }
                } else {
                    hasValidLink = false;
                }
            }
            if (!hasValidLink) {
                markup += '<div>' + value + '</div>';
            }
        }

        // closing table cell markup
        markup += '</td>';

        return markup;
    },

    createTableHeader: function (options) {
        var column = options.column,
            sorted = options.sorted;

        var classes = [],
            sortedClasses = ['pull-right'];

        if (column.sortable) {
            classes.push('sortable');
        }

        if (sorted === 'asc') {
            sortedClasses.push('sorted-ascending');
        } else if (sorted === 'desc') {
            sortedClasses.push('sorted-descending');
        }

        switch (column.titleAlignment) {
            case 'right':
                classes.push('alignment-right');
                break;
            case 'center':
                classes.push('alignment-center');
                break;
        }

        // open markup
        var markup = '<th data-col-id="' + column.id + '" class="' +
            classes.join(' ') + '" style="width:' + column.width + '">';

        // sorting
        markup += '<div class="' + sortedClasses.join(' ') + '"></div>';

        // value
        markup += column.title;

        // close markup
        markup += '</th>';

        return markup;
    }
};

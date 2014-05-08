var _ = require('underscore'),
    sorter = require('stand-in-order');

var setValue = function (path, obj, value) {
    var split = path.split('.');
    if (split.length === 1) {
        obj[split[0]] = value;
        return;
    }
    var name = split[0];
    if (!_.has(obj, name)) {
        obj[name] = {};
    }
    split.shift();
    setValue(split.join('.'), obj[name], value);
};

module.exports = function (options) {
    var grid = this;
    var utils = {
        _valueChanged: function (rowId, colId, value) {
            var column = _.findWhere(options.columns, {id: colId});
            var obj = _.findWhere(options.data, {id: rowId});
            var parsedValue = column.parser(colId, value);
            setValue(colId, obj, parsedValue);
            grid.ears.trigger('booty-value-updated', {
                rowId: rowId,
                colId: colId,
                value: parsedValue
            });
            grid.render();
        },

        _newRowChanged: function (/*colId*/) {
            var newObj = this._getNewRowData();
            grid.ears.trigger('booty-new-row-value-changed', newObj);
        },

        _getNewRowData: function () {
            var tr = options.el.find('.booty-footer-table tr.new-row');
            var newObj = {};
            _.each(options.columns, function (column) {
                var el;
                if (column.type === 'select') {
                    el = tr.find('td[data-col-id="' + column.id + '"] select');
                } else {
                    el = tr.find('td[data-col-id="' + column.id + '"] input');
                }
                newObj[column.id] = column.parser(column.id, el.val());

            }, this);
            return newObj;
        },

        _newRowClicked: function () {
            var newObj = {id: _.uniqueId('-')};
            _.extend(newObj, this._getNewRowData());

            grid.dataOrder.push(newObj);
            options.data.push(newObj);
            grid.ears.trigger('booty-new-row', newObj);
            grid.render();
        },

        _rowClicked: function (rowId, colId) {
            var obj = _.findWhere(options.data, {id: rowId});
            grid.ears.trigger('booty-row-clicked', {obj: obj, rowId: rowId, colId: colId});
        },

        _isColumnSorted: function (id) {
            var sortConfig = _.findWhere(options.sortConfig, {id: id});

            if (sortConfig == null) {
                return null;
            }

            return sortConfig.asc ? 'asc' : 'desc';
        },

        _columnClicked: function (id) {
            var column = _.findWhere(options.columns, {id: id});

            if (!column.sortable) {
                return null;
            }

            var sort = utils._isColumnSorted(id);
            if (sort == null) {
                utils._sort(id, 'asc');
            } else if (sort === 'asc') {
                utils._sort(id, 'desc');
            } else if (sort === 'desc') {
                utils._sort(id, null);
            }
        },

        _getSortType: function (type) {
            var mappings = {
                string: 'string',
                cost: 'float',
                percent: 'float',
                select: 'string',
                date: 'date'
            };
            return mappings[type];
        },

        _sort: function (id, order) {

            var sortConfig = _.findWhere(options.sortConfig, {id: id});
            if (order == null) {
                options.sortConfig.splice(_.indexOf(options.sortConfig, sortConfig), 1);
            }

            if (sortConfig == null) {
                options.sortConfig = [];
                options.sortConfig.push({
                    id: id,
                    asc: true
                });
            } else {
                sortConfig.asc = order === 'asc' ? true : false;
            }

            var sorterConfig = [];
            _.each(options.sortConfig, function (config) {
                var column = _.findWhere(options.columns, {id: config.id});
                sorterConfig.push({
                    name: config.id,
                    type: utils._getSortType(column.type),
                    ascending: config.asc
                });
            });

            if (sorterConfig.length) {
                sorter.sorter(options.data, sorterConfig);
            } else {
                // reset order
                options.data = _.clone(grid.dataOrder);
            }


            grid.render();
        },

        _validate: function (rowId, colId, input) {

        }
    };
    return utils;

};

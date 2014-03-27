var _ = require('underscore'),
    sorter = require('stand-in-order');

module.exports = function (options) {
    var grid = this;
    var utils = {
        _valueChanged: function (rowId, colId, value) {
            var column = _.findWhere(options.columns, {id: colId});
            var obj = _.findWhere(options.data, {id: rowId});
            obj[colId] = column.parser(colId, value);
        },

        _newRowClicked: function () {
            var tr = options.el.find('.booty-footer-table tr.new-row');

            var newObj = {id: _.uniqueId('-')};
            _.each(options.columns, function (column) {
                var input = tr.find('td[data-col-id="' + column.id + '"] input');

                newObj[column.id] = column.parser(column.id, input.val());

            }, this);

            grid.dataOrder.push(newObj);
            options.data.push(newObj);
            grid.render();
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
                    type: column.type,
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
        }
    };
    return utils;

};

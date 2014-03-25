var _ = require('underscore');

module.exports = function (options) {

    var utils = {
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
                options.sortConfig.push({
                    id: id,
                    asc: true
                });
            } else {
                sortConfig.asc = order === 'asc' ? true : false;
            }
        }
    };
    return utils;

};

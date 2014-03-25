var _ = require('underscore'),
    rowFactory = require('./rowFactory'),
    utils = require('./gridUtils'),
    listeners = require('./gridListeners');

var Grid = function (options) {

    var grid = this;

    // add default props and funcs to options
    options = _.defaults(options, {
        sortConfig: [],
        id: 'id',
        rows: {
            link: null
        }
    });

    // add default props and fncs to columns
    options.columns = _.map(options.columns, function (column) {
        return _.defaults(column, {
            formatter: function (id, value) {
                return value;
            },
            sortable: false,
            type: 'string',
            link: null
        });
    });

    // store the original order of the data
    grid.dataOrder = _.clone(options.data);

    var createHeaderTable = function (columns) {
        return '<div class="booty-header-table">' +
            '<table class="table table-bordered" style="margin-bottom: 0px">' +
            '<thead>' + rowFactory.createTableHeaderRow(
            {
                columns: columns,
                isColumnSorted: grid._isColumnSorted
            }) +
            '</thead>' +
            '</table>' +
            '</div>';
    };

    var createBodyTable = function () {

        var rowsMarkup = '';

        _.each(options.data, function (obj) {
            rowsMarkup += rowFactory.createTableRow({
                obj: obj,
                columns: options.columns,
                rows: options.rows
            });
        });

        return '<div class="booty-body-table" style="overflow-y: auto">' +
            '<table class="table table-bordered">' +
            '<tbody>' + rowsMarkup +
            '</tbody>' +
            '</table>' +
            '</div>';
    };

    // attach grid functions
    _.extend(grid, utils.call(grid, options));

    _.extend(grid, {

        destroy: function () {
            // remove any previous content
            options.el.empty();
        },

        render: function () {
            this.destroy();

            var markup = createHeaderTable(options.columns);
            markup += createBodyTable();

            options.el.append(markup);

            this.headerTableContainer = options.el.find('.booty-header-table');
            this.headerTable = this.headerTableContainer.find('table');
            this.bodyTableContainer = options.el.find('.booty-body-table');
            this.bodyTable = this.bodyTableContainer.find('table');

            this.bodyTableContainer.height(options.el.height() -
                this.headerTableContainer.height());

            // the below line enforces the browser to calculate heights and widths
            var hasVerticalScrollbar = this.bodyTableContainer.get(0).scrollHeight >
                this.bodyTableContainer.get(0).clientHeight;
            if (hasVerticalScrollbar) {
                this.headerTable.width(this.bodyTable.width());
            }

            // attach grid listeners
            listeners.call(grid, options.el);
        }

    });
};

module.exports = Grid;

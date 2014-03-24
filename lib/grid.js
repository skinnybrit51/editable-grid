var _ = require('underscore'),
    rowFactory = require('./rowFactory');

var Grid = function (options) {

    // add default props and fncs to columns
    options.columns = _.map(options.columns, function (column) {
        return _.defaults(column, {
            formatter: function (id, value) {
                return value;
            },
            sortable: false
        });
    });

    var createHeaderTable = function (columns) {
        return '<div class="booty-header-table">' +
            '<table class="table table-bordered" style="margin-bottom: 0px">' +
            '<thead>' + rowFactory.createTableHeaderRow({columns: columns}) +
            '</thead>' +
            '</table>' +
            '</div>';
    };

    var createBodyTable = function () {

        var rowsMarkup = '';

        _.each(options.data, function (obj) {
            rowsMarkup += rowFactory.createTableRow({obj: obj, columns: options.columns});
        });

        return '<div class="booty-body-table" style="overflow-y: auto">' +
            '<table class="table table-bordered">' +
            '<tbody>' + rowsMarkup +
            '</tbody>' +
            '</table>' +
            '</div>';
    };

    return {

        render: function () {

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
        }

    };
};

module.exports = Grid;

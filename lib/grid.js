var _ = require('underscore'),
    rowFactory = require('./rowFactory'),
    utils = require('./gridUtils'),
    listeners = require('./gridListeners'),
    Ears = require('elephant-ears');


var Grid = function (options) {

    var grid = this;

    grid.ears = new Ears();

    // add default props and funcs to options
    options = _.defaults(options, {
        sortConfig: [],
        id: 'id',
        rows: {
            link: null,
            newRow: false,
            totalRow: false
        },
        stateManager: {
            isEditable: function () {
                return false;
            }
        }
    });

    // add default props and fncs to columns
    options.columns = _.map(options.columns, function (column) {

        var formatter = function (id, value) {
            return value;
        };
        var parser = function (id, value) {
            return value;
        };

        return _.defaults(column, {
            formatter: formatter,
            parser: parser,
            sortable: false,
            type: 'string',
            link: null
        });
    });

    // store the original order of the data
    grid.dataOrder = _.clone(options.data);

    var createHeaderTable = function (columns) {
        return '<div class="booty-header-table">' +
            '<table class="table table-bordered">' +
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
                rows: options.rows,
                stateManager: options.stateManager
            });
        });

        return '<div class="booty-body-table">' +
            '<table class="table table-bordered">' +
            '<tbody>' + rowsMarkup +
            '</tbody>' +
            '</table>' +
            '</div>';
    };

    var createFooterTable = function (options) {

        // opening tags
        var markup = '<div class="booty-footer-table">';
        markup += '<table class="table table-bordered"><tfoot>';

        if (options.rows.totalRow) {
            markup += rowFactory.createTableFooterTotalRow({
                columns: options.columns,
                data: options.data
            });
        }

        if (options.rows.newRow) {
            markup += rowFactory.createTableFooterAddRow({columns: options.columns});
        }

        // closing tags
        markup += '</tfoot></table>';

        if (options.rows.newRow) {
            markup += '<div>';
            markup += '<button type="button" class="new-row pull-right btn btn-link">Add</button>';
            markup += '</div>';
        }

        markup += '</div>';

        return markup;
    };

    // attach grid functions
    _.extend(grid, utils.call(grid, options));

    _.extend(grid, {

        on: function (name, callback) {
            grid.ears.on(name, callback);
        },

        off: function (name) {
            grid.ears.off(name);
        },

        destroy: function () {
            // remove any previous content
            options.el.empty();
        },

        render: function () {
            this.destroy();
            // get the height before any contents is rendered
            var height = options.el.height();

            var markup = createHeaderTable(options.columns);
            markup += createBodyTable();
            markup += createFooterTable(options);

            options.el.append(markup);

            this.headerTableContainer = options.el.find('.booty-header-table');
            this.headerTable = this.headerTableContainer.find('table');
            this.bodyTableContainer = options.el.find('.booty-body-table');
            this.bodyTable = this.bodyTableContainer.find('table');
            this.footerTableContainer = options.el.find('.booty-footer-table');
            this.footerTable = this.footerTableContainer.find('table');

            if (height > 0) {
                // only set the body height if the outer containing div has a height set
                this.bodyTableContainer.height(options.el.height() -
                    this.headerTableContainer.height() - this.footerTableContainer.height());
            }

            // the below line enforces the browser to calculate heights and widths
            if (options.data.length > 0) {
                this.bodyTableContainer.get(0).scrollHeight >
                this.bodyTableContainer.get(0).clientHeight;
            }
//            this.headerTable.width(this.bodyTable.width());
//
//            var resize = function () {
//                var ths = this.headerTable.find('thead th');
//                _.each(this.bodyTable.find('tbody>tr td'), function (td, index) {
//                    ths.eq(index).css('width', $(td).css('width'));
//                }, this);
//            };

//            resize.call(this);

            // attach grid listeners
            listeners.call(grid, this.headerTableContainer,
                this.bodyTableContainer, this.footerTableContainer);
        }

    });
};

module.exports = Grid;

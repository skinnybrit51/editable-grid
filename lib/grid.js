var _ = require('underscore'),
    rowFactory = require('./rowFactory');

var Grid = function (options) {


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

            this.headerTable = options.el.find('.booty-header-table table');
            this.bodyTable = options.el.find('.booty-body-table table');
            this.headerTable.width(this.bodyTable.width());
        }

    };
};

module.exports = Grid;

require('./loader');
var expect = require('chai').expect,
    _ = require('underscore'),
    rowFactory = require('rowFactory');

describe('Row Factory', function () {

    beforeEach(function () {
        this.columns = [
            {
                id: 'col_1',
                title: 'Column 1',
                width: 'col-xs-1',
                formatter: function (id, value) {
                    return value;
                },
                link: 'link-id'
            },
            {
                id: 'col_2',
                title: 'Column 2',
                width: 'col-xs-2',
                type: 'cost',
                formatter: function (id, value) {
                    return value;
                }
            },
            {
                id: 'nested.col_3',
                title: 'Column 3',
                width: 'col-xs-3',
                formatter: function (id, value) {
                    return value;
                }
            }
        ];

        this.obj = {
            id: 'id',
            'link-id': 'http://www.google.com',
            'row-link-id': 'http://www.yahoo.com',
            col_1: 'a',
            col_2: 'b',
            nested: {
                col_3: 'c'
            }
        };
    });

    afterEach(function () {
        delete this.columns;
        delete this.obj;
    });

    it('Should render a table row', function () {
        this.columns.push({
            id: 'col_4',
            title: '',
            width: 'col-xs-1',
            link: 'row-link-id',
            formatter: function (value) {
                return value;
            }
        });
        var row = rowFactory.createTableRow({
            obj: this.obj,
            columns: this.columns,
            rows: {link: 'row-link-id'},
            stateManager: {
                isEditable: function (rowId, colId) {
                    if (colId === 'col_2') {
                        return true;
                    }
                    return false;
                }
            }
        });
        expect(row).to.equal('<tr data-row-id="id">' +
            '<td data-col-id="col_1" class="col-xs-1"><a href="http://www.google.com">a</a></td>' +
            '<td data-col-id="col_2" class="col-xs-2">' +
            '<div class="input-group">' +
            '<span class="input-group-addon">$</span>' +
            '<input type="text" class="form-control" value="b"/>' +
            '</div>' +
            '</td>' +
            '<td data-col-id="nested.col_3" class="col-xs-3">c</td>' +
            '<td data-col-id="col_4" class="col-xs-1"><a class="glyphicon glyphicon-arrow-right" ' +
            'href="http://www.yahoo.com"></a></td>' +
            '</tr>');
    });

    it('Should render a table header row', function () {

        var isColumnSorted = function (id) {
            if (id === 'col_1') {
                return 'asc';
            } else if (id === 'col_2') {
                return 'desc';
            }
            return false;
        };

        var row = rowFactory.createTableHeaderRow({
            columns: this.columns,
            isColumnSorted: isColumnSorted
        });
        expect(row).to.equal('<tr>' +
            '<th data-col-id="col_1" class="col-xs-1">' +
            '<div class="pull-right sorted-ascending"></div>Column 1</th>' +
            '<th data-col-id="col_2" class="col-xs-2">' +
            '<div class="pull-right sorted-descending"></div>Column 2</th>' +
            '<th data-col-id="nested.col_3" class="col-xs-3">' +
            '<div class="pull-right"></div>Column 3</th>' +
            '</tr>');
    });

    it('Should format the cell value', function () {
        var columns = _.map(this.columns, function (column) {
            return _.extend(column, {
                formatter: function (id, value) {
                    switch (id) {
                        case 'col_1':
                            return 'aa';
                        case 'col_2':
                            return 'bb';
                        case 'nested.col_3':
                            return 'cc';
                    }
                    return value;
                },
                link: null
            });
        });
        var stateManager = {
            isEditable: function () {
                return false;
            }
        };
        var row = rowFactory.createTableRow({
            obj: this.obj,
            columns: columns,
            rows: {},
            stateManager: stateManager
        });
        expect(row).to.equal('<tr data-row-id="id">' +
            '<td data-col-id="col_1" class="col-xs-1">aa</td>' +
            '<td data-col-id="col_2" class="col-xs-2">bb</td>' +
            '<td data-col-id="nested.col_3" class="col-xs-3">cc</td>' +
            '</tr>');
    });

    it('Should create a footer row for entry', function () {
        var columns = [
            {
                id: 'string',
                type: 'string',
                width: 'col-xs-3',
                link: 'link-id'
            },
            {
                id: 'date',
                type: 'date',
                width: 'col-xs-3'
            },
            {
                id: 'cost',
                type: 'cost',
                width: 'col-xs-3'
            },
            {
                id: 'percent',
                type: 'percent',
                width: 'col-xs-3'
            },
            {
                id: 'select',
                type: 'select',
                list: ['a', 'b', 'c'],
                formatter: function (id, value) {
                    switch (value) {
                        case 'a':
                            return 'A';
                        case 'b':
                            return 'B';
                        case 'c':
                            return 'C';
                    }
                    return value;
                },
                width: 'col-xs-3'
            }
        ];
        var row = rowFactory.createTableFooterAddRow({columns: columns});
        expect(row).to.equal('<tr class="new-row">' +
            '<td data-col-id="string" class="col-xs-3">' +
            '</td>' +
            '<td data-col-id="date" class="col-xs-3">' +
            '<input type="date" class="form-control"/>' +
            '</td>' +
            '<td data-col-id="cost" class="col-xs-3">' +
            '<div class="input-group">' +
            '<span class="input-group-addon">$</span>' +
            '<input type="text" class="form-control"/>' +
            '</div>' +
            '</td>' +
            '<td data-col-id="percent" class="col-xs-3">' +
            '<div class="input-group">' +
            '<input type="text" class="form-control"/>' +
            '<span class="input-group-addon">%</span>' +
            '</div>' +
            '</td>' +
            '<td data-col-id="select" class="col-xs-3">' +
            '<select class="form-control">' +
            '<option value="a">A</option>' +
            '<option value="b">B</option>' +
            '<option value="c">C</option>' +
            '</select>' +
            '</td>' +
            '</tr>'
        )
        ;
    });

    it('Should create a footer row for totals', function () {
        var costFormatter = function (id, value) {
            return '$' + value;
        };

        var columns = [
            {
                id: 'string',
                type: 'string',
                width: 'col-xs-4'
            },
            {
                id: 'cost_1',
                type: 'cost',
                width: 'col-xs-4',
                formatter: costFormatter
            },
            {
                id: 'cost_2',
                type: 'cost',
                width: 'col-xs-4',
                formatter: costFormatter
            }
        ];
        var data = [
            {
                string: 'hello',
                cost_1: 1,
                cost_2: 5
            },
            {
                string: 'morning',
                cost_1: 1,
                cost_2: 5
            },
            {
                string: 'afternoon',
                cost_1: 1,
                cost_2: 5
            }
        ];
        var row = rowFactory.createTableFooterTotalRow({columns: columns, data: data});
        expect(row).to.equal('<tr class="total-row">' +
            '<td data-col-id="string" class="col-xs-4"></td>' +
            '<td data-col-id="cost_1" class="col-xs-4">=$3</td>' +
            '<td data-col-id="cost_2" class="col-xs-4">=$15</td>' +
            '</tr>');
    });

});

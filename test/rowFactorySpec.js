require('./loader');
var expect = require('chai').expect,
    rowFactory = require('rowFactory');

describe('Row Factory', function () {

    beforeEach(function () {
        this.columns = [
            {
                id: 'col_1',
                title: 'Column 1',
                width: 'col-xs-1'
            },
            {
                id: 'col_2',
                title: 'Column 2',
                width: 'col-xs-2'
            },
            {
                id: 'col_3',
                title: 'Column 3',
                width: 'col-xs-3'
            }
        ];

        this.data = {
            id: 'id',
            col_1: 'a',
            col_2: 'b',
            col_3: 'c'
        };
    });

    afterEach(function () {
        delete this.columns;
        delete this.data;
    });

    it('Should render a table row', function () {
        var row = rowFactory.createTableRow({data: this.data, columns: this.columns});
        expect(row).to.equal('<tr data-row-id="id">' +
            '<td data-cell-id="col_1" style="width:col-xs-1">a</td>' +
            '<td data-cell-id="col_2" style="width:col-xs-2">b</td>' +
            '<td data-cell-id="col_3" style="width:col-xs-3">c</td>' +
            '</tr>');
    });

    it('Should render a table header row', function () {
        var row = rowFactory.createTableHeaderRow({columns: this.columns});
        expect(row).to.equal('<tr>' +
            '<th data-cell-id="col_1" style="width:col-xs-1">Column 1</th>' +
            '<th data-cell-id="col_2" style="width:col-xs-2">Column 2</th>' +
            '<th data-cell-id="col_3" style="width:col-xs-3">Column 3</th>' +
            '</tr>');
    });

});

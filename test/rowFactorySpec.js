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

        this.obj = {
            id: 'id',
            col_1: 'a',
            col_2: 'b',
            col_3: 'c'
        };
    });

    afterEach(function () {
        delete this.columns;
        delete this.obj;
    });

    it('Should render a table row', function () {
        var row = rowFactory.createTableRow({obj: this.obj, columns: this.columns});
        expect(row).to.equal('<tr data-row-id="id">' +
            '<td data-cell-id="col_1" class="col-xs-1">a</td>' +
            '<td data-cell-id="col_2" class="col-xs-2">b</td>' +
            '<td data-cell-id="col_3" class="col-xs-3">c</td>' +
            '</tr>');
    });

    it('Should render a table header row', function () {
        var row = rowFactory.createTableHeaderRow({columns: this.columns});
        expect(row).to.equal('<tr>' +
            '<th data-cell-id="col_1" class="col-xs-1">Column 1</th>' +
            '<th data-cell-id="col_2" class="col-xs-2">Column 2</th>' +
            '<th data-cell-id="col_3" class="col-xs-3">Column 3</th>' +
            '</tr>');
    });

});

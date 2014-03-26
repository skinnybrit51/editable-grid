require('./loader');
var _ = require('underscore'),
    $ = require('jqueryify'),
    expect = require('chai').expect,
    gridUtils = require('gridUtils'),
    sinon = require('sinon');

describe('Grid Utils', function () {

    beforeEach(function () {
        this.sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
        this.sandbox.restore();
    });

    it('Should return whether a column is sorted', function () {
        var options = {
            sortConfig: [
                {
                    id: 'col-a',
                    asc: true
                },
                {
                    id: 'col-b',
                    asc: false
                }
            ],
            columns: [
                {
                    id: 'col-a'
                },
                {
                    id: 'col-b'
                },
                {
                    id: 'col-c'
                }
            ]
        };

        var utils = gridUtils(options);

        expect(utils._isColumnSorted('col-a')).to.equal('asc');
        expect(utils._isColumnSorted('col-b')).to.equal('desc');
        expect(utils._isColumnSorted('col-c')).to.be.null;

    });

    it('Should determine what to do when a column is clicked', function () {
        var options = {
            sortConfig: [
                {
                    id: 'col-a',
                    asc: true
                },
                {
                    id: 'col-b',
                    asc: false
                }
            ],
            columns: [
                {
                    id: 'col-a',
                    sortable: true,
                    type: 'string'
                },
                {
                    id: 'col-b',
                    sortable: true,
                    type: 'string'
                },
                {
                    id: 'col-c',
                    sortable: false,
                    type: 'string'
                }
            ],
            data: []
        };
        var grid = {render: function () {
        }};
        var utils = gridUtils.call(grid, options);

        var spy = this.sandbox.spy(utils, '_sort');

        expect(spy.callCount).to.equal(0);

        utils._columnClicked('col-a');

        expect(spy.callCount).to.equal(1);
        expect(spy.args[0][0]).to.equal('col-a');
        expect(spy.args[0][1]).to.equal('desc');
        expect(options.sortConfig).to.have.length(2);
        expect(options.sortConfig[0].asc).to.be.false;

        utils._columnClicked('col-b');

        expect(spy.callCount).to.equal(2);
        expect(spy.args[1][0]).to.equal('col-b');
        expect(spy.args[1][1]).to.be.null;
        expect(options.sortConfig).to.have.length(1);

        utils._columnClicked('col-b');

        expect(spy.callCount).to.equal(3);
        expect(spy.args[2][0]).to.equal('col-b');
        expect(spy.args[2][1]).to.equal('asc');
        expect(options.sortConfig).to.have.length(1);
        expect(options.sortConfig[0].asc).to.be.true;


        // sort function should not be called as column is not allowed to be sorted
        utils._columnClicked('col-c');

        expect(spy.callCount).to.equal(3);
    });

    it('Should parse the values and add a new row', function () {
        var data = [];
        var options = {
            el: $('<div><div class="booty-footer-table"><tr class="new-row">' +
                '<td data-col-id="string"><input value="hello"/></td>' +
                '<td data-col-id="cost"><input value="500.36"/></td>' +
                '<td data-col-id="percent"><input value="45.5"/></td>' +
                '<td data-col-id="date"><input value="2014-01-01"/></td>' +
                '</tr></div></div>'),
            columns: [
                {
                    id: 'string',
                    type: 'string',
                    parser: function (id, value) {
                        return value;
                    }
                },
                {
                    id: 'cost',
                    type: 'cost',
                    parser: function (id, value) {
                        return parseFloat(value);
                    }
                },
                {
                    id: 'percent',
                    type: 'percent',
                    parser: function (id, value) {
                        return parseFloat(value) / 100;
                    }
                },
                {
                    id: 'date',
                    type: 'date',
                    parser: function (id, value) {
                        return value;
                    }
                }
            ],
            data: data
        };
        var grid = {
            data: data,
            dataOrder: _.clone(data),
            render: function () {
            }
        };
        var utils = gridUtils.call(grid, options);

        var spy = this.sandbox.spy(grid, 'render');

        expect(spy.callCount).to.equal(0);
        expect(options.data).to.have.length(0);
        expect(grid.dataOrder).to.have.length(0);

        utils._newRowClicked();

        expect(spy.callCount).to.equal(1);
        expect(options.data).to.have.length(1);
        expect(grid.dataOrder).to.have.length(1);
        expect(options.data[0].id).to.equal('-1');
        expect(options.data[0].string).to.equal('hello');
        expect(options.data[0].cost).to.equal(500.36);
        expect(options.data[0].percent).to.equal(0.455);
        expect(options.data[0].date).to.equal('2014-01-01');
    });
});

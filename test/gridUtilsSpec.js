require('./loader');
var expect = require('chai').expect,
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
                    sortable: true
                },
                {
                    id: 'col-b',
                    sortable: true
                },
                {
                    id: 'col-c',
                    sortable: false
                }
            ]
        };
        var utils = gridUtils(options);

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
        expect(options.sortConfig).to.have.length(2);
        expect(options.sortConfig[1].asc).to.be.true;


        // sort function should not be called as column is not allowed to be sorted
        utils._columnClicked('col-c');

        expect(spy.callCount).to.equal(3);

    });
});

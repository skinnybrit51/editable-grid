var sinon = require('sinon'),
    expect = require('chai').expect,
    rowFactory = require('rowFactory'),
    depthFirstTreeTraversal = require('depthFirstTreeTraversal');


describe('Depth First Tree Traversal', function () {

    beforeEach(function () {
        this.sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
        this.sandbox.restore();
    });

    it('Should traverse a non tree structure', function () {
        var collection = [
            {
                id: '1'
            },
            {
                id: '2'
            }
        ];
        var grid = {
            _treeState: null
        };
        var options = {
            id: 'id'
        };

        var createTableRowSpy = this.sandbox.stub(rowFactory, 'createTableRow', function () {
            return '-';
        });

        var markup = depthFirstTreeTraversal.call(grid, options, collection, false, 0);
        expect(createTableRowSpy.callCount).to.equal(2);
        expect(createTableRowSpy.args[0][0].id).to.equal('1');
        expect(createTableRowSpy.args[0][1]).to.equal(options);
        expect(createTableRowSpy.args[0][2]).to.equal(0);
        expect(createTableRowSpy.args[0][3]).to.equal(grid._treeState);
        expect(markup).to.equal('--');
    });

    it('Should traverse a tree structure', function () {
        var collection = [
            {
                id: '1'
            },
            {
                id: '2',
                children: [
                    {
                        id: '3',
                        children: [
                            {
                                id: '4'
                            },
                            {
                                id: '5'
                            }
                        ]
                    }
                ]
            },
            {
                id: '6',
                children: [
                    {
                        id: '7'
                    }
                ]
            }
        ];
        var grid = {
            _treeState: {
                '2': 'expand',
                '3': 'expand',
                '6': 'expand'
            }
        };
        var options = {
            id: 'id',
            treeMode: true
        };

        var createTableRowSpy = this.sandbox.stub(rowFactory, 'createTableRow', function () {
            return '-';
        });

        var markup = depthFirstTreeTraversal.call(grid, options, collection, true, 0);
        expect(createTableRowSpy.callCount).to.equal(7);
        expect(markup).to.equal('-------');

        expect(createTableRowSpy.args[0][0].id).to.equal('1');
        expect(createTableRowSpy.args[0][1]).to.equal(options);
        expect(createTableRowSpy.args[0][2]).to.equal(0);

        expect(createTableRowSpy.args[1][0].id).to.equal('2');
        expect(createTableRowSpy.args[1][1]).to.equal(options);
        expect(createTableRowSpy.args[1][2]).to.equal(0);

        expect(createTableRowSpy.args[2][0].id).to.equal('3');
        expect(createTableRowSpy.args[2][1]).to.equal(options);
        expect(createTableRowSpy.args[2][2]).to.equal(1);

        expect(createTableRowSpy.args[3][0].id).to.equal('4');
        expect(createTableRowSpy.args[3][1]).to.equal(options);
        expect(createTableRowSpy.args[3][2]).to.equal(2);

        expect(createTableRowSpy.args[4][0].id).to.equal('5');
        expect(createTableRowSpy.args[4][1]).to.equal(options);
        expect(createTableRowSpy.args[4][2]).to.equal(2);

        expect(createTableRowSpy.args[5][0].id).to.equal('6');
        expect(createTableRowSpy.args[5][1]).to.equal(options);
        expect(createTableRowSpy.args[5][2]).to.equal(0);

        expect(createTableRowSpy.args[6][0].id).to.equal('7');
        expect(createTableRowSpy.args[6][1]).to.equal(options);
        expect(createTableRowSpy.args[6][2]).to.equal(1);
    });
});
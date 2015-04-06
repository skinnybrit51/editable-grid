var expect = require('chai').expect,
    cellFactory = require('cellFactory');


describe('Cell Factory', function () {

    it('Should create a cell', function () {
        var markup = cellFactory.createTableData({
            stateManager: {
                isEditable: function () {
                    return false;
                }
            },
            column: {
                classes: ['foo', 'bar'],
                width: '10',
                id: 'foo',
                formatter: function (id, value) {
                    return value;
                }
            },
            treeColumn: true,
            level: 0,
            treeState: {
                '1': 'expanded'
            },
            obj: {
                id: '1',
                foo: 'foo'
            },
            id: 'id'
        });
        expect(markup).to.equal('<td class="foo bar tree-column" data-col-id="foo" ' +
            'style="width:10;padding-left:0px">' +
            '<div class="tree-node tree-node-expand"/><div>foo</div></td>');

        markup = cellFactory.createTableData({
            stateManager: {
                isEditable: function () {
                    return false;
                }
            },
            column: {
                width: '10',
                id: 'foo',
                formatter: function (id, value) {
                    return value;
                }
            },
            treeColumn: true,
            level: 2,
            treeState: {
                '1': 'expanded'
            },
            obj: {
                id: '1',
                foo: 'foo'
            },
            id: 'id'
        });
        expect(markup).to.equal('<td class="tree-column" data-col-id="foo" ' +
            'style="width:10;padding-left:30px">' +
            '<div class="tree-node tree-node-expand"/><div>foo</div></td>');

        markup = cellFactory.createTableData({
            stateManager: {
                isEditable: function () {
                    return false;
                }
            },
            column: {
                width: '10',
                id: 'foo',
                formatter: function (id, value) {
                    return value;
                }
            },
            treeColumn: true,
            level: 2,
            treeState: {},
            obj: {
                id: '1',
                foo: 'foo',
                children: 'empty'
            },
            id: 'id'
        });
        expect(markup).to.equal('<td class="tree-column" data-col-id="foo" ' +
            'style="width:10;padding-left:30px">' +
            '<div class="tree-node tree-node-none"/><div>foo</div></td>');
    });

});

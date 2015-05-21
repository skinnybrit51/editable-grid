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

    it('Should create a cell with link', function () {
        var markup = cellFactory.createTableData({
            stateManager: {
                isEditable: function () {
                    return false;
                }
            },
            column: {
                classes: ['foo'],
                width: '10',
                id: 'bar',
                link: 'link-id',
                formatter: function (id, value) {
                    return value;
                }
            },
            obj: {
                id: '1',
                foo: 'foo',
                'link-id': 'http://www.example.com'
            },
            id: 'id',
            rows: {
                link: 'row-link-id'
            }
        });
        expect(markup).to.equal('<td class="foo" data-col-id="bar" style="width:10"><a ' +
            'href="http://www.example.com"></a></td>');

        markup = cellFactory.createTableData({
            launchLinksNewTab: true,
            stateManager: {
                isEditable: function () {
                    return false;
                }
            },
            column: {
                classes: ['foo'],
                width: '10',
                id: 'bar',
                link: 'link-id',
                formatter: function (id, value) {
                    return value;
                }
            },
            obj: {
                id: '1',
                foo: 'foo',
                'link-id': 'http://www.example.com'
            },
            id: 'id',
            rows: {
                link: 'row-link-id'
            }
        });
        expect(markup).to.equal('<td class="foo" data-col-id="bar" style="width:10"><a ' +
            'href="http://www.example.com" target="_blank"></a></td>');
    });

});

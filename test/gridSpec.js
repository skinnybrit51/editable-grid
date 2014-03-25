require('./loader');
var $ = require('jqueryify'),
    _ = require('underscore'),
    expect = require('chai').expect,
    Grid = require('grid'),
    sinon = require('sinon');

describe('Grid', function () {

    beforeEach(function () {
        this.sandbox = sinon.sandbox.create();
        this.el = $('<div></div>');
        this.columns = [
            {
                id: 'a',
                title: 'a',
                width: 'col-xs-4'
            },
            {
                id: 'b',
                title: 'b',
                width: 'col-xs-4'
            },
            {
                id: 'c',
                title: 'c',
                width: 'col-xs-4'
            }
        ];
        this.data = [
            {
                id: 'id-1',
                a: 'a-1',
                b: 'b-1',
                c: 'c-1'
            },
            {
                id: 'id-2',
                a: 'a-2',
                b: 'b-2',
                c: 'c-2'
            }
        ];
        this.grid = new Grid({
            el: this.el,
            columns: this.columns,
            data: this.data
        });
        this.grid.render();
    });

    afterEach(function () {
        this.sandbox.restore();
        delete this.grid;
        delete this.el;
        delete this.columns;
        delete this.data;
    });

    it('Should have the correct classes and styles on it', function () {

        var divs = this.el.find('div');
        expect(divs).to.have.length(2);
        expect(divs.eq(0).is('.booty-header-table')).to.be.true;
        expect(divs.eq(1).is('.booty-body-table')).to.be.true;
        expect(divs.eq(1).css('overflow-y')).to.equal('auto');

        var tables = this.el.find('table');
        expect(tables).to.have.length(2);
        expect(tables.eq(0).is('.table')).to.be.true;
        expect(tables.eq(0).is('.table-bordered')).to.be.true;
        expect(tables.eq(0).css('margin-bottom')).to.equal('0px');

        expect(tables.eq(1).is('.table')).to.be.true;
        expect(tables.eq(1).is('.table-bordered')).to.be.true;

    });

    it('Should make a header table', function () {
        var table = this.el.find('.booty-header-table table');
        expect(table.find('tbody').children()).to.have.length(0);
        var tr = table.find('thead tr');
        expect(tr).to.have.length(1);
        expect(tr.children()).to.have.length(3);
    });

    it('Should make a body table', function () {
        var table = this.el.find('.booty-body-table table');
        expect(table.find('thead').children()).to.have.length(0);
        var trs = table.find('tbody tr');
        expect(trs).to.have.length(2);
        expect(trs.eq(0).children()).to.have.length(3);
    });

    it('Should have the same width as the body table', function () {
        var headerTable = this.el.find('.booty-header-table table');
        var bodyTable = this.el.find('.booty-body-table table');
        expect(headerTable.width()).to.equal(bodyTable.width());
    });

    it('Should calculate the height for the body table', function () {
        var bodyTableContainer = this.el.find('.booty-body-table');
        expect(bodyTableContainer.height()).to.equal(0);

        var el = $('<div style="height: 500px"></div>');
        var grid = new Grid({
            el: el,
            columns: this.columns,
            data: this.data
        });

        grid.render();

        bodyTableContainer = el.find('.booty-body-table');
        expect(bodyTableContainer.height()).to.equal(500);
    });

    it('Should set default values on columns', function () {
        var options = {
            columns: [
                {
                    id: 'id',
                    width: 'col-xs-3',
                    title: 'title'
                }
            ]
        };

        expect(_.has(options.columns[0], 'formatter')).to.be.false;
        expect(_.has(options.columns[0], 'sortable')).to.be.false;

        new Grid(options);

        expect(_.isFunction(options.columns[0].formatter)).to.be.true;
        expect(options.columns[0].sortable).to.be.false;
    });

    it('Should set default options for the grid', function () {
        var options = {};

        expect(_.has(options, 'sortConfig')).to.be.false;

        new Grid(options);

        expect(options.sortConfig).to.have.length(0);
    });
});

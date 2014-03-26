require('./loader');
var expect = require('chai').expect,
    $ = require('jqueryify'),
    gridListeners = require('gridListeners'),
    sinon = require('sinon');

describe('Grid Listeners', function () {

    beforeEach(function () {
        this.sandbox = sinon.sandbox.create();
        this.el = $('<div class="booty-header-table"><table>' +
            '<thead>' +
            '<tr>' +
            '<th data-col-id="a"></th>' +
            '<th data-col-id="b"></th>' +
            '</tr></thead>' +
            '</table>' +
            '<button class="new-row"></button>' +
            '</div>');
        this.grid = {
            _columnClicked: function () {
            },
            _newRowClicked: function () {
            }
        };
        this.listeners = gridListeners.call(this.grid, this.el);
    });

    afterEach(function () {
        this.sandbox.restore();
        delete this.listeners;
        delete this.grid;
    });

    it('Should listen for a column being clicked', function () {
        var spy = this.sandbox.spy(this.grid, '_columnClicked');

        expect(spy.callCount).to.equal(0);

        this.el.find('th[data-col-id="a"]').trigger('click');

        expect(spy.callCount).to.equal(1);
    });

    it('Should listen for an new row click', function () {
        var spy = this.sandbox.spy(this.grid, '_newRowClicked');

        expect(spy.callCount).to.equal(0);

        this.el.find('button.new-row').trigger('click');

        expect(spy.callCount).to.equal(1);
    });
});

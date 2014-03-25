require('./loader');
var expect = require('chai').expect,
    $ = require('jqueryify'),
    gridListeners = require('gridListeners'),
    sinon = require('sinon');

describe('Grid Listeners', function () {

    beforeEach(function () {
        this.el = $('<div class="booty-header-table"><table>' +
            '<thead>' +
            '<tr>' +
            '<th data-col-id="a"></th>' +
            '<th data-col-id="b"></th>' +
            '</tr></thead>' +
            '</table></div>');
        this.sandbox = sinon.sandbox.create();
        this.grid = {
            _columnClicked: function () {
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
});

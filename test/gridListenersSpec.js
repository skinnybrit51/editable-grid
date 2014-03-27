require('./loader');
var expect = require('chai').expect,
    $ = require('jqueryify'),
    gridListeners = require('gridListeners'),
    sinon = require('sinon');

describe('Grid Listeners', function () {

    beforeEach(function () {
        this.sandbox = sinon.sandbox.create();
        this.headerContainer = $('<div class="booty-header-table"><table>' +
            '<thead>' +
            '<tr>' +
            '<th data-col-id="col-a"></th>' +
            '<th data-col-id="col-b"></th>' +
            '</tr></thead>' +
            '</table></div>');
        this.bodyContainer = $('<div class="booty-body-table"><table>' +
            '<tbody><tr data-row-id="row-id"><td data-col-id="col-a"><input/></td></tr></tbody>' +
            '</table></div>');
        this.footerContainer = $('<div><table>' +
            '<tfoot></tfoot>' +
            '</table>' +
            '<button class="new-row"></button>' +
            '</div>');

        this.grid = {
            _columnClicked: function () {
            },
            _newRowClicked: function () {
            },
            _valueChanged: function () {
            }
        };
        this.listeners = gridListeners.call(this.grid, this.headerContainer,
            this.bodyContainer, this.footerContainer);
    });

    afterEach(function () {
        this.sandbox.restore();
        delete this.listeners;
        delete this.grid;
    });

    it('Should listen for a column being clicked', function () {
        var spy = this.sandbox.spy(this.grid, '_columnClicked');

        expect(spy.callCount).to.equal(0);

        this.headerContainer.find('th[data-col-id="col-a"]').trigger('click');

        expect(spy.callCount).to.equal(1);
        expect(spy.args[0][0]).to.equal('col-a');
    });

    it('Should listen for an new row click', function () {
        var spy = this.sandbox.spy(this.grid, '_newRowClicked');

        expect(spy.callCount).to.equal(0);

        this.footerContainer.find('button.new-row').trigger('click');

        expect(spy.callCount).to.equal(1);
    });

    it('Should listen for a change event on an input', function () {
        var spy = this.sandbox.spy(this.grid, '_valueChanged');

        expect(spy.callCount).to.equal(0);

        var input = this.bodyContainer.find('input');
        input.val('b');
        input.trigger('change');

        expect(spy.callCount).to.equal(1);
        expect(spy.args[0][0]).to.equal('row-id');
        expect(spy.args[0][1]).to.equal('col-a');
        expect(spy.args[0][2]).to.equal('b');
    });
});

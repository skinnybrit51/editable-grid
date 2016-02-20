var _ = require('underscore'),
    Grid = require('../grid');

module.exports = {

    title: 'Add row with advanced actions',

    description: 'Add a new row to the table.  ' +
        'Ability to change the content/default values of cells when a value changes.',

    present: function (el) {

        // initial default values
        var newRowObj = {
            percent: 0.05,
            select_a: 'b',
            select_b: 'n'
        };

        var grid = new Grid({
            el: el,
            rows: {
                newRow: true
            },
            columns: [
                {
                    id: 'percent',
                    title: 'Percent',
                    width: '33.3%',
                    type: 'percent',
                    formatter: function (id, value) {
                        return value * 100;
                    },
                    parser: function (id, value) {
                        return parseFloat(value) / 100;
                    },
                    preCreateCallback: function () {
                        return this.formatter(this.id, newRowObj[this.id]);
                    }
                },
                {
                    id: 'select_a',
                    title: 'Select A',
                    width: '33.3%',
                    type: 'select',
                    list: ['a', 'b', 'c'],
                    preCreateCallback: function () {
                        return newRowObj[this.id];
                    }
                },
                {
                    id: 'select_b',
                    title: 'Select B',
                    width: '33.3%',
                    type: 'select',
                    list: ['m', 'n', 'o'],
                    preCreateCallback: function () {
                        var value = newRowObj[this.id];
                        if (newRowObj.select_a === 'c') {
                            this.list = ['w', 'x', 'z'];
                            return _.contains(this.list, value) ? value : 'w';
                        }
                        this.list = ['m', 'n', 'o'];
                        return _.contains(this.list, value) ? value : 'm';
                    }
                }
            ],
            data: [
                {
                    id: 'id-1',
                    string: 'Hello World',
                    date: '2014-03-25',
                    percent: 0.25,
                    cost: 1000
                },
                {
                    id: 'id-2',
                    string: 'Good Morning',
                    date: '2015-03-25',
                    percent: 0.75,
                    cost: 500
                }
            ]
        });
        grid.render();
        grid.on('editable-new-row-value-changed', function (data) {
            newRowObj = data;
            grid.render();
        });
    }

};

var Grid = require('../grid');

module.exports = {

    title: 'Add row',

    description: 'Add a new row to the table',

    present: function (el) {

        var grid = new Grid({
            el: el,
            rows: {
                newRow: true
            },
            columns: [
                {
                    id: 'string',
                    title: 'String',
                    width: 'col-xs-3'
                },
                {
                    id: 'percent',
                    title: 'Percent',
                    width: 'col-xs-3',
                    type: 'percent',
                    formatter: function (id, value) {
                        return value * 100;
                    },
                    parser: function (id, value) {
                        return parseFloat(value) / 100;
                    }
                },
                {
                    id: 'date',
                    title: 'Date',
                    width: 'col-xs-3',
                    type: 'date'
                },
                {
                    id: 'cost',
                    title: 'Cost',
                    width: 'col-xs-3',
                    type: 'cost',
                    parser: function (id, value) {
                        return parseFloat(value);
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
    }

};

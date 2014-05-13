var Grid = require('../grid');

module.exports = {

    title: 'Row selection',

    description: 'Allow the user to trigger an action when a row is clicked',

    present: function (el) {

        var grid = new Grid({
            el: el,
            rows: {
                link: true  // allows for the row to be linked
            },
            columns: [
                {
                    id: 'string',
                    title: 'String',
                    width: '25%'
                },
                {
                    id: 'cost',
                    title: 'Cost',
                    width: '25%',
                    type: 'cost'
                },
                {
                    id: 'percent',
                    title: 'Percent',
                    width: '25%',
                    type: 'percent'
                },
                {
                    id: 'date',
                    title: 'Date',
                    width: '25%',
                    type: 'date'
                }
            ],
            data: [
                {
                    id: 'id-1',
                    string: 'Row 1',
                    cost: 1000.23,
                    percent: 0.45,
                    date: '2014-03-27'
                },
                {
                    id: 'id-2',
                    string: 'Row 2',
                    percent: 0.45
                },
                {
                    id: 'id-3',
                    cost: 1000.23,
                    percent: 0.45,
                    date: '2014-04-27',
                    string:'Row 3'
                }
            ]
        });
        grid.render();
        grid.on('booty-row-clicked', function (params) {
            window.alert('Row clicked - ' + params.obj.string);
        });
    }

};

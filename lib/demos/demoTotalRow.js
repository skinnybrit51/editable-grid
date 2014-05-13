var Grid = require('../grid');

module.exports = {

    title: 'Total row',

    description: 'Calculates the sum of the values for cost columns.',

    present: function (el) {

        var grid = new Grid({
            el: el,
            rows: {
                totalRow: true
            },
            columns: [
                {
                    id: 'string',
                    title: 'String',
                    width: '33.3%'
                },
                {
                    id: 'cost_1',
                    title: 'Cost 1',
                    width: '33.3%',
                    type: 'cost'
                },
                {
                    id: 'cost_2',
                    title: 'Cost 2',
                    width: '33.3%',
                    type: 'cost'
                }
            ],
            data: [
                {
                    id: 'id-1',
                    string: 'Hello World',
                    cost_1: 1000.23,
                    cost_2: 564.45
                },
                {
                    id: 'id-2',
                    string: 'Good Morning',
                    cost_1: 264.84,
                    cost_2: 6843.45
                },
                {
                    id: 'id-3',
                    string: 'Good Afternoon',
                    cost_1: 6841.54,
                    cost_2: 5827.32
                }
            ]
        });
        grid.render();
    }

};

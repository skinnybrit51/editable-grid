var formatters = require('./formatters'),
    Grid = require('../grid');

module.exports = {

    title: 'Checkbox column',

    description: 'Checkbox column',

    present: function (el) {

        var grid = new Grid({
            el: el,
            columns: [
                {
                    id: 'checkbox_1',
                    title: 'Checkbox 1',
                    with: '25%',
                    type: 'checkbox',
                    alignment: 'center'
                },
                {
                    id: 'string',
                    title: 'String',
                    width: '25%'
                },
                {
                    id: 'checkbox_2',
                    title: 'Checkbox 2',
                    with: '25%',
                    type: 'checkbox',
                    alignment: 'center'
                },
                {
                    id: 'cost',
                    title: 'Cost',
                    width: '25%',
                    type: 'cost',
                    alignment: 'right',
                    formatter: function (id, value) {
                        return formatters.cost(value);
                    },
                    parser: function (id, value) {
                        return parseFloat(value);
                    }
                },
            ],
            data: [
                {
                    id: 'id-1',
                    string: 'Hello World',
                    checkbox_2: true,
                    checkbox_1: false,
                    cost: 1000
                },
                {
                    id: 'id-2',
                    string: 'Good Morning',
                    checkbox_2: false,
                    checkbox_1: true,
                    cost: 500000
                }
            ]
        });
        grid.render();
        grid.on('editable-value-updated', function (/*obj*/) {
        });
    }

};

var Grid = require('../grid');

module.exports = {

    title: 'Editable cells',

    description: 'Enable cell values to be changed.',

    present: function (el) {

        var grid = new Grid({
            el: el,
            stateManager: {
                isEditable: function (rowId, colId) {
                    if (colId === 'readOnly') {
                        return false;
                    }
                    return true;
                }
            },
            columns: [
                {
                    id: 'readOnly',
                    title: 'Title',
                    width: 'col-xs-4'
                },
                {
                    id: 'string',
                    title: 'String',
                    width: 'col-xs-2'
                },
                {
                    id: 'cost',
                    title: 'Cost',
                    width: 'col-xs-2',
                    type: 'cost'
                },
                {
                    id: 'percent',
                    title: 'Percent',
                    width: 'col-xs-2',
                    type: 'percent'
                },
                {
                    id: 'date',
                    title: 'Date',
                    width: 'col-xs-2',
                    type: 'date'
                }
            ],
            data: [
                {
                    id: 'id-1',
                    readOnly: 'No editable field',
                    string: 'Hello World',
                    cost: 1000.23,
                    percent: 0.45,
                    date: '2014-03-27'
                },
                {
                    id: 'id-2',
                    readOnly: 'No editable field',
                    string: 'Good Morning',
                    percent: 0.45
                },
                {
                    id: 'id-3',
                    readOnly: 'No editable field',
                    cost: 1000.23,
                    percent: 0.45,
                    date: '2014-04-27'
                }
            ]
        });
        grid.render();
    }

};

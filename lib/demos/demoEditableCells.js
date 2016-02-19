var Grid = require('../grid');

module.exports = {

    title: 'Editable cells',

    description: 'Enable cell values to be changed.  Fires "editable-value-updated" event',

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
                    width: '20%'
                },
                {
                    id: 'string',
                    title: 'String',
                    width: '20%'
                },
                {
                    id: 'cost',
                    title: 'Cost',
                    width: '20%',
                    type: 'cost'
                },
                {
                    id: 'percent',
                    title: 'Percent',
                    width: '20%',
                    type: 'percent'
                },
                {
                    id: 'date',
                    title: 'Date',
                    width: '20%',
                    type: 'date'
                }
            ],
            data: [
                {
                    id: 'id-1',
                    readOnly: 'Non editable field',
                    string: 'Hello World',
                    cost: 1000.23,
                    percent: 0.45,
                    date: '2014-03-27'
                },
                {
                    id: 'id-2',
                    readOnly: 'Non editable field',
                    string: 'Good Morning',
                    percent: 0.45
                },
                {
                    id: 'id-3',
                    readOnly: 'Non editable field',
                    cost: 1000.23,
                    percent: 0.45,
                    date: '2014-04-27'
                }
            ]
        });
        grid.render();
        grid.on('editable-value-updated', function (/*obj*/) {
        });
    }

};

var $ = require('jquery'),
    Grid = require('../grid');

module.exports = {

    title: 'Row deletion',

    description: 'Allow the user to delete a row.',

    present: function (el) {
        var deleteButton = $('<button type="button" class="btn btn-primary btn-sm" ' +
            'style="margin-bottom: 10px">Turn ON Deletion</button>');
        var tableContainer = $('<div></div>');
        el.append(deleteButton);
        el.append(tableContainer);
        var grid = new Grid({
            el: tableContainer,
            columns: [
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
                    string: 'Row 3'
                }
            ]
        });
        grid.render();
        deleteButton.on('click', function () {
            var isActive = deleteButton.is('.active');
            if (isActive) {
                deleteButton.removeClass('active');
                deleteButton.text('Turn ON Deletion');
            } else {
                deleteButton.addClass('active');
                deleteButton.text('Turn OFF Deletion');
            }
            grid.trigger('booty-delete-mode', !isActive);
        });
        grid.on('booty-can-delete', function (/*rowId*/) {
            // could add a confirm message box here
            return true;
        });

    }

};

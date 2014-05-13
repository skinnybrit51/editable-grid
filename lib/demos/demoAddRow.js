var $ = require('jquery'),
    Grid = require('../grid');

module.exports = {

    title: 'Add row',

    description: 'Add a new row to the table.  Fires "booty-new-row" event.  ' +
        'Notice how the parser and validate are being used on the percent column.',

    present: function (el) {

        var addListenerFunc = function (el) {
            var cells = el.find('input.form-control').closest('td');
            // listeners for validation
            cells.on('mouseenter', function () {
                var cell = $(this);

                if (cell.is('.has-error')) {
                    var message = cell.attr('data-error-message'),
                        errorBubble = $('<div id="error-bubble" class="error-bubble-grid">' +
                            message + '</div>');

                    errorBubble.css('width', cell.children(0).css('width'));
                    cell.append(errorBubble);
                }
            });

            cells.on('mouseleave', function () {
                el.find('#error-bubble').remove();
            });
        };

        var grid = new Grid({
            // add custom listeners
            // listen for invalid values
            addListeners: addListenerFunc,
            el: el,
            rows: {
                newRow: true
            },
            columns: [

                {
                    id: 'string',
                    title: 'String',
                    width: '25%'
                },

                {
                    id: 'percent',
                    title: 'Percent',
                    width: '25%',
                    type: 'percent',
                    formatter: function (id, value) {
                        return value * 100;
                    },
                    parser: function (id, value) {
                        return parseFloat(value) / 100;
                    },
                    validate: function (id, percent) {
                        var number = parseFloat(percent);
                        if (!(isNaN(number) || number < 0 || number > 100)) {
                            return '';  // return an empty string for a valid percent value
                        }
                        return 'Percents must follow the following format - 0 to 100.';
                    }
                },

                {
                    id: 'cost',
                    title: 'Cost',
                    width: '15%',
                    type: 'cost',
                    parser: function (id, value) {
                        return parseFloat(value);
                    }
                },

                {
                    id: 'select',
                    title: 'Select',
                    width: '15%',
                    type: 'select',
                    list: ['a', 'b', 'c']
                },{
                    id: 'date',
                    title: 'Date',
                    width: '20%',
                    type: 'date'
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
        grid.on('booty-new-row', function (/*{colId, rowId, value}*/) {
        });
    }

};

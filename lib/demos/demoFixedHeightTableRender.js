var $ = require('jquery'),
    Grid = require('../grid');

module.exports = {

    title: 'Basic table render with a fixed height',

    description: 'With a fixed height added to the containing div, ' +
        'the grid will present a scrollable body area.',

    present: function (el) {

        var fixedHeight = $('<div style="height: 300px"></div>');
        el.append(fixedHeight);

        var data = [];
        for (var i = 0  ; i < 20; i++) {
            data.push({
                id: 'id-' + i,
                a: 'a',
                b: 'b',
                c: 'c'
            });
        }

        var grid = new Grid({
            el: fixedHeight,
            columns: [
                {
                    id: 'a',
                    title: 'a',
                    width: 'col-xs-4'
                },
                {
                    id: 'b',
                    title: 'b',
                    width: 'col-xs-4'
                },
                {
                    id: 'c',
                    title: 'c',
                    width: 'col-xs-4'
                }
            ],
            data: data
        });
        grid.render();
    }

};

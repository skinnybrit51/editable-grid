var $ = require('jqueryify'),
    Grid = require('./grid');

$(function () {
    this.grid = new Grid({
        el: $('#output-demo-1'),
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
        data: [
            {
                id: 'id-1',
                a: 'a',
                b: 'b',
                c: 'c'
            },
            {
                id: 'id-2',
                a: 'a',
                b: 'b',
                c: 'c'
            }
        ]
    });
    this.grid.render();
});


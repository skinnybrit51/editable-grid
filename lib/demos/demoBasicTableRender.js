var Grid = require('../grid');

module.exports = {

    title: 'Basic table render',

    description: '',

    present: function (el) {
        var grid = new Grid({
            el: el,
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
        grid.render();
    }

};

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
                    width: '33.3%'
                },
                {
                    id: 'b',
                    title: 'b',
                    width: '33.3%',
                    alignment: 'right',
                    titleAlignment: 'center'
                },
                {
                    id: 'c',
                    title: 'c',
                    width: '33.3%',
                    alignment: 'center',
                    titleAlignment: 'right'
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

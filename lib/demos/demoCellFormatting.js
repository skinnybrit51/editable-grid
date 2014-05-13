var Grid = require('../grid');

module.exports = {

    title: 'Format column values',

    description: 'Use the formatter property on each column to format the value for the cell.',

    present: function (el) {

        var formatter = function (id, value) {
            switch (id){
                case 'a':
                    return 'aa';
                case 'c':
                    return 'cc';
            }
            return value;
        };

        var grid = new Grid({
            el: el,
            columns: [
                {
                    id: 'a',
                    title: 'a',
                    width: '33.3%',
                    formatter: formatter
                },
                {
                    id: 'b',
                    title: 'b',
                    width: '33.3%',
                    formatter: formatter
                },
                {
                    id: 'c',
                    title: 'c',
                    width: '33.3%',
                    formatter: formatter
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

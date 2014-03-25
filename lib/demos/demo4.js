var Grid = require('../grid');

module.exports = {

    title: 'Column sorting',

    description: 'Click on a column to sort that column.  Note column "c" is not sortable',

    present: function (el) {

        var grid = new Grid({
            el: el,
            columns: [
                {
                    id: 'a',
                    title: 'a',
                    width: 'col-xs-4',
                    sortable: true,
                    type: 'string'
                },
                {
                    id: 'b',
                    title: 'b',
                    width: 'col-xs-4',
                    sortable: true,
                    type: 'integer'
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
                    a: 'm',
                    b: 2,
                    c: 'c'
                },
                {
                    id: 'id-2',
                    a: 'b',
                    b: 1,
                    c: 'c'
                },
                {
                    id: 'id-2',
                    a: 'c',
                    b: 4,
                    c: 'c'
                },
                {
                    id: 'id-2',
                    a: 'z',
                    b: 3,
                    c: 'c'
                }
            ]
        });
        grid.render();
    }

};

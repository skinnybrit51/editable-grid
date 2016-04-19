var Grid = require('../grid');

module.exports = {

    title: 'Cell classes',

    description: 'Add one or more class to a cell. Use the passed in column id and obj to filter.',

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
                    c: 'light blue color and italic font'
                },
                {
                    id: 'id-2',
                    a: 'red color',
                    b: 'b',
                    c: 'c'
                }
            ],
            getCellClasses: function (columnId, obj) {
                if (columnId === 'a' && obj.id === 'id-2') {
                    return ['make-cell-red'];
                } else if (columnId === 'c' && obj.id === 'id-1') {
                    return ['make-cell-blue', 'make-cell-italic-font'];
                }
                return [];
            }
        });
        grid.render();
    }

};

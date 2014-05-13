var Grid = require('../grid');

module.exports = {

    title: 'Column sorting',

    description: 'Click on a column to sort that column.  Note column "c" is not sortable',

    present: function (el) {

        var grid = new Grid({
                el: el,
                columns: [
                    {
                        id: 'string',
                        title: 'String',
                        width: '30%',
                        sortable: true,
                        type: 'text'
                    },
                    {
                        id: 'cost',
                        title: 'Cost',
                        width: '20%',
                        sortable: true,
                        type: 'cost'
                    },
                    {
                        id: 'date',
                        title: 'Date',
                        width: '20%',
                        sortable: true,
                        type: 'date'
                    },
                    {
                        id: 'percent',
                        title: 'Percent',
                        width: '15%',
                        sortable: true,
                        type: 'percent'
                    },
                    {
                        id: 'select',
                        title: 'Select',
                        width: '15%',
                        sortable: true,
                        list: ['a', 'b'],
                        type: 'select'
                    }
                ],
                data: [
                    {
                        id: 'id-1',
                        string: 'm',
                        cost: 2,
                        date: '2014-05-01',
                        percent: 0.3,
                        select: 'b'
                    },
                    {
                        id: 'id-2',
                        string: 'b',
                        cost: 1,
                        date: '2014-05-01',
                        percent: 0.9,
                        select: 'a'
                    },
                    {
                        id: 'id-2',
                        string: 'c',
                        cost: 4,
                        date: '2013-05-01',
                        percent: 0.1,
                        select: 'b'
                    },
                    {
                        id: 'id-2',
                        string: 'z',
                        cost: 3,
                        date: '2015-05-01',
                        percent: 0.6,
                        select: 'b'
                    }
                ]
            })
            ;
        grid.render();
    }

}
;

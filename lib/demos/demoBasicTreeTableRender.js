var $ = require('jquery'),
    Grid = require('../grid');

module.exports = {

    title: 'Basic tree table render',

    description: '',

    present: function (el) {
        var grid = new Grid({
            treeMode: true, // <- note
            childData: function (parentId/*, parentObj*/) {     // <- note
                // child data can also be loaded asynchronously
                // the return for this function must be a deferred object
                // the return in the deferred object must be an array
                if (parentId === 'id-3') {
                    return $.Deferred().resolve([
                        {
                            id: 'id-10',
                            a: 'a-3',
                            b: 'b-3',
                            c: 'c-3'
                        },
                        {
                            id: 'id-11',
                            a: 'a-3',
                            b: 'b-3',
                            c: 'c-3'
                        }
                    ]);
                }
                return $.Deferred().resolve([]);
            },
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
                    width: '33.3%'
                },
                {
                    id: 'c',
                    title: 'c',
                    width: '33.3%'
                }
            ],
            data: [
                {
                    id: 'id-1',
                    a: 'a',
                    b: 'b',
                    c: 'c',
                    children: [
                        {
                            id: 'id-2',
                            a: 'a-1',
                            b: 'b-1',
                            c: 'c-1',
                            children: [
                                {
                                    id: 'id-3',
                                    a: 'a-2',
                                    b: 'b-2',
                                    c: 'c-2'
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'id-4',
                    a: 'a',
                    b: 'b',
                    c: 'c'
                }
            ]
        });
        grid.render();
    }

};

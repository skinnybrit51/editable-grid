var Grid = require('../grid');

module.exports = {

    title: 'Links',

    description: 'Add links to individual cells.  Set edit or view row link',

    present: function (el) {

        var grid = new Grid({
            el: el,
            rows: {
                link: 'row-link-id'
            },
            columns: [
                {
                    id: 'a',
                    title: 'a',
                    width: 'col-xs-3',
                    link: 'link-id'
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
                },
                {
                    id: 'link',
                    title: '',
                    width: 'col-xs-1',
                    link: 'row-link-id'
                }
            ],
            data: [
                {
                    id: 'id-1',
                    a: 'Google',
                    'link-id': 'http://www.google.com',
                    'link': 'View',
                    'row-link-id': 'http://www.yahoo.com',
                    b: 2,
                    c: 'c'
                },
                {
                    id: 'id-2',
                    a: 'Microsoft',
                    'link-id': 'http://www.microsoft.com',
                    'link': 'Edit',
                    'row-link-id': 'http://www.yahoo.com',
                    b: 1,
                    c: 'c'
                },
                {
                    id: 'id-2',
                    a: 'BBC',
                    'link-id': 'http://www.bbc.com',
                    'link': 'Edit',
                    'row-link-id': 'http://www.yahoo.com',
                    b: 4,
                    c: 'c'
                }
            ]
        });
        grid.render();
    }

};

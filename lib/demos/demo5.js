var Grid = require('../grid');

module.exports = {

    title: 'Links',

    description: 'Add links to individual cells.  ' +
        'Listen for "booty-row-clicked" when a row is clicked.  ' +
        'rows.link must be set for rows to have hover and selectable effect',

    present: function (el) {

        var grid = new Grid({
            el: el,
            rows: {
                link: true
            },
            columns: [
                {
                    id: 'a',
                    title: 'a',
                    width: 'col-xs-4',
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
                }
            ],
            data: [
                {
                    id: 'id-1',
                    a: 'Google',
                    'link-id': 'http://www.google.com',
                    'link': 'View',
                    b: 2,
                    c: 'c'
                },
                {
                    id: 'id-2',
                    a: 'Microsoft',
                    'link-id': 'http://www.microsoft.com',
                    'link': 'Edit',
                    b: 1,
                    c: 'c'
                },
                {
                    id: 'id-2',
                    a: 'BBC',
                    'link-id': 'http://www.bbc.com',
                    'link': 'Edit',
                    b: 4,
                    c: 'c'
                }
            ]
        });
        grid.render();
        grid.on('booty-row-clicked', function (/*obj, rowId, colId*/) {
            window.location = 'http://www.yahoo.com';
        });
    }

};

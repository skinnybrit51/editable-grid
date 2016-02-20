var Grid = require('../grid');

module.exports = {

    title: 'Links',

    description: 'Add links to individual cells.  ' +
        'Listen for "editable-row-clicked" when a row is clicked.  ' +
        'rows.link must be set for rows to have hover and selectable effect',

    present: function (el) {

        var grid = new Grid({
            el: el,
            rows: {
                link: true
            },
            id: 'link-id',
            columns: [
                {
                    id: 'a',
                    title: 'a',
                    width: '33.3%',
                    link: 'link-id'
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
        grid.on('editable-row-clicked', function (params/*{obj, rowId, colId}*/) {
            window.location = params.obj['link-id'];
        });
    }

};

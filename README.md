booty-grid
==========

#### Installation

````npm install booty-grid````

copy over grid.css from ````node_modules/booty-grid/dist```` to your css directory

#### Using

````
var Grid = require('booty-grid'),
    $ = require('jquery');

var grid = new Grid({
    el: $('body'),
    columns: [
        {
            id: 'a',
            title: 'Column A',
            width: 'col-xs-12'
        }
    ],
    data: [
        {
            id: 'id',
            a: 'Hello World'
        }
    ]
});
grid.render();
````

More demos can be found at http://skinnybrit51.com/booty-grid.

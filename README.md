booty-grid
==========

#### Installation

````npm install booty-grid````

copy over grid.css from ````node_modules/booty-grid/dist```` to your css directory

#### Features

* Grid based on [twitter bootstrap](http://getbootstrap.com/) classes
* Column Sorting
* Cell Links
* Row Clicks
* Row Addition
* Row Deletion
* Total Column Row
* Editable Cells
* Formatting, parsing and validation on each column

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

booty-grid
==========

#### Installation

````npm install booty-grid````

copy over grid.css from ````node_modules/booty-grid/dist```` to your css directory

or

Standalone version can be downloaded from the below links

* [Javascript (window global variable - BootyGrid](http://skinnybrit51.com/booty-grid/dist/booty_grid.min.js)
* [CSS](http://skinnybrit51.com/booty-grid/dist/booty_grid.min.css)

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
    id: 'id',                                           // property name for column id
    rows: {
        link: false,                                    // turn to true for clickable rows
        newRow: false,                                  // turn to true for an add row to appear in footer
        totalRow: false                                 // turn to true to see an total row appear (only applicable to cost columns)
    },
    sortConfig: [                                       // pre sort the grid when rendered
        {
            id: 'col1',
            asc: true
        }
    ],
    addListeners: function(el) {},                      // append custom event handlers
    stateManager: {                                     // return true to make a cell editable
        isEditable: function(rowId, colId) {
            return false;
        }
    },
    el: $('body'),                                      // element to append grid too
    columns: [
        {
            id: 'col1',                                 // unique id for the data property name, can be nested - EG foo.bar
            title: 'Column A',                          // title to be used in header column 
            width: '100%'                               // width of column - must be in percentage form
            nullable: false,                            // can the value not have a value, only applies to editable values
            formatter: function(id, value) {            // format the value
                return value;
            },            
            parser: function(id, value) {               // parse the value, only applies to editable values
                return value;
            },
            validate: function(id, value) {             // return an error message when a value is not valid, only applies to editable values
                return '';  // value valid
            },
            sortable: false,                            // can the column be sorted
            type: 'text',                               // type of data in the column, options are 'text', 'cost', 'percent', 'select', 'date'
            list: ['a', 'b', 'c'],                      // values for a select type column, use formatter to format to the selected value
            preCreateCallback: function() {             // advanced functionality - see demos for example
                // called before cell is created
                // return cell value
            }
        }
    ],
    data: [                                             // data to be rendered to grid
        {
            id: 'id',
            col1: 'Hello World'
        }
    ]
});

// render the grid onto the page
grid.render();      

// things to listen for
grid.on('booty-value-updated', function(params) {});
grid.on('booty-new-row-value-changed', function(newObj) {});
grid.on('booty-new-row', function(newObj) {});
grid.on('booty-row-clicked', function(params) {});
grid.on('booty-can-delete', function(rowId) {});


// things to trigger
grid.trigger('booty-delete-mode', true/false);

````

More demos can be found at http://skinnybrit51.com/booty-grid.

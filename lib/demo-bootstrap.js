var $ = require('jquery'),
    demoCreator = require('./demos/demoCreator'),
    demoAddRow = require('./demos/demoAddRow'),
    demoAddRowAdvanced = require('./demos/demoAddRowAdvanced'),
    demoBasicTableRender = require('./demos/demoBasicTableRender'),
    demoCellFormatting = require('./demos/demoCellFormatting'),
    demoColumnSorting = require('./demos/demoColumnSorting'),
    demoEditableCells = require('./demos/demoEditableCells'),
//    demoFixedHeightTableRender = require('./demos/demoFixedHeightTableRender'),
    demoLinks = require('./demos/demoLinks'),
    demoRowDeletion = require('./demos/demoRowDeletion'),
    demoRowSelection = require('./demos/demoRowSelection'),
    demoTotalRow = require('./demos/demoTotalRow');


$(function () {

    demoCreator(demoBasicTableRender);
    demoCreator(demoCellFormatting);
    demoCreator(demoLinks);
    demoCreator(demoColumnSorting);
    demoCreator(demoTotalRow);
    demoCreator(demoRowSelection);
    demoCreator(demoAddRow);
    demoCreator(demoAddRowAdvanced);
    demoCreator(demoEditableCells);
    demoCreator(demoRowDeletion);

});


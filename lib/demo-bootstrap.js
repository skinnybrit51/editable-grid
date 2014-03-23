var $ = require('jqueryify'),
    demoCreator = require('./demos/demoCreator'),
    demo1 = require('./demos/demo1'),
    demo2 = require('./demos/demo2');


$(function () {

    demoCreator(demo1);
    demoCreator(demo2);

});


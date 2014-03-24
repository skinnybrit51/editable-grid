var $ = require('jqueryify'),
    demoCreator = require('./demos/demoCreator'),
    demo1 = require('./demos/demo1'),
    demo2 = require('./demos/demo2'),
    demo3 = require('./demos/demo3');


$(function () {

    demoCreator(demo1);
    demoCreator(demo2);
    demoCreator(demo3);

});


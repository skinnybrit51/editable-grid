var $ = require('jqueryify'),
    demoCreator = require('./demos/demoCreator'),
    demo1 = require('./demos/demo1'),
    demo2 = require('./demos/demo2'),
    demo3 = require('./demos/demo3'),
    demo4 = require('./demos/demo4'),
    demo5 = require('./demos/demo5'),
    demo6 = require('./demos/demo6');


$(function () {

    demoCreator(demo1);
    demoCreator(demo2);
    demoCreator(demo3);
    demoCreator(demo4);
    demoCreator(demo5);
    demoCreator(demo6);

});


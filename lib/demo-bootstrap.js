var $ = require('jquery'),
    demoCreator = require('./demos/demoCreator'),
    demo1 = require('./demos/demo1'),
//    demo2 = require('./demos/demo2'),
    demo3 = require('./demos/demo3'),
    demo4 = require('./demos/demo4'),
    demo5 = require('./demos/demo5'),
    demo6 = require('./demos/demo6'),
    demo7 = require('./demos/demo7'),
    demo8 = require('./demos/demo8'),
    demoEverything = require('./demos/demoEverything');


$(function () {

    demoCreator(demo1);
//    demoCreator(demo2);
    demoCreator(demo3);
    demoCreator(demo4);
    demoCreator(demo5);
    demoCreator(demo6);
    demoCreator(demo7);
    demoCreator(demo8);
    demoCreator(demoEverything);

});


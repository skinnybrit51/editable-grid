var jsdom = require('jsdom');

/* Create the dom */
global.document = global.document || jsdom.jsdom();
global.window = global.window || global.document.createWindow();

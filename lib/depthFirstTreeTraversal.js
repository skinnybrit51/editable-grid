var rowFactory = require('./rowFactory'),
    _ = require('underscore');

var depthFirstTreeTraversal = function (options, collection, hasTreeState, level) {

    var markup = '';

    _.each(collection, function (obj) {
        markup += rowFactory.createTableRow(obj, options, level, this._treeState);
        if (options.treeMode && hasTreeState) {
            if ('children' in obj && _.isArray(obj.children) && obj.children.length) {
                if (this._treeState[obj[options.id]] === 'expand') {
                    markup += depthFirstTreeTraversal.call(this, options, obj.children,
                        hasTreeState, level + 1);
                }
            }
        }
    }, this);
    return markup;
};

module.exports = depthFirstTreeTraversal;

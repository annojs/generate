'use strict';

var annotate = require('annotate');
var is = require('annois');


module.exports = function(randint) {
    return annotate('boolean', 'Generates a boolean value')
        .on(function() {
            return randint(0, 1)? true: false;
        }).satisfies(is.boolean);
};

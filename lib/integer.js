'use strict';

var annotate = require('annotate');
var is = require('annois');


module.exports = function(randint) {
    var generate = annotate('number', 'Generates an integer between `minValue` and `maxValue`')
        .on(is.number, is.number, randint)
        .on(is.number, function(minValue) {
            return generate(minValue, Number.MAX_VALUE);
        })
        .on(function() {
            return generate(Number.MIN_VALUE, Number.MAX_VALUE);
        }).satisfies(is.number);

    return generate;
};

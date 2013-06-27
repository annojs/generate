var annotate = require('annotate');
var randint = require('funkit').math.randint;
var is = require('annois');


var generate = annotate('number', 'Generates a number between `minValue` and `maxValue`').
    on(is.number, is.number, randint).
    on(is.number, function(minValue) {
        return generate(minValue, Number.MAX_VALUE);
    }).
    on(function() {
        return generate(Number.MIN_VALUE, Number.MAX_VALUE);
    }).
    satisfies(is.number);

module.exports = generate;

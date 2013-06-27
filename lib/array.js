var annotate = require('annotate');
var funkit = require('funkit');
var range = funkit.math.range;
var randint = funkit.math.randint;
var is = require('annois');

var any = require('./any');
var number = require('./number');


var generate = annotate('array', 'Generates an array using given `maxLen` and `generator`').
    on(is.number, is.fn, function(maxLen, generator) {
        var ret = [];

        range(randint(0, maxLen)).forEach(function() {
            ret.push(generator());
        });

        return ret;
    }).
    on(function() {
        return generate(number(100), any);
    }).
    satisfies(is.array);

module.exports = generate;

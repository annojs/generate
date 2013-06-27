var annotate = require('annotate');
var funkit = require('funkit');
var range = funkit.math.range;
var randint = funkit.math.randint;
var is = require('annois');

var any = require('./any');
var number = require('./number');


var generate = annotate('object', 'Generates an object using given `maxLen`, `keyGen` and `valueGen`').
    on(is.number, is.fn, is.fn, function(maxLen, keyGen, valueGen) {
        var ret = {};

        range(randint(0, maxLen)).forEach(function() {
            ret[keyGen()] = valueGen();
        });

        return ret;
    }).
    on(function() {
        return generate(number(100), any, any);
    }).
    satisfies(is.object);

module.exports = generate;

var annotate = require('annotate');
var randint = require('funkit').math.randint;
var character = require('./character');
var is = require('annois');


var generate = annotate('string', 'Generates string using given `maxLen`').
    on(is.number, function(maxLen) {
        var ret = '';

        for(var i = 0; i < maxLen; i++) ret += character();

        return ret;
    }).
    on(function() {
        return generate(randint(0, 100));
    }).
    satisfies(is.string);

module.exports = generate;

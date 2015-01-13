'use strict';
var annotate = require('annotate');
var _range = require('annomath').range;
var is = require('annois');

// low default values to avoid getting stuck
var ARRAY_MIN = 0;
var ARRAY_MAX = 5;


module.exports = function(randint) {
    var number = require('./number')(randint);
    var any;

    var generate = annotate('array', 'Generates an array using given `range` (ie. [,3], [1,] or [1, 3]) (optional) and `generator` (optional)')
        .on(is.array, is.fn, function(range, generator) {
            var ret = [];
            var minLen = is.defined(range[0])? range[0]: ARRAY_MIN;
            var maxLen = is.defined(range[1])? range[1]: ARRAY_MAX;

            _range(randint(minLen, maxLen)).forEach(function() {
                ret.push(generator());
            });

            return ret;
        })
        .on(is.array, function(range) {
            if(!any) {
                any = require('./any')(randint);
            }

            return generate(range, any);
        })
        .on(function() {
            if(!any) {
                any = require('./any')(randint);
            }

            return generate([ARRAY_MIN, number(ARRAY_MIN, ARRAY_MAX)], any);
        }).satisfies(is.array);

    return generate;
};

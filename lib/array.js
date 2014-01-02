var annotate = require('annotate');
var range = require('annomath').range;
var is = require('annois');

var number = require('./number');
var any;


module.exports = function(randint) {
    var generate = annotate('array', 'Generates an array using given `maxLen` and `generator`')
        .on(is.number, is.fn, function(maxLen, generator) {
            var ret = [];

            range(randint(0, maxLen)).forEach(function(v) {
                ret.push(generator());
            });

            return ret;
        })
        .on(function() {
            if(!any) {
                any = require('./any');
            }

            // low value because it can get stuck with higher values
            return generate(number(0, 5), any);
        }).satisfies(is.array);

    return generate;
};


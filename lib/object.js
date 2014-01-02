var annotate = require('annotate');
var range = require('annomath').range;
var is = require('annois');


module.exports = function(randint) {
    var number = require('./number')(randint);
    var any;

    var generate = annotate('object', 'Generates an object using given `maxLen`, `keyGen` and `valueGen`')
        .on(is.number, is.fn, is.fn, function(maxLen, keyGen, valueGen) {
            var ret = {};

            range(randint(0, maxLen)).forEach(function() {
                ret[keyGen()] = valueGen();
            });

            return ret;
        })
        .on(function() {
            if(!any) {
                any = require('./any')(randint);
            }

            // low value because it can get stuck with higher ones
            return generate(number(0, 5), any, any);
        })
        .satisfies(is.object);

    return generate;
};

var annotate = require('annotate');
var is = require('annois');


module.exports = function(randint) {
    var character = require('./character')(randint);

    var generate = annotate('string', 'Generates string using given `maxLen`')
        .on(is.number, function(maxLen) {
            var ret = '';

            for(var i = 0; i < maxLen; i++) {
                ret += character();
            }

            return ret;
        })
        .on(function() {
            return generate(randint(0, 100));
        }).satisfies(is.string);

    return generate;
};

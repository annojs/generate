var funkit = require('funkit');
var range = funkit.math.range;
var randint = funkit.math.randint;

var any = require('./any');
var number = require('./number');


module.exports = function(maxLen, gen) {
    var ret = function() {
        var ret = [];

        if(!maxLen) return ret;

        range(randint(0, maxLen)).forEach(function() {
            ret.push(gen());
        });

        return ret;
    };

    if(!maxLen) return ret(number(100), any);

    return ret;
};

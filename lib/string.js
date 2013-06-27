var randint = require('funkit').math.randint;
var character = require('./character');


module.exports = function(maxLen) {
    maxLen = maxLen || randint(0, 100);
    var ret = '';

    for(var i = 0; i < maxLen; i++) ret += character();

    return ret;
};

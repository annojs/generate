var randint = require('funkit').math.randint;
var is = require('annois');


module.exports = function(minValue, maxValue) {
    if(!is.defined(minValue)) minValue = Number.MIN_VALUE;
    if(!is.defined(maxValue)) maxValue = Number.MAX_VALUE;

    if(!is.number(minValue) || !is.number(maxValue)) return 0;

    return randint(minValue, maxValue);
};

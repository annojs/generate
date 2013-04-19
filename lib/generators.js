var funkit = require('funkit');
var is = require('annois');

var randint = funkit.math.randint;
var choose = funkit.math.choose;
var range = funkit.math.range;
var partial = funkit.partial;


exports.any = any;
exports.number = number;
exports.string = string;
exports.character = character;
exports.upperCharacter = upperCharacter;
exports.lowerCharacter = lowerCharacter;
exports.structure = structure;
exports.array = array;
exports.object = object;
exports.fn = fn;
exports.nan = nan;

function fn() {
    return function() {};
}

function nan() {
    return NaN;
}

function any() {
    var keys = Object.keys(exports);
    var i = randint(0, keys.length - 1);

    return exports[keys[i]]();
}

function number(minValue, maxValue) {
    if(!is.defined(maxValue)) {
        // min is actually max. clamp to [-minValue, minValue]
        maxValue = minValue;
        minValue = -minValue;
    }

    if(!is.number(minValue) || !is.number(maxValue)) return 0;

    return partial(randint, minValue, maxValue);
}

function string(maxLen) {
    maxLen = maxLen || 100;

    return function() {
        var ret = '';

        for(var i = 0; i < maxLen; i++) ret += character();

        return ret;
    };
}

function character() {
    return String.fromCharCode(randint(33, 126));
}

function upperCharacter() {
    return String.fromCharCode(randint(65, 90));
}

function lowerCharacter() {
    return String.fromCharCode(randint(97, 122));
}

function structure() {
    function recursion(pick) {
        if(is.object(pick)) {
            pick[string(randint(1, 10))()] = recursion(_choose());
        }
        if(is.array(pick)) {
            pick.push(recursion(_choose()));
        }
        return pick;
    }

    function _choose() {
        return choose(getOpts());
    }

    function getOpts() {
        return [{}, [], character(), number()];
    }

    return recursion(_choose());
}

function array(maxLen, gen) {
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
}

function object(maxLen, keyGen, valueGen) {
    var ret = function() {
        var ret = {};

        if(!maxLen) return ret;

        range(randint(0, maxLen)).forEach(function() {
            ret[keyGen()] = valueGen();
        });

        return ret;
    };

    if(!maxLen) return ret(number(100), any, any);

    return ret;
}

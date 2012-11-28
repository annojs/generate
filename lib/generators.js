var funkit = require('funkit');

exports.number = number;
exports.word = word;
exports.character = character;
exports.upperCharacter = upperCharacter;
exports.lowerCharacter = lowerCharacter;
exports.structure = structure;
exports.list = list;
exports.object = object;

function number(minValue, maxValue) {
    minValue = funkit.isDefined(maxValue)? minValue: -maxValue;
    maxValue = maxValue || minValue || Number.MAX_VALUE;

    return funkit.partial(funkit.randint, minValue, maxValue);
}

function word(maxLen) {
    maxLen = maxLen || 100;

    return function() {
        var ret = '';

        for(var i = 0; i < maxLen; i++) ret += character();

        return ret;
    };
}

function character() {
    return String.fromCharCode(funkit.randint(33, 126));
}

function upperCharacter() {
    return String.fromCharCode(funkit.randint(65, 90));
}

function lowerCharacter() {
    return String.fromCharCode(funkit.randint(97, 122));
}

function structure() {
    function recursion(pick) {
        if(funkit.isObject(pick)) {
            pick[word(funkit.randint(1, 10))()] = recursion(_choose());
        }
        if(funkit.isArray(pick)) {
            pick.push(recursion(_choose()));
        }
        return pick;
    }

    function _choose() {
        return funkit.choose(getOpts());
    }

    function getOpts() {
        return [{}, [], character(), number()()];
    }

    return recursion(_choose());
}

function array(maxLen, gen) {
    return function() {
        var ret = [];

        funkit.range(funkit.randint(0, maxLen)).forEach(function() {
            ret.push(gen());
        });

        return ret;
    };
}

function object(maxLen, keyGen, valueGen) {
    return function() {
        var ret = {};

        funkit.range(funkit.randint(0, maxLen)).forEach(function() {
            ret[keyGen()] = valueGen();
        });

        return ret;
    };
}

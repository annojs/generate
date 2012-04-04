exports.number = number;
exports.word = word;
exports.character = character;
exports.upperCharacter = upperCharacter;
exports.lowerCharacter = lowerCharacter;
exports.structure = structure;

function number(maxValue) {
    maxValue = maxValue || Number.MAX_VALUE;

    return function() {
        return (Math.random() * maxValue - maxValue / 2) * 2;
    };  
}

function word(maxLen) {
    maxLen = maxLen || 100;

    return function() {
        var ret = ''; 

        for(var i = 0; i < maxLen; i++) ret += character();

        return ret;
    };  
};

function character() {
    return String.fromCharCode(random(33, 126));
};

function upperCharacter() {
    return String.fromCharCode(random(65, 90));
};

function lowerCharacter() {
    return String.fromCharCode(random(97, 122));
};

function structure() {
    function recursion(pick) {
        if(isObject(pick)) {
            pick[word(random(1, 10))()] = recursion(_choose());
        }   
        if(isArray(pick)) {
            pick.push(recursion(_choose()));
        }   
        return pick;
    }   

    function _choose() {
        return choose(getOpts());
    }   

    function getOpts() {
        return [{}, [], character(), number()()];
    }   

    return recursion(_choose());
};

function random(min, max) {return Math.ceil(Math.random() * (max + 1 - min)) - 1 + min;}
function choose(m) {return m[random(0, m.length - 1)];}

function isArray(input) {return Array.isArray(input);}
function isFunction(input) {return typeof input === "function";}
function isObject(input) {return typeof input === "object";}


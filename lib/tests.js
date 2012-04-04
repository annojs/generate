#!/usr/bin/env node
var suite = require('suite.js');
var g = require('./generators');

// TODO: isNumber check
gSuite(g.number(), isNumber);
gSuite(g.number(100), isNumber);
gSuite(g.upperCharacter, charCodeBetween(65, 90));
gSuite(g.lowerCharacter, charCodeBetween(97, 122));
gSuite(g.character, charCodeBetween(33, 126));
gSuite(g.word(10), function(a) {
    return a.length == 10 && allBetween(a, 33, 126);
});
gSuite(g.structure, function(a) {
    return isArray(a) || isObject(a) || isNumber(a) || isString(a);
});

function gSuite(gen, inv) {
    return suite(inv, suite.generate(1000,
        [gen],
        function(op, a) {
            return op(a);
        }
    ));
}

function isArray(input) {return Array.isArray(input);}
function isNumber(input) {return typeof input === "number";}
function isObject(input) {return typeof input === "object";}
function isString(input) {return typeof input === "string";}

function allBetween(n, a, b) {
    var cmp = charCodeBetween(a, b);
    return all(n.split('').map(cmp));
}

function all(n) {
    for(var i = 0, len = n.length; i < len; i++) if(!n[i]) return false;

    return true;
}

function charCodeBetween(a, b) {
    return function(n) {
        var code = n.charCodeAt(0);
        return a <= code && code <= b;
    };
}


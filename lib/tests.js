#!/usr/bin/env node
var suite = require('suite.js');
var g = require('./generators');
var f = require('funkit');

suite(f.sum, suite.generate(1000, [g.number(100), g.number(100)], commutativity));
suite(f.reverse, suite.generate(1000, [g.word(10)], reversability));

function commutativity(op, a, b) {
    if(isNaN(a) && isNaN(b)) return true; // NaN == evaluates as false always
    return op(a, b) == op(b, a);
}

function reversability(op, a) {
    return op(op(a)) == a;
}

gSuite(g.number(), f.isNumber);
gSuite(g.number(100), f.isNumber);
gSuite(g.number(20, 30), f.partial(f.between, 20, 30));
gSuite(g.upperCharacter, charCodeBetween(65, 90));
gSuite(g.lowerCharacter, charCodeBetween(97, 122));
gSuite(g.character, charCodeBetween(33, 126));
gSuite(g.word(10), function(res) {
    return res.length == 10 && allBetween(res, 33, 126);
});
gSuite(g.structure, function(res) {
    return f.isArray(res) || f.isObject(res) || f.isNumber(res) || f.isString(res);
});
gSuite(g.array(10, g.number(100)), function(res) {
    return f.isArray(res) && f.all(f.isNumber, res);
});
gSuite(g.object(10, g.number(100), g.number(100)), function(res) {
    // TODO: check that values are numbers!
    return f.isObject(res) && f.all(f.isString, Object.keys(res));
});

function numberRangeTest() {
    var numberOfTens = 0;
    var cases = 10;

    suite(f.id, suite.generate(cases,
        [g.number(1, 10), g.number(11, 30)],
        function(op, a, b) {
            if(a == 10) numberOfTens++;

            return true;
        })
    );

    return cases != numberOfTens;
}
suite(numberRangeTest, ['', true]);

function gSuite(gen, inv) {
    return suite(inv, suite.generate(1000,
        [gen],
        function(op, a, b) {
            return op(a, b);
        }
    ));
}

function allBetween(n, a, b) {
    return f.all(f.id, n.split('').map(charCodeBetween(a, b)));
}

function charCodeBetween(a, b) {
    return function(n) {
        var code = n.charCodeAt(0);
        return a <= code && code <= b;
    };
}


#!/usr/bin/env node
var is = require('annois');
var funkit = require('funkit');
var suite = require('suite.js');

var g = require('./generators');

var partial = funkit.partial;
var all = funkit.functional.all;
var between = funkit.math.between;
var sum = funkit.math.sum;
var reverse = funkit.string.reverse;
var id = funkit.id;

// TODO: set up annotate and test these cases
//suite(sum, suite.generate(1000, [g.number(100), g.number(100)], commutativity));
//suite(reverse, suite.generate(1000, [g.string(10)], reversability));

function commutativity(op, a, b) {
    if(isNaN(a) && isNaN(b)) return true; // NaN == evaluates as false always

    return op(a, b) == op(b, a);
}

function reversability(op, a) {
    return op(op(a)) == a;
}

gSuite(g.any, function(res) {
    return true;
});
gSuite(g.nan, is.nan);
gSuite(g.fn, is.fn);
gSuite(g.array, is.array);
gSuite(g.object, is.object);
gSuite(g.number, is.number);
gSuite(g.upperCharacter, charCodeBetween(65, 90));
gSuite(g.lowerCharacter, charCodeBetween(97, 122));
gSuite(g.character, charCodeBetween(33, 126));
gSuite(g.string(10), function(res) {
    return res.length == 10 && allBetween(res, 33, 126);
});
gSuite(g.structure, function(res) {
    return is.array(res) || is.object(res) || is.number(res) || is.string(res);
});
gSuite(g.array(10, partial(g.number, 100)), function(res) {
    return is.array(res) && all(is.number, res);
});
gSuite(g.object(10, partial(g.number, 100), partial(g.number, 100)), function(res) {
    // TODO: check that values are numbers!
    return is.object(res) && all(is.string, Object.keys(res));
});

function numberRangeTest() {
    var numberOfTens = 0;
    var cases = 10;

    suite(id, suite.generate(cases,
        [partial(g.number, 1, 10), partial(g.number, 11, 30)],
        function(op, a, b) {
            if(a == 10) numberOfTens++;

            return true;
        })
    );

    return cases != numberOfTens;
}
suite(numberRangeTest, ['', true]);

function gSuite(gen, inv) {
    return suite(inv, suite.generate(1,
        [gen],
        function(op, a, b) {
            return op(a, b);
        }
    ));
}

function allBetween(n, a, b) {
    return all(id, n.split('').map(charCodeBetween(a, b)));
}

function charCodeBetween(a, b) {
    return function(n) {
        var code = n.charCodeAt(0);
        return a <= code && code <= b;
    };
}


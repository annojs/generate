var fuzz = require('annofuzz');
var is = require('annois');

var g = require('../');


fuzz._amount = 100;
fuzz(g.array, function(op) {
    var res = op(100, g.number);

    return res.filter(is.number).length == res.length;
});

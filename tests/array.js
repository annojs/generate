var generate = require('../');
var fuzz = require('annofuzz')(generate);
var is = require('annois');



fuzz(generate.array, function(op) {
    var res = op(100, generate.number);

    return res.filter(is.number).length == res.length;
}, 100);

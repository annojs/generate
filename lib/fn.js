var annotate = require('annotate');
var is = require('annois');


module.exports = annotate('fn', 'Generates a function').
    on(function() {
        return function() {};
    }).satisfies(is.fn);

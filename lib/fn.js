var annotate = require('annotate');
var is = require('annois');


module.exports = function() {
    return annotate('fn', 'Generates a function')
        .on(function() {
            return function() {};
        }).satisfies(is.fn);
};

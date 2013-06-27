var annotate = require('annotate');
var is = require('annois');


module.exports = annotate('nan', 'Generates NaN').
    on(function() {
        return NaN;
    }).satisfies(is.nan);

'use strict';

var annotate = require('annotate');
var is = require('annois');


module.exports = function() {
    var generate = annotate('date', 'Generates a RFC3339 `full-date`')
        .on(function() {
            return (new Date()).toISOString().split('T')[0];
        }).satisfies(is.string);

    return generate;
};

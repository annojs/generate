'use strict';

var annotate = require('annotate');
var is = require('annois');


module.exports = function() {
    var generate = annotate('dateTime', 'Generates a RFC3339 `date-time`')
        .on(function() {
            return (new Date()).toISOString();
        }).satisfies(is.string);

    return generate;
};

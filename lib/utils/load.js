'use strict';

var rand = require('annomath').randint;


module.exports = function() {
    var modules = require('require-dir')('..');

    delete modules.index;

    var fn = function(randint) {
        if(randint) {
            var ret = {};

            Object.keys(modules).forEach(function(k) {
                ret[k] = modules[k](randint);
            });

            return ret;
        }

        return fn;
    };

    Object.keys(modules).forEach(function(k) {
        fn[k] = modules[k](rand);
    });

    return fn;
};

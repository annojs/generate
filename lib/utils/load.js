'use strict';

var rand = require('annomath').randint;


module.exports = function() {
    var generators = [
        'any', 'array', 'boolean', 'character', 'date', 'dateTime', 'fn',
        'integer', 'lowerCharacter', 'nan', 'number', 'object', 'string',
        'structure', 'upperCharacter',
    ];
    var modules = loadModules(generators);

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

function loadModules(names) {
    var modules = {};

    names.forEach(function(name) {
        modules[name] = require('../' + name);
    });

    return modules;
}

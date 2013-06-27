var modules = require('require-dir')('.');
var randint = require('funkit').math.randint;

delete modules.index;


module.exports = function() {
    var keys = Object.keys(modules);
    var key = keys[randint(0, keys.length - 1)];

    return modules[key]();
};

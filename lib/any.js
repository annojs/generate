var annotate = require('annotate');
var modules = require('require-dir')('.');

delete modules.index;


module.exports = function() {
    return annotate('any', 'Generates using any available generator')
        .on(function() {
            var keys = Object.keys(modules);
            var key = keys[randint(0, keys.length - 1)];

            return modules[key]();
        });
};

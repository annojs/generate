var annotate = require('annotate');

var load = require('./utils/load');


module.exports = function(randint) {
    var modules;

    return annotate('any', 'Generates using any available generator')
        .on(function() {
            if(!modules) {
                modules = load(randint);
            }

            var keys = Object.keys(modules);
            var key = keys[randint(0, keys.length - 1)];

            return modules[key]();
        });
};

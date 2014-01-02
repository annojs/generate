module.exports = init();


function init(randint) {
    randint = randint || require('funkit').math.randint;
    var modules = require('require-dir')('.');
    var ret = {};

    Object.keys(modules).forEach(function(k) {
        ret[k] = modules[k](randint);
    });

    return ret;
}

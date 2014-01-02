var rand = require('annomath').randint;


module.exports = init();

// require('annogenerate'); -> default generators
// require('annogenerate')() -> default generators
// require('annogenerate')(randint) -> patched generators
function init() {
    var modules = require('require-dir')('.');
    var fn = function(randint) {
        if(randint) {
            var ret = {};

            Object.keys(modules).forEach(function(k) {
                ret[k] = modules[k](randint);
            });

            return ret;
        }

        return fn;
    }

    Object.keys(modules).forEach(function(k) {
        fn[k] = modules[k](rand);
    });

    return fn;
}

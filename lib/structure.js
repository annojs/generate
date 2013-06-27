var annotate = require('annotate');
var funkit = require('funkit');
var choose = funkit.math.choose;
var randint = funkit.math.randint;
var is = require('annois');

var character = require('./character');
var number = require('./number');
var string = require('./string');


module.exports = annotate('structure', 'Generates a structure').
    on(function() {
        function recursion(pick) {
            if(is.object(pick)) {
                pick[string(randint(1, 10))] = recursion(_choose());
            }
            if(is.array(pick)) {
                pick.push(recursion(_choose()));
            }
            return pick;
        }

        function _choose() {
            return choose(getOpts());
        }

        function getOpts() {
            return [{}, [], character(), number()];
        }

        return recursion(_choose());
    });

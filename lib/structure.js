var annotate = require('annotate');
var choose = require('annomath').choose;
var is = require('annois');



module.exports = function(randint) {
    var character = require('./character')(randint);
    var number = require('./number')(randint);
    var string = require('./string')(randint);

    return annotate('structure', 'Generates a structure')
        .on(function() {
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
                return choose(getOpts(), randint);
            }

            function getOpts() {
                return [{}, [], character(), number()];
            }

            return recursion(_choose());
        });
};

var annotate = require('annotate');
var is = require('annois');


module.exports = function(randint) {
    return annotate('character', 'Generates a random character')
        .on(function() {
            return String.fromCharCode(randint(33, 126));
        }).satisfies(is.character);
};
